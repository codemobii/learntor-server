const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema(
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

    module: {
      type: String,
    },

    video: {
      type: String,
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

module.exports = mongoose.model.Unit || mongoose.model("Unit", UnitSchema);
