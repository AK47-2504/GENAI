const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
    },
    
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // 🔥 important: don't send password in queries
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
