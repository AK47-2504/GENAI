require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./src/app");
const connectToDB = require("./src/config/database");
// const invokeGeminiAI = require("./src/services/ai.service");
const {
  resume,
  jobDescription,
  selfDescription,
} = require("./src/services/temp");

const generateInterviewReport = require("./src/services/ai.service");
connectToDB();
generateInterviewReport();
const server = app.listen(3000, () => {
  console.log(`Server is Running on PORT 3000`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
