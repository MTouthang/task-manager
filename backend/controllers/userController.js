const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validate field
  if ((!name || !email, !password)) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Exists");
  }

  // hashed password and create user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create([
    {
      name,
      email,
      password: hashedPassword,
    },
  ]);

  //   check if user is created
  if (user) {
    res.status(201).json({
      user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({ message: "Register User successful" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user successful" });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    message: "Current user data",
  });
});

module.exports = { registerUser, loginUser, getCurrentUser };
