const Joi = require("joi");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
  },
  questionType: {
    type: String,
    enum: ['multipleChoice', 'shortAnswer'],
  },
  choices: {
    type: [String], // For multiple choice questions
  },
  correctChoice: {
    type: String, // For multiple choice questions
  },
  answer: {
    type: String, // For short answer questions
  },
});

const Question = mongoose.model("questions", questionSchema);

const questionTypes = ['multipleChoice', 'shortAnswer'];

const validateQuestion = (question) => {
  const schema = Joi.object({
    questionText: Joi.string().min(5).required(),
    questionType: Joi.string().valid(...questionTypes).required(),
    choices: Joi.when("questionType", {
      is: 'multipleChoice',
      then: Joi.array().items(Joi.string().required()).min(2).required(),
    }),
    correctChoice: Joi.when("questionType", {
      is: 'multipleChoice',
      then: Joi.string().required(),
    }),
    answer: Joi.when("questionType", {
      is: 'shortAnswer',
      then: Joi.string().required(),
    }),
  });

  return schema.validate(question);
};

module.exports = { Question, validateQuestion };
