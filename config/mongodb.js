const mongoose = require("mongoose");

function DBConnect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/opju-exam-portal", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
}

module.exports = DBConnect;
