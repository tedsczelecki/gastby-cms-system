const model = (sequelize, DataTypes) => {
  const PasswordToken = sequelize.define('passwordToken', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  });


  PasswordToken.associate = (models) => {
  };
  return PasswordToken;
};

export default model;
