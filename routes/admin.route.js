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
/**
 * @description Register a new admin user
 * @route POST /admin-signup
 * @access Public
 * 
 * @requestBody {Object}
 * @property {string} name - name of the admin
 * @property {string} email - Email address for the admin
 * @property {string} password - Password for the admin
 * 
 * @return {object} Response with status code, success flag, and user data if successful
 */
// {DEV_DOMAIN}:{PORT}/api/admin/login
router.post("/login", adminLogin);
/**
 * @description Authenticate and log in an admin user
 * @route POST /admin-login
 * @access Public
 * 
 * @requestBody {Object}
 * @property {string} email - Email address of the admin
 * @property {string} password - Password for the admin
 * 
 * @return {object} Response with status code, success flag, and user data with token if successful
 */


// {DEV_DOMAIN}:{PORT}/api/admin/user-management
router.route("/user-management").post(addUser).get(getUser);

// {DEV_DOMAIN}:{PORT}/api/admin/education-management
router
  .route("/education-management")
  .post(createEducation)
  .get(getEducation);

router.get("/education-type", getOptions);

module.exports = router;
