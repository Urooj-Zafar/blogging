import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { 
    type: String,
    trim:true, 
    required: true
   },
  category:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  description: { 
    type: String,
    trim:true,
    required: true
   },
  content: { 
    type: String, 
    trim:true,
    required: true 
  }, 
  image: { 
    type: String 
  }, 
  date: {
   type: Date,
   default: Date.now 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true, 
  },
});

export default mongoose.model("Blogs", blogSchema);
