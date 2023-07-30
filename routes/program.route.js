const express = require("express");
const createProgram = require("../controllers/program/program.controller");

const router = express.Router();

// create program
router.post("/create-program", createProgram);
// edit program
// delete program

module.exports = router;
