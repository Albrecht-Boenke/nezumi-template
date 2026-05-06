# Getting Started

## Install And Build

From the workspace root:

```bash
pnpm install
pnpm --filter @nezumi/ui build
pnpm --filter @nezumi/ui typecheck
```

The workspace uses pnpm catalogs for shared framework versions.

## Import Styles

Load the CSS entrypoint once in the consuming app shell:

```tsx
import "@nezumi/ui/globals.css"
```

The CSS entrypoint imports Tailwind v4, primitive tokens, semantic tokens, component tokens, and base styles.

## Import Components

Use public leaf exports:

```tsx
import { Button } from "@nezumi/ui/components/button"
import { Container, Flex } from "@nezumi/ui/layout"

export function Example() {
  return (
    <Container px="24" py="32">
      <Flex gap="16" align="center">
        <Button>Save</Button>
      </Flex>
    </Container>
  )
}
```

Avoid importing from `atoms`, `molecules`, `organisms`, or `templates` in application code. Those folders are internal implementation detail.

## Use Tokens

Use Tailwind utilities generated from `@theme`:

```tsx
<div className="bg-background text-foreground p-16 rounded-lg" />
```

Use CSS variables only when runtime CSS needs a raw value:

```css
.panel {
  background: var(--color-background);
  padding: var(--spacing-16);
}
```
