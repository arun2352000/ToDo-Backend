import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../Controllers/todo.Controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/todos', authenticateToken, createTodo); // Protected
router.get('/todos', authenticateToken, getTodo); // Protected
router.put('/todos/:id', authenticateToken, updateTodo); // Protected
router.delete('/todos/:id', authenticateToken, deleteTodo); // Protected

export default router;