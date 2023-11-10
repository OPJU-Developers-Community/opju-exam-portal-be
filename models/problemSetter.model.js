const Joi = require("joi");
const mongoose = require("mongoose");

// Schema define
const problemSetterSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email_id: {
      type: String,
      unique: true,
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

// create model based on schema
// assign a name which can be use to access that model
const ProblemSetter = mongoose.model("problem_setter", problemSetterSchema);

// Joi validation
const validateProblemSetter = (problemSetter) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(126).required(),
    email_id: Joi.string().email_id().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });

  return schema.validate(problemSetter);
};

module.exports = { ProblemSetter, validateProblemSetter };
