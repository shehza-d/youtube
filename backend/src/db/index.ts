import mongoose from "mongoose";
import { DB_NAME, MONGO_URI } from "../config/index.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
    });

    console.log(`\n🌿 MongoDB connected ! 🍃\n`);

    mongoose.connection.on(
      "error",
      console.error.bind(console, "Connection error:"),
    );

    process.on("SIGINT", () => {
      // Cleanup code
      mongoose.connection.close();

      console.log("Mongoose connection closed due to application termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
    process.exit(1); // Exited with error
  }
};

export { connectDB };
