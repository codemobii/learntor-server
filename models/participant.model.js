const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },

    course: {
      type: String,
    },

    institute: {
      type: String,
      required: [true, "No institution specified"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model.Participant ||
  mongoose.model("Participant", ParticipantSchema);
