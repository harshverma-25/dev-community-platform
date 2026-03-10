import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors());

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
    pathRewrite: (path) => {
      return "/auth" + path;
    },
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});