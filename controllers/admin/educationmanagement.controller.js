const {
  educationManagementUniversity,
  validateUniversityEducationRequestBody,
} = require("../../models/admin/educationmanagement.model");

function createEducation(req, res) {
  const { type } = req.query;
  const data = req.body;

  switch (type) {
    case "university":
      createEducationForUniversity(
        res,
        data,
        educationManagementUniversity,
        validateUniversityEducationRequestBody
      );
      break;
    case "school":
      createEducationForSchool();
      break;
    default:
      return res.status(400).json({ message: `Invalid ${type} query` });
  }
}

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

async function createEducationForUniversity(res, data, model, validatorFn) {
  const { value, error } = validatorFn(data);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newEducation = new model(value);
    await newEducation.save();

    // create a object for response to client
    const response = {
      message: "Education created successfully",
      data: [],
    };

    res.status(200).json({ success: true, ...response });
  } catch (err) {
    return res.status(500).json("Internal Server Error!");
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
