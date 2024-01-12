declare namespace Express {
  export interface Request {
    verifiedUser: {
      _id: string;
      email: string;
      userName: string;
      fullName: string;
    };
  }
}
