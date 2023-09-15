const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true,
  }
});


const Option = mongoose.model('Option',optionSchema);


module.exports = Option;

//static method
// optionSchema.statics.getSchoolAndUniversityOptions = function () {
//   return [
//     { name: 'school' },
//     { name: 'university' },
//   ];
// };