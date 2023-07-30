const express = require("express");

const {
  createQuestion,
} = require("../controllers/question/question.controller");

const router = express.Router();

// create question
router.post("/create-question", createQuestion);
// edit question
// delete question

module.exports = router;
