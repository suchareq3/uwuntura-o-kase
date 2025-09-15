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
            src: "./src/assets/fonts/LCDDot.ttf",
          },
          {
            name: "Eurostile",
            local: "Eurostile",
            src: "./src/assets/fonts/Eurostile.ttf",
          },
          {
            name: "VT323",
            local: "VT323",
            src: "./src/assets/fonts/VT323.ttf",
          },
          {
            name: "Questrial",
            local: "Questrial",
            src: "./src/assets/fonts/Questrial.ttf",
          }
        ],
        display: "auto",
        preload: true,
        injectTo: "head-prepend",
      },
    }),
  ],
  server: {
    host: "10.5.50.229",
    port: 5173,
  }
});
