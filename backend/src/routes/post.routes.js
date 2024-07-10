import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleawre.js";
import { verifyUser } from "../middleware/user.middleware.js";

const postRouter = Router();

postRouter.post("/create", upload.single("file"), verifyUser, createPost);

export default postRouter;
