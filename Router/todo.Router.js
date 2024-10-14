import express from 'express'
import { createTodo, deleteTodo, getTodo, updateTodo } from '../Controllers/todo.Controllers.js'

const router=express.Router()

router.post('/createTodo',createTodo)
router.get('/getalltodo',getTodo)
router.put('/updateTodo/:id',updateTodo)
router.delete('/deleteTodo/:id',deleteTodo)
export default router;