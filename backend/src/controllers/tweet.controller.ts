import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ITweet } from "../types/index.js";
import { MESSAGES, STATUS_CODES } from "../config/constants.js";

// remove if not being used less then 1
const ObjectId = mongoose.Types.ObjectId;

const validateContent = (str: any): string => {
  // remove after express validation
  if (!str || typeof str !== "string" || str.length > 1000)
    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.CONTENT_MISSING);

  return str.trim();
};

const createTweet = asyncHandler(async (req, res) => {
  const content = validateContent(req.body.content);

  const tweetDoc: ITweet = {
    content,
    owner: new ObjectId(req.verifiedUser._id),
  };

  const tweet = await Tweet.create(tweetDoc);

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, tweet, MESSAGES.TWEET_SUCCESS));
});

const getRandomTweets = asyncHandler(async (req, res) => {
  // TODO: return tweets with most likes from different users

  const tweet = await Tweet.find()
    .limit(100)
    .populate({ path: "owner", select: "userName fullName avatar" });

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, tweet, MESSAGES.TWEETS_FETCHED));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.INVALID_USER_ID);

  const tweet = await Tweet.find({ owner: new ObjectId(userId) }).select(
    "-owner",
  );

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, tweet, MESSAGES.TWEETS_FETCHED));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const content = validateContent(req.body.content);

  if (!mongoose.isValidObjectId(tweetId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Tweet Id!");

  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { content },
    { new: true },
  );

  if (!tweet) throw new ApiError(STATUS_CODES.NOT_FOUND, "Tweet not found!");

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, tweet, "Tweet updated successfully!"),
    );
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

export {
  createTweet,
  getRandomTweets,
  getUserTweets,
  updateTweet,
  deleteTweet,
};
