const { category, game, genre, language, user } = require("../models");
const createError = require("http-errors");

class CategoryController {
  static getAllCategories = async (req, res, next) => {
    try {
      const result = await category.findAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  static getGameCategory = async (req, res, next) => {
    try {
      const { name } = req.params;
      const result = await category.findOne({
        where: { name },
        include: [
          {
            model: game,
            required: false,
            include: [
              {
                model: category,
                required: false,
              },
              {
                model: genre,
                required: false,
              },
              {
                model: language,
                required: false,
              },
              {
                model: user,
                required: false,
                as: "developer",
              },
            ],
          },
        ],
      });
      if (!result) throw createError(404, "Category Not Found");
      res.status(200).json(result.games);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CategoryController;
