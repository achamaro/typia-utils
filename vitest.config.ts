import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    includeSource: ["src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
    environment: "happy-dom",
  },
});
