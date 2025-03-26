import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //To make sure vite starts always in the same port, to match CORS options
  server: {
    port: 5173,
  },
});
