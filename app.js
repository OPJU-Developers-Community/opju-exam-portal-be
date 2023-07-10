const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes
const userRouter = require("./routes/user.route");
const DBConnect = require("./config/mongodb");

const PORT = 8000;

const app = express();
DBConnect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", userRouter);

app.listen(PORT || 8000, () => console.log(`Server running on PORT ${PORT}`));
