const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const blacklistModel = require("../models/blackListModel");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All Field Required",
    });
  }

  const userAlreadyExist = await userModel.findOne({ email });
  if (userAlreadyExist) {
    return res.status(409).json({
      message: "User Already Exist",
    });
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
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User Registered Successfully",
    user,
  });
}

async function loginController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All Field Required",
    });
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({
      message: "User not Found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User Login Successfully",
    user,
  });
}

async function logoutController(req, res) {
  const token = req.cookies.token;
  if (token) {
    await blacklistModel.create({ token });
  }
  res.clearCookie("token");

  return res.status(200).json({
    message: "User Logout Successfully",
  });
}

module.exports = {
  registerController,
  loginController,
  logoutController,
};
