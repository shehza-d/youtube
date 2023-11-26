// npm i dotenv
import "dotenv/config";

const PORT = process.env.PORT || 3003;
const DB_NAME = process.env.DB_NAME || "youtube";
const DB_USERNAME = process.env.DB_USERNAME || "shehzad";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_CLUSTER = process.env.DB_CLUSTER || "";
const SECRET = process.env.JWT_SECRET || "";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

if (!DB_NAME || !DB_PASSWORD || !DB_USERNAME || !DB_CLUSTER || !SECRET)
  throw new Error("Missing environment variable in backend/src/config");

const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export { PORT, DB_NAME, DB_USERNAME, SECRET, MONGO_URI, CORS_ORIGIN };
