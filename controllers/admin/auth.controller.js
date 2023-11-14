const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  AdminAuth,
  validateAdminLogin,
  validateAdminSignup,
} = require("../../models/admin/auth.model");

async function adminSignup(req, res) {
  const { value, error } = validateAdminSignup(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, email_id, password } = value;

  try {
    // check user is already exits
    const existingUser = await AdminAuth.findOne({ email_id });

    if (existingUser) {
      // function get terminate after return statement
      return res
        .status(401)
        .json({ message: `${email_id} is already registered` });
    }

    // No existing user found
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new AdminAuth({
      username,
      email_id,
      password: hashedPassword,
    });
    await newUser.save();

    // create a token for user
    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
      },
      process.env.SECRET_KEY
    );

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // create a object for response to client
    const response = {
      message: "Signup successfully",
      data: {
        username: newUser.username,
        email_id: newUser.email_id,
        token,
      },
    };

    res
      .status(201)
      .cookie("set_token", token, options)
      .json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json({ message: "Failed to register user", err });
  }
}

async function adminLogin(req, res) {
  const { value, error } = validateAdminLogin(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email_id, password } = value;

  try {
    const existingUser = await AdminAuth.findOne({ email_id });

    // function get terminate after return statement
    if (!existingUser)
      return res.status(401).json({ message: `${email_id} not found` });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid)
      return res.status(401).json({ message: "Password Invalid" });

    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username,
      },
      process.env.SECRET_KEY
    );

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    const response = {
      message: "Logged in successfully",
      data: {
        username: existingUser.username,
        email_id: existingUser.email_id,
        token,
      },
    };
    res
      .status(200)
      .cookie("set_token", token, options)
      .json({ success: true, response });
  } catch (err) {
    return res.status(500).json({ message: "Failed to login user", err });
  }
}

module.exports = {
  adminSignup,
  adminLogin,
};
