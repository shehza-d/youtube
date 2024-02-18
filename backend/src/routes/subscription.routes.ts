import { Router } from "express";
import {
  getSubscribedChannels,
  getSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
  .route("/c/:channelId")
  // returns channel list to which user has subscribed
  .get(getSubscribedChannels)
  .post(toggleSubscription);

// returns subscriber list of a user/channel
router.route("/u/:channelId").get(getSubscribers);

export { router as subscriptionRouter };
