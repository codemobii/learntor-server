const mongoose = require("mongoose");

const UserCourseSchema = new mongoose.Schema(
  {
    course: {
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
