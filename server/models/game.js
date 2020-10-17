'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game.belongsToMany(models.category, { through: "game_category", foreignKey: "game_id" });
      game.belongsToMany(models.genre, { through: "game_genre", foreignKey: "game_id" });
      game.belongsToMany(models.language, { through: "game_language", foreignKey: "game_id" });
      game.belongsTo(models.user, { foreignKey: "user_id", as: "Developer" });
    }
  };
  game.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
      }
    },
    release_date: DataTypes.DATE,
    buy_link: DataTypes.STRING,
    popularity: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    website_link: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty'
        },
      }
    },
    about: DataTypes.TEXT,
    main_image_path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Main Image cannot be empty'
        },
      }
    },
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};