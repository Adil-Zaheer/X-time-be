// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import User, { IUser } from "../../models/User";

// export const authenticateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     res.sendStatus(401);
//     return;
//   }

//   try {
//     // if (!process.env.JWT_SECRET) {
//     //   throw new Error("JWT_SECRET environment variable is not defined");
//     // }
//     const decodedToken = jwt.verify(
//       token,
//       process.env.JWT_SECRET ||
//         "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506"
//     ) as {
//       userId: string;
//       fullName: string;
//     };
//     const userId = decodedToken.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       res.sendStatus(401);
//       return;
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error authenticating user:", error);
//     res.sendStatus(401);
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../../models/User";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "e6c45bde5954c0a9ca8051f239fd50b3c61d55b35ef3ff600a0d98763f467506"
    ) as {
      userId: string;
      fullName: string;
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
    };

    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.sendStatus(401);
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.sendStatus(401);
  }
};
