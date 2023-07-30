const express = require("express");
const createProgram = require("../controllers/program/program.controller");

const router = express.Router();

router.post("/create-program", createProgram);
router.post("/create-question", () => {});

module.exports = router