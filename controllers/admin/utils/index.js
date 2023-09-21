const bcrypt = require("bcrypt");

async function addUserToDB(req, res, data, model, validate) {
  const { value, error } = validate(data);
  const { type } = req.query;

  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    email,
    password,
    firstname,
    lastname = "",
    profilePic = "",
    access,
  } = value;

  try {
    // check the user existence
    const existingUser = await model.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: `${email.toLowerCase()} is already exits` });
    }

    // No existing user found
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new model({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      profilePic,
      access,
      role: type,
    });

    await newUser.save();

    // create a object for response to client
    const response = {
      message: "User created successfully",
      data: {
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        profilePic: newUser.profilePic,
        access: newUser.access,
      },
    };

    res.status(200).json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
}

async function getUsersFromDB(req, res, model) {
  const { type } = req.query;

  try {
    const users = await model.find({ role: type }).select("-password");

    // create a object for response to client
    const response = {
      message: "success",
      data: users,
    };

    res.status(200).json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
}

module.exports = {
  addUserToDB,
  getUsersFromDB,
};
