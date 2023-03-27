import PostsModel from "../models/posts.js"

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