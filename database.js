import mongoose from "mongoose";
export const dbConnect=async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully...!");
        console.log(mongoose.connection.host);
    } catch (error) {
        console.log(error);
    }
}