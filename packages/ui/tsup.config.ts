import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    "components/button": "src/components/button.tsx",
    "layout/index": "src/layout/index.ts",
    "lib/utils": "src/lib/utils.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  splitting: false,
  treeshake: true,
  tsconfig: "./tsconfig.json",
})
