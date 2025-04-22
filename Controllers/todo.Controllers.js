import TODO from "../Models/todolist.Schema.js";

export const createTodo = async (req, res) => {
    try {
      const { title, description } = req.body;
      const newTodo = new TODO({ title, description, userId: req.user.id }); // Add userId from the token
      await newTodo.save();
      res.status(201).json({ message: "Todo created successfully", data: newTodo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating todo", error });
    }
  }
  export const getTodo = async (req, res) => {
    try {
      const todos = await TODO.find({ userId: req.user.id }); // Filter by userId
      res.status(200).json({ message: "Todos fetched successfully", data: todos });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching todos", error });
    }
  };

  export const updateTodo = async (req, res) => {
    try {
      const todoId = req.params.id;
      const { title, description, completed } = req.body;
  
      const todo = await TODO.findOne({ _id: todoId, userId: req.user.id }); // Check ownership
      if (!todo) {
        return res.status(404).json({ message: "Todo not found or unauthorized" });
      }
  
      todo.title = title || todo.title;
      todo.description = description || todo.description;
      todo.completed = completed !== undefined ? completed : todo.completed;
  
      await todo.save();
      res.status(200).json({ message: "Todo updated successfully", data: todo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating todo", error });
    }
  };

  export const deleteTodo = async (req, res) => {
    try {
      const todoId = req.params.id;
  
      const result = await TODO.deleteOne({ _id: todoId, userId: req.user.id }); // Check ownership
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Todo not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting todo", error });
    }
  };