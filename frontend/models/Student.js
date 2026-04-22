const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  course: String
});

module.exports = mongoose.model("Student", studentSchema);