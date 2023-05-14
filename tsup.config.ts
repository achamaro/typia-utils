import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/webpack.ts",
    "src/webpack-loader.ts",
    "src/react-hook-form.ts",
    "src/react.ts",
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
