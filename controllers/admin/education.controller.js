const {
  education,
  validateEducationRequestBody,
} = require("../../models/admin/education.model");

// POST
function createEducation(req, res) {
  const { type } = req.query;
  const data = req.body;

  switch (type) {
    case "university":
      createEducationForUniversity(
        res,
        data,
        education,
        validateEducationRequestBody
      );
      break;
    case "school":
      createEducationForSchool();
      break;
    default:
      return res.status(400).json({ message: `Invalid ${type} query` });
  }
}

async function createEducationForUniversity(res, data, model, validatorFn) {
  const { value, error } = validatorFn(data);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newEducation = new model(value);
    await newEducation.save();

    // create a object for response to client
    const response = {
      message: "you have successfully created an education.",
    };

    res.status(201).json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
  }
}

// GET
function getEducation(req, res) {
  const { type } = req.query;

  switch (type) {
    case "university":
      getEducationListForUniversity(res, educationManagementUniversity);
      break;
    case "school":
      createEducationForSchool();
      break;
    default:
      return res.status(400).json({ message: `Invalid ${type} query` });
  }
}

async function getEducationListForUniversity(res, model) {
  try {
    const educationList = await model.find({});

    // create a object for response to client
    const response = {
      message: "success",
      data: educationList,
    };

    res.status(200).json({ success: true, ...response });
  } catch (error) {
    return res.status(500).json("Internal Server Error!");
  }
}

module.exports = {
  createEducation,
  getEducation,
};
