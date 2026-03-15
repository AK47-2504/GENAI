const mongoose = require("mongoose");

const blacklistModelSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is Required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 7 * 24 * 60 * 60, // Auto-delete after 7 days (matches JWT expiry)
    },
  },
  { timestamps: true },
);

const blacklistModel = mongoose.model("blacklisttokens", blacklistModelSchema);

module.exports = blacklistModel;
