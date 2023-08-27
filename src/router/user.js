import { Router } from "express";
import userController from "../controller/user.js";
import loginAuthorization from "../middleware/authMiddleware.js";
import { userValidator } from "../validator/user.js";

const userRouter = new Router();

userRouter.get("/users",loginAuthorization, userController.getAll);
userRouter.get("/user/:id", userController.getSingle);

userRouter.post("/user", userValidator ,loginAuthorization, userController.create);
userRouter.post("/user/:id", userController.update);

userRouter.post("/users/register", userValidator, userController.register); 

userRouter.post("/users/:id", loginAuthorization, userController.delete);  

userRouter.post("/user_role/:id",userController.updateUserRole);

export default userRouter;
