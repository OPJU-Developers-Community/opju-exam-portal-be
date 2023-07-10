const express = require("express");

const PORT = 8000;

const app = express();

app.use("/api/auth", () => {});

app.listen(PORT || 8000, () => console.log(`Server running on PORT ${PORT}`));
