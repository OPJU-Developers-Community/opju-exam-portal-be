const {
  AssessmentCoordinator,
  validateAssessmentCoordinator,
} = require("../../models/admin/assessmentCoordinator.model");
const { addUserToDB, getUsersFromDB } = require("./utils");

async function addAssessmentCoordinator(req, res) {
  const data = req.body;

  addUserToDB(res, data, AssessmentCoordinator, validateAssessmentCoordinator);
}

async function getAssessmentCoordinator(req, res) {
  getUsersFromDB(req, res, AssessmentCoordinator);
}

module.exports = {
  addAssessmentCoordinator,
  getAssessmentCoordinator,
};
