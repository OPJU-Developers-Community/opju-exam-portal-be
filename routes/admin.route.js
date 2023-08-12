const express = require("express");
const {
  adminSignup,
  adminLogin,
} = require("../controllers/admin/auth.controller");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

module.exports = router;
