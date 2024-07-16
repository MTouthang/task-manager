// TODO: to write custom async handler
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

/**
 * fetch the tasks
 */
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
});

/**
 * create tasks
 */
const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please enter a task");
  }

  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({
    message: "create task",
    task,
  });
});

/**
 * Update the task --
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("No such user found");
  }

  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user is not authorized to update");
  }

  if (!task) {
    res.status(400);
    throw new Error(`Task not found`);
  }

  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: `Task ${req.params.id} updated`,
    updateTask,
  });
});

/**
 * Delete task
 */
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("No such users found");
  }

  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized to update");
  }

  if (!task) {
    throw new Error("text task not available");
  }
  await Task.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
