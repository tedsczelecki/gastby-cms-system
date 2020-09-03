import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getMyNotifications: [Notification]
    notificationCount: NotificationCount
  }
  
  extend type Mutation {
    markNotificationAsRead(notificationId: Int!) : SimpleResponse
    markAllNotificationsRead : SimpleResponse
  }
  
  extend type Subscription {
    notificationCountUpdate(user: String): NotificationCount
  }

  type Notification {
    id: Int
    link: String
    severity: String
    status: String
    text: String
    type: String
    userId: Int
    updatedAt: Date
    updatedAtcreatedAt: Date
  }

  type NotificationCount {
    count: Int
  }

`
