import { Router } from "express";
import { createProfile, getMyProfile, updateProfile, followUser, unfollowUser, getUserByUsername } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/profile", authenticate, createProfile);
router.get("/me", authenticate, getMyProfile);
router.put("/profile", authenticate, updateProfile);
router.post("/follow/:id", authenticate, followUser);
router.post("/unfollow/:id", authenticate, unfollowUser);
router.get("/:username", getUserByUsername);

export default router;