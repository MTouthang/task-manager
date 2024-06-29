const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * create user
 */
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
      token: generateJwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * Login user
 */
const loginUser = asyncHandler(async (req, res) => {
  // validate email and password
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All field mandatory!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      user,
      token: generateJwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user.id);
  res.status(200).json({
    user,
  });
});

//   generate jwt token
const generateJwtToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: "5d" });

module.exports = { registerUser, loginUser, getCurrentUser };
