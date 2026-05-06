# Monorepo Architecture

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Radix UI, shadcn-compatible registry tooling, pnpm v10.

## Workspace

```
.
├── package.json
├── pnpm-workspace.yaml
└── packages/
    └── ui/
        ├── components.json
        ├── package.json
        ├── tsconfig.json
        └── src/
```

## UI Package Contract

Consumer imports:

```tsx
import { Button } from "@nezumi/ui/components/button"
import { Container, Grid } from "@nezumi/ui/layout"
import { cn } from "@nezumi/ui/lib/utils"
```

Internal folders:

```
src/atoms/
src/molecules/
src/organisms/
src/templates/
```

Public folders:

```
src/components/
src/layout/
src/lib/
src/styles/
```

## Server Components

For Next.js 16 and React 19, keep server and client boundaries explicit. Use `proxy.ts` for request interception, Cache Components with `cacheComponents`, and `"use cache"` only where stable cached output is intended.

## Export Pattern

Use package-map exports instead of a root barrel:

```json
{
  "exports": {
    "./globals.css": "./src/styles/global.css",
    "./components/button": {
      "types": "./dist/components/button.d.ts",
      "import": "./dist/components/button.mjs",
      "require": "./dist/components/button.js"
    },
    "./layout": {
      "types": "./dist/layout/index.d.ts",
      "import": "./dist/layout/index.mjs",
      "require": "./dist/layout/index.js"
    },
    "./lib/utils": {
      "types": "./dist/lib/utils.d.ts",
      "import": "./dist/lib/utils.mjs",
      "require": "./dist/lib/utils.js"
    }
  }
}
```
