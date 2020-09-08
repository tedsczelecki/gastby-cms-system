import {UserInputError} from "apollo-server";

export const hasAccessToSite = async ({
  models,
  siteId,
  userId,
}) => {
  const hasSiteAccess = await models.SiteUser.findOne({
    where: {
      siteId,
      userId,
    }
  });

  if (!hasSiteAccess) {
    throw new UserInputError('You do not have access to this site');
  }

  return true
}
