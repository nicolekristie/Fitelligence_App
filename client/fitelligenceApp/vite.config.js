import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
    open: true, // Automatically open the browser when the server starts
    port: 5173, // Use a different port to avoid conflicts with backend (default Vite port)
  },
});
