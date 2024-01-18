import { Schema, model } from "mongoose";
import { ILike } from "../types/index.js";

// testing this can be error
const ObjectId = Schema.Types.ObjectId;

const likeSchema = new Schema(
  {
    // (optional) if a video is being liked
    video: { type: ObjectId, ref: "Video" },

    // (optional) if like is related to a comment
    comment: { type: ObjectId, ref: "Comment" },

    // (optional) if a tweet is being liked
    tweet: { type: ObjectId, ref: "Tweet" },

    likedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Like = model<ILike>("Like", likeSchema);
