import express from "express";
import dotenv from 'dotenv';
import { dbConnect } from "./database.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import morgan from 'morgan'
import mainRouter from "./routes/router.js";
const app = express();
dotenv.config({path:'./config.env'})
dbConnect();

// using middlewares -----------------------
app.use(express.json())
app.use(cookieParser())
app.use(morgan("common"))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))
// routes-----------
app.use('/api/v1',mainRouter)

app.get('/',(req,res)=>{
    res.json({
        success:true
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Listening server on the Port : ${process.env.PORT}`);
})