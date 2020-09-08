import { GraphQLDateTime } from 'graphql-iso-date';

import authResolvers from './auth';
import fileResolvers from './file';
import notificationResolvers from './notification';
import pageResolvers from './page';
import siteResolvers from './site';
import userResolvers from './user';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  authResolvers,
  customScalarResolver,
  fileResolvers,
  notificationResolvers,
  pageResolvers,
  siteResolvers,
  userResolvers,
];
