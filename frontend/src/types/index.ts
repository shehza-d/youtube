export { type RootState } from "../store/store";
export { type AppDispatch } from "../store/store";

export type TFields = "fullName" | "email" | "password";

export interface IUser {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  avatar: string;
  coverImage: string;
  watchHistory?: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IResponse<T> {
  data: null | T;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IVideoCard {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  // owner: string;
  createdAt: Date;
  // updatedAt: "2024-02-01T17:13:50.632Z";
  // __v: 0;
}

export interface IVideo {
  createdAt: Date;
  _id: string;
  description: string;
  duration: number;
  isPublished: true;
  owner: {
    _id: string;
    avatar: string;
    fullName: string;
    userName: string;
    subscribers: string;
  };
  thumbnail: string;
  title: string;
  videoFile: string;
  views: number;
}
