// vite.config.js
import { defineConfig } from "file:///C:/Users/kacpe/Documents/GitHub/awantura-o-kase/stream_overlay/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/kacpe/Documents/GitHub/awantura-o-kase/stream_overlay/node_modules/@vitejs/plugin-react/dist/index.mjs";
import Unfonts from "file:///C:/Users/kacpe/Documents/GitHub/awantura-o-kase/stream_overlay/node_modules/unplugin-fonts/dist/vite.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: "LCDDot",
            local: "LCDDot",
            src: "./src/assets/fonts/LCDDot.ttf"
          },
          {
            name: "Eurostile",
            local: "Eurostile",
            src: "./src/assets/fonts/Eurostile.ttf"
          },
          {
            name: "VT323",
            local: "VT323",
            src: "./src/assets/fonts/VT323.ttf"
          },
          {
            name: "Questrial",
            local: "Questrial",
            src: "./src/assets/fonts/Questrial.ttf"
          }
        ],
        display: "auto",
        preload: true,
        injectTo: "head-prepend"
      }
    })
  ],
  server: {
    host: "10.5.50.229",
    port: 5173
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrYWNwZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGF3YW50dXJhLW8ta2FzZVxcXFxzdHJlYW1fb3ZlcmxheVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca2FjcGVcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxhd2FudHVyYS1vLWthc2VcXFxcc3RyZWFtX292ZXJsYXlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2thY3BlL0RvY3VtZW50cy9HaXRIdWIvYXdhbnR1cmEtby1rYXNlL3N0cmVhbV9vdmVybGF5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgVW5mb250cyBmcm9tIFwidW5wbHVnaW4tZm9udHMvdml0ZVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVW5mb250cyh7XHJcbiAgICAgIGN1c3RvbToge1xyXG4gICAgICAgIGZhbWlsaWVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTENERG90XCIsXHJcbiAgICAgICAgICAgIGxvY2FsOiBcIkxDRERvdFwiLFxyXG4gICAgICAgICAgICBzcmM6IFwiLi9zcmMvYXNzZXRzL2ZvbnRzL0xDRERvdC50dGZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRXVyb3N0aWxlXCIsXHJcbiAgICAgICAgICAgIGxvY2FsOiBcIkV1cm9zdGlsZVwiLFxyXG4gICAgICAgICAgICBzcmM6IFwiLi9zcmMvYXNzZXRzL2ZvbnRzL0V1cm9zdGlsZS50dGZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiVlQzMjNcIixcclxuICAgICAgICAgICAgbG9jYWw6IFwiVlQzMjNcIixcclxuICAgICAgICAgICAgc3JjOiBcIi4vc3JjL2Fzc2V0cy9mb250cy9WVDMyMy50dGZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiUXVlc3RyaWFsXCIsXHJcbiAgICAgICAgICAgIGxvY2FsOiBcIlF1ZXN0cmlhbFwiLFxyXG4gICAgICAgICAgICBzcmM6IFwiLi9zcmMvYXNzZXRzL2ZvbnRzL1F1ZXN0cmlhbC50dGZcIixcclxuICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGRpc3BsYXk6IFwiYXV0b1wiLFxyXG4gICAgICAgIHByZWxvYWQ6IHRydWUsXHJcbiAgICAgICAgaW5qZWN0VG86IFwiaGVhZC1wcmVwZW5kXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCIxMC41LjUwLjIyOVwiLFxyXG4gICAgcG9ydDogNTE3MyxcclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBYLFNBQVMsb0JBQW9CO0FBQ3ZaLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFHcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1I7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLFlBQ1AsS0FBSztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsWUFDUCxLQUFLO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxVQUNQO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
