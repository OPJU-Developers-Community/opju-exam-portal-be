const express = require("express");
const {
  adminSignup,
  adminLogin,
} = require("../controllers/admin/auth.controller");
const {
  addUser,
  getUser,
} = require("../controllers/admin/usermanagement.controller");
const optionsController = require("../controllers/admin/educationType.controller");
const {
  createEducation, getEducation,
} = require("../controllers/admin/educationmanagement.controller");
const getOptions = require("../controllers/admin/educationType.controller");

const router = express.Router();

// {DEV_DOMAIN}:{PORT}/api/admin/signup
router.post("/signup", adminSignup);

// {DEV_DOMAIN}:{PORT}/api/admin/login
router.post("/login", adminLogin);

// {DEV_DOMAIN}:{PORT}/api/admin/user-management
router.route("/user-management").post(addUser).get(getUser);

// {DEV_DOMAIN}:{PORT}/api/admin/education-management
router
  .route("/education-management")
  .post(createEducation)
  .get(getEducation);

router.get("/education-type", getOptions);

module.exports = router;
