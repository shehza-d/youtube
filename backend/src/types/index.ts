// import type { ObjectId } from "mongodb";
import type { Types, Model } from "mongoose";

export interface IAccessTokenPayload {
  _id: string;
  email: string;
  userName: string;
  fullName: string;
}

export interface IRefreshTokenPayload {
  _id: string;
}

export interface IUser {
  userName: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  watchHistory: Types.ObjectId[];
  password: string;
  refreshToken: string;
}

// For user.model Methods
// Put all user instance methods in this interface:
interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
// Create a new Model type that knows about IUserMethods...
export type IUserModel = Model<IUser, {}, IUserMethods>;

export interface ISubscription {
  subscriber: Types.ObjectId;
  channel: Types.ObjectId;
}

export interface IVideo {
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Types.ObjectId;
}
