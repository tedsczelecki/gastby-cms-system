const model = (sequelize, DataTypes) => {
  const File = sequelize.define('file', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    sourceUrl: {
      type: DataTypes.STRING
    },
    thumbUrl: {
      type: DataTypes.STRING
    },
    alt: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    meta: {
      type: DataTypes.STRING
    },
    aspectRatio: {
      type: DataTypes.STRING
    },
    orientation: {
      type: DataTypes.STRING
    },
    mimetype: {
      type: DataTypes.STRING
    },
  });


  File.associate = (models) => {
    // File.belongsTo(models.Post, {
    //   foreignKey: 'userId',
    // });
  };
  return File;
};

export default model;
