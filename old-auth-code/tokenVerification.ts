// old code
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import { SECRET } from "../backend/src/config/index.js";

interface IJwtPayload {
  id: string;
  exp: number;
}

export const tokenVerification: RequestHandler = async (req, res, next) => {
  const token = req?.cookies?.myToken;

  // console.log("req.cookies: ", token); //it's a security vulnerability to print token in production

  if (!token) {
    res
      .status(401)
      .send({ message: "Include http-only credentials with every request!" });
    return;
  }

  try {
    const decodedData = jwt.verify(token, SECRET) as IJwtPayload;

    console.log("token approved");

    req.body.decodedData = decodedData;

    next();
  } catch (err) {
    res
      .cookie("myToken", "", {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(401)
      .send({ message: "Invalid token!" });

    console.log("🚀 ~ tokenVerification.ts:22 ~ ~ err:", err);
  }
};
