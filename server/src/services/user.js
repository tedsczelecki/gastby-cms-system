import models from '../models';
import bcrypt from "bcrypt";
import { Sequelize } from 'sequelize';
import {UserInputError} from "apollo-server";

const generatePassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const getUserById = async ({
  id: userId
}) => {
  return await models.User.findOne({
    where: {
      id: userId
    }
  });
};


export const updateUser = async ({
  input,
  me,
  models,
}) => {
  const user = await models.User.findOne({
    where: {
      id: me.id
    },
  })

  if (!user) {
    throw new UserInputError(
      'No user found.',
    );
  }

  const {
    id,
    avatar,
    wallpaper,
    ...data
  } = input

  const updateVals = {
    ...data,
  }

  if (avatar && avatar.id) {
    updateVals.avatarFileId = avatar.id
  }
  if (wallpaper && wallpaper.id) {
    updateVals.wallpaperFileId = wallpaper.id
  }

  await user.update(updateVals);

  return await getUserById({ id: me.id });

}

export const registerDevice = async ({
  device,
  models,
  user
}) => {
  const {
    ip,
    userAgent
  } = device;
  const foundDevice = await models.UserDevice.findOne({
    where: {
      userId: user.id,
      ip,
    },
    order: [
      ['createdAt', 'DESC']
    ]
  });

  if (foundDevice) {
    foundDevice.update({
      lastActive: Sequelize.fn('NOW')
    });
    return foundDevice;
  }

  const keys = push.generateVAPIDKeys();


  const newDevice = await models.UserDevice.create({
    userId: user.id,
    ip,
    userAgent: userAgent,
    notificationPublicKey: keys.publicKey,
    notificationPrivateKey: keys.privateKey,
  });

  return newDevice;
}

export const userAvatarInclude = ({ models }) => ({
  model: models.File,
  as: 'avatar',
  foreignKey: 'avatarFileId',
})

export const userFileIncludes = ({ models }) => [
  userAvatarInclude({ models }),
  {
    model: models.File,
    as: 'wallpaper',
    foreignKey: 'wallpaperFileId',
  }
];

export const userDeviceIncludes = ({ device, models, userId }) => [
  {
    model: models.UserDevice,
    as: 'devices',
    where: {
      userId,
      ip: device.ip
    },
  }
];

export const userDeviceNotificaitonInclude = ({ models }) => [
  {
    model: models.UserDeviceNotification,
    as: 'deviceNotifications'
  }
]

export const userIncludes = ({ models }) => [
  ...userFileIncludes({models}),
]

export const checkUsername = async ({
  models,
  username
}) => {
  const user = await models.User.findOne({
    where: {
      username
    }
  });

  if (user) {
    throw UserInputError('Username is already taken');
  }
  return true;
}

export {
  generatePassword,
  getUserById,
}
