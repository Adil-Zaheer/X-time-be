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
exports.deleteLeaveApplication = exports.updateLeaveApplication = exports.getLeaveApplication = exports.getAllRecords = exports.createLeaveApplication = void 0;
const leavesApplication_1 = __importDefault(require("../models/leavesApplication"));
const mongoose_1 = require("mongoose");
const createLeaveApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const firstName = (_b = req.user) === null || _b === void 0 ? void 0 : _b.firstName;
        const lastName = (_c = req.user) === null || _c === void 0 ? void 0 : _c.lastName;
        const userName = `${firstName} ${lastName}`;
        const applicationData = Object.assign(Object.assign({}, req.body), { user: userId, userName: userName });
        const newLeaveApplication = yield leavesApplication_1.default.create(applicationData);
        // await User.findByIdAndUpdate(
        //   userId,
        //   { $push: { userLeaveApplication: newLeaveApplication._id } },
        //   { new: true, useFindAndModify: false }
        // );    
        res.status(200).json({
            success: true,
            message: 'Leave application created successfully',
            content: newLeaveApplication
        });
    }
    catch (error) {
        console.error("Error creating leave application:", error);
        res.status(500).json({
            success: false,
            message: 'Error creating leave application'
        });
    }
});
exports.createLeaveApplication = createLeaveApplication;
const getAllRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allLeaveApplications = yield leavesApplication_1.default.find();
        res.status(200).json({ success: true,
            message: 'Get All  Leave application successfully',
            data: allLeaveApplications });
    }
    catch (error) {
        console.error('Error fetching leave applications:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.getAllRecords = getAllRecords;
const getLeaveApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        const allLeaveApplications = yield leavesApplication_1.default.find({ user: userId });
        res.status(200).json({
            success: true,
            message: 'Get All Leave applications successfully',
            data: allLeaveApplications
        });
    }
    catch (error) {
        console.error('Error fetching leave applications:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
exports.getLeaveApplication = getLeaveApplication;
// export const getRecordById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const applicationID = req.query.applicationID;
//     if (!applicationID || !isValidObjectId(applicationID)) {
//       res.status(400).json({ success: false, message: "Invalid applicationID provided" });
//       return;
//     }
//     const leaveApplications = await leaveApplication.findById(applicationID);
//     if (!leaveApplication) {
//       res.status(404).json({ success: false, message: 'Leave application not found' });
//       return;
//     }
//     res.status(200).json({ success: true, 
//       message: 'Get Leave application By Id successfully',
//       content: leaveApplications });
//   } catch (error) {
//     console.error('Error fetching leave application:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
const updateLeaveApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationID = req.query.applicationID;
    try {
        if (!applicationID || !(0, mongoose_1.isValidObjectId)(applicationID)) {
            res.status(400).json({ success: false, message: "Invalid applicationID provided" });
            return;
        }
        const updatedLeaveApplication = yield leavesApplication_1.default.findByIdAndUpdate(applicationID, req.body, { new: true });
        if (!updatedLeaveApplication) {
            res.status(404).json({ success: false, message: "Leave application not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Leave application updated successfully',
            content: updatedLeaveApplication
        });
    }
    catch (error) {
        console.error("Error updating leave application:", error);
        res.status(500).json({
            success: false,
            message: 'Error updating leave application'
        });
    }
});
exports.updateLeaveApplication = updateLeaveApplication;
const deleteLeaveApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationID = req.query.applicationID;
    try {
        if (!applicationID || !(0, mongoose_1.isValidObjectId)(applicationID)) {
            res.status(400).json({ success: false, message: "Invalid applicationID provided" });
            return;
        }
        const deletedLeaveApplication = yield leavesApplication_1.default.findByIdAndDelete(applicationID);
        if (!deletedLeaveApplication) {
            res.status(404).json({ success: false, message: "Leave application not found" });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Leave application deleted successfully',
        });
    }
    catch (error) {
        console.error("Error deleting leave application:", error);
        res.status(500).json({
            success: false,
            message: 'Error deleting leave application'
        });
    }
});
exports.deleteLeaveApplication = deleteLeaveApplication;
