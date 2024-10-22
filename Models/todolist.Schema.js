import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
            },
            completed:{
                type:Boolean,
                default:false
                }
    },
    {
        timestamps:true,
    }
);
const TODO = mongoose.model('TODO', todoSchema);
export default TODO