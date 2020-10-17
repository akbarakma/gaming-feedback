'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_feedback_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game_feedback_item.belongsTo(models.game_feedback, { foreignKey: "game_feedback_id" });
      game_feedback_item.belongsTo(models.feedback_category, { foreignKey: "feedback_category_id" });
    }
  };
  game_feedback_item.init({
    feedback: DataTypes.TEXT,
    feedback_category_id: DataTypes.INTEGER,
    game_feedback_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game_feedback_item',
  });
  return game_feedback_item;
};