import { GraphQLDateTime } from 'graphql-iso-date';

import authResolvers from './auth';
import fileResolvers from './file';
import notificationResolvers from './notification';
import userResolvers from './user';
import venueResolvers from './venue';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  authResolvers,
  customScalarResolver,
  fileResolvers,
  notificationResolvers,
  userResolvers,
  venueResolvers,
];
