const model = (sequelize, DataTypes) => {
  const PageMeta = sequelize.define('pageMeta', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pages',
        key: 'id'
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    custom: {
      type: DataTypes.TEXT,
    },
  });


  PageMeta.associate = (models) => {
    // Notification.belongsTo(models.User, {
    //   as: 'user',
    //   constraints: false,
    //   foreignKey: 'userId',
    // });
  };
  return PageMeta;
};

export default model;
