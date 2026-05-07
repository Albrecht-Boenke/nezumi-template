import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    "components/button": "src/components/button.tsx",
    "components/container": "src/components/container.tsx",
    "components/grid": "src/components/grid.tsx",
    "components/flex": "src/components/flex.tsx",
    "components/box": "src/components/box.tsx",
    "components/section": "src/components/section.tsx",
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
