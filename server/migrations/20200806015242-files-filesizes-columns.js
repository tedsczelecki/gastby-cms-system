'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'files',
        'aspectRatio',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'files',
        'orientation',
        Sequelize.STRING
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'files',
        'aspectRatio'
      ),
      queryInterface.removeColumn(
        'files',
        'orientation'
      )
    ])
  }
};
