const Joi = require("joi");
const mongoose = require("mongoose");

// schema define
const adminAuthSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
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
  },
  { timestamps: true }
);

// create model based on schema
// assign a name which can be use to access that model
const AdminAuth = mongoose.model("admin", adminAuthSchema);

// Joi validation
const validateAdminSignup = (reqBody) => {
  const schema = Joi.object({
    first_name: Joi.string().min(1).max(126).required(),
    last_name: Joi.string().min(0).max(126),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(reqBody);
};

// Joi validation
const validateAdminLogin = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(reqBody);
};

module.exports = { AdminAuth, validateAdminSignup, validateAdminLogin };
