
import mongoose from "mongoose";
import userModel from "./user.js";

const commentSchema=new mongoose.Schema({
    comment_text:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date, 
        default: Date.now()
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
    
},
    {timestamps:true},
);

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    likes: {
        type: Number,
        default: 0
    },
    
    Comments:[commentSchema],
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        //required:true
    }
},
    {timestamps:true},


);

const postModel=mongoose.model("post",postSchema);

export default postModel;