import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  base: "/",
  server: {
    port: 5174,
    host: "localhost",
  },
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
});
