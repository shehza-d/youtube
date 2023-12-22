// npm i dotenv
import "dotenv/config";

const PORT = process.env.PORT || 3003;
const DB_NAME = process.env.DB_NAME || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_CLUSTER = process.env.DB_CLUSTER || "";
const SECRET = process.env.JWT_SECRET || "";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "";
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

if (
  !DB_NAME ||
  !DB_PASSWORD ||
  !DB_USERNAME ||
  !DB_CLUSTER ||
  !SECRET ||
  !ACCESS_TOKEN_SECRET ||
  !ACCESS_TOKEN_EXPIRY ||
  !REFRESH_TOKEN_SECRET ||
  !REFRESH_TOKEN_EXPIRY
)
  throw new Error("Missing environment variable in backend/src/config");

const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export {
  PORT,
  DB_NAME,
  DB_USERNAME,
  SECRET,
  MONGO_URI,
  CORS_ORIGIN,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
