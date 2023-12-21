class ApiError extends Error {
  readonly statusCode: number;
  readonly data: object | null;
  readonly success: boolean;
  readonly errors: unknown[];

  constructor(
    statusCode: number,
    message = "Something went wrong!🤷‍♂️",
    errors = [],
    stack = ""
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
