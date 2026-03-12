import { Router } from "express";
import { createProfile, getMyProfile } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/profile", authenticate, createProfile);
router.get("/me", authenticate, getMyProfile);

export default router;