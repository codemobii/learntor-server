const mongoose = require("mongoose");

const UserProjectSchema = new mongoose.Schema(
  {
    course: {
      type: String,
    },

    institute: {
      type: String,
      required: [true, "No institution specified"],
    },

    file: {
      type: String,
    },

    disabled: {
      type: Boolean,
      default: 0,
    },

    desc: {
      type: String,
    },

    score: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.UserProject ||
  mongoose.model("UserProject", UserProjectSchema);
