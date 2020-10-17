'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('feedback_categories', [{
      name: 'Overall',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Combat',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Story',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Server',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Online',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Weapons',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Characters',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feedback_categories', null, {});
  }
};
