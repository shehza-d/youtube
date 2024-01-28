import { Schema, model } from "mongoose";
import { IPlaylist } from "../types/index.js";

const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true },
);

export const Playlist = model<IPlaylist>("Playlist", playlistSchema);
