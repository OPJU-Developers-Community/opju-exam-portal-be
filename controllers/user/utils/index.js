const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUserInDatabase = async (userModel, user, res) => {
  const { username, email, password, role } = user;

  try {
    // check user is already exits
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      // function get terminate after return statement
      return res
        .status(401)
        .json({ message: `${role.toLowerCase()} is already exits` });
    }

    // No existing user found
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to register user", err });
  }
};

const generateUserToken = async (userModel, user, res) => {
  const { email, password, role } = user;

  try {
    // checking existence of user in database
    const existingUser = await userModel.findOne({ email });

    // if user not exit
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: `${role.toLowerCase()} not found` });
    }

    // if user found
    // match the password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password Invalid" });
    }

    // if password match
    // create a token for user
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

    // create a user object for response to client
    const user = {
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    };

    res
      .status(200)
      .cookie("set_token", token, options)
      .json({ success: true, token, user, message: "Logged in successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
};

module.exports = {
  registerUserInDatabase,
  generateUserToken,
};
