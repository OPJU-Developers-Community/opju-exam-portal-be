const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/user/user.controller");

const router = express.Router();

// api/auth/register
router.post("/register", registerUser);

// api/auth/login
router.post("/login", loginUser);

module.exports = router;
