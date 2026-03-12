import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    bio: {
      type: String,
      default: ""
    },
    techStack: {
      type: [String],
      default: []
    },
    avatar: {
      type: String,
      default: ""
    },
    followers: {
      type: [String],
      default: []
    },
    following: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);