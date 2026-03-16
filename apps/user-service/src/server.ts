import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "@devcommunity/database";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect database using shared package
connectDB(process.env.MONGO_URI as string);

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User Service Running");
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});