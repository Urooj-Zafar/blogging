import mongoose from "mongoose";
export default async function dataBase(){
  try{
    const DB = process.env.MONGODB
    await mongoose.connect(DB)
    console.log("Database connected.");

  }
  catch(e){
    console.log("Error connecting to MongoDB:", e);
  }
}