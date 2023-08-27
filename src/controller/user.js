import userModel from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import loginEmail from "../email/auth/login.mail.js";


const userController={
    getAll: async (req,res)=>{
        const users=await userModel.find();
        return res.json(users);
    },
    getSingle: async (req,res)=>{
        const {id}=req.params;
        const user=await userModel.findById(id);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        return res.json(user);
    },
    create: async (req,res)=>{
        const body = req.body;
    
    try {
        const user = await userModel.create({
            name: body.name,
            email: body.email,
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Error creating user" });
    }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        try {
            const user = await userModel.findByIdAndUpdate(id, { name, email }, { new: true });

            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            return res.json({ message: "User updated successfully", user });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ error: "Error updating user" });
        }
    },
    register: async (req, res) => {
        try {
          const { name, email, password } = req.body;
          const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      
          const newUser = new userModel({
            name,
            email,
            password: hashedPassword, // Store the hashed password
          });
      
          const savedUser = await newUser.save(); // Save the user to the database
      
          res.status(201).json({ message: "User saved successfully", savedUser });
        } catch (err) {
          console.error("Error saving user:", err);
          res.status(500).json({ message: "Error saving user" });
        }
      },
      delete: async (req,res)=>{
        try{
            const {id}=req.params;
            const deleteUser=await userModel.findByIdAndDelete(id);
    
            if(!deleteUser){
                return res.status(404).json({error:"User not found"});
            }
    
            return res.json({message:"User deleted successfully"});
        } catch(err){
            console.log("Error deleting User",err);
            return res.status(500).json({error:"Error deleting User"});
        }
    
    },
    updateUserRole:async (req,res)=>{
        try {
            // Find the user by their ID
            const {id}=req.params;
            const {role} = req.body;
            const user = await userModel.findById(id);
    
            if (!user) {
                // Handle user not found
                return res.status(404).json({message:"User not found!"});
            }
    
            // Update the user's role to "admin"
            user.role = 'admin';
    
            // Save the updated user object
            await user.save();
    
            console.log('User role updated to admin:', user);
            return res.json({message:"Role updated sucessfully!",user});
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    },
        
    
};



export default userController;