const express = require("express");
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, setTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;
