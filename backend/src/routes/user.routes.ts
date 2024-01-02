import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/auth.js";
// import {
//   getUserProfile,
//   getAllDoctors,
//   checkValidToken,
// } from "../controllers/users.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


// router.get("/isValidToken", checkValidToken); //remove
// router.get("/profile", getUserProfile);
// router.get("/profile/:id", getUserProfile);
// router.get("/profiles", getAllDoctors);

export { router as userRouter };
