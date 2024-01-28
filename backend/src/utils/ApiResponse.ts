import { type STATUS_CODES_TYPE } from "../config/constants.js";

export class ApiResponse {
  readonly statusCode: STATUS_CODES_TYPE;
  readonly data: object | null;
  readonly success: boolean;
  readonly message: string;

  constructor(
    statusCode: STATUS_CODES_TYPE,
    data: object | null,
    message = "Success",
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
