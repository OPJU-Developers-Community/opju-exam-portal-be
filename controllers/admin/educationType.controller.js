const Option = require("../../models/admin/educationType.model");

async function getOptions(req, res) {
  try {
    const data = await Option.find({})
    res.status(200).json({ success: true, message: "success", data });
  } 
  catch (error) {
    return res.status(500).json({message: "Internal Server Error!"});
  }
}
module.exports = getOptions;
