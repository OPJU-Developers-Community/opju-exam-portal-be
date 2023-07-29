const {
  ProblemSetter,
  validateProblemSetter,
} = require("../../models/problemSetter.model");
const { Student, Faculty } = require("../../models/user.model");

// utils
const { registerUserInDatabase, generateUserToken } = require("./utils");

function registerUser(req, res) {
  const { value, error } = validateProblemSetter(req.body);

  if (error) res.status(400).json({ message: error.details[0].message });

  switch (value.role.toLowerCase()) {
    case "problemsetter":
      registerUserInDatabase(ProblemSetter, value, res);
      break;
    case "faculty":
      registerUserInDatabase(Faculty, value, res);
      break;
    case "student":
      registerUserInDatabase(Student, value, res);
      break;
    default:
      return res.status(400).json({ message: `${role} role not found` });
  }
}

function loginUser(req, res) {
  const { email, password, role } = req.body;

  // checking availability of every field
  if (!(email && password && role)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  switch (role) {
    case "problemsetter":
      generateUserToken(ProblemSetter, req.body, res);
      break;
    case "faculty":
      generateUserToken(Faculty, req.body, res);
      break;
    case "student":
      generateUserToken(Student, req.body, res);
      break;
    default:
      return res.status(400).json({ message: `${role} role not found` });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
