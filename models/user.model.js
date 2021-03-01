const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email already exist"],
    },

    phone: {
      type: Number,
      required: [true, "Please provide a Phone number"],
      unique: [true, "Phone number already exist"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      unique: false,
    },

    fullname: {
      type: String,
      unique: false,
    },
    resetCode: {
      type: Number,
      required: false,
      unique: false,
    },
    role: {
      type: Number,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    token: {
      type: String,
      default: null,
    },

    profilePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
