import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  uploadFile,
} from "../utils/index.js";
import { STATUS_CODES } from "../config/constants.js";
import { IVideo } from "../types/index.js";
import fs from "node:fs";

// remove if not being used less then 1
const ObjectId = mongoose.Types.ObjectId;

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) throw new ApiError(STATUS_CODES.BAD_REQUEST, "Title is required");

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const videoFile = files?.videoFile?.[0];
  const thumbnailFile = files?.thumbnail?.[0];

  if (
    videoFile?.mimetype?.split("/")[0] != "video" ||
    (thumbnailFile && thumbnailFile?.mimetype?.split("/")[0] != "image") ||
    videoFile?.size > 100 * 1_000_000 || // 100MB is the limit here
    thumbnailFile?.size > 6 * 1_000_000 // 6MB is the limit here
  ) {
    // Deleting video if they are uploaded to server
    videoFile && fs.unlinkSync(videoFile?.path);
    thumbnailFile && fs.unlinkSync(thumbnailFile?.path);

    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "Upload Video less then 100MB and thumbnail in correct formats!"
    );
  }

  const videoUrl = await uploadFile(videoFile?.path);
  const thumbnail = await uploadFile(thumbnailFile?.path);

  if (!videoUrl)
    throw new ApiError(
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Error while uploading video!"
    );

  const videoDoc: Partial<IVideo> = {
    videoFile: videoUrl.url,
    title,
    description: description || "",
    owner: new ObjectId(req.verifiedUser._id),
    duration: videoUrl?.duration,
    thumbnail: thumbnail?.url || "",
  };

  const video = await Video.create(videoDoc);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, video, "Video uploaded successfully!")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Video Id!");

  const video = await Video.findById(videoId);

  if (!video) throw new ApiError(STATUS_CODES.NOT_FOUND, "Video not found!");

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, video, "Video fetched successfully!")
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  uploadVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
