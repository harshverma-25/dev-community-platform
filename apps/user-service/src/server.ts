import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authenticate } from "./middleware/auth.middleware";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB connection */
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected (user-service)");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User Service Running");
});

app.get("/users/me", authenticate, (req: any, res) => {
  res.json({
    message: "Authenticated user",
    userId: req.userId,
  });
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});