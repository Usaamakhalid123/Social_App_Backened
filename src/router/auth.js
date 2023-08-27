import { Router } from "express";
import AuthController from "../controller/auth.js";


const authRouter =new Router();

authRouter.post("/auth/login",AuthController.login);

export default authRouter;