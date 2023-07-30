const Program = require("../../models/program.model");

async function createProgram(req, res) {
  const { program, stream, course, topic, questionType } = req.body;

  // checking availability of all fields
  if (!(program && stream && course && topic && questionType)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProgram = new Program(req.body);
    await newProgram.save();
    res.status(201).json({ message: "Program successfully created" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to create program", err });
  }
}

module.exports = createProgram;
