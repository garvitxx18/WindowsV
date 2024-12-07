import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx",
        background: "src/background/background.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
