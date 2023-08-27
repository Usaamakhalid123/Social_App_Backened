import mongoose from "mongoose";

// define the schema for the users collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,    // Use 'type' to specify the data type
        required: true
    },
    email: {
        type: String,    
        required: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        //enum:["admin","user"],  // Possible roles: user and admin
        default:"user"
    }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;
