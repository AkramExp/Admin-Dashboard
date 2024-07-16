import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  getFollowers,
  getFollowing,
  getUserById,
  loginUser,
  logoutUser,
  registerUser,
  toggleFollow,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.middleawre.js";

const userRouter = Router();

userRouter.get("/", verifyUser, getCurrentUser);

userRouter.get("/all-users", getAllUsers);

userRouter.get("/following/:userId", getFollowing);

userRouter.get("/followers/:userId", getFollowers);

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", verifyUser, logoutUser);

userRouter.get("/:userId", getUserById);

userRouter.patch("/update", upload.single("file"), verifyUser, updateUser);

userRouter.post("/follow/:followingId", verifyUser, toggleFollow);

export default userRouter;
