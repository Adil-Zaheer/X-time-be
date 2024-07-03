import { Request, Response } from "express";
import AttendanceRecordSchema from "../models/checkIn";

export const getUserAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const attendanceRecords = await AttendanceRecordSchema.find({
      user: userId,
    });
    res.status(200).json({ success: true, data: attendanceRecords });
  } catch (error) {
    console.error("Error fetching user attendance:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
