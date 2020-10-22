'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_screenshot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game_screenshot.belongsTo(models.game, { foreignKey: "game_id" });
    }
  };
  game_screenshot.init({
    image_path: DataTypes.STRING,
    game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game_screenshot',
  });
  return game_screenshot;
};