import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
  userDetail: {
    fullName: string;
    fatherName: string;
    email: string;
    address: string;
    phone: number;
    dob: Date;
    cnic: string;
    profileImage: string;
    gender: string;
  };
  jobDetail: {
    employeeId: number;
    companyName: string;
    department: string;
    jobPosition: string;
    manager: string;
    designation: string;
    joiningDate: Date;
    dropZone: string;
    role: string;
    salary: string;
    Skills: string;
    status: string;
  };
  signInDetail: {
    userName: string;
    signInEmail: string;
    confirmPassword: string;
    password: string;
  };
}

const userSchema: Schema = new Schema(
  {
    userDetail: {
      fullName: { type: String, required: true },
      fatherName: { type: String },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      address: { type: String },
      phone: { type: Number, required: true },
      dob: { type: Date },
      cnic: { type: String, unique: true, trim: true },
      profileImage: { type: String },
      gender: { type: String },
    },
    jobDetail: {
      employeeId: { type: Number },
      companyName: { type: String },
      department: { type: String },
      jobPosition: { type: String },
      manager: { type: String },
      designation: { type: String },
      joiningDate: { type: Date },
      dropZone: { type: String },
      role: { type: String },
      salary: { type: String },
      Skills: { type: String },
      status: {
        type: String,
        enum: ["Active", "InActive"],
        default: "Active",
      },
    },
    signInDetail: {
      userName: { type: String, required: true },
      signInEmail: { type: String, required: true },
      password: { type: String, required: true, minlength: 8 },
      confirmPassword: { type: String, required: true, minlength: 8 },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
