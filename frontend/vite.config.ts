// https://medium.com/@mun1013/guide-to-migrating-from-create-react-app-cra-to-vite-5516f55aa410
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths"; // for easy importing
import tailwindcss from "tailwindcss";
// import path from "path";

// const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",

  plugins: [react(), viteTsconfigPaths()],

  server: {
    open: true, // this ensures that the browser opens upon server start
    port: 3000, // this sets a default port to 3000
  },
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
