import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: "LCDDot",
            local: "LCDDot",
            src: "./src/assets/fonts/*.ttf",
          },
        ],
        display: "auto",
        preload: true,
        injectTo: "head-prepend",
      },
    }),
  ],
});
