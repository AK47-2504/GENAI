const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

async function authMiddleware(req, res, next) {
  const { token } = req.cookie.token;
  console.log(token);

  if (!token) {
    return res.status(400).json({
      message: "Token Required",
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
