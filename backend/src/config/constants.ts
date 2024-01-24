import { type CookieOptions } from "express";

export const STATUS_CODES = {
  // Information
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,

  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirect
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENTLY_REDIRECT: 307,

  // Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server Error
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

type TStatusCodes = typeof STATUS_CODES;
export type STATUS_CODES_TYPE = TStatusCodes[keyof TStatusCodes];

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  //   signed: true,
  //   secure: process.env.NODE_ENV === "development" ? false : true,
  secure: true,
};
// const cookieOptions = { httpOnly: true, secure: true };
