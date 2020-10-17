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
      user.belongsToMany(models.user, { through: 'user_follower', as: 'followers', foreignKey: 'followed_user' });
      user.belongsToMany(models.user, { through: 'user_follower', as: 'following', foreignKey: 'following_user' });
      user.hasMany(models.game, { foreignKey: "user_id", as: "Developer" });
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Birth Date cannot be empty'
        },
      }
    },
    age: DataTypes.INTEGER,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
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