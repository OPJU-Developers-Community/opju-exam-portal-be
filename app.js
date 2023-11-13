const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes
const adminRouter = require("./routes/admin.route");
// const userRouter = require("./routes/user.route");
// const programRouter = require("./routes/program.route");
// const questionRouter = require("./routes/question.route");

const DBConnect = require("./config/mongodb");

const PORT = 8000;

const app = express();
DBConnect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/admin", adminRouter);

// app.use("/api/auth", userRouter);
// app.use("/api", programRouter);
// app.use("/api", questionRouter);

app.listen(PORT || 8000, () => console.log(`Server running on PORT ${PORT}`));

module.exports = app;
