'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game_feedback.belongsTo(models.game, { foreignKey: "game_id" });
      game_feedback.belongsTo(models.user, { foreignKey: "user_id" });
      game_feedback.hasMany(models.game_feedback_item, { foreignKey: "game_feedback_id" });
      game_feedback.hasOne(models.game_feedback_message, { foreignKey: "game_feedback_id" });
    }
  };
  game_feedback.init({
    game_id: DataTypes.INTEGER,
    overall_rating: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game_feedback',
  });
  return game_feedback;
};