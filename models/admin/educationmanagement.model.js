const Joi = require("joi");
const mongoose = require("mongoose");

// schema define
const educationManagementSchema = new mongoose.Schema(
  {
    program_name: {
      type: String,
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

// create model based on schema
// assign a name which can be use to access that model
const educationManagementUniversity = mongoose.model(
  "education_management_university",
  educationManagementSchema
);

const validateUniversityEducationRequestBody = (reqBody) => {
  const schema = Joi.object({
    program_name: Joi.string().max(126).required(),
    course_name: Joi.string().max(126).required(),
    branch: Joi.string(),
    semester: Joi.string(),
    subjects: Joi.array().items(Joi.string().required()).min(1).required(),
  });

  return schema.validate(reqBody);
};

module.exports = {
  educationManagementUniversity,
  validateUniversityEducationRequestBody,
};
