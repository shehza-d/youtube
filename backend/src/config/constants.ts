import { type CookieOptions } from "express";

export const MESSAGES = {
  SERVER_RUNNING:
    "💯 Youtube Clone Server by Shehzad is up and running smoothly! 🌟",
  USER_NOT_FOUND: "User not found!",
  INVALID_USER_ID: "Invalid User Id!",
  UNKNOWN: "Something went wrong! 🤷‍♂️",
  MISSING_FIELDS: "All fields are required!",

  TOKEN_EXPIRED: "Invalid Token  jwt token expired", // TODO: improve
  USER_REGISTERING_FAIL: "Something went wrong while registering the user",
  UNAUTHORIZE: "Unauthorized request! Include http-only credential",

  CONTENT_MISSING: "Tweet can not be empty!",
  TWEET_SUCCESS: "Tweeted successfully! 🐦",
  TWEETS_FETCHED: "Tweets fetched successfully!",
} as const;

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
