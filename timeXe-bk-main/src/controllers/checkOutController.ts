import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AttendanceRecordSchema from "../models/checkIn";

export const checkOut = async (req: Request, res: Response): Promise<void> => {
  // const token = req.headers.authorization?.split(" ")[1];
  const checkOutTime = new Date();
  const date = new Date().setUTCHours(0, 0, 0, 0);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }

  try {
    // if (!process.env.JWT_SECRET) {
    //   throw new Error("JWT_SECRET environment variable is not defined");
    // }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506"
    ) as {
      userId: string;
    };
    const userId = req.user?._id;

    const existingCheckInRecord = await AttendanceRecordSchema.findOne({
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
    await existingCheckInRecord.save();

    res
      .status(200)
      .json({ success: true, message: "Check-out recorded successfully" });
  } catch (error) {
    console.error("Check-out failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
