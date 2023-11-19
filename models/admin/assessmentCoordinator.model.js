const mongoose = require("mongoose");
const Joi = require("joi");

// schema define
const assesmentCoordinatorSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
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
    profile_pic: {
      type: String,
    },
    subject_access: {
      type: Array,
    },
    user_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create model based on schema
// assign a name which can be use to access that model
const AssesmentCoordinator = mongoose.model(
  "assesment_coordinator",
  assesmentCoordinatorSchema
);

// Joi validation
const validateAssesmentCoordinator = (reqBody) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(126).required(),
    last_name: Joi.string().min(3),
    email_id: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profile_pic: Joi.string(),
    subject_access: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required(),
    user_type: Joi.string().required(),
  });

  return schema.validate(reqBody);
};

module.exports = {
  AssesmentCoordinator,
  validateAssesmentCoordinator,
};
