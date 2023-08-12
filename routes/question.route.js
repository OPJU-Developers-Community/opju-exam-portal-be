const express = require("express");

const {
  createQuestion,
  getQuestionsByProgramId,
} = require("../controllers/question/question.controller");

const router = express.Router();

// create question
router.post("/create-question", createQuestion);
// get respected program questions
router.get("/questions-by-program", getQuestionsByProgramId);
// edit question
// delete question

module.exports = router;
