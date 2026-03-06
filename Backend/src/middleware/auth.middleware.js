const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const blacklistModel = require("../models/blackListModel");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Token Required",
    });
  }

  const isTokenBlacklist = await blacklistModel.findOne({ token });
  if (isTokenBlacklist) {
    return res.status(400).json({
      message: "Invalid Token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "User not Found",
    });
  }
}

module.exports = authMiddleware;
