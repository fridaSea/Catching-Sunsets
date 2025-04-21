import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

// https://vite.dev/config/

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "Catching Sunsets",
    short_name: "Catching Sunsets",
    description:
      "This app was created to share our favorite sunsets and to enjoy the magic of sunsets together.",
    icons: [
      {
        src: "assets/sunsetcloud_pwa_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "assets/sunsetcloud_pwa_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  //To make sure vite starts always in the same port, to match CORS options
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
  },
});
