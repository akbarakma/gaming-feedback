const { user, game } = require("../models");
const createError = require("http-errors");

module.exports = {
  developerAuth: async (req, res, next) => {
    try {
      const { id, status } = req.UserData;
      if (!status) throw createError(401, "You are unauthorized");
      const user_data = await user.findOne({ where: { id } });
      if (!user_data.status) throw createError(401, "You are unauthorized");
      next();
    } catch (err) {
      next(err);
    }
  },
  gameDevAuth: async (req, res, next) => {
    try {
      const user_id = req.UserData.id;
      const game_id = req.params.id;
      if (!game_id) throw createError(404, "Data Not Found");
      const gameData = await game.findOne({ where: { id: game_id }, include: [{ model: user, as: "Developer", required: false }] });
      if (!gameData) throw createError(404, "Data Not Found");
      if (gameData.Developer.id != user_id) throw createError(401, "You are not authorized");
      next();
    } catch (err) {
      next(err);
    }
  }
}