import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/cloudinary.js";
import { check } from "express-validator";
import { createPost, listOfPosts, singlePost, updatePost } from "../controllers/postsController.js";

const postRouter = express.Router();

//Create a Post
postRouter.post(
    "/",
    authenticateJWT,
    upload.single("image"),
    [
        check("title", "Title is required").not().isEmpty(),
        check("summary", "Summary is required").not().isEmpty(),
        check("content", "Content is required").not().isEmpty(),
    ],
    createPost
);

//Get a list of posts
postRouter.get("/", listOfPosts);

//Get a single post by ID
postRouter.get("/:id", singlePost);

//Edit a single post by ID
postRouter.put("/:id",
    authenticateJWT,
    upload.single('image'),
    [
        check('title', 'Title is required').not().isEmpty(),
        check('summary', 'Summary is required').not().isEmpty(),
        check('content', 'Content is required').not().isEmpty(),
    ],
    updatePost);

export default postRouter;
