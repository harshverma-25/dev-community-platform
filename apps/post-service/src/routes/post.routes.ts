import express from "express";
import { createPost, getPosts } from "../controllers/post.controller";
import { authenticate } from "@devcommunity/auth";

const router = express.Router();

router.post("/", authenticate, createPost);
router.get("/", getPosts);

export default router;