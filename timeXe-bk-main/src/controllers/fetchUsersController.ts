import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { isValidObjectId } from "mongoose";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.userId as string;
  const updateData = req.body;

  try {
    if (!userId) {
      res
        .status(400)
        .json({ success: false, message: "Missing userId in request query" });
      return;
    }
    const updateObject: any = {};
    for (const key in updateData) {
      updateObject[`userDetail.${key}`] = updateData[key];
      updateObject[`jobDetail.${key}`] = updateData[key];
      updateObject[`signInDetail.${key}`] = updateData[key];
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updatStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.userId as string;
  const updateData = req.body;
  try {
    if (!userId) {
      res
        .status(400)
        .json({ success: false, message: "Missing userId in request query" });
      return;
    }
    const updateObject: any = {};
    for (const key in updateData) {
      updateObject[`jobDetail.${key}`] = updateData[key];
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.query.userId;
  try {
    if (!userId || !isValidObjectId(userId)) {
      res
        .status(400)
        .json({ success: false, message: "Invalid userId provided" });
      return;
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
