const model = (sequelize, DataTypes) => {
  const SiteUsers = sequelize.define('siteUser', {
    siteId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });

  SiteUsers.removeAttribute('id');

  return SiteUsers;
};

export default model;
