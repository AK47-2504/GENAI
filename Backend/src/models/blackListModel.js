const mongoose = require("mongoose");

const blacklistModelSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is Required"],
    },
  },
  { timestamps: true },
);

const blacklistModel =  mongoose.model("blacklisttokens", blacklistModelSchema);

module.exports = blacklistModel;
