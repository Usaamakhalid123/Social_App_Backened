import { Router } from "express";

import optController from "../controller/optController.js";

const optRouter=new Router();

optRouter.get("/opt/:email/:otp", optController.verify);
optRouter.post("/opt/:email",optController.generate);

export default optRouter;