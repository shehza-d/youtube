import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ITweet } from "../types/index.js";
import { STATUS_CODES } from "../config/constants.js";

// remove if not being used less then 1
const ObjectId = mongoose.Types.ObjectId;

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || typeof content !== "string" || content.length > 1000)
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Content is required");

  const tweetDoc: ITweet = {
    content,
    owner: new ObjectId(req.verifiedUser._id),
  };

  const tweet = await Tweet.create(tweetDoc);

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, tweet, "Tweeted successfully! 🐦"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid User Id!");

  const tweet = await Tweet.find({ owner: new ObjectId(userId) });

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, tweet, "Tweets fetched successfully!"),
    );
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!mongoose.isValidObjectId(tweetId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Tweet Id!");

  const tweet = await Tweet.findByIdAndDelete(tweetId);

  if (!tweet) throw new ApiError(STATUS_CODES.NOT_FOUND, "Tweet not found!");

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Tweet deleted successfully!"),
    );
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
