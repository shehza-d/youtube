import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  uploadVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";
import { upload, verifyJWT } from "../middleware/index.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
  .route("/")
  .get(getAllVideos) // left
  .post(
    // done
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    uploadVideo
  );

router
  .route("/:videoId")
  .get(getVideoById) // done
  .delete(deleteVideo)
  .patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export { router as videoRouter };
