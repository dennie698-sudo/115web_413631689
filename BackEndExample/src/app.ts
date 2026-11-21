import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/UserRoute";

const app = express();
const PORT = Number(process.env.PORT || 8877);
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);

app.get("/", (_req, res) => {
  res.status(200).send("StudentHub API is running");
});

async function startServer(): Promise<void> {
  if (!MONGODB_URI) {
    throw new Error("請在 .env 設定 MONGODB_URI");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`StudentHub API listening at http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
