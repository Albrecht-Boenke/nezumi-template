---
title: Nezumi UI Documentation
description: Architektur-, API- und Workflow-Doku für dieses Repo (ergänzend zu Vendor-Mirrors; Vendor hat bis SSOT Vorrang).
source: Projekt (docs/nezumi-ui)
---

# Nezumi UI Documentation

**Navigation:** Alle nummerierten Seiten stehen als flache **`NNN-nezumi-ui-*.mdx`** neben dieser Datei. Einstieg für Retrieval: **[INDEX.md](./INDEX.md)** (gleiches Muster wie `docs/typescript/INDEX.md`).

**Wann dieses Kapitel lesen?**

- Architektur, Public API oder Entwickler-Workflow **in diesem Repo**.
- Du sollst entscheiden, ob eine Regel aus **Vendor-Doku** oder **Nezumi** gewinnt (bis `docs/nezumi-ui/` SSOT ist, gilt Vendor zuerst).

Nezumi UI is currently a template mockup for **React 19.2.6** and **react-dom 19.2.6**, **Tailwind CSS 4.2.4**, **TypeScript 6.0.3**, with a reference app on **Next.js 16.2.5**, **pnpm 10.33.3**, and **Node.js 24.x** (`engines`: `^24.0.0`); Radix UI, shadcn-compatible. The current implementation is intentionally small: one UI package, CSS-first tokens, layout primitives, and a granular public component surface.

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

Design tokens live in CSS under `packages/ui/src/styles/` and are registered with Tailwind CSS 4.2.4 `@theme`. TypeScript token objects are intentionally not part of the architecture.

**Gegenüber offline Vendor-Spiegeln (`docs/react/`, `docs/nextjs/`, …):** Bis `docs/nezumi-ui/` als vollständige SSOT etabliert ist, haben **Vendor-Spiegel Vorrang** bei Framework- und Verhaltensfragen. `docs/nezumi-ui/` ist in dieser Phase **projekt-spezifische Ergänzung** (Architektur-/Workflow-Kontext) zusammen mit dem Code unter `packages/`.

## Index

Siehe **[INDEX.md](./INDEX.md)** für die vollständige Liste inkl. Agent-Retrieval-Hinweisen.
