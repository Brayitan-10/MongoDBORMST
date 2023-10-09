import { Router } from "express";
import { Post } from "../models/post.js"

export const postsRouter = Router();

// Post Routes
postsRouter.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate('auth');
        console.log(posts);

        res.status(222).json(posts);  
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

postsRouter.get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const postFound = await Post.findById({ _id: id });
     
      if (!postFound) {
        return res.status(404).end();
      }
      
      res.status(222).json(postFound)
    } catch (error) {
      next(error); // vaya al siguiente middleware de pila
      //res.status(500).json({ message: error.message })
    }
  });

postsRouter.post("/", async (req, res) => {
    try {
        const newPost = req.body;
        const post = new Post(newPost);
        const savedPost = await post.save();

        res.status(202).end();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

postsRouter.patch("/:id", async (req, res) => {
    const postID = req.params.id;
    const postFields = req.body;
    try {
        // Buscar el usuario por id y si lo encuentra lo actualiza con los campos modificados
        const updatedPost = await Post.findByIdAndUpdate(postID, postFields, { new: true });

        if (!updatedPost) {
            return res.status(440).json({ message: 'Post not found' });
        }

        res.status(222).end();
    } catch (error) {
        next(error);  
    }
});

postsRouter.delete("/:id", async (req, res) => {
    const postID = req.params.id;
    try {
        const deletePost = await Post.findByIdAndRemove(postID);

        if (!deletePost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).end();
    } catch (error) {
        next(error);  
    }
});