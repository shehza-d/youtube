export type TFields = "fullName" | "email" | "password";

export interface IUser {
  _id: string;
  createdOn: Date;
  name: string;
  email: string;
  password: string;
  isDoctor: boolean; // Patient or Doctor
  organization?: string; // doc only
  experience?: number; // doc only
  specialization?: string; // doc only
  // timing:'5 10'
}
