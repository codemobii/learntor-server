const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide course title!"],
    },

    courseCode: {
      type: String,
      unique: true,
    },

    institute: {
      type: String,
      required: [true, "No institution specified"],
    },

    instituteName: {
      type: String,
    },

    cover: {
      type: Object,
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
  mongoose.model.Courses || mongoose.model("Courses", CourseSchema);
