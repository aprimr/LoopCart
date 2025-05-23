import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "../config/dotenv.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      fullName,
      email,
      password,
      profilePic,
      role: "user",
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = (req, res) => {
  res.status(200).json(req.user);
};

export { login, signup, getUser };
