import mongoose, { Schema } from "mongoose";
import { ISubscription } from "../types/index.js";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is subscribing
      ref: "User",
    },

    channel: {
      type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing to
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
