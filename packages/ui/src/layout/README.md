# @nezumi/ui/layout

Layout primitives live inside the UI package and are exported through `@nezumi/ui/layout`.

## Imports

```tsx
import { Box, Container, Flex, Grid, Section, Stack } from "@nezumi/ui/layout"
import type { FlexProps, ContainerProps, SpacingValue } from "@nezumi/ui/layout"
```

## Spacing

Spacing props use the native pixel-named Tailwind v4 scale:

```tsx
<Flex gap="16" px="24" py="32" />
<Grid cols={{ initial: 1, md: 3 }} gap="24" />
<Container size="xl" px="24" />
```

Values map directly to generated utilities such as `gap-16`, `px-24`, and `py-32`.

## Components

- `Box`: polymorphic wrapper.
- `Flex`: flexbox layout.
- `Grid`: grid layout.
- `Container`: centered max-width wrapper.
- `Section`: semantic section with vertical rhythm presets.
- `Stack`: simplified flex stack.
