import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        dimensions: false,
        svgProps: {
          width: "100%",
          height: "100%",
        },
      },
    }),
    react(),
  ],
  build: {
    sourcemap: "inline",
  },
});
