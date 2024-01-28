import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { IComment } from "../types/index.js";

const commentSchema = new Schema(
  {
    content: { type: String, required: true },

    // testing this can be error
    video: { type: Schema.ObjectId, ref: "Video" },

    owner: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = model<IComment>("Comment", commentSchema);
