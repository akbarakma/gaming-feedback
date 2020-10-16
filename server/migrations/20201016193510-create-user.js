'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          },
      }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty'
          },
          isEmail: {
            args: true,
            msg: 'Must enter a valid email'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        ll: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty'
          },
          len: {
            args: [5,20],
            msg: 'Password need to be between 5 and 20 words'
          }
        }
      },
      birth_date: {
        type: Sequelize.DATE
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING,
        validate: {
          isIn: {
            args: [['Male', 'Female', 'Others']],
            msg: 'Invalid Gender'
          }
        }
      },
      location: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // 0 for normal user, 1 for developer
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};