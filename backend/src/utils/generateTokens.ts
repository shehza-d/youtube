import { type Types } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
import { STATUS_CODES } from "../config/constants.js";

export const generateAccessAndRefreshTokens = async (
  userId: Types.ObjectId,
) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new Error();

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Something went wrong while generating token",
    );
  }
};
