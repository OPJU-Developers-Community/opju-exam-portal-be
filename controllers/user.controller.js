const bcrypt = require("bcrypt");
const { Student, Faculty } = require("../models/user.model");

// api/auth/register
async function registerUser(req, res) {
  const { username, email, password, role } = req.body;

  try {
    // check the role
    // check if the user already exits
    if (role === "student") {
      const existingUser = await Student.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Student is already exits" });
      }

      // No existing user found
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a new user
      const newUser = new Student({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
      return res.status(201).json({ message: "Registered successfully" });
    } else if (role === "faculty") {
      const existingUser = await Faculty.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "Faculty is already exits" });
      }

      // No existing user found
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a new user
      const newUser = new Faculty({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
      return res.status(201).json({ message: "Registered successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Failed to register user", err });
  }
}

// api/auth/login
async function loginUser(req, res) {
  const { email, password } = req.body;
}

module.exports = {
  registerUser,
  loginUser,
};
