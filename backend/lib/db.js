import mongoose from "mongoose";
export const connectDB=async()=>{
    try{
const conn=await mongoose.connect(process.env.MONGO_URL);
console.log(`the DB connection is created successfully on this host ${conn.connection.host}`);
    }catch(error){
console.log(`db error is occured: ${error.message}`);
    }
}