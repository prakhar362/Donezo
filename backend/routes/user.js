const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../db");
const router = express.Router();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Sign Up Route
router.post(
  "/signup",
  [
    body("userName").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("userEmail").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, userEmail, password } = req.body;
    try {
      const existingUser = await User.findOne({ userEmail });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ userName, userEmail, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  }
);

// Sign In Route
router.post(
  "/signin",
  [
    body("userEmail").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userEmail, password } = req.body;
    try {
      const user = await User.findOne({ userEmail });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ message: "Sign in successful", token });
    } catch (error) {
      res.status(500).json({ error: "Error signing in" });
    }
  }
);

module.exports = { userRouter: router };
