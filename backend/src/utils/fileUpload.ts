// Cloudinary
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../config/index.js";

type Folder =
  | "thumbnails"
  | "videos"
  | "avatars"
  | "banners"
  | "post-images"
  | (string & object);

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadFile = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "youtube-clone",
    });

    // file has been uploaded successfully
    console.log("file is uploaded on cloudinary ", response); // remove

    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed

    return response;
  } catch (err) {
    console.log("🚀 ~ file: fileUpload.ts:41 ~ uploadFile ~ err:", err);

    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadFile };
