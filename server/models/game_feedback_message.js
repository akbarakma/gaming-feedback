'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_feedback_message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game_feedback_message.belongsTo(models.game_feedback, { foreignKey: "game_feedback_id" });
    }
  };
  game_feedback_message.init({
    message: DataTypes.TEXT,
    game_feedback_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game_feedback_message',
  });
  return game_feedback_message;
};