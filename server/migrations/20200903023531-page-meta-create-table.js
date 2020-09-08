'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pageMeta', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pageId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'pages',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      custom: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('pageMeta');
  }
};
