'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('genres', [{
      name: 'RPG',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Action',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Adventure',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Horror',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'FPS',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Simulation',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Sport',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Single Player',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Multi Player',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('genres', null, {});
  }
};
