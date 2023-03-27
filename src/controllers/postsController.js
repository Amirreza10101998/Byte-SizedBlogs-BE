import PostsModel from "../models/posts.js"
import { check, validationResult } from 'express-validator';

export const listOfPosts = async () => {
    try {
        const posts = await PostsModel.find().sort({ createdAt: -1 }).limit(20).populate('author', 'firstName lastName');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const singlePost = async () => {
    try {
        const post = await PostsModel.findById(req.params.id).populate('author', 'firstName lastName');

        if (!post) {
            return next(createError(404, 'Post not found'));
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, summary, content } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
        const newPost = new PostModel({
            title,
            summary,
            content,
            image: imageUrl,
            author: new Types.ObjectId(req.user._id),
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, summary, content } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
        const post = await PostModel.findById(req.params.id);

        if (!post) {
            return next(createError(404, 'Post not found'));
        }

        if (!post.author.equals(req.user._id)) {
            return next(createError(403, 'You are not authorized to edit this post'));
        }

        post.title = title;
        post.summary = summary;
        post.content = content;

        if (imageUrl) {
            post.image = imageUrl;
        }

        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
