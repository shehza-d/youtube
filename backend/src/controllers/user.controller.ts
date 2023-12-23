import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;
  console.log(
    "🚀 ~ file: user.controller.ts:11 ~ registerUser ~ body:",
    req.body
  );
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
    throw new ApiError(409, "User with email or username already exists");

  const avatarLocalPath = files?.avatar[0]?.path;
  //   const coverImageLocalPath = files?.coverImage[0]?.path;
  //   const avatarLocalPath = files?.["avatar"][0]?.path;

  let coverImageLocalPath = "";
  if (files && Array.isArray(files.coverImage) && files.coverImage.length > 0) {
    coverImageLocalPath = files.coverImage[0].path;
  }

  //   if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatar = await uploadFile(avatarLocalPath);
  const coverImage = await uploadFile(coverImageLocalPath); // if cover img is not sent by user don't run this function remove

  //   if (!avatar) throw new ApiError(400, "Avatar file is required");

  const user = await User.create({
    fullName,
    avatar: avatar,
    coverImage: coverImage || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  console.log("🚀 ~ file: user.controller.ts:55 ~ registerUser ~ user:", user);

  //   const createdUser = await User.findById(user._id).select(
  //     "-password -refreshToken"
  //   );

  //   if (!createdUser)
  //     throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "User registered Successfully"));
});

// asyncHandler;
export { registerUser };
