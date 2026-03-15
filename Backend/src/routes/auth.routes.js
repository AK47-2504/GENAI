const {
  registerController,
  loginController,
  logoutController,
  getMeController,
} = require("../controllers/auth.controller");

const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const { body } = require("express-validator");
const { validate } = require("../middleware/validate.middleware");

const AuthRouter = express.Router();

AuthRouter.post(
  "/register",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validate,
  registerController,
);

AuthRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  loginController,
);
AuthRouter.post("/logout", logoutController);
AuthRouter.get("/get-me", authMiddleware, getMeController);

module.exports = AuthRouter;
