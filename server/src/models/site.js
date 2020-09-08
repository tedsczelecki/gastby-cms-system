const model = (sequelize, DataTypes) => {
  const Site = sequelize.define('site', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'offline',
    },
    previewUrl: {
      type: DataTypes.STRING,
    },
    bucketName: {
      type: DataTypes.STRING,
    },
  });


  Site.associate = (models) => {
    Site.belongsToMany(models.User, {
      through: 'siteUsers',
      as: 'users',
      foreignKey: 'siteId',
      otherKey: 'userId'
    });

    Site.hasMany(models.Page, {
      as: 'pages'
    })
  };
  return Site;
};

export default model;
