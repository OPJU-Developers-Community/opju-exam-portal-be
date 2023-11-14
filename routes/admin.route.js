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
  createEducation,
  getEducation,
} = require("../controllers/admin/education.controller");
const getOptions = require("../controllers/admin/educationType.controller");

const router = express.Router();

// {DEV_DOMAIN}:{PORT}/api/admin/signup
router.post("/signup", adminSignup);

// {DEV_DOMAIN}:{PORT}/api/admin/login
router.post("/login", adminLogin);

// {DEV_DOMAIN}:{PORT}/api/admin/user-management
router.post("/create-user", addUser);
router.get("/get-user", getUser);


/**
 * @description Create an education for univeristy or school
 * @route POST /create-education
 * @access Private
 * 
 * @param {string} type - Type of education univeristy or school
 * 
 * @requestBody {Object}
 * @property {string} program
 * @property {string} course
 * @property {string} branch
 * @property {number} semester
 * @property {array{string}} subjects
 * 
 * @return {object} A Response having status code and a message
 */
router.post("/create-education", createEducation);

/**
 * @description Get list of education for universities or schools
 * @route GET /get-education-list
 * @access Private
 * 
 * @param {string} type - Type of education univeristy or school
 * @param {number} page - Page number for pagination
 * @param {number} limit - The number of items per page in the list
 * 
 * @return {object} Response having status code, message and data (number of items per page in the list)
 */
router.get("/get-education-list", getEducation);

// router.get("/education-type", getOptions);

module.exports = router;
