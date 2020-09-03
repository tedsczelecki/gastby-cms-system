const model = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    link: {
      type: DataTypes.STRING,
    },
    severity: {
      type: DataTypes.ENUM('low', 'normal', 'high', 'urgent')
    },
    status: {
      type: DataTypes.ENUM('read', 'unread'),
      defaultValue: 'unread',
    },
    text: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('event', 'positive', 'negative', 'alert', 'venue'),
      defaultValue: 'alert',
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });


  Notification.associate = (models) => {
    // Notification.belongsTo(models.User, {
    //   as: 'user',
    //   constraints: false,
    //   foreignKey: 'userId',
    // });
  };
  return Notification;
};

export default model;
