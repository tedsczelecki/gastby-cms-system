import { gql } from 'apollo-server-express';

import authSchema from './auth';
import fileSchema from './file';
import messageSchema from './message';
import notificationSchema from './notification';
import userSchema from './user';
import venueSchema from './venue';
import zoneSchema from './zone';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type SimpleResponse {
      success: Boolean
      message: String
  }
`;

export default [
  authSchema,
  fileSchema,
  linkSchema,
  messageSchema,
  notificationSchema,
  userSchema,
  venueSchema,
  zoneSchema
];
