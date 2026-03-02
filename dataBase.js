import mongoose from "mongoose";
export default async function dataBase(){
  try{
    await mongoose.connect("mongodb+srv://uroojzafar:urooj1234@cluster0.hwzg8eu.mongodb.net/class4to5")
    console.log("Database connected.");

  }
  catch(e){
    console.log(e);
  }
}