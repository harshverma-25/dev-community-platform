import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "@devcommunity/database";
import postRoutes from "./routes/post.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
connectDB(process.env.MONGO_URI as string);

app.get("/", (req, res) => {
  res.send("Post Service Running");
});

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`🚀 Post Service running on port ${PORT}`);
});