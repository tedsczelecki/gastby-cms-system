import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import { uploadFile } from '../services/file';

export default {
  Query: {
    getMyFiles:combineResolvers(
        isAuthenticated,
        async (parent, { text }, { models, me }) => {
        const files = await models.File.findAll({
          include: [
            {
              model: models.User,
            }
          ],
          where: {
            userId: me.id
          }
        });
        return files;
      }
    ),
    getFileById: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models, me }) => {
        const file = await models.File.findAll({
          include: [
            {
              model: models.User,
            }
          ],
          where: {
            userId: me.id,
            id
          }
        });
        return file;
      }
    ),
  },

  Mutation: {
    uploadFile: combineResolvers(
      isAuthenticated,
      async (parent, { file }, { models, me }) => {

        const uploadedFile = await uploadFile({
          file,
          me,
          models,
        });

        return uploadedFile;
      },
    ),
    uploadFiles: combineResolvers(
      isAuthenticated,
      async (parent, { files }, { models, me }) => {
        const returnFiles = [];

        for( const file of files) {
          const uploadedFiles = await uploadFile({
            file,
            me,
            models,
          });
          returnFiles.push(uploadedFiles)
        }
        return returnFiles;
      },
    ),
  },
};
