// TODO: to write custom async handler
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please enter a task");
  }

  const task = await Task.create({
    text: req.body.text,
  });
  res.status(200).json({
    message: "create task",
    task,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
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

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new Error("text task not available");
  }
  await Task.findByIdAndDelete({
    _id: req.params.id,
  });
  res.status(200).json({
    message: `Task ${req.params.id} deleted`,
  });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
