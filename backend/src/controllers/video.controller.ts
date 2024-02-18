import mongoose, { isValidObjectId, type PipelineStage } from "mongoose";
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
  const {
    search_query,
    userId,
    sortBy = "views",
    sortType,
    page = 1,
  } = req.query;
  //TODO: get all videos based on query, sort, pagination

  const sortOptions = {
    sortType: "desc" ? -1 : 1,
  };

  const pipeline: PipelineStage[] = [{ $match: { isPublished: true } }];

  if (search_query) {
    pipeline.push({
      $search: {
        index: "search-videos",
        text: { query: search_query, path: ["title", "description"] },
      },
    });
  } else if (userId) {
    // pipeline.push({
    // $match: { owner: new mongoose.Types.ObjectId(userId) },
    // });
  }

  if (sortBy && sortType) {
    //console.log(sortBy, sortType);
    pipeline.push({
      $sort: {
        // [sortBy]: sortType === "asc" ? 1 : -1,
      },
    });
  } else {
    pipeline.push({ $sort: { createdAt: -1 } });
  }

  const limit = Number(req.query?.limit) || 10;

  const videos = await Video.find({
    $or: [{ title: { $search: search_query } }, { owner: userId }],
  })
    .skip(+page)
    .limit(limit)
    .sort({ _id: -1 }); //Number(sortBy) });

  // console.log("🚀 ~ getAllVideos ~ videos:", videos);

  res.send(videos);
});

// testing again for promise.allSettle
const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const videoFile = files?.videoFile?.[0];
  const thumbnailFile = files?.thumbnail?.[0];

  try {
    if (!title)
      throw new ApiError(STATUS_CODES.BAD_REQUEST, "Title is required");

    if (
      videoFile?.mimetype?.split("/")[0] != "video" ||
      (thumbnailFile && thumbnailFile?.mimetype?.split("/")[0] != "image") ||
      videoFile?.size > 100 * 1_000_000 || // 100MB is the limit here
      thumbnailFile?.size > 6 * 1_000_000 // 6MB is the limit here
    ) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Upload Video less then 100MB and thumbnail in correct formats!",
      );
    }

    const [videoUploadResponse, thumbnailUploadResponse] =
      await Promise.allSettled([
        uploadFile(videoFile?.path),
        uploadFile(thumbnailFile?.path),
      ]);

    if (
      videoUploadResponse?.status == "rejected" ||
      thumbnailUploadResponse?.status == "rejected"
    )
      throw new ApiError(
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        "Error while uploading video!",
      );

    const videoDoc: Partial<IVideo> = {
      videoFile: videoUploadResponse.value?.url,
      title,
      description: description || "",
      owner: new ObjectId(req.verifiedUser._id),
      duration: videoUploadResponse.value?.duration,
      thumbnail: thumbnailUploadResponse?.value?.url || "",
    };

    const video = await Video.create(videoDoc);

    res
      .status(STATUS_CODES.OK)
      .json(
        new ApiResponse(STATUS_CODES.OK, "Video uploaded successfully!", video),
      );
  } finally {
    // Cleanup: Deleting local temporarily saved files on the server
    videoFile && fs.unlinkSync(videoFile?.path);
    thumbnailFile && fs.unlinkSync(thumbnailFile?.path);
  }
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
      new ApiResponse(STATUS_CODES.OK, "Video fetched successfully!", video),
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Video Id!");

  const video = await Video.findByIdAndDelete(videoId);

  if (!video) throw new ApiError(STATUS_CODES.NOT_FOUND, "Video not found!");

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, "Video deleted successfully!"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Video Id!");

  const video = await Video.findByIdAndUpdate(
    videoId,
    [{ $set: { isPublished: { $not: "$isPublished" } } }],
    { new: true },
  );

  if (!video) throw new ApiError(STATUS_CODES.NOT_FOUND, "Video not found!");

  const publishStatus = video?.isPublished ? "published" : "unpublished";
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, `Video ${publishStatus} successfully!`),
    );
});

export {
  getAllVideos,
  uploadVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
