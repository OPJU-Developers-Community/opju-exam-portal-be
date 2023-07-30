const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Program = mongoose.model("programs", programSchema);

module.exports = Program

