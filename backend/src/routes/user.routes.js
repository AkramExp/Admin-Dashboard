import { Router } from "express";
import {
  getCurrentUser,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", verifyUser, logoutUser);

userRouter.get("/", verifyUser, getCurrentUser);

userRouter.get("/:userId", getUserById);

export default userRouter;
