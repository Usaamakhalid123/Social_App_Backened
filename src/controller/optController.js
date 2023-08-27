//import mongoose from "mongoose";
import optModel from "../model/optModel.js";
import otpEmail from "../email/auth/otp.mail.js";


const optController={

    verify: async (req, res) => {
        const { email, otp } = req.params;
        const my_otp = await optModel.findOne({
            email: email
        });
        if (!my_otp) {
            return res.status(404).json({
                message: "OTP not found"
            });
        }
        const time_now = new Date();
        const time_diff = time_now - my_otp.createdAt;
        const optValid = 5860 * 1000;
    
        if (time_diff < optValid) {
            if (my_otp.opt == otp && my_otp.email == email) {
                await optModel.deleteOne({ email: email });
                return res.status(200).json({
                    message: "OTP verified"
                });
    
            } else {
                return res.status(404).json({
                    message: "OTP invalid"
                });
            }
        } else {
            return res.status(404).json({
                message: "OTP expired"
            });
        }
    },
    

    generate: async (req, res) => {
        try {
            const { email } = req.params;
            const { opt } = req.body; // Get the opt value from the request body
    
            const generatedOtp = Math.floor(Math.random() * 9000) + 1000;
    
            // Store the OTP in the database
            const my_otp = await optModel.create({
                email: email,
                opt: opt || generatedOtp // Use the provided opt value or generate a new one
            });
    
            // Send the OTP email to the provided email address
            otpEmail({ email, otp: my_otp.opt }); // Use the opt value from the created entry
    
            // Respond with a success message
            return res.status(200).json({ message: "OTP generated and sent via email", otpId: my_otp._id });
        } catch (error) {
            console.error("Error generating OTP:", error);
            return res.status(500).json({ error: "Error generating OTP" });
        }
    }
    
}

export default optController;