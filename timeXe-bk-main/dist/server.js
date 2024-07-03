"use strict";
// import express, { Application } from "express";
// import mongoose from "mongoose";
// import path from "path";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import userRoutes from "./routes/userRoutes";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app: Application = express();
// app.use(cors());
// const PORT: number = parseInt(process.env.PORT || "5000");
// const connected =
//   process.env.MONGO_URL ||
//   `mongodb+srv://muqeetahmad545:aws123@cluster0.c2nkkir.mongodb.net/attendence`;
// mongoose
//   .connect(connected as string)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));
// console.log("connected", connected);
// app.use(bodyParser.json());
// // app.use("/api", userRoutes);
// app.use(express.static(path.join(__dirname, "../build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = parseInt(process.env.PORT || "5000");
const connected = `mongodb+srv://muqeetahmad545:aws123@cluster0.c2nkkir.mongodb.net/attendence`;
mongoose_1.default
    .connect(connected)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(body_parser_1.default.json());
app.use("/api", userRoutes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
