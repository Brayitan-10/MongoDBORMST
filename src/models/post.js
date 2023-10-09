import mongoose from "mongoose";
// Post Schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

// Post Model
export const Post = mongoose.model("Post", postSchema);
