import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import {
  isFollowingUser,
  registerDevice,
  updateUser,
  userDeviceIncludes,
  userFileIncludes,
  userIncludes,
} from '../services/user';
import { isAdmin, isAuthenticated } from './authorization';

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role, deviceId = null } = user;
  return await jwt.sign({ deviceId, id, email, username, role }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    getSuggestedUsers: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => {
        // @TODO add sponsored check to query or a separate query
        return await models.User.findAll({
          include: userFileIncludes({ models }),
          limit: 24,
          order: [
            ['lastActive', 'DESC']
          ]
        })
      }
    ),
    getUserByUsername: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => {
        const profile = await models.User.findOne({
          include: userIncludes({ models }),
          where: {
            username,
          },
          order: [
            [{model: models.Post, as: 'posts'},  'createdAt', 'DESC'],
          ]
        }, { raw: true });

        const isFollowing = await isFollowingUser({
          followerId: profile.id,
          me,
          models,
        })

        profile.isFollowing = isFollowing;

        return profile;
      },
    ),
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, { models, me, device }) => {
      if (!me) {
        return null;
      }

      const user = await models.User.findOne({
        include: [
          ...userFileIncludes({models}),
          ...userDeviceIncludes({models, device, userId: me.id}),
        ],
        where: {
          id: me.id
        }
      });

      return user
    },
  },

  Mutation: {
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      },
    ),
    registerDeviceNotification: combineResolvers(
      async (parent, { authData }, { device, me, models }) => {
        const deviceInfo = await models.UserDevice.findOne({
          where: {
            userId: me.id,
            ip: device.ip,
            userAgent: {
              browser: device.userAgent.browser
            }
          }
        });

        if (!deviceInfo) {
          throw new Error('No device found');
        }

        await deviceInfo.update({
          notificationAuthData: authData,
        });

        return {
          success: true,
        }
      },
    ),
    signUp: async (
      parent,
      { username, email, password },
      { models, device, secret },
    ) => {

      const userExists = await models.User.findOne({
        where: {
          [Op.or]: {
            email,
            username,
          }
        }
      });

      if (userExists) {
        const doesEmailMatch = userExists.email === email;
        throw new UserInputError(`${doesEmailMatch ? 'Email': 'Username'} already exists`)
      }

      const user = await models.User.create({
        username,
        email,
        password,
      });

      const registeredDevice = await registerDevice({
        device,
        models,
        user,
      });

      return { token: createToken({ ...user.get({ plain: true }), deviceId: registeredDevice.id }, secret, '1y') };
    },

    // @TODO move to auth resolver
    signIn: async (
      parent,
      { email, password },
      { models, device, secret },
    ) => {
      const user = await models.User.findByEmail(email);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      const registeredDevice = await registerDevice({
        device,
        models,
        user,
      });

      return { token: createToken({ ...user.get({ plain: true }), deviceId: registeredDevice.id }, secret, '1y') };
    },

    updateMe: combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, me }) => {
        return await updateUser({
          input,
          me,
          models,
        });
      },
    ),
  },
};
