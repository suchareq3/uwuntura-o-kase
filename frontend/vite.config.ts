import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import unfonts from 'unplugin-fonts/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    unfonts({
      custom: {
        families: [
          {
            name: "LCDDot",
            local: "LCDDot",
            src: "./public/fonts/LCDDot.ttf",
          },
          {
            name: "Eurostile",
            local: "Eurostile",
            src: "./public/fonts/Eurostile.ttf",
          },
          {
            name: "VT323",
            local: "VT323",
            src: "./public/fonts/VT323.ttf",
          },
          {
            name: "Questrial",
            local: "Questrial",
            src: "./public/fonts/Questrial.ttf",
          }
        ],
        display: "auto",
        preload: true,
        injectTo: "head-prepend",
      },
    })
  ],
})
