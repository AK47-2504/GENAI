const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blackListModel");
const AppError = require("../utils/AppError");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Token Required", 401));
  }

  const isTokenBlacklist = await blacklistModel.findOne({ token });
  if (isTokenBlacklist) {
    return next(new AppError("Invalid Token", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError("Unauthorized - Invalid or Expired Token", 401));
  }
}

module.exports = authMiddleware;
