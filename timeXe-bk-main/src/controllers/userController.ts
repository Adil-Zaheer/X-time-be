import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { signInDetail, ...userData } = req.body;

    // Check if passwords match
    if (
      !signInDetail.password ||
      !signInDetail.confirmPassword ||
      signInDetail.password !== signInDetail.confirmPassword
    ) {
      res.status(400).json({
        success: false,
        error: "Passwords do not match or are missing.",
      });
      return;
    }

    // Hash passwords
    const hashedPassword = await bcrypt.hash(signInDetail.password, 10);
    const hashedConfirmPassword = await bcrypt.hash(
      signInDetail.confirmPassword,
      10
    );

    // Find the latest employeeId
    const latestUser: IUser | null = await User.findOne().sort({
      employeeId: -1,
    });

    let employeeId = "00001";
    if (latestUser) {
      const latestEmployeeId = parseInt(
        latestUser.jobDetail.employeeId.toString(),
        10
      );
      employeeId = (latestEmployeeId + 1).toString().padStart(5, "0");
    }

    // Create new user
    const user = await User.create({
      ...userData,
      jobDetail: {
        ...userData.jobDetail,
        employeeId, // Assign the generated employeeId
      },
      signInDetail: {
        userName: signInDetail.userName,
        signInEmail: signInDetail.signInEmail,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      },
    });

    res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// export const createUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { signInDetail, ...userData } = req.body;

//     console.log("req body", req.body);
//     if (
//       !signInDetail.password ||
//       !signInDetail.confirmPassword ||
//       signInDetail.password !== signInDetail.confirmPassword
//     ) {
//       res.status(400).json({
//         success: false,
//         error: "Passwords do not match or are missing.",
//       });
//       return;
//     }
//     const hashedPassword = await bcrypt.hash(signInDetail.password, 10);
//     const hashedConfirmPassword = await bcrypt.hash(
//       signInDetail.confirmPassword,
//       10
//     );

//     const user = await User.create({
//       ...userData,
//       signInDetail: {
//         userName: signInDetail.userName,
//         signInEmail: signInDetail.signInEmail,
//         password: hashedPassword,
//         confirmPassword: hashedConfirmPassword,
//       },
//     });

//     res.status(201).json({ success: true, data: user });
//   } catch (err: any) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

export const authUser = async (req: Request, res: Response) => {
  const { signInEmail, password } = req.body;

  try {
    const user = await User.findOne({
      "signInDetail.signInEmail": signInEmail,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.signInDetail.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const secret =
      process.env.JWT_SECRET ||
      "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506";
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign(
      { userId: user._id, userName: user.signInDetail.userName },
      secret,
      { expiresIn: "30d" }
    );
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const authUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   console.log(".,",req.body)

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Validate the password
//     const isPasswordValid = await bcrypt.compare(password, user.signInDetail.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // Generate JWT token
//     const secret =
//       process.env.JWT_SECRET ||
//       "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506";
//     if (!secret) {
//       throw new Error("JWT_SECRET environment variable is not defined");
//     }
//     const token = jwt.sign(
//       { userId: user._id, fullName: user.userDetail.fullName },
//       secret,
//       { expiresIn: "30d" }
//     );
//     res.json({ message: "Login successful", user, token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
