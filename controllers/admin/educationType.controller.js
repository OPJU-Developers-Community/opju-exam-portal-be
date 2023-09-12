const Option = require('../../models/admin/educationType.model');

exports.getOptions = (req, res) => {
  const options = Option.getSchoolAndUniversityOptions();
  res.json(options);
};