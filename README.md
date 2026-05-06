# Nezumi Template

Monorepo template: **Next.js 16.2.4** (App Router, Turbopack) + **`@nezumi/ui`** — a small, Radix‑based, **shadcn‑compatible** UI package on **React 19.2.5**, **react-dom 19.2.5**, and **Tailwind CSS 4.2.4**.

Verbindliche Versionsliste (Catalog / `package.json`): [`FRAMEWORK_VERSION_REFERENCES.md`](FRAMEWORK_VERSION_REFERENCES.md).

## Core ideas

- **Granular imports** — public API only via leaf entrypoints (`@nezumi/ui/components/...`, `@nezumi/ui/layout`, `@nezumi/ui/lib/utils`). No root barrel export; keeps app bundles lean.
- **CSS-first tokens** — design primitives live under `packages/ui/src/styles`; Tailwind consumes them via `@theme`. TypeScript is not the source of truth for tokens.
- **One Tailwind compile in the app** — `apps/playground` scans the UI package with `@source` and pulls in `@nezumi/ui/design-tokens.css`, so utilities from the library resolve without nesting a second Tailwind pipeline.
- **Clear layers** — `atoms` / `molecules` / etc. stay internal; anything apps use is surfaced through explicit public files and `package.json` exports.

Detailed architecture, workflows, and conventions: **[`docs/nezumi-ui/README.md`](docs/nezumi-ui/README.md)** (authoritative for this repo; vendor mirrors under `docs/` are reference only).

## Stack

**pnpm 10.33.3** workspaces, **Turbo 2.9.x** (`^2.9.9`), **TypeScript 6.0.3**, **Tailwind CSS 4.2.4** / **`@tailwindcss/postcss` 4.2.4**, **Node.js 24.x** (`engines`: `^24.0.0`), Radix primitives, CVA/clsx/tailwind-merge patterns as in `@nezumi/ui`.

## Getting started

```bash
pnpm install
pnpm dev
```

Runs the workspace dev pipeline (includes `playground` and `@nezumi/ui` where configured). Only the demo app:

```bash
pnpm turbo dev --filter=playground
```

Build and typecheck the whole workspace:

```bash
pnpm turbo build
pnpm turbo typecheck
```

## Repository layout

| Path             | Role                                                |
| ---------------- | --------------------------------------------------- |
| `apps/playground` | Reference Next.js shell consuming `@nezumi/ui`    |
| `packages/ui`    | Published-style UI library (`@nezumi/ui`)           |
| `docs/nezumi-ui` | Product/architecture docs for Nezumi in this repo  |
| `docs/` (else)    | Offline vendor snapshots for agents (`INDEX.md`)  |
