import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/webpack.ts",
    "src/webpack-loader.ts",
    "src/react/error-message.tsx",
  ],
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  clean: true,
  splitting: false,
  sourcemap: false,
  publicDir: true,
});
