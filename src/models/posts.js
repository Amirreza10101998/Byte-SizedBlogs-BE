import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
},
    {
        timestamps: true,
    }
);

export default model("Posts", PostsSchema);