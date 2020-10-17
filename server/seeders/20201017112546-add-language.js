'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('languages', [{
      name: 'English',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Indonesia',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Chinese',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Japanese',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Korean',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'German',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'French',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('languages', null, {});
  }
};
