const model = (sequelize, DataTypes) => {
  const PageData = sequelize.define('pageData', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  });


  PageData.associate = (models) => {
    // Notification.belongsTo(models.User, {
    //   as: 'user',
    //   constraints: false,
    //   foreignKey: 'userId',
    // });
  };
  return PageData;
};

export default model;
