import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import {hasAccessToSite} from "../services/site";
import { pageIncludes } from '../services/page';
import {UserInputError} from "apollo-server";

export default {
  Query: {
    mySitePages: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        return await models.Page.findAll({
          include: [
            ...pageIncludes({ models })
          ],
          where: {
            siteId: me.activeSite.id
          }
        })
      }
    ),
    getPage:combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const page = await models.Page.findOne({
          include: [
            ...pageIncludes({ models })
          ],
          where: {
            id
          }
        });

        await hasAccessToSite({
          models,
          siteId: page.siteId,
          userId: me.id
        });

        return page;
      }
    ),
  },

  Mutation: {
    createPage :combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, me }) => {
        const {
          data: pageData,
          meta,
          ...pageInfo
        } = input;

        const page = await models.Page.create({
          ...pageInfo,
          siteId: me.activeSite.id,
        });

        if (meta) {
          await models.PageMeta.create({
            ...meta,
            pageId: page.id
          })
        }

        if (pageData) {
          await Promise.all(pageData.map(async ({key, value}) => {
            const pageDataExist = await models.PageData.findOne({
              where: {
                pageId: page.id,
                key
              }
            });

            if (pageDataExist) {
              await pageDataExist.update({
                value
              })
            } else {
              await models.PageData.create({
                pageId: page.id,
                key,
                value,
              })
            }
          }))
        }

        return await models.Page.findOne({
          include: [
            ...pageIncludes({ models })
          ],
          where: {
            id: page.id
          }
        })
      }
    ),
    updatePage :combineResolvers(
      isAuthenticated,
      async (parent, { id, input }, { models, me }) => {
        const page = await models.Page.findOne({
          where: {
            siteId: me.activeSite.id,
            id,
          }
        });

        if (!page) {
          throw new UserInputError('You cannot edit this page');
        }

        const {
          data: pageData,
          meta,
          ...pageInfo
        } = input;

        page.update(pageInfo);

        if (meta) {
          const pageMeta = await models.PageMeta.findOne({
            where: {
              pageId: page.id,
            }
          });
          console.log(meta);
          pageMeta.update(meta);
        }

        if (pageData) {
          await Promise.all(pageData.map(async ({key, value}) => {
            const pageDataExist = await models.PageData.findOne({
              where: {
                pageId: page.id,
                key
              }
            });

            if (pageDataExist) {
              await pageDataExist.update({
                value
              })
            } else {
              await models.PageData.create({
                pageId: page.id,
                key,
                value,
              })
            }
          }))
        }

        return await models.Page.findOne({
          include: [
            ...pageIncludes({ models })
          ],
          where: {
            id: page.id
          }
        })
      }
    ),
  },
};
