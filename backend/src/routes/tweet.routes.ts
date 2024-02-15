import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createTweet,
  getRandomTweets,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

router.route("/").get(getRandomTweets);

router.use(verifyJWT); // Apply verifyJWT middleware to routes below

router.route("/").post(createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export { router as tweetRouter };
