const Joi = require("joi");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  programId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  answer: [
    {
      type: String,
      required: true,
    },
  ],
});

const Question = mongoose.model("questions", questionSchema);

const questionTypes = ["mcq", "fillintheblanks", "truefalse"];

const validateQuestion = (question) => {
  const schema = Joi.object({
    programId: Joi.string().required(),
    text: Joi.string().min(5).required(),
    type: Joi.string()
      .valid(...questionTypes)
      .required(),
    options: Joi.when("type", {
      is: questionTypes[0],
      then: Joi.array().items(Joi.string().required()).min(2).required(),
    }).when("type", {
      is: questionTypes[2],
      then: Joi.array().items(Joi.string().required()).min(2).required(),
    }),
    answer: Joi.array().items(Joi.string().required()).min(1).required(),
  });

  return schema.validate(question);
};

module.exports = { Question, validateQuestion };
