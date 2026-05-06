# Nezumi Template

Monorepo template: **Next.js 16** (App Router, Turbopack) + **`@nezumi/ui`** — a small, Radix‑based, **shadcn‑compatible** UI package on **React 19** and **Tailwind CSS v4**.

## Core ideas

- **Granular imports** — public API only via leaf entrypoints (`@nezumi/ui/components/...`, `@nezumi/ui/layout`, `@nezumi/ui/lib/utils`). No root barrel export; keeps app bundles lean.
- **CSS-first tokens** — design primitives live under `packages/ui/src/styles`; Tailwind consumes them via `@theme`. TypeScript is not the source of truth for tokens.
- **One Tailwind compile in the app** — `apps/web` scans the UI package with `@source` and pulls in `@nezumi/ui/design-tokens.css`, so utilities from the library resolve without nesting a second Tailwind pipeline.
- **Clear layers** — `atoms` / `molecules` / etc. stay internal; anything apps use is surfaced through explicit public files and `package.json` exports.

Detailed architecture, workflows, and conventions: **[`docs/nezumi-ui/README.md`](docs/nezumi-ui/README.md)** (authoritative for this repo; vendor mirrors under `docs/` are reference only).

## Stack

pnpm v10 workspaces, Turbo 2.x, TypeScript, Tailwind v4 (`@tailwindcss/postcss`), Radix primitives, CVA/clsx/tailwind-merge patterns as in `@nezumi/ui`.

## Getting started

```bash
pnpm install
pnpm dev
```

Runs the workspace dev pipeline (includes `web` and `@nezumi/ui` where configured). Only the demo app:

```bash
pnpm turbo dev --filter=web
```

Build and typecheck the whole workspace:

```bash
pnpm turbo build
pnpm turbo typecheck
```

## Repository layout

| Path             | Role                                                |
| ---------------- | --------------------------------------------------- |
| `apps/web`       | Reference Next.js shell consuming `@nezumi/ui`      |
| `packages/ui`    | Published-style UI library (`@nezumi/ui`)           |
| `docs/nezumi-ui` | Product/architecture docs for Nezumi in this repo  |
| `docs/` (else)    | Offline vendor snapshots for agents (`INDEX.md`)  |
