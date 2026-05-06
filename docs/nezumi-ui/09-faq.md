# FAQ

## How do I import a component?

```tsx
import { Button } from "@nezumi/ui/components/button"
```

## How do I import layout primitives?

```tsx
import { Container, Flex, Grid, Stack } from "@nezumi/ui/layout"
```

## Where do tokens live?

In `packages/ui/src/styles/`, registered with Tailwind v4 `@theme`.

## How do I add spacing?

Use the native pixel-named utilities:

```tsx
<div className="p-16 gap-8" />
```

## How do I add a new public component?

Create a public leaf file:

```tsx
// packages/ui/src/components/example.tsx
export { Example, type ExampleProps } from "../molecules/Example"
```

Then import it:

```tsx
import { Example } from "@nezumi/ui/components/example"
```

## Which primitive library is used?

Radix UI through the unified `radix-ui` package.
