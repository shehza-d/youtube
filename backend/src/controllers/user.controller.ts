import fs from "node:fs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/fileUpload.js";
import { generateAccessAndRefreshTokens } from "../utils/generateTokens.js";
import { REFRESH_TOKEN_SECRET } from "../config/index.js";
import { cookieOptions } from "../config/constants.js";
import { IAccessTokenPayload, IUser } from "../types/index.js";

// Register of Sign-up
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

  const avatarLocalPath = files?.avatar[0]?.path;
  const coverImageLocalPath = files?.coverImage?.length
    ? files.coverImage[0].path
    : "";

  if (existedUser) {
    fs.unlinkSync(avatarLocalPath);
    fs.unlinkSync(coverImageLocalPath);
    throw new ApiError(409, "User with same email or username already exists");
  }

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required 1");

  const avatar = await uploadFile(avatarLocalPath);
  const coverImage = await uploadFile(coverImageLocalPath);

  if (!avatar) throw new ApiError(400, "Avatar file is required 2"); //testing 2

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
    throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
});

// testing what is being returned
const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!(userName || email))
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({ $or: [{ userName }, { email }] });
  //.select('-password')
  if (!user) throw new ApiError(404, "User does not exist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = { ...user, refreshToken };
  // const loggedInUser = { ...user?._doc, refreshToken };

  // delete loggedInUser.password;

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, loggedInUser, "User logged In Successfully"));
});

// testing left
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.verifiedUser._id,
    { $unset: { refreshToken: 1 } }, // unset removes the field
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

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    REFRESH_TOKEN_SECRET
  ) as IAccessTokenPayload;

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

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.verifiedUser._id)!;

  const isPasswordCorrect = user?.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect || !user)
    throw new ApiError(400, "Invalid old password");

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.verifiedUser, "User fetched successfully"));
});

// testing left // patch
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { userName, fullName, email } = req.body;

  if (!(userName || fullName || email))
    throw new ApiError(400, "Fields are missing");

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
    .status(200)
    .json(
      new ApiResponse(200, user || {}, "Account details updated successfully")
    );
});

// testing left
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

  //TODO: delete old image from cloudinary - assignment

  const avatar = await uploadFile(avatarLocalPath);

  if (!avatar) throw new ApiError(400, "Error while uploading on avatar");

  const user = await User.findByIdAndUpdate(
    req.verifiedUser._id,
    { $set: { avatar } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, user || {}, "Avatar image updated successfully")
    );
});

// testing left
const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  //TODO: delete old image - assignment

  const coverImage = await uploadFile(coverImageLocalPath);

  if (!coverImage) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.verifiedUser?._id,
    { $set: { coverImage } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user || {}, "Cover image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) throw new ApiError(400, "Username is missing!");

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

  if (!channel.length) throw new ApiError(404, "Channel not found!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully")
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
    .status(200)
    .json(
      new ApiResponse(
        200,
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
