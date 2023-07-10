const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
        return res.status(401).json({ message: "Student is already exits" });
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
        return res.status(401).json({ message: "Faculty is already exits" });
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
  const { email, password, role } = req.body;

  try {
    if (!(email && password && role)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // find the user based on role
    if (role === "student") {
      const existingUser = await Student.findOne({ email });

      if (!existingUser) {
        return res.status(401).json({ message: "User not found" });
      }

      // match the password
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password Invalid" });
      }

      const token = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role,
          username: existingUser.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      const user = {
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      };

      return res
        .status(200)
        .cookie("set_token", token, options)
        .json({ success: true, token, user });
    } else if (role === "faculty") {
      const existingUser = await Faculty.findOne({ email });

      if (!existingUser) {
        return res.status(401).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Password Invalid" });
      }

      const token = jwt.sign(
        {
          userId: existingUser._id,
          role: existingUser.role,
          username: existingUser.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      // set the token
      // existingUser.token = token;

      // send a cookie token
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      const user = {
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      };

      return res
        .status(200)
        .cookie("set_token", token, options)
        .json({ success: true, token, user });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
