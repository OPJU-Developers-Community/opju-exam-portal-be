const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  AdminAuth,
  validateAdminLogin,
  validateAdminSignup,
} = require("../../models/admin/auth.model");

async function adminSignup(req, res) {
  // Extracting the first name and the rest of the names from the 'name' property in the request body
  const [first_name,...last_nameParts] = req.body.name.split(' '); 
  // Joining the remaining parts of the name back together to reconstruct the last name
  const last_name = last_nameParts.join(' ');
  const data = {
    first_name,
    last_name,
    email:req.body.email,
    password: req.body.password,
  };
  const { value, error } = validateAdminSignup(data);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = value;
  try {
    // check user is already exits
    const existingUser = await AdminAuth.findOne({ email });

    if (existingUser) {
      // function get terminate after return statement
      return res
        .status(401)
        .json({ message: `${email} is already registered` });
    }

    // No existing user found
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new AdminAuth({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // create a token for user
    const token = jwt.sign(
      {
        userId: newUser._id,
        name: `${newUser.first_name} ${newUser.last_name}`,
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
        first_name: newUser.first_name ,
        last_name: newUser.last_name,
        email: newUser.email,
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

  const { email, password } = value;

  try {
    const existingUser = await AdminAuth.findOne({ email });

    // function get terminate after return statement
    if (!existingUser)
      return res.status(401).json({ message: `${email} not found` });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid)
      return res.status(401).json({ message: "Password Invalid" });

    const token = jwt.sign(
      {
        userId: existingUser._id,
        name: `${existingUser.first_name} ${existingUser.last_name}`,
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
        name: `${existingUser.first_name} ${existingUser.last_name}`,
        email: existingUser.email,
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
