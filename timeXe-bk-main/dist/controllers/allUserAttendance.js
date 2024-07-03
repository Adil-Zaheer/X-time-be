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
exports.deleteAttendance = exports.getAllAttendanceRecords = void 0;
const checkIn_1 = __importDefault(require("../models/checkIn"));
const mongoose_1 = require("mongoose");
const getAllAttendanceRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        const filter = {};
        if (startDate && endDate) {
            const adjustedStartDate = new Date(startDate);
            adjustedStartDate.setUTCHours(0, 0, 0, 0);
            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setUTCHours(23, 59, 59, 999);
            filter.date = { $gte: adjustedStartDate, $lte: adjustedEndDate };
        }
        else if (startDate) {
            const adjustedStartDate = new Date(startDate);
            adjustedStartDate.setUTCHours(0, 0, 0, 0);
            filter.date = { $gte: adjustedStartDate };
        }
        else if (endDate) {
            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setUTCHours(23, 59, 59, 999);
            filter.date = { $lte: adjustedEndDate };
        }
        const allAttendanceRecords = yield checkIn_1.default.find(filter);
        res.status(200).json({ success: true, data: allAttendanceRecords });
    }
    catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.getAllAttendanceRecords = getAllAttendanceRecords;
// export const getAllAttendanceRecords = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const allAttendanceRecords: IAttendanceRecord[] = await AttendanceRecordSchema.find();
//     res.status(200).json({ success: true, data: allAttendanceRecords });
//   } catch (error) {
//     console.error("Error fetching attendance records:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
// export const getAllAttendanceRecords = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { year, month, day, week } = req.query; 
//     const filter: any = {};
//     if (year) {
//       filter.date = { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31`) };
//     }
//     if (month) {
//       const [m, y] = (month as string).split("-");
//       filter.date = { $gte: new Date(`${y}-${m}-01`), $lt: new Date(`${y}-${m}-31`) };
//     }
//     if (day) {
//       filter.date = { $gte: new Date(`${day}T00:00:00`), $lt: new Date(`${day}T23:59:59`) };
//     }
//     if (week) {
//       const weekStr = Array.isArray(week) ? week[0] : week;
//       const [w, y] = (weekStr as string).split("-");
//       const startDate = new Date(`${y}-01-01`);
//       startDate.setDate(startDate.getDate() + (parseInt(w) - 1) * 7);
//       const endDate = new Date(startDate);
//       endDate.setDate(startDate.getDate() + 6);
//       filter.time_in = { $gte: startDate, $lt: endDate };
//     }
//       const allAttendanceRecords: IAttendanceRecord[] = await AttendanceRecordSchema.find(filter);
//     res.status(200).json({ success: true, data: allAttendanceRecords });
//   } catch (error) {
//     console.error("Error fetching attendance records:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
// export const getAllAttendanceRecords = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { year, month, day, week, startDate, endDate } = req.query;
//     const filter: any = {};
//     if (year) {
//       filter.date = { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-12-31`) };
//     }
//     if (month) {
//       const [m, y] = (month as string).split("-");
//       filter.date = { $gte: new Date(`${y}-${m}-01`), $lt: new Date(`${y}-${m}-31`) };
//     }
//     if (day) {
//       filter.date = { $gte: new Date(`${day}T00:00:00`), $lt: new Date(`${day}T23:59:59`) };
//     }
//     if (week) {
//       const weekStr = Array.isArray(week) ? week[0] : week;
//       const [w, y] = (weekStr as string).split("-");
//       const startDate = new Date(`${y}-01-01`);
//       startDate.setDate(startDate.getDate() + (parseInt(w) - 1) * 7);
//       const endDate = new Date(startDate);
//       endDate.setDate(startDate.getDate() + 6);
//       filter.time_in = { $gte: startDate, $lt: endDate };
//     }
//     if (startDate) {
//       filter.date = { ...filter.date, $gte: new Date(startDate as string) };
//     }
//     if (endDate) {
//       filter.date = { ...filter.date, $lt: new Date(new Date(endDate as string).setDate(new Date(endDate as string).getDate() + 1)) };
//     }
//     const allAttendanceRecords: IAttendanceRecord[] = await AttendanceRecordSchema.find(filter);
//     res.status(200).json({ success: true, data: allAttendanceRecords });
//   } catch (error) {
//     console.error("Error fetching attendance records:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
// export const deleteAttedance = async (req: Request, res: Response): Promise<void> => {
//   const attandanceID = req.query.attandanceID; 
//   try {
//     const deletedAttedance = await AttendanceRecordSchema.findByIdAndDelete(attandanceID);
//     if (!deletedAttedance) {
//       res.status(404).json({ success: false, message: "Attendance not found" });
//       return;
//     }
//     res.status(200).json({ success: true,
//       message: "Attendance deleted successfully"
//      });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
const deleteAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const attendanceID = req.query.attendanceID;
    try {
        const deletedAttendance = yield checkIn_1.default.findByIdAndDelete(attendanceID);
        if (!deletedAttendance || !(0, mongoose_1.isValidObjectId)(deletedAttendance)) {
            res.status(404).json({ success: false, message: "Attendance not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Attendance deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting attendance:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.deleteAttendance = deleteAttendance;
