import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ACCESS_TOKEN_SECRET } from "../config/index.js";
import { IAccessTokenPayload } from "../types/index.js";
import { STATUS_CODES, MESSAGES } from "../config/constants.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const { accessToken } = req?.cookies;

    if (!accessToken)
      throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZE);

    const decodedData = (await jwt.verify(
      accessToken,
      ACCESS_TOKEN_SECRET,
    )) as IAccessTokenPayload;

    req.verifiedUser = decodedData;

    next();
  } catch (err: any) {
    console.log("🚀 file: auth.middleware.ts 34 ~ verifyJWT ~ err:", err);

    // res
    //  .cookie("myToken", "", {
    //   maxAge: 1,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // })
    // .status(401)
    // .send({ message: "Invalid token!" });

    throw new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.TOKEN_EXPIRED);
  }
});
