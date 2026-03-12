import { Request, Response } from "express";
import { User } from "../models/User";

export const createProfile = async (req: any, res: Response) => {
  try {
    const { username, bio, techStack } = req.body;

    const user = await User.create({
      authId: req.userId,
      username,
      bio,
      techStack
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: "Failed to create profile" });
  }
};