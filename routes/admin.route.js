const express = require("express");
const {
  adminSignup,
  adminLogin,
} = require("../controllers/admin/auth.controller");
const {
  addAssessmentCoordinator,
  getAssessmentCoordinator,
  updateAssessmentCoordinator,
} = require("../controllers/admin/assessmentCoordinator.controller");
const optionsController = require("../controllers/admin/educationType.controller");
const {
  createEducation,
  getEducation,
} = require("../controllers/admin/education.controller");
// const getOptions = require("../controllers/admin/educationType.controller");

const router = express.Router();

/**
 * @description Register a new user as admin
 * @route POST /signup
 * @access Public
 *
 * @requestBody {Object}
 * @property {string} name - name of the admin
 * @property {string} email - Email address for the admin
 * @property {string} password - Password for the admin
 *
 * @return {object} Response with status code, success flag, and user data if successful
 */
router.post("/signup", adminSignup);

/**
 * @description Authenticate and log in an admin user
 * @route POST /login
 * @access Public
 *
 * @requestBody {Object}
 * @property {string} email - Email address of the admin
 * @property {string} password - Password for the admin
 *
 * @return {object} Response with status code, success flag, and user data with token if successful
 */
router.post("/login", adminLogin);

/**
 * @description Create Assessment Coordinator
 * @route POST /create-assessment-coordinator
 * @access Private
 *
 * @requestBody {Object}
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email_id
 * @property {string} password
 * @property {string} profile_pic
 * @property {array{string}} subject_access
 * @property {string} user_type
 *
 * @return {object} A Response having status code and a message
 */

router.post("/create-assessment-coordinator", addAssessmentCoordinator);

/**
 * @description Get list assessment coordinator
 * @route GET /get-assessment-coordinator
 * @access Private
 *
 * @param {string} type - Type of assessment coordinator
 * @param {number} page - Page number for pagination
 * @param {number} limit - The number of items per page in the list
 *
 * @return {object} Response having status code, message and data (number of items per page in the list)
 */
router.get("/get-assessment-coordinator", getAssessmentCoordinator);

/**
 * @description Edit assessment coordinator
 * @route PATCH /edit-assessment-coordinator
 * @access Private
 *
 * @requestBody {Object}
 * @property {string} userId
 * @property {any} data that going to update
 *
 * @returns {object} Response having status code, message and updated user data.
 */
router.patch("/edit-assessment-coordinator", updateAssessmentCoordinator);

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
