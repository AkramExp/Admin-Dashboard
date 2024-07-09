import { Router } from "express";
import {
  getCurrentUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.get("/", verifyUser, getCurrentUser);

export default userRouter;
