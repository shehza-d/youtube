import type { Request, Response } from "express";
import { isValidObjectId, Types } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/index.js";
import { STATUS_CODES } from "../config/constants.js";

const toggleLikeHandler = async (
  req: Request,
  res: Response,
  id: string,
  route: "video" | "comment" | "tweet",
) => {
  if (!isValidObjectId(id))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, `Invalid ${route} Id!`);

  const likeDoc = {
    [route]: id,
    likedBy: req.verifiedUser._id,
  };

  const like = await Like.findOne(likeDoc);

  // if subscription is not found we will create new else we will delete the found sub for toggle
  if (!like) await Like.create(likeDoc);
  else await Like.findByIdAndDelete(like._id);

  const likeStatus = `${route} ${!like ? "like" : "unlike"} successfully!`;
  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, likeStatus, like));
};

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  await toggleLikeHandler(req, res, videoId, "video");
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  await toggleLikeHandler(req, res, commentId, "comment");
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  await toggleLikeHandler(req, res, tweetId, "tweet");
});

const getLikedVideos = asyncHandler(async (req, res) => {
  // const videosLiked = await Like.find({
  //   likedBy: req.verifiedUser._id,
  //   video: { $exists: true }, // exists only bring videos liked by loggedIn user not tweet or comments
  // })
  // .populate("video");

  const videosLiked = await Like.aggregate([
    {
      $match: {
        likedBy: new Types.ObjectId(req.verifiedUser._id),
        video: { $exists: true }, // exists only bring videos liked by loggedIn user not tweet or comments
      },
    },
    {
      $lookup: {
        // Population
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $lookup: {
        // Population
        from: "users",
        localField: "video.owner",
        foreignField: "_id",
        as: "videoOwner",
        pipeline: [{ $project: { userName: 1, fullName: 1, avatar: 1 } }],
      },
    },
    { $unwind: "$videoOwner" },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ["$video", 0] }, "$$ROOT"] },
      },
    },
    // { $match: { isPublished: true } }, // this avoids showing videos that are unpublished
    { $limit: 100 },
    {
      $project: {
        _id: 1,
        thumbnail: 1,
        title: 1,
        duration: 1,
        isPublished: 1,
        videoOwner: 1,
      },
    },
  ]);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        "All liked videos fetched successfully!",
        videosLiked,
      ),
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
