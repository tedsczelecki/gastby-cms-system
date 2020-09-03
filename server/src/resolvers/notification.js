import { combineResolvers } from 'graphql-resolvers';
import { withFilter } from 'graphql-subscriptions';
import { isAuthenticated } from './authorization';
import { UserInputError, PubSub } from "apollo-server";
import { sendUserNotificationUpdate } from '../services/notification';
import pubsub, { EVENTS } from '../subscription';

export default {
  Query: {
    getMyNotifications: combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, me }) => {
        return await models.Notification.findAll({
          where: {
            userId: me.id
          },
          order: [
            ['updatedAt', 'DESC'],
          ]
        })
      }
    ),
    notificationCount: combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, me }) => {
        const count = await models.Notification.count({
          where: {
            userId: me.id,
            status: 'unread'
          }
        });

        return {
          count: count || 0,
        }
      }
    )
  },

  Mutation: {
    markNotificationAsRead: combineResolvers(
      isAuthenticated,
      async (parent, { notificationId }, { models, me }) => {
        const notification = await models.Notification.findOne({
          where: {
            userId: me.id,
            id: notificationId,
          }
        });

        if (notification) {
          await notification.update({
            status: 'read',
          });
        }

        await sendUserNotificationUpdate({
          models,
          userId: me.id,
        })

        return { success: false, }
      }
    ),
  },
  Subscription: {
    notificationCountUpdate: {
      subscribe: withFilter(
        () =>  pubsub.asyncIterator([EVENTS.NOTIFICATION.UPDATE]),
        ({ userId }, { user: userToken}) => {
          // @TODO verify user instead of just conversationId passed
          return true;
        },
      ),
    },
  },
};
