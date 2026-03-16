import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/auth.controller";
import { authenticate } from "@devcommunity/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected route
router.get("/me", authenticate, getCurrentUser);

export default router;