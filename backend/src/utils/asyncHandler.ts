import { type RequestHandler } from "express";
import { ApiError } from "./ApiError.js";

// with this we don't have to use try catch in every async function or controller

// Higher Order function
const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  // try {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
  // } catch (err: any) {
  //   throw new ApiError(500, err?.message || "Something wentt wrong!🤷‍♂️");// test this
  // }
};

export { asyncHandler };

// const asyncHandler = (requestHandler) => async (req, res, next) => {
//     try {
//         await requestHandler(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
