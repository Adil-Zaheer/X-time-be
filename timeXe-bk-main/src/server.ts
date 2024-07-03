import express, { Application } from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import cron from "node-cron";
import { markAbsentees } from "./controllers/checkInController";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

dotenv.config();
const app = express();
app.use(cors());
const PORT: number = parseInt(process.env.PORT || "5000");

const connected = `mongodb+srv://muqeetahmad545:aws123@cluster0.c2nkkir.mongodb.net/Time-Xe`;
mongoose
  .connect(connected)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
app.use("/api", userRoutes);

// cron.schedule('36 20 * * *', async () => {
cron.schedule(
  "0 14 * * *",
  async () => {
    await markAbsentees();
  },
  {
    timezone: "Asia/Karachi",
  }
);
// console.log("Attendance checker scheduled.");

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
