const { UserInputError } = require('apollo-server');
import { v5 as uuidv5 } from 'uuid';
import { sendWelcomeEmail, sendForgotPassword } from '../services/email';
import { generatePassword } from '../services/user';
import { getGoogleAuthUrl } from '../libs/auth/google';

import { getUserInfo } from '../libs/auth/google';
import { createToken } from './user';

export default {
  Query: {
    authUrls: () => {
      return {
        googleUrl: getGoogleAuthUrl()
      }
    }
  },
  Mutation: {
    forgotPassword: async (parent, { email }, { models, secret }) => {
      const user = await models.User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw new UserInputError('A user with this email cannot be found.');
      }

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 2);
      const token = await models.PasswordToken.create({
        expiresAt,
        userId: user.id,
        token: uuidv5(user.email.split('@')[1], uuidv5.URL),
      })

      await sendForgotPassword({
        id: user.id,
        passwordToken: token.token,
      });

      return {
        success: true,
        message: 'An email was sent to you with the reset link.',
      };

    },
    register: async (parent, { name, email, password }, { models, secret }) => {
      const userExists = await models.User.findOne({
        where: {
          email
        }
      });

      if (userExists) {
        throw new UserInputError('A user already exists with this email');
      }

      const user = await models.User.create({
        name,
        email,
        password,
        strategy: 'email',
        username: email,
      });

      try {
        await sendWelcomeEmail({
          id: user.id
        })
      } catch(e) {
        // do nothing
        console.log(e);
      }

      return { token: createToken(user, secret, '1y') };
    },
    registerGoogle: async (parent, { code }, { models, secret }) => {
      const {
        userInfo,
        tokens
      } = await getUserInfo({code});

      const userExists = await models.User.findOne({
        where: {
          email: userInfo.email
        }
      });

      if (!userExists) {
        models.User.create({
          accessToken: tokens.access_token,
          avatar: userInfo.picture,
          email: userInfo.email,
          name: userInfo.name,
          strategy: 'google',
          refreshToken: tokens.refresh_token,
          role: 'user',
          username: userInfo.given_name,
        })
      }

      const token = await createToken(userInfo.email, secret, '1y');

      return {
        token
      }
    },
    resetPassword: async (parent, { confirmPassword, password, token }, { models, secret }) => {
      if (password !== confirmPassword) {
        return {
          success: false,
          message: 'The passwords entered do not match',
        }
      }
      const passwordToken = await models.PasswordToken.findOne({
        where: {
          token,
          expiresAt: {
            $gte: new Date(),
          }
        }
      });

      if (!passwordToken) {
        return {
          success: false,
          message: 'The token that you provided is expired or incorrect',
        }
      }

      console.log(passwordToken.userId);

      const user = await models.User.findOne({
        where: {
          id: passwordToken.userId
        }
      });

      if (!user) {
        return {
          success: false,
          message: 'The user doesn\'t exist',
        }
      }

      const _password = await generatePassword(password);
      await user.update({
        password: _password
      })

      await models.PasswordToken.destroy({
        where: {
          id: passwordToken.id,
        }
      })

      return {
        success: true,
        message: 'Your password has been updated successfully',
      }

    }
  }
}
