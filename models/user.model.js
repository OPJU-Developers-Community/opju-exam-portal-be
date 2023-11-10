const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email_id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const facultySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email_id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("students", studentSchema);
const Faculty = mongoose.model("faculties", facultySchema);

module.exports = {
  Student,
  Faculty,
};
