import mongoose, { Schema } from "mongoose";
import { ISubscription } from "../types/index.js";

const subscriptionSchema = new Schema(
  {
    // one who is subscribing
    subscriber: { type: Schema.Types.ObjectId, ref: "User" },

    // one to whom 'subscriber' is subscribing to
    channel: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);
