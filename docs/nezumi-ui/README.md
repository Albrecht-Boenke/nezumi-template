---
title: Nezumi UI Documentation
description: Architektur-, API- und Workflow-Doku für dieses Repo (maßgeblich vor Vendor-Mirrors).
source: Projekt (docs/nezumi-ui)
---

# Nezumi UI Documentation

**Wann dieses Kapitel lesen?**

- Architektur, Public API oder Entwickler-Workflow **in diesem Repo**.
- Du sollst entscheiden, ob eine Regel aus **Vendor-Doku** oder **Nezumi** gewinnt (hier gilt Nezumi).

Nezumi UI is currently a template mockup for a React 19, Tailwind CSS v4, Radix UI, and shadcn-compatible UI package. The current implementation is intentionally small: one UI package, CSS-first tokens, layout primitives, and a granular public component surface.

## Current Shape

```
packages/ui/
├── components.json
├── package.json
├── tsconfig.json
└── src/
    ├── atoms/
    ├── components/        # public leaf exports
    ├── layout/
    ├── lib/
    └── styles/
        ├── tokens/
        ├── semantic/
        └── components/
```

## Import Contract

Consumer imports stay on public entrypoints:

```tsx
import { Button } from "@nezumi/ui/components/button"
import { Container, Flex } from "@nezumi/ui/layout"
import { cn } from "@nezumi/ui/lib/utils"
import "@nezumi/ui/globals.css"
```

Atomic folders remain implementation detail. When a component graduates to public API, add a leaf file in `packages/ui/src/components/<name>.tsx` and export that leaf through `package.json`.

## Source Of Truth

Design tokens live in CSS under `packages/ui/src/styles/` and are registered with Tailwind v4 `@theme`. TypeScript token objects are intentionally not part of the architecture.

**Gegenüber offline Vendor-Spiegeln (`docs/react/`, `docs/nextjs/`, …):** Für Architektur, öffentliche API und Konventionen **dieses** Repos gilt **dieser Ordner (`docs/nezumi-ui`)** sowie der Code unter `packages/`. Vendor-Spiegel dienen zum Nachschlagen von Framework-Verhalten ohne Netz, ersetzen aber keine Nezumi-Dokumentation.

## Docs

- [Getting Started](./01-getting-started.md)
- [Architecture Overview](./02-architecture-overview.md)
- [Atomic Design](./03-atomic-design.md)
- [Public API](./04-public-api.md)
- [Foundation And Tokens](./05-foundation.md)
- [Component Development](./06-component-development.md)
- [Best Practices](./07-best-practices.md)
- [Migration Guide](./08-migration-guide.md)
- [FAQ](./09-faq.md)
- [Tailwind v4 Tokens](./10-design-tokens-tailwind-v4.md)
