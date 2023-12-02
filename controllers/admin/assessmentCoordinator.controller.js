const {
  AssesmentCoordinator,
  validateAssesmentCoordinator,
} = require("../../models/admin/assessmentCoordinator.model");
const { addUserToDB, getUsersFromDB, deleteUserFromDB } = require("./utils");

async function addAssessmentCoordinator(req, res) {
  const data = req.body;

  addUserToDB(res, data, AssesmentCoordinator, validateAssesmentCoordinator);
}

async function getAssessmentCoordinator(req, res) {
  getUsersFromDB(req, res, AssesmentCoordinator);
}

async function deleteAssessmentCoordinator(req, res) {
  deleteUserFromDB(req, res, AssesmentCoordinator);
}

module.exports = {
  addAssessmentCoordinator,
  getAssessmentCoordinator,
  deleteAssessmentCoordinator,
};