import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/", verifyUser, getCurrentUser);

export default userRouter;
