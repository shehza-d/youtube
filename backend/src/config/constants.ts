import { type CookieOptions } from "express";

export const DB_NAME = "***";
export const APP_NAME = "My Youtube";

export const STATUS_CODES = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  CONFLICT: 409,
} as const;

export type STATUS_CODES_TYPE = typeof STATUS_CODES;

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  //   signed: true,
  //   secure: process.env.NODE_ENV === "development" ? false : true,
  secure: true,
};
// const cookieOptions = { httpOnly: true, secure: true };
