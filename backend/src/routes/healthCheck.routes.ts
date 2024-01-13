import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller.js";

const router = Router();

router.route("/").get(healthCheck);

export { router as healthCheckRouter };
