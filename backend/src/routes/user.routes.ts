import { Router } from "express";
import { upload, verifyJWT } from "../middleware/index.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser,
);
router.route("/login").post(loginUser);

// secured routes
router.route("/refresh-token").post(refreshAccessToken);

router.use(verifyJWT);

router.route("/logout").post(logoutUser);

router.route("/current-user").get(getCurrentUser);
router.route("/change-password").post(changeCurrentPassword);
router.route("/update-account").patch(updateAccountDetails);

router.route("/c/:username").get(getUserChannelProfile);
router.route("/history").get(getWatchHistory);

router.route("/avatar").patch(upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(upload.single("coverImage"), updateUserCoverImage);

export { router as userRouter };
