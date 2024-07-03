"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const checkInController_1 = require("../controllers/checkInController");
const userDetails_1 = require("../controllers/userDetails");
const checkOutController_1 = require("../controllers/checkOutController");
const fetchUsersController_1 = require("../controllers/fetchUsersController");
const AuthMiddelware_1 = require("../controllers/middleware/AuthMiddelware");
const userAttendence_1 = require("../controllers/userAttendence");
const allUserAttendance_1 = require("../controllers/allUserAttendance");
const leaveApplicationController_1 = require("../controllers/leaveApplicationController");
const router = express_1.default.Router();
router.post("/login", userController_1.authUser);
router.use(AuthMiddelware_1.authenticateUser);
router.post("/users", userController_1.createUser);
router.post("/attendance/check-in", checkInController_1.checkIn);
router.post("/attendance/check-out", checkOutController_1.checkOut);
router.get("/userDetails", userDetails_1.getUserDetails);
router.get("/fetchusers", fetchUsersController_1.getAllUsers);
router.delete("/delete", fetchUsersController_1.deleteUsers);
router.patch("/update", fetchUsersController_1.updateUsers);
// Attandace
router.get("/userattendance", userAttendence_1.getUserAttendance);
router.get("/allusersattendance", allUserAttendance_1.getAllAttendanceRecords);
router.delete("/attendance/delete", allUserAttendance_1.deleteAttendance);
//LeaveApplication
router.get('/leaveapplication', leaveApplicationController_1.getAllRecords);
router.get('/leaveapplication/user', leaveApplicationController_1.getLeaveApplication);
router.post("/leaveapplication", leaveApplicationController_1.createLeaveApplication);
router.patch("/leaveapplication", leaveApplicationController_1.updateLeaveApplication);
router.delete("/leaveapplication", leaveApplicationController_1.deleteLeaveApplication);
exports.default = router;
