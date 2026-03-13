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

export const getMyProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ authId: req.userId });

    if (!user) {
      return res.status(404).json({
        error: "Profile not found"
      });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch profile"
    });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { bio, techStack, avatar } = req.body;

    const user = await User.findOneAndUpdate(
      { authId: req.userId },
      { bio, techStack, avatar },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        error: "Profile not found"
      });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update profile"
    });
  }
};

export const followUser = async (req: any, res: Response) => {
  try {
    const targetUserId = req.params.id;

    const currentUser = await User.findOne({ authId: req.userId });
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentUser.following.includes(targetUser._id)) {
      return res.status(400).json({ error: "Already following this user" });
    }

    currentUser.following.push(targetUser._id);
    targetUser.followers.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "User followed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to follow user" });
  }
};

export const unfollowUser = async (req: any, res: Response) => {
  try {
    const targetUserId = req.params.id;

    const currentUser = await User.findOne({ authId: req.userId });
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id: any) => id.toString() !== targetUser._id.toString()
    );

    targetUser.followers = targetUser.followers.filter(
      (id: any) => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "User unfollowed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to unfollow user" });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("followers", "username")
      .populate("following", "username");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch user"
    });
  }
};

