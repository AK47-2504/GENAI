const {
  registerController,
  loginController,
  logoutController,
  getMeController,
} = require("../controllers/auth.controller");

const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const AuthRouter = express.Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.get("/logout", logoutController);
AuthRouter.get("/get-me", authMiddleware, getMeController);

module.exports = AuthRouter;
