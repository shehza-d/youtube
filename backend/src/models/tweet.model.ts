import { Schema, model } from "mongoose";
import { ITweet } from "../types/index.js";

const tweetSchema = new Schema(
  {
    content: { type: String, required: true },

    owner: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export const Tweet = model<ITweet>("Tweet", tweetSchema);
