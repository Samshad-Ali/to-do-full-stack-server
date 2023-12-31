import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String, 
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    image:{
        id:String,
        url:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo-user',

    },
},{timestamps:true})

export const Note = mongoose.model('Todo-note',noteSchema)