const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "No question specified!"],
    },

    module: {
      type: String,
    },

    answer: {
      type: String,
    },

    options: {
      type: Array,
      required: [true, "Options required"],
    },

    disabled: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.Exercise || mongoose.model("Exercise", ExerciseSchema);
