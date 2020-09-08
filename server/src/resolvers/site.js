import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import { UserInputError } from 'apollo-server';
import { createBucket } from '../services/aws';
import { buildAndUploadSite } from '../services/gatsby';
import { hasAccessToSite } from '../services/site';
import { parse } from 'url';
import { Op, Sequelize } from 'sequelize';

const fs = require('fs').promises;
const path = require('path');

const dataFormPattern = 'export const dataForm = '

export default {
  Query: {
    getActiveSiteTemplate :combineResolvers(
      isAuthenticated,
      async (parent, {  }, { models, me }) => {
        const activeSite = await models.Site.findOne({
          where: {
            id: me.activeSite.id,
          }
        });

        const bucketName = parse(activeSite.url).hostname;
        const templatePath = path.join(__dirname, '../../../sites', bucketName, 'src/templates');
        const templates = await fs.readdir(templatePath);

        const templateData = [];

        for (const templateFileName of templates.filter((file) => file !== 'index.js' ) ) {
          try {
            const templateText = await fs.readFile(path.join(templatePath, templateFileName), 'utf8');
            const dataFormIndex = templateText.indexOf(dataFormPattern);
            const dataForm = templateText.substring(dataFormIndex + dataFormPattern.length).split('\n').slice(0, -2).join('');
            console.log(JSON.parse(dataForm));

            console.log(templateFileName.split('.').slice(0, -1));
            templateData.push({
              label: templateFileName.split('.').slice(0, -1)[0],
              name: templateFileName.split('.').slice(0, -1)[0],
              dataForm: dataForm,
            })

          } catch(e) {
            console.log('Error getting template', e);
          }
        }

        return templateData;

      }
    ),
    mySites:combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        return await models.Site.findAll({
          where: {
            id: {
              [Op.in]: Sequelize.literal(`(SELECT "siteUsers"."siteId" FROM "siteUsers" WHERE "siteUsers"."userId" = ${me.id})`)
            }
          }
        })
      }
    ),
    getSite:combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const hasSiteAccess = await models.SiteUser.findOne({
          where: {
            siteId: id,
            userId: me.id,
          }
        });

        if (!hasSiteAccess) {
          throw new UserInputError('You do not have access to this site');
        }

        return await models.Site.findOne({
          where: {
            id
          }
        })
      }
    ),
  },

  Mutation: {
    createSite:combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, me }) => {
        const {
          name,
          url
        } = input;

        const site = await models.Site.findOne({
          where: {
            url,
          }
        });

        if (site) {
          throw new UserInputError('A site with this url already exists. Please contact and administrator')
        }
        const bucketName = parse(url).hostname;
        const createdSite = await models.Site.create({
          bucketName,
          name,
          url,
          status: 'creating'
        });

        await models.SiteUser.create({
          siteId: createdSite.id,
          userId: me.id,
        })



        // Do this in the background
        createBucket({ bucketName })
          .then(async () => {
            await createdSite.update({ status: 'building' })
            await buildAndUploadSite({ name: bucketName });
            await createdSite.update({ status: 'live' })
          })


        return createdSite
      }
    ),
    publishSite: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const siteId = id || me.activeSite.id;

        await hasAccessToSite({
          models,
          siteId,
          userId: me.id
        });

        const site = await models.Site.findOne({
          where: {
            id: siteId,
          }
        });

        console.log(site);

        await site.update({ status: 'building' })
        await buildAndUploadSite({ name: site.bucketName });
        await site.update({ status: 'live' })

      }
    ),
    updateSite: combineResolvers(
      isAuthenticated,
      async (parent, { id, input }, { models, me }) => {
        await hasAccessToSite({
          models,
          siteId: id,
          userId: me.id
        });

        const site = await models.Site.findOne({
          where: {
            id,
          }
        });

        if (!site) {
          throw new UserInputError('Site does not exist');
        }

        const {
          name,
          url
        } = input

        await site.update({
          name,
          url,
        });

        return site;
      }
    ),
  },
};
