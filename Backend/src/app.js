const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection (Express 5 compatible)
// express-mongo-sanitize is broken on Express 5 (req.query is read-only)
// This strips MongoDB operators ($, .) from req.body and req.params
const sanitizeMongoOperators = (obj) => {
  if (obj && typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
      } else {
        sanitizeMongoOperators(obj[key]);
      }
    }
  }
};
app.use((req, res, next) => {
  sanitizeMongoOperators(req.body);
  sanitizeMongoOperators(req.params);
  next();
});

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const authRouter = require("../src/routes/auth.routes");
const globalErrorHandler = require("../src/middleware/error.middleware");
const AppError = require("../src/utils/AppError");


app.use("/api/auth", authRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
