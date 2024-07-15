import { Router } from "express";
import {
  getCurrentUser,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.middleawre.js";

const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", verifyUser, logoutUser);

userRouter.get("/", verifyUser, getCurrentUser);

userRouter.get("/:userId", getUserById);

userRouter.patch("/update", upload.single("file"), verifyUser, updateUser);

export default userRouter;
