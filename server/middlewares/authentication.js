const { user } = require('../models');
const { verifyToken } = require('../helpers/jwt');
const createError = require('http-errors');

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    const registeredUser = await user.findOne({ where: { id: decoded.id } });
    if (!registeredUser) throw createError(401, 'You have to login first');
    req.UserData = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;