const Joi = require("joi");
const mongoose = require("mongoose");

// schema define
const educationSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
    education_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create model based on schema
// assign a name which can be use to access that model
const education = mongoose.model("education", educationSchema);

const validateEducationRequestBody = (reqBody) => {
  const schema = Joi.object({
    program: Joi.string().max(126).required(),
    course: Joi.string().max(126).required(),
    branch: Joi.string(),
    semester: Joi.number(),
    subjects: Joi.array().items(Joi.string().required()).min(1).required(),
    education_type: Joi.string().required(),
  });

  return schema.validate(reqBody);
};

module.exports = {
  education,
  validateEducationRequestBody,
};
