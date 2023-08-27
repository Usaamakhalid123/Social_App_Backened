import { Router } from "express";
import loginEmail from "../email/auth/login.mail.js";

const emailRouter=new Router();


emailRouter.post("/send-login-email", (req, res) => {
    const { name, email } = req.body;

    loginEmail({ name, email });

    res.json({ message: "Email sent successfully" });
});

export default emailRouter;