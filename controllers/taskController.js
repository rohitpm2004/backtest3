const Task = require('../models/Task');

// POST /api/tasks - Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/tasks - Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/tasks/:id - Get task by ID (Missing ObjectId.isValid validation check)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    // Unhandled CastError will produce generic 500 error instead of 400
    res.status(500).json({ error: err.message });
  }
};

// INTENTIONALLY OMITTED: updateTask (PUT /api/tasks/:id)
// Missing update endpoint to test evaluator deduction on API endpoints criteria.

// DELETE /api/tasks/:id - Delete task by ID (Missing ObjectId.isValid check)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
