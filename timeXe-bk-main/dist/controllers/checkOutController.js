"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOut = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkIn_1 = __importDefault(require("../models/checkIn"));
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // const token = req.headers.authorization?.split(" ")[1];
    const checkOutTime = new Date();
    const date = new Date().setUTCHours(0, 0, 0, 0);
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ success: false, message: "No token provided" });
        return;
    }
    try {
        // if (!process.env.JWT_SECRET) {
        //   throw new Error("JWT_SECRET environment variable is not defined");
        // }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET ||
            "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506");
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const existingCheckInRecord = yield checkIn_1.default.findOne({
            user: userId,
            date: date,
        });
        if (!existingCheckInRecord) {
            res.status(400).json({
                success: false,
                message: "No check-in record found for today",
            });
            return;
        }
        if (existingCheckInRecord.time_out) {
            res.status(400).json({
                success: false,
                message: "You are already checked out",
            });
            return;
        }
        existingCheckInRecord.time_out = checkOutTime;
        existingCheckInRecord.working_hours =
            (checkOutTime.getTime() - existingCheckInRecord.time_in.getTime()) /
                (1000 * 60 * 60);
        yield existingCheckInRecord.save();
        res
            .status(200)
            .json({ success: true, message: "Check-out recorded successfully" });
    }
    catch (error) {
        console.error("Check-out failed:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.checkOut = checkOut;
