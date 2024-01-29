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
  createdAt: Date;
  updatedAt: Date;
}
