'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.DataTypes.STRING
      },
      url: {
        type: Sequelize.DataTypes.STRING
      },
      sourceUrl: {
        type: Sequelize.DataTypes.STRING
      },
      thumbUrl: {
        type: Sequelize.DataTypes.STRING
      },
      alt: {
        type: Sequelize.DataTypes.STRING
      },
      title: {
        type: Sequelize.DataTypes.STRING
      },
      meta: {
        type: Sequelize.DataTypes.STRING
      },
      mimetype: {
        type: Sequelize.DataTypes.STRING
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('files');
  }
};
