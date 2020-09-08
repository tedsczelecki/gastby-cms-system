'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('siteUsers', {
      siteId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'sites',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('siteUsers');
  }
};
