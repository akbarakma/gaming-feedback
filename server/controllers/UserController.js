const { user } = require("../models");
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
  }
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
  }
}

module.exports = UserController;
