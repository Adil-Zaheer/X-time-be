import { Request, Response } from "express";
import AttendanceRecordSchema, { IAttendanceRecord } from "../models/checkIn";
import { isValidObjectId } from "mongoose";


export const getAllAttendanceRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const filter: any = {};
    if (startDate && endDate) {
      const adjustedStartDate = new Date(startDate as string);
      adjustedStartDate.setUTCHours(0, 0, 0, 0);
      const adjustedEndDate = new Date(endDate as string);
      adjustedEndDate.setUTCHours(23, 59, 59, 999);
      filter.date = { $gte: adjustedStartDate, $lte: adjustedEndDate };
    } else if (startDate) {
      const adjustedStartDate = new Date(startDate as string);
      adjustedStartDate.setUTCHours(0, 0, 0, 0);
      filter.date = { $gte: adjustedStartDate };
    } else if (endDate) {
      const adjustedEndDate = new Date(endDate as string);
      adjustedEndDate.setUTCHours(23, 59, 59, 999);
      filter.date = { $lte: adjustedEndDate };
    }
    // else {
    //   const today = new Date();
    //   today.setUTCHours(0, 0, 0, 0);
    //   const endOfDay = new Date();
    //   endOfDay.setUTCHours(23, 59, 59, 999);
    //   filter.date = { $gte: today, $lte: endOfDay };
    // }
    const allAttendanceRecords: IAttendanceRecord[] = await AttendanceRecordSchema.find(filter);
    res.status(200).json({ success: true, data: allAttendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

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


export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  const attendanceID = req.query.attendanceID; 
  try {
    const deletedAttendance = await AttendanceRecordSchema.findByIdAndDelete(attendanceID);
    if (!deletedAttendance || !isValidObjectId(deletedAttendance) ) {
      res.status(404).json({ success: false, message: "Attendance not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Attendance deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};