'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('venues', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      googlePlaceId: {
        type: Sequelize.DataTypes.STRING,
      },
      googleFormattedAddress: {
        type: Sequelize.DataTypes.STRING,
      },
      lat: {
        type: Sequelize.DataTypes.STRING,
      },
      lng: {
        type: Sequelize.DataTypes.STRING,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
      logoFileId: {
        type: Sequelize.DataTypes.INTEGER,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('venues');
  }
};
