import type { ObjectId } from "mongodb";

export interface IUser {
  // _id?: ObjectId;
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

export interface IAppointment {
  // _id: ObjectId; // Appointment id
  doctorId: ObjectId;
  patientId: ObjectId;
  from: 4;
  till: Date;
}

export interface IReview {
  _id: ObjectId; // review id
  doctorId: ObjectId;
  patientId: ObjectId;
  createdOn: Date;
  review: string;
  rating: number;
}
