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
  let { type, page, limit } = req.query;

  page = Number(page) || 1;
  limit = Number(limit) || 10;

  switch (type) {
    case "university":
      getEducationListForUniversity(res, education, page, limit);
      break;
    case "school":
      createEducationForSchool();
      break;
    default:
      return res.status(400).json({ message: `Invalid ${type} query` });
  }
}

async function getEducationListForUniversity(res, model, page, limit) {
  /**
   * page = 1
   * limit = 10
   *
   * then as per the formula
   * 1 - 1 * 10 = 0
   *
   * the list is start from 0
   *
   * and .limit(limit) where limit is 10
   * i.e start from 0 and ending at 10
   */
  const skipAmount = (page - 1) * limit;

  try {
    const educationList = await model.find({}).skip(skipAmount).limit(limit);
    const count = await model.countDocuments({});

    // create a object for response to client
    const response = {
      message: "success",
      count,
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
