const mongoose = require("mongoose");
const Joi = require("joi");

// schema define
const assesmentCoordinatorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    access: {
      type: Array,
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
const AssesmentCoordinator = mongoose.model("assesment_coordinator", assesmentCoordinatorSchema);

// Joi validation
const validateAssesmentCoordinator = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstname: Joi.string().min(3).max(126).required(),
    lastname: Joi.string().min(3),
    profilePic: Joi.string(),
    access: Joi.array().items(Joi.string().required()).min(1).required(),
  });

  return schema.validate(reqBody);
};

module.exports = {
  AssesmentCoordinator,
  validateAssesmentCoordinator,
};
