const { category, game, genre, language, user } = require("../models");
const createError = require("http-errors");

class LanguageController {
  static getAllLanguages = async (req, res, next) => {
    try {
      const result = await language.findAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  static getGameLanguage = async (req, res, next) => {
    try {
      const { name } = req.params;
      const result = await language.findOne({
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
                as: "Developer",
              },
            ],
          },
        ],
      });
      if (!result) throw createError(404, "Language Not Found");
      res.status(200).json(result.games);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = LanguageController;
