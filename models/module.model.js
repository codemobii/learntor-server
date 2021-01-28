const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide course title!"],
    },

    course: {
      type: String,
    },

    institute: {
      type: String,
      required: [true, "No institution specified"],
    },

    video: {
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
  mongoose.model.Modules || mongoose.model("Modules", ModuleSchema);
