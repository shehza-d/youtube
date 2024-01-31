import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import { PORT } from "./config/index.js";

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () =>
      console.log(`⚙️  Server running at port ==>> ${PORT}`),
    );

    app.on("error", (err) => console.log("🚀 ~ main file:", err));
  } catch (err) {
    console.log("🚀 ~ main file ~ err:", err);
  }
})();
