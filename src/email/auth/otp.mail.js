import transport from "../../config/nodeMailer.js";
import optController from "../../controller/optController.js";

const otpEmail=({email,otp})=>{
    transport.sendMail({
        from:"osama@gmail.com",
        to:email,
        subject:"OTP",
        html:`<h1> Dear user, your otp is : ${otp}</h1>`
    },
    (err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("OTP on Email sent successfully");
        }

    }
    )
}

export default otpEmail;