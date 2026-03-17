import express from "express";
import { createPost, getPosts, toggleLike, addComment } from "../controllers/post.controller";
import { authenticate } from "@devcommunity/auth";

const router = express.Router();

router.post("/", authenticate, createPost);
router.get("/", getPosts);
router.post("/like/:id", authenticate, toggleLike);
router.post("/comment/:id", authenticate, addComment);

export default router;