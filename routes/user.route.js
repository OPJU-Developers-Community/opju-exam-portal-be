const express = require("express");

const { loginUser, registerUser } = require("../controllers/user.controller");

const router = express.Router();

// api/auth/register
router.post("/register", registerUser);

// api/auth/login
router.post("/login", loginUser);

module.exports = router;
