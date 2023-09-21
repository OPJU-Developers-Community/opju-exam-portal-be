const {
  AssesmentCoordinator,
  validateAssesmentCoordinator,
} = require("../../models/admin/users.model");
const { addUserToDB, getUsersFromDB } = require("./utils");

async function addUser(req, res) {
  const data = req.body;
  
  addUserToDB(req, res, data, AssesmentCoordinator, validateAssesmentCoordinator);
}

async function getUser(req, res) {
  getUsersFromDB(req, res, AssesmentCoordinator);
}

module.exports = {
  addUser,
  getUser,
};
