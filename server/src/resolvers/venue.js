import {combineResolvers} from "graphql-resolvers";

import { geocodeAddress } from '../libs/geocode';
import { isAdmin, isAuthenticated } from './authorization';

export default {
  Query: {
    getVenue: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        // if (!me) {
        //   return null;
        // }
        try {
          return (await models.Venue.findOne({
            include: [
              {
                model: models.File,
                as: 'logo',
                foreignKey: 'logoFileId',
              }
            ],
            where: {
              id,
              userId: me.id,
            }
          }));
        } catch (e) {
          console.log(e);
          return {}
        }
      }),
    myVenues: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
        try {
          return await models.Venue.findAll({
            include: [
            ],
            where: {
              userId: me.id
            }
          });
        } catch (e) {
          console.log(e);
          return []
        }
    }),
  },
  Mutation: {
    createVenue: combineResolvers(
    isAuthenticated,
      async (parent, { input }, {models, me}) => {
        const {
          address,
          name,
          logo,
          description,
        } = input;

        const createData = {
          name,
          address,
          description,
          userId: me.id,
        }

        if (logo) {
          createData.logoFileId = logo.id;
        }

        const venue = await models.Venue.create(createData);
        return venue;
      }
    ),
    deleteVenue: combineResolvers(
      isAuthenticated,
      async (parent, { id }, {models, me}) => {
        const venue = await models.Venue.destroy({
          where: {
            id,
            userId: me.id
          }
        });

        return venue;
      }
    ),
    updateVenue: combineResolvers(
      isAuthenticated,
      async (parent, { id, input }, {models, me}) => {
        const venue = await models.Venue.findOne({
          where: {
            id,
            userId: me.id
          }
        });

        if (!venue) {
          throw new Error('You are not allowed to update this venue')
          return {}
        }

        const updateValues = {
          ...input,
        }

        if (input.logo) {
          updateValues.logoFileId = input.logo.id
        }

        await venue.update(updateValues)
      }
    ),
  }
}
