const { Question, validateQuestion } = require("../../models/question.model");

const validateProgramId = require("./utils");

const createQuestion = async (req, res) => {
  const { value, error } = validateQuestion(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newQuestion = new Question({
      ...value,
    });

    await newQuestion.save();
    res.status(201).json({ message: "question created" });
  } catch (err) {
    return res.status(500).json({ message: "failed to create question", err });
  }
};

const getQuestionsByProgramId = (req, res) => {
  const { value, error } = validateProgramId(req.body);
  console.log(value, error);
};

module.exports = {
  createQuestion,
  getQuestionsByProgramId,
};
