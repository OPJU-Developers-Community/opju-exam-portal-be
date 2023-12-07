const ObjectId = require("mongoose").Types.ObjectId;
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

async function deleteAssessmentCoordinator(req, res) {
  
  try {
    const userId = req.body.userId;

    if (!userId) return res.status(401).json({message: `userId not provided`})

    if (!ObjectId.isValid(userId)) {
      return res.status(401).json({message: `Invalid userId ${userId}`});
    }
    const user = await AssessmentCoordinator.findById(userId);
    if (!user) {
      return res.status(404).json({message: `userId ${userId} does not exist`});
    }
    await AssessmentCoordinator.findByIdAndRemove(userId);
    return res.status(200).json({message: `user ${userId} successfully deleted`});
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
}

module.exports = {
  addAssessmentCoordinator,
  getAssessmentCoordinator,
  deleteAssessmentCoordinator,
};
