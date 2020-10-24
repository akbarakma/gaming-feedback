const { category, game, genre, language, user } = require("../models");
const createError = require("http-errors");

class GenreController {
  static getAllGenres = async (req, res, next) => {
    try {
      const result = await genre.findAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  static getGameGenre = async (req, res, next) => {
    try {
      const { name } = req.params;
      const result = await genre.findOne({
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
      if (!result) throw createError(404, "Genre Not Found");
      res.status(200).json(result.games);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = GenreController;
