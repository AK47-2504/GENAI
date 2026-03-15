const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.error("Database Connection Failed", err);
      process.exit(1);
    });
}

module.exports = connectToDB;
