import userModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import loginEmail from "../email/auth/login.mail.js";

const AuthController={
    login:  async (req, res) =>{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const data={
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            };
            const token = jwt.sign(data, process.env.JWT_SECRET, {
                expiresIn: "24h",
                algorithm: "HS256"
            });
            //console.log(token);
            loginEmail(user);

            return res.status(200).json({message:"User successfully login",data,token});
        }
        return res.status(401).json({message: "Invalid Credentials"});

    },
};

export default AuthController;