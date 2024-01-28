import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ACCESS_TOKEN_SECRET } from "../config/index.js";
import { IAccessTokenPayload } from "../types/index.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const { accessToken } = req?.cookies;

    // console.log("accessToken", accessToken);

    if (!accessToken)
      throw new ApiError(
        401,
        "Unauthorized request! Include http-only credential",
      );

    const decodedData = jwt.verify(
      accessToken,
      ACCESS_TOKEN_SECRET,
    ) as IAccessTokenPayload;

    req.verifiedUser = decodedData;

    next();
  } catch (err: any) {
    // res
    // .cookie("myToken", "", {
    //   maxAge: 1,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // })
    // .status(401)
    // .send({ message: "Invalid token!" });

    console.log("🚀 ~ file: auth.ts:24 ~ verifyJWT ~ err:", err);
    throw new ApiError(401, err?.message || "Invalid Token");
  }
});
