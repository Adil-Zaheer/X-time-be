import express, { Router } from "express";
import { authUser, createUser } from "../controllers/userController";
import { checkIn } from "../controllers/checkInController";
import { getUserDetails } from "../controllers/userDetails";
import { checkOut } from "../controllers/checkOutController";
import {
  deleteUsers,
  getAllUsers,
  updatStatus,
  updateUsers,
} from "../controllers/fetchUsersController";
import { getUserAttendance } from "../controllers/userAttendence";
import {
  deleteAttendance,
  getAllAttendanceRecords,
} from "../controllers/allUserAttendance";
import {
  createLeaveApplication,
  deleteLeaveApplication,
  getAllRecords,
  getLeaveApplication,
  updateLeaveApplication,
} from "../controllers/leaveApplicationController";
import { authenticateUser } from "../controllers/middleware/AuthMiddelware";

const router: Router = express.Router();

router.post("/login", authUser);

// router.use(authenticateUser);
router.post("/users", createUser);

router.post("/attendance/check-in", checkIn);
router.post("/attendance/check-out", checkOut);

router.get("/userDetails", getUserDetails);

router.get("/fetchusers", getAllUsers);
router.delete("/delete", deleteUsers);
router.patch("/update", updateUsers);
router.patch("/status", updatStatus);

// Attandace
router.get("/userattendance", getUserAttendance);
router.get("/allusersattendance", getAllAttendanceRecords);
router.delete("/attendance/delete", deleteAttendance);

//LeaveApplication
router.get("/leaveapplication", getAllRecords);
router.get("/leaveapplication/user", getLeaveApplication);
router.post("/leaveapplication", createLeaveApplication);
router.patch("/leaveapplication", updateLeaveApplication);
router.delete("/leaveapplication", deleteLeaveApplication);

export default router;
