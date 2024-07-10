import { Router } from "express";
import { createPost, getRecentPosts } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleawre.js";
import { verifyUser } from "../middleware/user.middleware.js";

const postRouter = Router();

postRouter.post("/create", upload.single("file"), verifyUser, createPost);

postRouter.get("/recent-posts", getRecentPosts);

export default postRouter;
