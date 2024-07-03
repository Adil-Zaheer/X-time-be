import mongoose, { Schema, Document } from "mongoose";

export interface ILeaveApplication extends Document {
  user: string;
  leaveType: string;
  userName: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  leaveStatus: string;
  date: Date;
}

const leaveApplication: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  // user: { type: Schema.Types.ObjectId, ref: "AttendanceRecord", required: true },
  leaveType: { type: String, required: true },
  userName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
leaveStatus: {
    type: String,
    enum: ["Approved", "Rejected", "Pending"],
    default: "Pending",
  },
});

export default mongoose.model<ILeaveApplication>(
  "leaveApplication",
  leaveApplication
);
