import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: "brotliCompress", // Use 'gzip' or 'brotliCompress'
      verbose: true,
      deleteOriginFile: false, // Keep original files for fallback
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser", // Switch to Terser
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // More optimization passes
      },
      mangle: true,
    },
  },
});
