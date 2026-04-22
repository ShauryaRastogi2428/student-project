const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, course } = req.body;

  try {
    let user = await Student.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    user = new Student({ name, email, password: hashed, course });
    await user.save();

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Student.findById(req.user);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong old password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ msg: "Password updated" });
});

// UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  const { course } = req.body;

  const user = await Student.findById(req.user);
  user.course = course;
  await user.save();

  res.json({ msg: "Course updated" });
});

module.exports = router;