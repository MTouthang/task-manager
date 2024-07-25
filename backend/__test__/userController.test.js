const { json } = require("express");
const { registerUser } = require("../controllers/userController");

/**
 * Testing the User test setup
 */
jest.mock("../models/userModel", () => {
  // Mock User model
  const mockUser = {
    _id: "user-id",
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(mockUser),
  };
});

// Mock JWT and bcrypt
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mock-token"),
}));
const bcrypt = require("bcryptjs");
bcrypt.genSalt = jest.fn().mockResolvedValue("mock-salt");
bcrypt.hash = jest.fn().mockResolvedValue("mock-hashed-password");

// testing the user register success
test("should register a new user", async () => {
  const req = {
    body: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await registerUser(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
});

// test for missing value
test("should return a 400 error if any field is missing", async () => {
  const req = {
    body: {
      name: "John doe",
      email: "", // Missing email field intentionally
      password: "password",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await expect(registerUser(req, res)).rejects.toThrow(
    "All fields are mandatory"
  );
  expect(res.status).toHaveBeenCalledWith(400);
});
