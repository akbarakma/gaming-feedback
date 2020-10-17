'use strict';
const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      email: 'test@test.com',
      password: hashPassword("testing"),
      name: "User",
      birth_date: new Date(),
      gender: 'Male',
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      email: 'testdev@test.com',
      password: hashPassword("testing"),
      name: "Developer",
      birth_date: new Date(),
      gender: 'Female',
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
