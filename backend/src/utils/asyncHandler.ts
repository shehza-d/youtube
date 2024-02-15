import { type RequestHandler } from "express";
import { MESSAGES } from "../config/constants.js";

// with this asyncHandler we don't have to use try catch in every async function or controller

// Higher Order function
const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    //
    try {
      await requestHandler(req, res, next);
    } catch (err: any) {
      console.log("🚀 ~ asyncHandler ~ err:", err);

      const statusCode = err.statusCode || 500;
      const message = err?.message || MESSAGES.UNKNOWN;

      res
        .status(statusCode)
        .json({ statusCode, message, data: null, success: false });
      // next(err);
    }
  };
};

// const asyncHandler = (requestHandler: RequestHandler): RequestHandler =>
//      (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
// };

export { asyncHandler };
