const { user, user_follower } = require("../models");
const createError = require("http-errors");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
  static register = async (req, res, next) => {
    try {
      const { email, password, location, birth_date, age, gender, name, status } = req.body;
      if (!email) throw createError(400, "Email cannot be empty");
      if (!password) throw createError(400, "Password cannot be empty");
      if (!name) throw createError(400, "Name cannot be empty");
      const query = {
        name,
        password,
        location,
        birth_date,
        age,
        gender,
        email,
        status,
      };
      const user_data = await user.create(query);
      const access_token = generateToken({ id: user_data.id, status: status ? 1 : 0 });
      res.status(201).json({
        user_data,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  };
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if ((!email, !password)) throw createError(400, "Wrong email/password");
      const user_data = await user.findOne({ where: { email } });
      if (!user_data) throw createError(400, "Wrong email/password");
      const passwordValidation = comparePassword(password, user_data.password);
      if (!passwordValidation) throw createError(400, "Wrong email/password");
      const access_token = generateToken({ id: user_data.id, status: user_data.status });
      res.status(200).json({
        user_data,
        access_token,
      });
    } catch (err) {
      next(err);
    }
  };
  static getProfile = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const result = await user.findOne({ where: { id } });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  static editProfile = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const { location, birth_date, age, gender, name, status } = req.body;
      let query = {};
      if (location) query.location = location;
      if (birth_date) query.birth_date = birth_date;
      if (age) query.age = age;
      if (gender) query.gender = gender;
      if (name) query.name = name;
      if (status) query.status = status;
      await user.update(query, { where: { id } });
      res.status(200).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
  static getUserProfile = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await user.findOne({ where: { id } });
      if (!result) throw createError(404, "User Not Found");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  static followUser = async (req, res, next) => {
    try {
      const following_user = req.UserData.id;
      const followed_user = req.params.id;
      if (following_user == followed_user) throw createError(400, "Cant follow yourself");
      if (!followed_user) throw createError(404, "User Not Found");
      const followedData = await user.findOne({ where: { id: followed_user } });
      if (!followedData) throw createError(404, "User Not Found");
      const followerData = await user_follower.findOne({ where: { following_user, followed_user } });
      if (followerData) throw createError(400, "Already Following");
      const result = await user_follower.create({ followed_user, following_user });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
  static unfollowUser = async (req, res, next) => {
    try {
      const following_user = req.UserData.id;
      const followed_user = req.params.id;
      if (following_user == followed_user) throw createError(400, "Cant unfollow yourself");
      if (!followed_user) throw createError(404, "User Not Found");
      const followedData = await user.findOne({ where: { id: followed_user } });
      if (!followedData) throw createError(404, "User Not Found");
      await user_follower.destroy({ where: { followed_user, following_user } });
      res.status(201).json({ msg: "Success" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
