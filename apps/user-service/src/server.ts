import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});