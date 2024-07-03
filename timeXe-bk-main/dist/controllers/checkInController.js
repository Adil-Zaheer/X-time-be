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
exports.checkIn = void 0;
const checkIn_1 = __importDefault(require("../models/checkIn"));
const checkIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const checkInTime = new Date();
    const date = new Date().setUTCHours(0, 0, 0, 0);
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const firstName = (_b = req.user) === null || _b === void 0 ? void 0 : _b.firstName;
        const lastName = (_c = req.user) === null || _c === void 0 ? void 0 : _c.lastName;
        const userName = `${firstName} ${lastName}`;
        const existingCheckInRecord = yield checkIn_1.default.findOne({
            user: userId,
            date: date,
            userName: userName
        });
        if (existingCheckInRecord) {
            res.status(201).json({
                success: false,
                checkedIn: false,
                message: "You have already checked in today",
            });
            return;
        }
        const attendanceRecord = new checkIn_1.default({
            user: userId,
            time_in: checkInTime,
            userName: userName,
            date: date,
            status: "Present",
        });
        yield attendanceRecord.save();
        res.status(201).json({
            success: true,
            checkedIn: true,
            message: "Check-in recorded successfully",
        });
    }
    catch (error) {
        console.error("Check-in failed:", error);
        res.status(500).json({
            success: false,
            checkedIn: false,
            message: "Internal server error",
        });
    }
});
exports.checkIn = checkIn;
// import { Request, Response } from "express";
// import AttendanceRecordSchema from "../models/checkIn";
// import { startOfDay } from 'date-fns';
// export const checkIn = async (req: Request, res: Response): Promise<void> => {
//   const checkInTime = new Date();
//   const date = startOfDay(checkInTime).getTime(); 
//   console.log("Today's date (UTC start of day):", new Date(date));
//   console.log("Check-in time:", checkInTime);
//   try {
//     const userId = req.user?._id;
//     console.log("User ID:", userId);
//     if (!userId) {
//       res.status(401).json({
//         success: false,
//         message: "Unauthorized: No user ID found",
//       });
//       return;
//     }
//     const existingCheckInRecord = await AttendanceRecordSchema.findOne({
//       user: userId,
//       date: date,
//     });
//     if (existingCheckInRecord) {
//       res.status(200).json({
//         success: false,
//         checkedIn: false,
//         message: "You have already checked in today",
//       });
//       return;
//     }
//     console.log("No existing check-in record found for today.");
//     const attendanceRecord = new AttendanceRecordSchema({
//       user: userId,
//       time_in: checkInTime,
//       date: date,
//       status: "Present",
//     });
//     await attendanceRecord.save();
//     res.status(201).json({
//       success: true,
//       checkedIn: true,
//       message: "Check-in recorded successfully",
//     });
//   } catch (error) {
//     console.error("Check-in failed:", error);
//     res.status(500).json({
//       success: false,
//       checkedIn: false,
//       message: "Internal server error",
//     });
//   }
// };
