import { type STATUS_CODES_TYPE } from "../config/constants.js";

class ApiError extends Error {
  readonly statusCode: STATUS_CODES_TYPE;
  readonly data: object | null;
  readonly success: boolean;
  readonly errors: unknown[];

  constructor(
    statusCode: STATUS_CODES_TYPE,
    message = "Something went wrong!🤷‍♂️",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
