const {
  QuestionSetter,
  validateQuestionSetter,
} = require("../../models/admin/users.model");
const { addUserToDB, getUsersFromDB } = require("./utils");

async function addUser(req, res) {
  const { type } = req.query;
  const data = req.body;

  switch (type) {
    case "question_setter":
      addUserToDB(req, res, data, QuestionSetter, validateQuestionSetter);
      break;
    // case "question_verifier":
    // case "question_examiner":
    default:
      return res.status(400).json({ message: `invalid ${type} query` });
  }
}

async function getUser(req, res) {
  const { type } = req.query;

  switch (type) {
    case "question_setter":
      getUsersFromDB(req, res, QuestionSetter);
      break;
    // case "question_verifier":
    // case "question_examiner":
    default:
      return res.status(400).json({ message: `invalid ${type} query` });
  }
}

module.exports = {
  addUser,
  getUser,
};
