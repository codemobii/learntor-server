const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
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

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    disabled: {
      type: Boolean,
      default: 0,
    },

    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.Project || mongoose.model("Project", ProjectSchema);
