import { Router } from "express";
import userRouter from "./user.js";
import postRouter from "./post.js";
import authRouter from "./auth.js";
import optRouter from "./otp.js";
import emailRouter from "./email.js";




const mainRouter=new Router();

mainRouter.use(userRouter);
mainRouter.use(postRouter);
mainRouter.use(authRouter);
mainRouter.use(optRouter);
mainRouter.use(emailRouter);

export default mainRouter;