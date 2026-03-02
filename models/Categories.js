import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim:true,
    unique: true },
  image: {
    type: String
   },
});

export default mongoose.model("Categories", categorySchema);
