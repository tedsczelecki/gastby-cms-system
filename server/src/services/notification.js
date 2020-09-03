import pubsub, { EVENTS } from '../subscription';
import { userDeviceNotificaitonInclude } from './user';
const OneSignal = require('onesignal-node');
//
// const client = new OneSignal.Client(
//   'eb904801-9a2f-4709-9fe1-697c98da6400',
//   'ZmE2MTQ5YjQtNjA5Mi00MmE2LWI5YTItMTljMjExY2M3NWFi'
// );

const webpush = require('web-push');

export const getNotificationText = ({
  type,
  variables,
}) => {
  switch(type) {
    case 'message':
      return `New message from ${variables.username}`;
    case 'follower':
      return `${variables.username} is now following you`;
  }
}

export const notify = async ({
  link = '',
  models,
  severity = 'low',
  status = 'unread',
  text,
  type,
  payload = {},
  userId,
}) => {

  let notification = await models.Notification.findOne({
    where: {
      link,
      severity,
      text,
      type,
      userId,
    }
  });

  if (notification) {
    const count = notification.count;
    notification.update({
      count: count + 1,
      status: 'unread'
    })
  } else {
    notification = await models.Notification.create({
      link,
      severity,
      status,
      text,
      type,
      userId,
    });
  }

  await sendUserNotificationUpdate({
    models,
    payload,
    userId,
  })

  return notification;
}

export const sendUserNotificationUpdate = async ({
  models,
  payload = {},
  userId
}) => {
  const notificationCount = await getUserNotificationCount({
    models,
    userId
  })

  pubsub.publish(EVENTS.NOTIFICATION.UPDATE, {
    ...payload,
    userId,
    notificationCountUpdate: {
      count: notificationCount,
    }
  });
}


export const getUserNotificationCount = async({
  models,
  status = 'unread',
  type = null,
  userId,
}) => {
  const where = {
    userId,
  }
  if (status) {
    where.status = status;
  }
  if (type) {
    where.type = type;
  }
  return new Promise((resolve, reject) => {
    // Without setImmediate the returned count was off
    // probably because of the sequelize transactions?
    // I don't fucking know its late
    setImmediate(() => {
      models.Notification.count({
        where,
      })
        .then(resolve)
        .catch(reject);
    })
  });
}

export const sendPushNotification = async ({
  contents = '',
  heading = 'New Message',
  models,
  subtitle = '',
  url = '',
  userId,
} = {}) => {

  const notificationInfo = await models.UserDevice.findAll({
    where: {
      userId
    },
  });

  if (notificationInfo) {
    notificationInfo.forEach((device) => {
      const pushSubscription = JSON.parse(device.notificationAuthData)
      webpush.setVapidDetails(
        'mailto:tedsczelecki@gmail.com',
        device.notificationPublicKey,
        device.notificationPrivateKey
      )
      webpush.sendNotification(pushSubscription, JSON.stringify({
        contents,
        heading,
        subtitle,
        url,
      })).catch((err) => {
        console.log('Web push error', err);
      })
    })
  }

  // const notification = {
  //   contents: {
  //     'en': contents,
  //   },
  //   headings: {
  //     en: heading,
  //   },
  //   subtitle: {
  //     en: subtitle,
  //   },
  //   url,
  //   include_player_ids: ['8be1083f-70bc-4330-a724-fdddcc8eb92e']
  // };
  //
  // const response = await client.createNotification(notification);
  // console.log(response);
}

// const sendNotificationWithMethod = ({
//   notificationMethod,
//   emailFunc = null
// }) => {
//   if (notificationMethod === 'email' && emailFunc) {
//     return emailFunc();
//   }
// }
//
// const sendNotification = async ({
//   emailFunc = () => {},
//   link = '',
//   severity = 'normal',
//   text,
//   type,
//   user,
// }) => {
//   const {
//     id: userId,
//     notificationMethod,
//   } = user;
//   const payload = {
//     link,
//     severity,
//     text,
//     type,
//     userId
//   };
//
//   sendNotificationWithMethod({
//     notificationMethod,
//     emailFunc,
//   });
//
//   await pubsub.publish(EVENTS.NOTIFICATION.ON_NOTIFICATION, {
//     onNotification: payload,
//   });
//   await models.Notification.create(payload);
//
//   return payload
// };
//
// const getAllNotifications = async({
//   status = '',
//   userId,
//   ...rest
// }) => {
//   const where = {
//     userId
//   };
//
//   if (status) {
//     where.status = status;
//   }
//
//   return await models.Notification.findAll({
//     include: [
//       {
//         model: models.User,
//         as: 'user',
//       },
//     ],
//     where,
//     order: [
//       ['status', 'DESC'],
//       ['createdAt', 'DESC'],
//     ],
//     ...rest
//   });
// }
//
// export {
//   getAllNotifications,
//   sendNotification
// }
