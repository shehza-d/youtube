import { type RequestHandler } from "express";
// import { ApiError } from "./ApiError.js";

// with this we don't have to use try catch in every async function or controller

// Higher Order function
const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next); //try removing this await
    } catch (err) {
      next(err);
      // throw new ApiError(500, err?.message || "Something wentt wrong!🤷‍♂️"); // test this
    }
  };
};

// const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

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
