const mongoose = require("mongoose");
require("dotenv").config();

function DBConnect() {
  mongoose
    .connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
}

module.exports = DBConnect;
