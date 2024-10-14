import TODO from "../Models/todolist.Schema.js";

export const createTodo =async(req,res) =>{
    try {
         const {title,description} = req.body;
         const newTodo = new TODO({title,description});
         await newTodo.save();
         res.status(201).json({message:"Todo created successfully",data:newTodo});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error creating todo",error});
    }
}
export const getTodo = async(req,res)=>{
    try {
        const todos = await TODO.find();
        res.status(200).json({message:"Todos fetched successfully",data:todos});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Error fetching todos",error});
            }
}

export const updateTodo = async(req,res) =>{
    try {
        const todoId = req.params.id
        const {title,description,completed}=req.body
        const result = await TODO.updateOne({_id:todoId},{title,description,completed} )
        if (result.matchedCount === 0){
            return res.status(404).json({message:"Todo not found",error});
        }
        const updatedTodo = await TODO.findById(todoId)
        res.status(200).json({message:"Todo updated successfully",data:updatedTodo})
 } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error updating todo",error});

    }
}

export const deleteTodo = async(req,res) =>{
    try {
        const todoId = req.params.id
        const {title, description, completed} = req.body
        const result = await TODO.deleteOne({_id:todoId})
        if (result.deletedCount === 0){
            return res.status(404).json({message:"Todo not found",error});
            }
            res.status(204).json({message:"Todo deleted successfully",data:result}).end();
        
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Error deleting todo",error});

        }
    }