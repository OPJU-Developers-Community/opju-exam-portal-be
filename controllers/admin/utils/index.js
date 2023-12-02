const bcrypt = require("bcrypt");

const USER_TYPES = ["question_setter", "question_verifier", "examiner", "all"];

async function addUserToDB(res, data, model, validate) {
  const { value, error } = validate(data);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    first_name,
    last_name = "",
    email_id,
    password,
    profile_pic = "",
    subject_access,
    user_type,
  } = value;

  try {
    // check the user existence
    const existingUser = await model.findOne({ email_id });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: `${email_id.toLowerCase()} is already exits` });
    }

    // No existing user found
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new model({
      first_name,
      last_name,
      email_id,
      password: hashedPassword,
      profile_pic,
      subject_access,
      user_type,
    });

    await newUser.save();

    // create a object for response to client
    const response = {
      message: "User created successfully",
      data: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email_id: newUser.email_id,
        profile_pic: newUser.profile_pic,
        subject_access: newUser.subject_access,
        user_type: newUser.user_type,
      },
    };

    res.status(201).json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
}

async function getUsersFromDB(req, res, model) {
  const { type, page, limit } = req.query;

  if (!USER_TYPES.includes(type)) {
    return res.status(400).json({ message: `Invalid ${type} query` });
  }

  try {
    const skipAmount = page * limit - limit;

    const users = await model
      .find({ user_type: type })
      .skip(skipAmount)
      .limit(limit)
      .select("-password")
      .sort("createdAt");
    const count = await model.countDocuments({ user_type: type });

    // create a object for response to client
    const response = {
      message: "success",
      count,
      data: users,
    };

    return res.status(200).json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
}

async function deleteUserFromDB(req, res, model) {
  const { userId } = req.params;

  try {
    const deletedUser = await model.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // create a object for response to client
    const response = {
      message: "User deleted successfully",
      data: {
        first_name: deletedUser.first_name,
        last_name: deletedUser.last_name,
        email_id: deletedUser.email_id,
        profile_pic: deletedUser.profile_pic,
        subject_access: deletedUser.subject_access,
        user_type: deletedUser.user_type,
      },
    };

    return res.status(200).json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
}

module.exports = {
  addUserToDB,
  getUsersFromDB,
  deleteUserFromDB
};
