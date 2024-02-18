import mongoose, { isValidObjectId, Types } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/index.js";
import { STATUS_CODES } from "../config/constants.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.verifiedUser._id;

  if (!mongoose.isValidObjectId(channelId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Channel Id!");

  if (channelId === userId)
    throw new ApiError(STATUS_CODES.CONFLICT, "Can not subscribe to yourself!");

  const channelExists = await User.findById(channelId);

  if (!channelExists)
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Channel not found!");

  const subscriptionDoc = { channel: channelId, subscriber: userId };

  const subscription = await Subscription.findOne(subscriptionDoc);

  if (!subscription) {
    await Subscription.create(subscriptionDoc); //  new subscription

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, `Subscribed successfully!`));
  } else {
    await Subscription.findByIdAndDelete(subscription._id);

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, `Unsubscribed successfully!`));
  }
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.isValidObjectId(channelId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Channel Id!");

  const subscriptions = await Subscription.aggregate([
    { $match: { subscriber: new Types.ObjectId(channelId) } },
    {
      $lookup: {
        // Population
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] },
      },
    },
    { $limit: 200 },
    {
      $project: {
        _id: 1,
        userName: 1,
        fullName: 1,
        avatar: 1,
        subscriber: 1,
        channel: 1,
      },
    },
  ]);

  const subscriptionStatus = subscriptions.length
    ? "Subscription retrieved"
    : "User has not subscribed to any channel";

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, subscriptionStatus, subscriptions));
});

const getSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.isValidObjectId(channelId))
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "Invalid Channel Id!");

  const subscriptions = await Subscription.aggregate([
    { $match: { channel: new Types.ObjectId(channelId) } },
    {
      $lookup: {
        from: "users", // Population
        localField: "subscriber",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] },
      },
    },
    { $limit: 200 },
    {
      $project: {
        _id: 1,
        userName: 1,
        fullName: 1,
        avatar: 1,
        subscriber: 1,
        channel: 1,
      },
    },
  ]);

  const subscriptionStatus = subscriptions.length
    ? "Subscribers list retrieved"
    : "User does not have any subscriber";

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, subscriptionStatus, subscriptions));
});

export { toggleSubscription, getSubscribers, getSubscribedChannels };
