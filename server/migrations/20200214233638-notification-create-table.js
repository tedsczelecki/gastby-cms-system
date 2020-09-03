'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      link: {
        type: Sequelize.DataTypes.STRING,
      },
      severity: {
        // type: Sequelize.DataTypes.ENUM('low', 'normal', 'high', 'urgent')
        type: Sequelize.STRING,
      },
      status: {
        // type: Sequelize.DataTypes.ENUM('read', 'unread'),
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'unread',
      },
      text: {
        type: Sequelize.DataTypes.STRING,
      },
      type: {
        // type: Sequelize.DataTypes.ENUM('event', 'positive', 'negative', 'alert', 'venue'),
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'alert',
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      count: {
        type: Sequelize.DataTypes.INTEGER,

      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('notifications');
  }
};
