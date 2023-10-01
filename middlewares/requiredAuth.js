import {errorResponse} from "../responseWrapper.js"
export const authMiddleware = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
           return res.send(errorResponse(400,"All fields are required."))
        }
        next();
    } catch (error) {
        res.send(errorResponse(501,error.message))
    }
}