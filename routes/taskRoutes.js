const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes (Missing PUT route)
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
