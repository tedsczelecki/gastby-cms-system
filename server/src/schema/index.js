import { gql } from 'apollo-server-express';

import authSchema from './auth';
import fileSchema from './file';
import messageSchema from './message';
import notificationSchema from './notification';
import pageSchema from './page';
import siteSchema from './site';
import userSchema from './user';

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
  pageSchema,
  siteSchema,
  userSchema,
];
