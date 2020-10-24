'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [{
      name: 'PS4',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'PC',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'XBOX',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Nintendo',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Android',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'iOS',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
