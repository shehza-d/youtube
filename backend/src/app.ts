import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./config/index.js";

const app = express();

// middleware configuration

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import { healthCheckRouter } from "./routes/healthCheck.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { tweetRouter } from "./routes/tweet.routes.js";
import { subscriptionRouter } from "./routes/subscription.routes.js";
import { videoRouter } from "./routes/video.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
import { likeRouter } from "./routes/like.routes.js";
import { playlistRouter } from "./routes/playlist.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";

// routes declaration
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use("*", (_, res) => res.send("Route not found on Server!")); 

export { app };
