'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_follower.init({
    followed_user: DataTypes.INTEGER,
    following_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_follower',
  });
  return user_follower;
};