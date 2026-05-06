# Public API

The public API is the contract between apps and the UI package. It is intentionally granular.

## Correct Imports

```tsx
import { Button } from "@nezumi/ui/components/button"
import { Container, Flex, Grid, Stack } from "@nezumi/ui/layout"
import { cn } from "@nezumi/ui/lib/utils"
```

## Package Exports

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

## Why Granular Exports

- Apps do not depend on atomic folder names.
- Test and build dependency graphs stay small.
- shadcn-generated components can be adapted behind a stable leaf file.
- Refactors happen inside `src/atoms` or `src/molecules` without consumer churn.

## Adding A Public Component

1. Implement internally where it belongs.
2. Add `src/components/<name>.tsx`.
3. Add the matching `tsup.config.ts` entry.
4. Add the matching conditional export that points at `dist/`.
5. Re-export the public component and public types from that leaf.
6. Document the consumer import path.

Example:

```tsx
import { Button } from "@nezumi/ui/components/button"
```
