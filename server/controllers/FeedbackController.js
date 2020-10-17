const { game, game_feedback, feedback_category, game_feedback_item, game_feedback_message } = require("../models");
const createError = require("http-errors");
const setDate = require("../helpers/setDate");
const { Op } = require("sequelize");

class FeedbackController {
  static createFeedback = async (req, res, next) => {
    try {
      const game_id = req.params.id;
      const user_id = req.UserData.id;
      const gameData = await game.findOne({ where: { id: game_id } });
      if (!gameData) throw createError(404, "Game Not Found");
      let { message, feedback_item } = req.body;
      if (!feedback_item) throw createError(400, "Feedback is required");
      feedback_item = JSON.parse(feedback_item);
      const result = await game_feedback.create({ game_id, user_id });
      let overall_rating = [];
      await Promise.all(
        feedback_item.map(async (data) => {
          const { category, feedback, rating } = data;
          if (!category || !feedback || !rating) return;
          if (!Number.isInteger(rating)) return;
          overall_rating.push(rating);
          const feedbackCategoryData = await feedback_category.findOne({ where: { name: category } });
          if (!feedbackCategoryData) return;
          await game_feedback_item.create({
            feedback,
            feedback_category_id: feedbackCategoryData.id,
            game_feedback_id: result.id,
            rating,
          });
        })
      );
      if (message) await game_feedback_message.create({ message, game_feedback_id: result.id });
      overall_rating = overall_rating.reduce((a, b) => a + b) / overall_rating.length;
      await game_feedback.update({ overall_rating }, { where: { id: result.id } });
      const gameFeedbackCount = await game_feedback.count();
      await game.update(
        {
          popularity: (gameData.popularity + overall_rating) / gameFeedbackCount,
        },
        { where: { id: game_id } }
      );
      res.status(201).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
  static editFeedback = async (req, res, next) => {
    try {
      const feedback_id = req.params.id;
      const user_id = req.UserData.id;
      const feedbackData = await game_feedback.findOne({
        where: { id: feedback_id },
        include: [
          {
            model: game_feedback_message,
            required: false,
          },
          {
            model: game,
            required: false,
          },
          {
            model: game_feedback_item,
            required: false,
          },
        ],
      });
      if (!feedbackData) throw createError(404, "Feedback Not Found");
      if (feedbackData.user_id != user_id) throw createError(401, "You are not authorized");
      let { message, feedback_item } = req.body;
      if (feedback_item) feedback_item = JSON.parse(feedback_item);
      if (message) {
        if (!feedbackData.game_feedback_message) await game_feedback_message.create({ message, game_feedback_id: feedbackData.id });
        else await game_feedback_message.update({ message }, { where: { id: feedbackData.game_feedback_message.id } });
      }
      if (feedback_item) {
        let oldOverallRating = feedbackData.game_feedback_items.map((x) => x.rating);
        oldOverallRating = oldOverallRating.reduce((a, b) => a + b) / feedbackData.game_feedback_items.length;
        const gameFeedbackArr = feedbackData.game_feedback_items.map((x) => x.id);
        await game_feedback_item.destroy({ where: { id: gameFeedbackArr } });
        let overall_rating = [];
        await Promise.all(
          feedback_item.map(async (data) => {
            const { category, feedback, rating } = data;
            if (!category || !feedback || !rating) return;
            if (!Number.isInteger(rating)) return;
            overall_rating.push(rating);
            const feedbackCategoryData = await feedback_category.findOne({ where: { name: category } });
            if (!feedbackCategoryData) return;
            await game_feedback_item.create({
              feedback,
              feedback_category_id: feedbackCategoryData.id,
              game_feedback_id: feedbackData.id,
              rating,
            });
          })
        );
        overall_rating = overall_rating.reduce((a, b) => a + b) / overall_rating.length;
        await game_feedback.update({ overall_rating }, { where: { id: feedbackData.id } });
        const gameFeedbackCount = await game_feedback.count();
        const newPopularity = (feedbackData.game.popularity + overall_rating - oldOverallRating) / gameFeedbackCount;
        await game.update(
          {
            popularity: newPopularity,
          },
          { where: { id: feedbackData.game.id } }
        );
      }
      res.status(201).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
  static deleteFeedback = async (req, res, next) => {
    try {
      const feedback_id = req.params.id;
      const user_id = req.UserData.id;
      const feedbackData = await game_feedback.findOne({
        where: { id: feedback_id },
        include: [
          {
            model: game_feedback_message,
            required: false,
          },
          {
            model: game,
            required: false,
          },
          {
            model: game_feedback_item,
            required: false,
          },
        ],
      });
      if (!feedbackData) throw createError(404, "Feedback Not Found");
      if (feedbackData.user_id != user_id) throw createError(401, "You are not authorized");
      let oldOverallRating = feedbackData.game_feedback_items.map((x) => x.rating);
      oldOverallRating = oldOverallRating.reduce((a, b) => a + b) / feedbackData.game_feedback_items.length;
      const gameFeedbackArr = feedbackData.game_feedback_items.map((x) => x.id);
      await game_feedback_item.destroy({ where: { id: gameFeedbackArr } });
      await game_feedback.destroy({ where: { id: feedbackData.id } });
      await game_feedback_message.destroy({ where: { game_feedback_id: feedbackData.id } });
      const gameFeedbackCount = await game_feedback.count();
      let newPopularity = 0;
      if (gameFeedbackCount) newPopularity = (feedbackData.game.popularity - oldOverallRating) / gameFeedbackCount;
      await game.update(
        {
          popularity: newPopularity,
        },
        { where: { id: feedbackData.game.id } }
      );
      res.status(201).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
  static getGameFeedback = async (req, res, next) => {
    try {
      const game_id = req.params.id;
      let { sort, by, page } = req.query;
      if (!page || page < 1) page = 1;
      let query = {
        separate: true,
        model: game_feedback,
        required: false,
        where: {},
      };
      const resPerPage = 10;
      const offset = resPerPage * page - resPerPage;
      query.offset = offset;
      query.limit = resPerPage;
      if (sort === "popularity") query.order = [["overall_rating", "DESC"]];
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
      const gameData = await game.findOne({
        where: { id: game_id },
        include: [query],
      });
      if (!gameData) throw createError(404, "Game Not Found");
      const numOfResult = await game_feedback.count({ where: { game_id } });
      res.status(200).json({
        data: gameData.game_feedbacks,
        pages: Math.ceil(numOfResult / resPerPage),
        currentPage: Number(page),
        numOfResult,
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = FeedbackController;
