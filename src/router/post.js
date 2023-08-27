import { Router } from "express";
import postController from "../controller/post.js";
import pathAuthorization from "../middleware/authMiddleware.js";
import {Rolecheck}  from "../middleware/adminMiddleware.js";
import postValidator from "../validator/post.js";
import loginAuthorization from "../middleware/authMiddleware.js";
import { EUserRole } from "../enum/user.js";
import { commentValidator } from "../validator/addComment.js";



const postRouter=new Router();

postRouter.get("/posts", pathAuthorization,Rolecheck([EUserRole.admin]), postController.getAll);

postRouter.get("/posts/:id",postController.getSingle);

postRouter.post("/post",loginAuthorization,postValidator.create, postController.create);

postRouter.post("/posts/:id/comments",commentValidator.addComment, postController.addComment);

postRouter.post("/posts/:id/like", pathAuthorization, postController.like);

postRouter.post("/posts/:id", pathAuthorization, postController.delete);

postRouter.get("/emailPosts/:email",postController.emailPosts);

postRouter.get("/post/today",postController.getTodayPosts);




export default postRouter;