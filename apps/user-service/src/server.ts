import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authenticate } from "./middleware/auth.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User Service Running");
});

// first users route
app.get("/users", (req, res) => {
  res.json({
    message: "Users endpoint working"
  });
});

app.get("/users/me", authenticate, (req: any, res) => {
  res.json({
    message: "Authenticated user",
    userId: req.userId
  });
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});