import { User } from "../models/User.js";
import { errorResponse } from "../responseWrapper.js"
import jwt from 'jsonwebtoken'
export const isUserVerified=async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.send(errorResponse(404,"User not Verified, Login first"))
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const id = decodedToken._id;
        const isUser = await User.findById(id);
        if(!isUser){
            return res.send(errorResponse(404,"User not Found"))
        }
        req.user = isUser;
        req.token = token;
        next();
    } catch (error) {
        return res.send(errorResponse(501,error.message))
    }
}

