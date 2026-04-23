const express = require("express");
const router = express.Router();
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

// CREATE
router.post("/", auth, async (req, res) => {
  const data = new Grievance(req.body);
  await data.save();
  res.send(data);
});

// GET ALL
router.get("/", auth, async (req, res) => {
  const data = await Grievance.find();
  res.json(data);
});

// GET BY ID
router.get("/:id", auth, async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const data = await Grievance.findByIdAndUpdate(req.params.id, req.body);
  res.send(data);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// SEARCH
router.get("/search/title", auth, async (req, res) => {
  const q = req.query.title;
  const data = await Grievance.find({ title: { $regex: q } });
  res.json(data);
});

module.exports = router;