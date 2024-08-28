import { Router } from "express";
import { upload, verifyJWT } from "../middleware/index.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  uploadVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";

const router = Router();

router
  .route("/")
  .get(getAllVideos) // left
  .post(
    verifyJWT,
    // done
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    uploadVideo,
  );

router
  .route("/:videoId")
  .get(verifyJWT, getVideoById) // done
  .delete(verifyJWT, deleteVideo) // done
  .patch(verifyJWT, upload.single("thumbnail"), updateVideo); // left

router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus); // done

export { router as videoRouter };
