const mongoose = require("mongoose");

const UserCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide course title!"],
    },

    courseCode: {
      type: String,
    },

    course: {
      type: String,
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
    progress: {
      typer: Number,
      default: 0,
    },
    done: {
      typer: Boolean,
      default: false,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.UserCourse || mongoose.model("UserCourse", UserCourseSchema);
