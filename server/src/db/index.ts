import mongoose from "mongoose";

export const connectDB= async()=>{
    try {
        let DB_connection='';
        if(process.env.NODE_ENV==="development"){
            DB_connection=process.env.MONGODB_LOCAL_URI!
        }
        if(process.env.NODE_ENV==="production"){
            DB_connection=process.env.MONGODB_URI!
        }
        const dbResponse = await mongoose.connect(DB_connection)
        console.log("DB connected successfully",dbResponse.connection.host);
        
    } catch (error) {
        console.log("Db connection error",error);
        process.exit(1)
    }
}