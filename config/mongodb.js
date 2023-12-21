const mongoose = require("mongoose");

async function DBConnect() {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.ENVIRONMENT === "dev"
        ? "mongodb://localhost:27017"
        : `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`DB CONNECTED, HOST: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log("ERROR IN DB CONNECTION: ", err);
    process.exit(1);
  }
}

module.exports = DBConnect;
