import fs from "node:fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/fileUpload.js";
import { generateAccessAndRefreshTokens } from "../utils/generateTokens.js";
import { REFRESH_TOKEN_SECRET } from "../config/index.js";
import { STATUS_CODES, cookieOptions } from "../config/constants.js";
import { IAccessTokenPayload, IUser } from "../types/index.js";

// Register of Sign-up // validation/testing left
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (
    [fullName, email, userName, password].some(
      (field) => field?.trim() === "" || !field
    )
  ) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "All fields are required");
  }

  console.log("files", files);

  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

  const avatarLocalPath = files?.avatar[0]?.path;
  console.log("🚀 ~ registerUser ~ avatarLocalPath:", avatarLocalPath);
  const coverImageLocalPath = files?.coverImage?.length
    ? files.coverImage[0].path
    : "";
  console.log("🚀 ~ registerUser ~ coverImageLocalPath:", coverImageLocalPath);

  if (existedUser) {
    fs.unlinkSync(avatarLocalPath);
    fs.unlinkSync(coverImageLocalPath);
    throw new ApiError(
      STATUS_CODES.CONFLICT,
      "User with same email or username already exists"
    );
  }

  if (!avatarLocalPath)
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Avatar file is required 1");

  const avatar = await uploadFile(avatarLocalPath);
  console.log("🚀 ~ registerUser ~ avatar:", avatar);
  const coverImage = await uploadFile(coverImageLocalPath);
  console.log("🚀 ~ registerUser ~ coverImage:", coverImage);

  if (!avatar)
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Avatar file is required 2"); //testing 2

  const userDoc = {
    fullName,
    avatar,
    coverImage: coverImage || "",
    email: email.toLowerCase(),
    password,
    userName: userName.toLowerCase(),
  };

  const user = await User.create(userDoc);

  // remove and replace with 1 query
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Something went wrong while registering the user"
    );

  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        createdUser,
        "User registered Successfully"
      )
    );
});

// testing what is being returned
const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!(userName || email))
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Username or email is required"
    );

  const user = await User.findOne({ $or: [{ userName }, { email }] });
  //.select('-password')
  if (!user) throw new ApiError(STATUS_CODES.NOT_FOUND, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid)
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser: Partial<IUser> = { ...user.toObject(), refreshToken };

  delete loggedInUser?.password;

  return res
    .status(STATUS_CODES.OK)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        loggedInUser,
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.verifiedUser._id,
    { $unset: { refreshToken: 1 } }, // unset removes the field
    { new: true }
  );

  return res
    .status(STATUS_CODES.OK)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(STATUS_CODES.OK, null, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken)
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Unauthorized request");

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    REFRESH_TOKEN_SECRET
  ) as IAccessTokenPayload;

  const user = await User.findById(decodedToken?._id);

  if (!user)
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Invalid refresh token");

  if (incomingRefreshToken !== user?.refreshToken)
    throw new ApiError(STATUS_CODES.UNAUTHORIZED, "Refresh token is expired");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(STATUS_CODES.OK)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        { accessToken, refreshToken },
        "Access token refreshed"
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Please send old and new password fields"
    );

  const user = await User.findById(req.verifiedUser._id)!;

  const isPasswordCorrect = await user?.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect || !user)
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid old password");

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Password changed successfully")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.verifiedUser._id,
    email: req.verifiedUser.email,
    fullName: req.verifiedUser.fullName,
    userName: req.verifiedUser.userName,
  };

  return res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { userName, fullName, email } = req.body;

  if (!(userName || fullName || email))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Fields are missing!");

  let newUser: Partial<IUser> = {};

  userName && (newUser.userName = userName);
  fullName && (newUser.fullName = fullName);
  email && (newUser.email = email);

  const user = await User.findByIdAndUpdate(
    req.verifiedUser._id,
    { $set: newUser },
    { new: true }
  ).select("-password");

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        user,
        "Account details updated successfully"
      )
    );
});

// testing left
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath)
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Avatar file is missing");

  //TODO: delete old image from cloudinary - assignment

  const avatar = await uploadFile(avatarLocalPath);

  if (!avatar)
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Error while uploading on avatar"
    );

  const user = await User.findByIdAndUpdate(
    req.verifiedUser._id,
    { $set: { avatar } },
    { new: true }
  ).select("-password");

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        user || null,
        "Avatar image updated successfully"
      )
    );
});

// testing left
const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Cover image file is missing");
  }

  //TODO: delete old image - assignment

  const coverImage = await uploadFile(coverImageLocalPath);

  if (!coverImage) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Error while uploading on avatar"
    );
  }

  const user = await User.findByIdAndUpdate(
    req.verifiedUser?._id,
    { $set: { coverImage } },
    { new: true }
  ).select("-password");

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        user || null,
        "Cover image updated successfully"
      )
    );
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim())
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Username is missing!");

  const channel = await User.aggregate([
    {
      $match: { username: username.toLowerCase() },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: { $size: "$subscribers" },
        channelsSubscribedToCount: { $size: "$subscribedTo" },
        isSubscribed: {
          $cond: {
            if: { $in: [req.verifiedUser._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel.length)
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Channel not found!");

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        channel[0],
        "User channel fetched successfully"
      )
    );
});

// not tested
const getWatchHistory = asyncHandler(async (req, res) => {
  //
  const user = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.verifiedUser._id) },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: { fullName: 1, userName: 1, avatar: 1 },
                },
              ],
            },
          },
          {
            $addFields: { owner: { $first: "$owner" } },
          },
        ],
      },
    },
  ]);

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        user[0].watchHistory,
        "Watch history fetched successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
