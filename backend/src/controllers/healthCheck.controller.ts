import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { STATUS_CODES, MESSAGES } from "../config/constants.js";

const healthCheck = asyncHandler(async (_, res) =>
  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, {}, MESSAGES.SERVER_RUNNING)),
);

export { healthCheck };
