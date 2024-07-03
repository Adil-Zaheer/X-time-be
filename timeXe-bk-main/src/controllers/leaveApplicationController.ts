import { Request, Response } from 'express';
import leaveApplication from '../models/leavesApplication';
import User, { IUser } from '../models/User';
import { isValidObjectId } from 'mongoose';

export const createLeaveApplication = async (req: Request, res: Response): Promise<void> => {
  const date = new Date().setUTCHours(0, 0, 0, 0); 
  try {
    const userId = req.user?._id;
    const firstName = req.user?.firstName;
    const lastName = req.user?.lastName;
    const userName = `${firstName} ${lastName}`;
    const applicationData = { ...req.body, user: userId, userName: userName ,date: date}; 
    const newLeaveApplication = await leaveApplication.create(applicationData);
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
  } catch (error) {
    console.error("Error creating leave application:", error);
    res.status(500).json({
      success: false,
      message: 'Error creating leave application'
    });
  }
};

export const getAllRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    const allLeaveApplications = await leaveApplication.find();
    res.status(200).json({ success: true,
      message: 'Get All  Leave application successfully',
      content: allLeaveApplications });
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getLeaveApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const allLeaveApplications = await leaveApplication.find({ user: userId });
    res.status(200).json({ 
      success: true,
      message: 'Get All Leave applications successfully',
      content: allLeaveApplications 
    });
  } catch (error) {
    console.error('Error fetching leave applications:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

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

export const updateLeaveApplication = async (req: Request, res: Response): Promise<void> => {
  const applicationID = req.query.applicationID;
  try {
    if (!applicationID || !isValidObjectId(applicationID)) {
      res.status(400).json({ success: false, message: "Invalid applicationID provided" });
      return;
    }
    const updatedLeaveApplication = await leaveApplication.findByIdAndUpdate(applicationID, req.body, { new: true });
    if (!updatedLeaveApplication) {
      res.status(404).json({ success: false, message: "Leave application not found" });
      return;
    }
    res.status(200).json({ 
      success: true, 
      message: 'Leave application updated successfully',
      content: updatedLeaveApplication
    });
  } catch (error) {
    console.error("Error updating leave application:", error);
    res.status(500).json({
      success: false,
      message: 'Error updating leave application'
    });
  }
}

export const deleteLeaveApplication = async (req: Request, res: Response): Promise<void> => {
  const applicationID = req.query.applicationID;
  try {
    if (!applicationID || !isValidObjectId(applicationID)) {
      res.status(400).json({ success: false, message: "Invalid applicationID provided" });
      return;
    }
    const deletedLeaveApplication = await leaveApplication.findByIdAndDelete(applicationID);
    if (!deletedLeaveApplication) {
      res.status(404).json({ success: false, message: "Leave application not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Leave application deleted successfully',
    })
  } catch (error) {
    console.error("Error deleting leave application:", error);
    res.status(500).json({
      success: false,
      message: 'Error deleting leave application'
    });
  }
}

