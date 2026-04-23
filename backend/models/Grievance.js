const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  user: String,
  title: String,
  description: String,
  category: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Grievance", grievanceSchema);