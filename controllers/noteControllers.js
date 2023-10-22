import { Note } from "../models/Note.js";
import { errorResponse, successResponse } from "../responseWrapper.js"
import {v2 as cloudinary} from 'cloudinary';

export const getNotes=async(req,res)=>{
    try {
        const userId = req.user._id;
        const allNotes = (await Note.find({user:userId})).reverse();
        return res.send(successResponse(201,allNotes))
    } catch (error) {
       return res.send(errorResponse(501,error.message))
    }
}


export const createNotes=async(req,res)=>{
    try {
        const {title,description,img} = req.body;
        if(!title || !description){
            return res.send(errorResponse(404,"All fields are required"))
        }
        if(img){
            const cloudImage = await cloudinary.uploader.upload(img,{
                folder:"to-do-image"
            })
            await Note.create({
                title,
                description,
                image:{
                    id:cloudImage.public_id,
                    url:cloudImage.url
                },
                user:req.user
            })
            return res.send(successResponse(201,"Task added successfully"))
        }
        await Note.create({
            title,
            description,
            user:req.user
        })
        return res.send(successResponse(201,"Task added successfully"))
    } catch (error) {
      return  res.send(errorResponse(501,error.message))
    }
}


export const updateNotes=async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,description} = req.body;
        if(!title || !description){
            return res.send(errorResponse(404,"All fields are required"))
        }
        const note = await Note.findById(id);
        note.isCompleted = !note.isCompleted;
        if(!note){
           return res.send(errorResponse(404,"Task not Found."))
        }
        note.title = title;
        note.description = description;
        await note.save();
       return res.send(successResponse(201,"Task updated successfully"))
    } catch (error) {
       return res.send(errorResponse(501,error.message))
    }

}


export const deleteNotes=async(req,res)=>{
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note){
          return  res.send(errorResponse(404,"Task not Found."))
        }
       await note.deleteOne();
       return res.send(successResponse(201,"Task deleted successfully"))
    } catch (error) {
       return res.send(errorResponse(501,error.message))
    }
}
