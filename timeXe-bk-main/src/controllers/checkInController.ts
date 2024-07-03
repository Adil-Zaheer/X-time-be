import { Request, Response } from "express";
import AttendanceRecordSchema from "../models/checkIn";
import userSchema from "../models/User";

export const checkIn = async (req: Request, res: Response): Promise<void> => {
  const checkInTime = new Date();
  const date = new Date().setUTCHours(0, 0, 0, 0);
  try {
    const userId = req.user?._id;
    const userName = req.user?.signInDetail.userName;
    const existingCheckInRecord = await AttendanceRecordSchema.findOne({
      user: userId,
      date: date,
      userName: userName,
    });
    if (existingCheckInRecord) {
      res.status(201).json({
        success: false,
        checkedIn: false,
        message: "You have already checked in today",
      });
      return;
    }
    const attendanceRecord = new AttendanceRecordSchema({
      user: userId,
      time_in: checkInTime,
      userName: userName,
      date: date,
      status: "Present",
    });
    await attendanceRecord.save();

    res.status(201).json({
      success: true,
      checkedIn: true,
      message: "Check-in recorded successfully",
    });
  } catch (error) {
    console.error("Check-in failed:", error);
    res.status(500).json({
      success: false,
      checkedIn: false,
      message: "Internal server error",
    });
  }
};

export const markAbsentees = async (): Promise<void> => {
  const date = new Date().setUTCHours(0, 0, 0, 0);
  try {
    const users = await userSchema.find();

    for (const user of users) {
      const existingRecord = await AttendanceRecordSchema.findOne({
        user: user._id,
        date: date,
      });

      if (!existingRecord) {
        // const userName = fullName;
        const timeIn = new Date();
        const timeOut = new Date();
        timeIn.setHours(0, 0, 0, 0);
        timeOut.setHours(0, 0, 0, 0);
        const absentRecord = new AttendanceRecordSchema({
          user: user._id,
          // userName: fullName,
          date: date,
          status: "Absent",
          time_in: timeIn,
          time_out: timeOut,
          working_hours: 0,
        });

        await absentRecord.save();
        // console.log(`User ${userName} is marked as absent`);
      }
    }

    console.log("Attendance check completed");
  } catch (error) {
    console.error("Error in attendance check:", error);
  }
};

// export const markAbsentees = async () => {
//   const date = new Date().setUTCHours(0, 0, 0, 0);
//   try {
//     const users = await AttendanceRecordSchema.find({ date });
//     for (const user of users) {
//       if (user.status !== "Present") {
//         user.status = "Absent";
//         await user.save();
//         console.log(`User ${user.userName} is marked as absent`);
//       } else {
//         // Reset the checkedIn status for the next day
//         user.status = "Absent";
//         await user.save();
//       }
//     }
//     console.log('Attendance check completed');
//   } catch (error) {
//     console.error("Error in attendance check:", error);
//   }
// };

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
