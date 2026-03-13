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
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);