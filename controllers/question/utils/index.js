const Joi = require("joi");

const validateProgramId = (data) => {
  const schema = Joi.object({
    programId: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = validateProgramId;
