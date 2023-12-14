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

async function updateAssessmentCoordinator(req, res) {
  const { userId, ...updateData } = req.body;

  if (!userId) return res.status(401).json({ message: "user id not provided" });

  try {
    const user = await AssessmentCoordinator.findById(userId);

    if (!user)
      return res.status(401).json({ message: "user id does not exist" });

    const updateUserInfo = await AssessmentCoordinator.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, select: "-password" }
    );

    res.status(200).json({
      success: true,
      message: "user updated successfully'",
      data: updateUserInfo,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports = {
  addAssessmentCoordinator,
  getAssessmentCoordinator,
  updateAssessmentCoordinator,
};
