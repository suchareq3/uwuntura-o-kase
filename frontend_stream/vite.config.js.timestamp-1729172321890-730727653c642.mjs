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
          }
        ],
        display: "auto",
        preload: true,
        injectTo: "head-prepend"
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxrYWNwZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGF3YW50dXJhLW8ta2FzZVxcXFxzdHJlYW1fb3ZlcmxheVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca2FjcGVcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxhd2FudHVyYS1vLWthc2VcXFxcc3RyZWFtX292ZXJsYXlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2thY3BlL0RvY3VtZW50cy9HaXRIdWIvYXdhbnR1cmEtby1rYXNlL3N0cmVhbV9vdmVybGF5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgVW5mb250cyBmcm9tIFwidW5wbHVnaW4tZm9udHMvdml0ZVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVW5mb250cyh7XHJcbiAgICAgIGN1c3RvbToge1xyXG4gICAgICAgIGZhbWlsaWVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiTENERG90XCIsXHJcbiAgICAgICAgICAgIGxvY2FsOiBcIkxDRERvdFwiLFxyXG4gICAgICAgICAgICBzcmM6IFwiLi9zcmMvYXNzZXRzL2ZvbnRzL0xDRERvdC50dGZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiRXVyb3N0aWxlXCIsXHJcbiAgICAgICAgICAgIGxvY2FsOiBcIkV1cm9zdGlsZVwiLFxyXG4gICAgICAgICAgICBzcmM6IFwiLi9zcmMvYXNzZXRzL2ZvbnRzL0V1cm9zdGlsZS50dGZcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBkaXNwbGF5OiBcImF1dG9cIixcclxuICAgICAgICBwcmVsb2FkOiB0cnVlLFxyXG4gICAgICAgIGluamVjdFRvOiBcImhlYWQtcHJlcGVuZFwiLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFgsU0FBUyxvQkFBb0I7QUFDdlosT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUdwQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUEsVUFDUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLFlBQ1AsS0FBSztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsWUFDUCxLQUFLO0FBQUEsVUFDUDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxRQUNULFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
