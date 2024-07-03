import { Document } from 'mongoose'; 
import { IUser } from './models/User'; 

export interface UserDocument extends IUser, Document {
}
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserDocument;
  }
}