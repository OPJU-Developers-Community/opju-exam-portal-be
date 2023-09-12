const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: String,
});
//static method
optionSchema.statics.getSchoolAndUniversityOptions = function () {
  return [
    { name: 'school' },
    { name: 'university' },
  ];
};

const Option = mongoose.model('Option',optionSchema);


module.exports = Option;