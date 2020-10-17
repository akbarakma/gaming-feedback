const { game, game_feedback, feedback_category, game_feedback_item, game_feedback_message } = require("../models");
const createError = require("http-errors");

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
          console.log(data);
          console.log(category);
          console.log(feedback);
          console.log(rating);
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
      res.status(201).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = FeedbackController;
