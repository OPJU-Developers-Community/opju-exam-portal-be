const bcrypt = require("bcrypt");

async function addUserToDB(req, res, data, model, validate) {
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
      data: newUser,
    };

    res.status(201).json({ success: true, ...response });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error!");
  }
}

async function getUsersFromDB(req, res, model) {
  const { type, page, limit } = req.query;

  const skipAmount = page*limit - limit;

  try {
    switch (type) {
      case "all":
        const users = await model.find({}).skip(skipAmount).limit(limit).select("-password").sort("createdAt");
      
        const response = {
          message: "success",
          data: users,
        }

        return res.status(200).json({ success: true, ...response });
      
      case "question_setter":
      case "question_verifier":
      case "examiner":
         const users1 = await model.find({ user_type: type }).skip(skipAmount).limit(limit).select("-password").sort("createdAt");
  
        // create a object for response to client
        const response1 = {
          message: "success",
          data: users1,
        };
  
        return res.status(200).json({ success: true, ...response1 });
      
      default:
        return res.status(400).json({ message: `Invalid ${type} query` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error!");
  }
}

module.exports = {
  addUserToDB,
  getUsersFromDB,
};
