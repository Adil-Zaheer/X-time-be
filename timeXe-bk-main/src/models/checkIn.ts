import mongoose, { Schema, Document } from "mongoose";

export interface IAttendanceRecord extends Document {
  user?: string;
  time_in?: Date;
  time_out?: Date;
  working_hours?: number;
  status?: string;
  userName?: string;
}

const attendanceRecordSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  time_in: { type: Date, required: true || "00:00:00 AM" },
  time_out: { type: Date || "00:00:00 AM" },
  working_hours: { type: Number || 0 },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    default: "Present",
  },
});

export default mongoose.model<IAttendanceRecord>(
  "AttendanceRecord",
  attendanceRecordSchema
);
