import { MONGO_URI, DB_NAME } from "../config/index.js";
import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URI);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance}`);
    console.log(
      `\n\n 2 MongoDB connected !! DB HOST: ${connectionInstance.connection}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export { connectDB };

// let client: MongoClient;
// let database: Db;

// try {
//   client = new MongoClient(MONGO_URI);
//   database = client.db(DB_NAME);
// } catch (err) {
//   console.log("🚀 ~ file: db.ts:16 ~ err:", err);
// }

// // to know if db connection is successful
// const testDB = async () => {
//   try {
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db(DB_NAME).command({ ping: 1 });
//     console.log("Pinged your deployment. Successfully connected to MongoDB");
//   } catch (err) {
//     console.log("🚀 file:index.mts:26 ~ err:", err);
//     await client.close();
//     process.exit(1);
//   }
// };
// testDB();

// process.on("SIGINT", async (code) => {
//   // Code to run before the server exits
//   console.log(`Server is terminating with code ${code}`);

//   // Cleanup code
//   await client.close();
//   process.exit(0);
// });

// export { database as db };
