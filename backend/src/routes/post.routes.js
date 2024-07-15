import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getRecentPosts,
  getSavedPosts,
  toggleLikePost,
  toggleSave,
  updatePost,
} from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleawre.js";
import { verifyUser } from "../middleware/user.middleware.js";

const postRouter = Router();

postRouter.get("/recent-posts", getRecentPosts);

postRouter.get("/saved-posts", verifyUser, getSavedPosts);

postRouter.get("/all", verifyUser, getAllPosts);

postRouter.get("/:postId", getPostById);

postRouter.post("/create", upload.single("file"), verifyUser, createPost);

postRouter.post("/toggle-save/:postId", verifyUser, toggleSave);

postRouter.post("/toggle-like/:postId", verifyUser, toggleLikePost);

postRouter.patch("/update/:postId", verifyUser, updatePost);

postRouter.delete("/:postId", verifyUser, deletePost);

export default postRouter;
