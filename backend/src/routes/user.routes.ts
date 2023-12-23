import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
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

// router.get("/isValidToken", checkValidToken); //remove
// router.get("/profile", getUserProfile);
// router.get("/profile/:id", getUserProfile);
// router.get("/profiles", getAllDoctors);

export { router as userRouter };
