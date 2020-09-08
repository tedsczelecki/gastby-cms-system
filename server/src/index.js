import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import useragent from 'express-useragent';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import loaders from './loaders';
import { userActiveSiteIncludes } from './services/user';

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.set('trust proxy', true)

app.get('/health', (req, res) => {
  res.send('check')
})

const getMe = async req => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.substring('Bearer '.length);

    if (token) {
      try {
        const {id, deviceId = null} = await jwt.verify(token, process.env.SECRET);
        const user = await models.User.findOne({
          include: [
            ...userActiveSiteIncludes({ models }),
          ],
          where: {
            id
          },
        });
        return {
          ...user.get({ plain: true }),
          deviceId
        };
      } catch (e) {
        throw new AuthenticationError(
          'Your session expired. Sign in again.',
        );
      }
    }
  }
};


const apolloServer = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        device: {
          ip: req.ip,
          userAgent: useragent.parse(req.headers['user-agent'])
        },
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
  },
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
// apolloServer.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;

httpServer.listen({ port }, () =>{
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`)
})
