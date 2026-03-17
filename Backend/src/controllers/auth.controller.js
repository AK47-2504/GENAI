const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const blacklistModel = require("../models/blackListModel");
const AppError = require("../utils/AppError");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Same flags but without maxAge — used when clearing
const clearCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

/**
 * @route POST - /api/auth/register
 * @access Public
 * @description register a new user, expects username, email and password in the request body
 */
async function registerController(req, res, next) {
  const { username, email, password } = req.body;

  const userAlreadyExist = await userModel.findOne({ email });
  if (userAlreadyExist) {
    return next(new AppError("User Already Exist", 409));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username: username,
    email: email,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1H" },
  );

  res.cookie("token", token, cookieOptions);
  user.password = undefined;

  return res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: { user },
  });
}

/**
 * @route POST - /api/auth/login
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginController(req, res, next) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User not Found or Invalid Credentials", 400));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError("User not Found or Invalid Credentials", 401));
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1H" },
  );

  res.cookie("token", token, cookieOptions);
  user.password = undefined;

  return res.status(200).json({
    status: "success",
    message: "User Login Successfully",
    data: { user },
  });
}

/**
 * @route GET - /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutController(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    await blacklistModel.create({ token });
  }
  res.clearCookie("token", clearCookieOptions);

  return res.status(200).json({
    status: "success",
    message: "User Logout Successfully",
  });
}

/**
 * @route GET - /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */
async function getMeController(req, res, next) {
  const id = req.user.id;

  if (!id) {
    return next(new AppError("Unauthorized Access", 401));
  }

  const user = await userModel.findById(id);
  if (!user) {
    return next(new AppError("User no longer exists", 404));
  }

  return res.status(200).json({
    status: "success",
    message: "Fetched LoggedIn User",
    data: { user },
  });
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  getMeController,
};
