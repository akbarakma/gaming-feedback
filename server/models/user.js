'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
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
    birth_date: DataTypes.DATE,
    age: DataTypes.INTEGER,
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['Male', 'Female', 'Others']],
          msg: 'Invalid Gender'
        }
      }
    },
    location: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 0 // 0 for normal user, 1 for developer
    }
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeSave: (instance) => {
        instance.password = hashPassword(instance.password);
      }
    }
  });
  return user;
};