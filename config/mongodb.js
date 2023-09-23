const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@opju-exam-portal.hevosn5.mongodb.net/?retryWrites=true&w=majority`;

function DBConnect() {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
}

module.exports = DBConnect;
