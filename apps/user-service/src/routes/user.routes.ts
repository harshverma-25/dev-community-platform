import { Router } from "express";
import { createProfile } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/profile", authenticate, createProfile);

export default router;