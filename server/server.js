// server/server.js

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("./passport"); // Import the passport setup

const app = express();

// Middleware setup
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable CORS for React frontend
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect("mongodb://localhost/your-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
