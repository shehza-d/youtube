import { User } from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/fileUpload.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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

export { registerUser };
