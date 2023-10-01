import express from "express";
import { createNotes, deleteNotes, getNotes, updateNotes } from "../controllers/noteControllers.js";
import { isUserVerified } from "../middlewares/isVerified.js";
const noteRouter = express.Router();

noteRouter
.get('/notes',isUserVerified,getNotes)
.post('/create',isUserVerified,createNotes)
.put('/update/:id',isUserVerified,updateNotes)
.delete('/delete/:id',isUserVerified,deleteNotes)

export default noteRouter;