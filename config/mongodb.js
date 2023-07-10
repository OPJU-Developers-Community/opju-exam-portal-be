const mongoose = require("mongoose");

function DBConnect() {
  mongoose
    .connect("mongodb://localhost:27017/opju-exam-portal", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
}

module.exports = DBConnect;
