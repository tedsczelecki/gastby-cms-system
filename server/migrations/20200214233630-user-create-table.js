'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [7, 42],
        },
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      activeSiteId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
      },
      website: {
        type: Sequelize.DataTypes.STRING,
      },
      location: {
        type: Sequelize.DataTypes.STRING,
      },
      avatarFileId: {
        type: Sequelize.DataTypes.INTEGER,
      },
      wallpaperFileId: {
        type: Sequelize.DataTypes.INTEGER,
      },
      about: {
        type: Sequelize.DataTypes.TEXT
      },
      isVerified: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      notificationMethod: {
        type: Sequelize.STRING,
        defaultValue: 'email'
      },
      lastActive: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
