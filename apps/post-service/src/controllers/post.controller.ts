import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { content, tags } = req.body;

    const post = await Post.create({
      authorId: req.userId, 
      content,
      tags,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};