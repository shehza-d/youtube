import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { PORT } from "./config/index.js";

dotenv.config({ path: "./env" }); // remove

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`⚙️ Server running at port ==>> ${PORT}`)
    );
    app.on("error", (error) => console.log("🚀 ~ index.ts:17 ~ error:", error));
  } catch (err) {
    console.log("🚀 ~ file: index.ts:12 ~ err:", err);
  }
})();
