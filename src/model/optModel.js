import mongoose from "mongoose";

const optSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    opt:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
       // expires: 300 // these are in seconds
    },
    

},
{timestamps:true}
);

const optModel=mongoose.model("OPT",optSchema);

export default optModel;