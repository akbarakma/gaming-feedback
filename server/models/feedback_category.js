'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      feedback_category.hasMany(models.game_feedback_item, { foreignKey: "feedback_category_id" });
    }
  };
  feedback_category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feedback_category',
  });
  return feedback_category;
};