import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: PersonalUser
    getSuggestedUsers: [User]
    getUserByUsername(username: String!): User
  }

  extend type Mutation {
    deleteUser(id: ID!): Boolean!
    registerDeviceNotification(authData: String!): SimpleResponse
    signIn(email: String!, password: String!): Token!
    signUp( username: String!, email: String!,password: String!): Token!
    updateMe(input: UserInput!): PersonalUser!
  }

  type PersonalUser {
      id: ID!
      about: String
      avatar: File
      username: String
      name: String
      email: String
      role: String
      location: String
      wallpaper: File
      website: String
      devices: [UserDevice]
  }

  type SimpleUser {
    id: ID!
    avatar: File
    username: String
    name: String
  }
  
  type User {
    id: Int!
    about: String
    avatar: File
    isFollowing: Boolean
    username: String
    name: String
    location: String
    wallpaper: File
    website: String
    followers: [User]
    devices: [UserDevice]
  }
  
  type UserDevice {
    userAgent: String
    notificationPublicKey: String
    lastActive: Date
  }
  
  type UserDeviceNotification {
      deviceId: Int
      authData: String
      publicKey: String
  }

  type UserLocation {
      currentLocation: String
  }

  type Token {
      token: String!
  }
  
  input UserInput {
    id: ID
    about: String
    avatar: FileInput
    username: String
    name: String
    email: String
    role: String
    location: String
      wallpaper: FileInput
    website: String
  }

  input UserLocationInput {
      currentLocation: String
  }
`;
