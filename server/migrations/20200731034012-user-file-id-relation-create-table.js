'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'avatarFileId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id'
        },
        onDelete: 'CASCADE',
      }),
      queryInterface.changeColumn('users', 'wallpaperFileId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id'
        },
        onDelete: 'CASCADE',
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'avatarFileId'),
      queryInterface.changeColumn('users', 'wallpaperFileId'),
    ]);
  },
};
