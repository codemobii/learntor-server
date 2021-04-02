const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    comment: {
      type: String,
    },

    unit: {
      type: String,
    },

    module: {
      type: String,
    },

    course: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.Comment || mongoose.model("Comment", CommentSchema);
