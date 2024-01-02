import { User } from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/fileUpload.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { generateAccessAndRefreshTokens } from "../utils/generateTokens.js";
import { REFRESH_TOKEN_SECRET } from "../config/index.js";

const cookieOptions = { httpOnly: true, secure: true };

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (
    [fullName, email, userName, password].some(
      (field) => field?.trim() === "" || !field
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  console.log("files", files);

  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (existedUser)
    throw new ApiError(409, "User with same email or username already exists");

  const avatarLocalPath = files?.avatar[0]?.path;
  const coverImageLocalPath = files?.coverImage?.length
    ? files.coverImage[0].path
    : "";

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required 1");

  const avatar = await uploadFile(avatarLocalPath);
  const coverImage = await uploadFile(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "Avatar file is required 2");

  const user = await User.create({
    fullName,
    avatar,
    coverImage: coverImage || "",
    email: email.toLowerCase(),
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!(userName || email))
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({ $or: [{ userName }, { email }] });

  if (!user) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = { ...user?._doc, refreshToken };

  delete loggedInUser.password;

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, loggedInUser, "User logged In Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.body.user._id,
    { $set: { refreshToken: null } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

  const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id);

  if (!user) throw new ApiError(401, "Invalid refresh token");

  if (incomingRefreshToken !== user?.refreshToken)
    throw new ApiError(401, "Refresh token is expired");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token refreshed"
      )
    );
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
