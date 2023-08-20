const express = require("express");
const {
  adminSignup,
  adminLogin,
} = require("../controllers/admin/auth.controller");
const {
  addUser,
  getUser,
} = require("../controllers/admin/usermanagement.controller");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.route("/user-management").post(addUser).get(getUser);

module.exports = router;
