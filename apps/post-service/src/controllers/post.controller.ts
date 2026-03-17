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

export const toggleLike = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId as string);

    if (alreadyLiked) {
      post.likes = post.likes.filter((uid) => uid !== userId);
    } else {
      post.likes.push(userId as string);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error toggling like" });
  }
};

export const addComment = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      userId: req.userId,
      text,
    });

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};