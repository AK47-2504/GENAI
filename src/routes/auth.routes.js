const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");

const express = require("express");

const AuthRouter = express.Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.get("/logout", logoutController);

module.exports = AuthRouter;
