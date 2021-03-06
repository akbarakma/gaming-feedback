const { user, game, game_category, game_genre, game_language, category, genre, language } = require("../models");
const createError = require("http-errors");
const setDate = require("../helpers/setDate");
const { Op } = require("sequelize");

class GameController {
  static createGame = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      let { title, release_date, website_link, buy_link, description, about, main_image_path, categoryArr, genreArr, languageArr } = req.body;
      if (!title) throw createError(400, "Title is required");
      if (!description) throw createError(400, "Description is required");
      if (!main_image_path) throw createError(400, "Main Image is required");
      if (!categoryArr) throw createError(400, "Category is required");
      if (!language) throw createError(400, "Language is required");
      const gameData = await game.findOne({ where: { title } });
      if (gameData) throw createError(400, "Game Title Already Exist");
      if (categoryArr) categoryArr = JSON.parse(categoryArr);
      if (genreArr) genreArr = JSON.parse(genreArr);
      if (languageArr) languageArr = JSON.parse(languageArr);
      const result = await game.create({
        title,
        release_date,
        website_link,
        buy_link,
        description,
        about,
        main_image_path,
        user_id: id,
      });
      if (categoryArr)
        await Promise.all(
          categoryArr.map(async (name) => {
            const categoryData = await category.findOne({ where: { name } });
            if (!categoryData) return;
            await game_category.create({ game_id: result.id, category_id: categoryData.id });
          })
        );
      if (genreArr)
        await Promise.all(
          genreArr.map(async (name) => {
            const genreData = await genre.findOne({ where: { name } });
            if (!genreData) return;
            await game_genre.create({ game_id: result.id, genre_id: genreData.id });
          })
        );
      if (languageArr)
        await Promise.all(
          languageArr.map(async (name) => {
            const languageData = await language.findOne({ where: { name } });
            if (!languageData) return;
            await game_language.create({ game_id: result.id, language_id: languageData.id });
          })
        );
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
  static getAllGame = async (req, res, next) => {
    try {
      let { sort, by, page, category: categoryQuery, genre: genreQuery, language: languageQuery } = req.query;
      if (!page || page < 1) page = 1;
      let query = {
        where: {},
        include: [
          {
            model: category,
            required: true,
          },
          {
            model: genre,
            required: true,
          },
          {
            model: language,
            required: true,
          },
          {
            model: user,
            required: false,
            as: "developer",
          },
        ],
      };
      if (sort === "popularity") query.order = [["popularity", "DESC"]];
      else if (sort === "title") query.order = [["title", "DESC"]];
      else query.order = [["createdAt", "DESC"]];
      if (by === "today")
        query.where.createdAt = {
          [Op.gte]: setDate(new Date(), 1),
        };
      else if (by === "week")
        query.where.createdAt = {
          [Op.gte]: setDate(new Date(), 7),
        };
      else if (by === "month")
        query.where.createdAt = {
          [Op.gte]: setDate(new Date(), 30),
        };
      else if (by === "year")
        query.where.createdAt = {
          [Op.gte]: setDate(new Date(), 365),
        };
      const resPerPage = 8;
      const offset = resPerPage * page - resPerPage;
      query.offset = offset;
      query.limit = resPerPage;
      let result;
      let numOfResult;
      if (categoryQuery) {
        result = await category.findOne({
          where: { name: categoryQuery },
          include: [
            {
              model: game,
              required: false,
              where: query.where,
              include: query.include,
            },
          ],
        });
        if (result) result = result.games;
        numOfResult = await game.count({
          include: [
            {
              model: category,
              required: true,
              where: {
                name: categoryQuery,
              },
            },
          ],
        });
      } else if (genreQuery) {
        result = await genre.findOne({
          where: { name: genreQuery },
          include: [
            {
              model: game,
              required: false,
              where: query.where,
              include: query.include,
            },
          ],
        });
        if (result) result = result.games;
        numOfResult = await game.count({
          include: [
            {
              model: genre,
              required: true,
              where: {
                name: genreQuery,
              },
            },
          ],
        });
      } else if (languageQuery) {
        result = await language.findOne({
          where: { name: languageQuery },
          include: [
            {
              model: game,
              required: false,
              where: query.where,
              include: query.include,
            },
          ],
        });
        if (result) result = result.games;
        numOfResult = await game.count({
          include: [
            {
              model: language,
              required: true,
              where: {
                name: languageQuery,
              },
            },
          ],
        });
      } else {
        result = await game.findAll(query);
        numOfResult = await game.count();
      }
      const pages = Math.ceil(numOfResult / resPerPage);
      const currentPage = Number(page);
      res.status(200).json({
        data: currentPage > pages ? [] : result,
        pages,
        currentPage,
        numOfResult,
      });
    } catch (err) {
      next(err);
    }
  };
  static getSingleGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await game.findOne({
        where: { id },
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
      });
      if (!result) throw createError(404, "Data Not Found");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  static editGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      let { title, release_date, website_link, buy_link, description, about, main_image_path, categoryArr, genreArr, languageArr } = req.body;
      if (categoryArr) categoryArr = JSON.parse(categoryArr);
      if (genreArr) genreArr = JSON.parse(genreArr);
      if (languageArr) languageArr = JSON.parse(languageArr);
      let query = {};
      if (title) query.title = title;
      if (release_date) query.release_date = release_date;
      if (website_link) query.website_link = website_link;
      if (buy_link) query.buy_link = buy_link;
      if (description) query.description = description;
      if (about) query.about = about;
      if (main_image_path) query.main_image_path = main_image_path;
      await game.update(query, { where: { id } });
      if (categoryArr) {
        await game_category.destroy({ where: { game_id: id } });
        await Promise.all(
          categoryArr.map(async (name) => {
            const categoryData = await category.findOne({ where: { name } });
            if (!categoryData) return;
            await game_category.create({ game_id: id, category_id: categoryData.id });
          })
        );
      }
      if (genreArr) {
        await game_genre.destroy({ where: { game_id: id } });
        await Promise.all(
          genreArr.map(async (name) => {
            const genreData = await genre.findOne({ where: { name } });
            if (!genreData) return;
            await game_genre.create({ game_id: id, genre_id: genreData.id });
          })
        );
      }
      if (languageArr) {
        await game_language.destroy({ where: { game_id: id } });
        await Promise.all(
          languageArr.map(async (name) => {
            const languageData = await language.findOne({ where: { name } });
            if (!languageData) return;
            await game_language.create({ game_id: id, language_id: languageData.id });
          })
        );
      }
      res.status(201).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
  static deleteGame = async (req, res, next) => {
    try {
      const { id } = req.params;
      await game.destroy({ where: { id } });
      await game_category.destroy({ where: { game_id: id } });
      await game_language.destroy({ where: { game_id: id } });
      await game_genre.destroy({ where: { game_id: id } });
      res.status(200).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
  static getGameInclude = async (req, res, next) => {
    try {
      const categoryResult = await category.findAll();
      const genreResult = await genre.findAll();
      const languageResult = await language.findAll();
      res.status(200).json({
        category: categoryResult,
        genre: genreResult,
        language: languageResult,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GameController;
