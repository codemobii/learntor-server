const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },

    module: {
      type: String,
    },

    course: {
      type: String,
    },

    result: {
      type: Array,
    },

    score: {
      type: Number,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.Result || mongoose.model("Result", ResultSchema);
