const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*"
}));

// 🔥 TEST ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀"
  });
});

// Routes
app.use("/api", require("./routes/authRoutes"));

// MongoDB Connection (IMPORTANT FIXED)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));

// Render PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});