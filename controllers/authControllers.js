import { User } from "../models/User.js";
import { errorResponse, successResponse } from "../responseWrapper.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerController=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name){
            return res.send(errorResponse(404,"All fields are required"))
        }
        const isUser = await User.findOne({email});
        if(isUser){
         return res.send(errorResponse(401,"User already Exist"))
        }
        const hashpassword = await bcrypt.hash(password,10);
         await User.create({
            name,
            email,
            password:hashpassword,
        })
        return res.send(successResponse(201,"User create successfully"))
    } catch (error) {
        res.send(errorResponse(501,error.message))
    }
}


export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const isUser = await User.findOne({email}).select("+password");
        if(!isUser){
            return res.send(errorResponse(404,"User not Found, sign up first"))
        }
        const comparePassword = await bcrypt.compare(password,isUser.password);
        if(!comparePassword){
            return res.send(errorResponse(404,"Incorrect Password"))
        }
        const token = jwt.sign({_id:isUser._id},process.env.JWT_SECRET_KEY);
        res.cookie("token",token,
        {
            httpOnly:true,
            // maxAge:1000*10
            maxAge:3*24*60*60*1000, // 24 hours
            sameSite:process.env.NODE_ENV=="Development"?"lax":"none",
            secure:process.env.NODE_ENV==="Development"?false:true
            // it means we can able to get connect with backend even if client deploy in different playform. and should be add secure:true otherwise it will not work.
            // note : this is not work in postman or localhost.
        }
        )
        return res.send(successResponse(201,{message:"Welcome Back",token}))
    } catch (error) {
        res.send(errorResponse(501,error.message))
    }
}

export const myProfile=async(req,res)=>{
    try {
        const user = req.user;
      return  res.send(successResponse(201,user))
    } catch (error) {
        res.send(errorResponse(501,error.message))
    }
}

export const logoutController=async(req,res)=>{
    try {
        // 1st method----
        res.clearCookie('token',{
            httpOnly:true,
            secure:true
        })
        
        // 2nd method----
        // res.cookie("token","",{
        //     maxAge: new Date(Date.now()),
        //     httpOnly:true,
        //     secure:true
        // })
        return res.send(successResponse(200,"Logout Successfully"))
    } catch (error) {
        res.send(errorResponse(501,error.message))
    }
}