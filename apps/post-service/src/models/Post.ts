import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
  {
    userId: String,
    text: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],
});

export default mongoose.model("Post", postSchema);