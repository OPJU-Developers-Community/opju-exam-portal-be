const Joi = require("joi");
const mongoose = require("mongoose");

// schema define
const adminAuthSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// create model based on schema
// assign a name which can be use to access that model
const AdminAuth = mongoose.model("admin_auth", adminAuthSchema);

// Joi validation
const validateAdminSignup = (reqBody) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(126).required(),
    email_id: Joi.string().email_id().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(reqBody);
};

// Joi validation
const validateAdminLogin = (reqBody) => {
  const schema = Joi.object({
    email_id: Joi.string().email_id().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(reqBody);
};

module.exports = { AdminAuth, validateAdminSignup, validateAdminLogin };
