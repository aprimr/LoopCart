import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "../config/dotenv.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // check if password is correct
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only set secure in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Using lax locally
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // send response
    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      isVerified: user.isVerified,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create user without profile pic
    const userData = {
      fullName,
      email,
      password,
      role: "user",
    };
    // add profile pic if provided
    if (profilePic) {
      userData.profilePic = profilePic;
    }
    // save user
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    // fetch user and check if it exists
    // exclude sensitive fields from response
    const user = await User.findById(req.user.id).select(
      "-password -userVerificationOTP -userVerificationOTPExpireAt -userResetPasswordOTP -userResetPasswordOTPExpireAt"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { login, signup, getUser, logout };
