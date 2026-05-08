# Nezumi Template

Monorepo template: **Next.js 16.2.5** (App Router, Turbopack) + **`@packages/ui`** — a small, Radix‑based, **shadcn‑compatible** UI package on **React 19.2.6**, **react-dom 19.2.6**, and **Tailwind CSS 4.2.4**.

Verbindliche Versionsliste (Catalog / `package.json`): [`FRAMEWORK_VERSION_REFERENCES.md`](FRAMEWORK_VERSION_REFERENCES.md).

## Core ideas

- **Granular imports** — public API only via leaf entrypoints (`@packages/ui/components/...`, `@packages/ui/layout`, `@packages/ui/lib/utils`). No root barrel export; keeps app bundles lean.
- **CSS-first tokens** — design primitives live under `packages/ui/src/styles`; Tailwind consumes them via `@theme`. TypeScript is not the source of truth for tokens.
- **Source-first UI package** — `@packages/ui` exports source files and the Next.js apps transpile it directly through `transpilePackages`.
- **One Tailwind compile in the app** — apps scan the UI package with `@source` and pull in `@packages/ui/design-tokens.css`, so utilities from the library resolve without nesting a second Tailwind pipeline.
- **Clear layers** — `atoms` / `molecules` / etc. stay internal; anything apps use is surfaced through explicit public files and `package.json` exports.

Detailed architecture, workflows, and conventions: **[`docs/nezumi-ui/README.md`](docs/nezumi-ui/README.md)** (authoritative for this repo; vendor mirrors under `docs/` are reference only).

## Stack

**pnpm 10.33.3** workspaces, **Turbo 2.9.x** (`^2.9.9`), **TypeScript 6.0.3**, **Tailwind CSS 4.2.4** / **`@tailwindcss/postcss` 4.2.4**, **Node.js 24.x** (`engines`: `^24.0.0`), Radix primitives, CVA/clsx/tailwind-merge patterns as in `@packages/ui`.

## Getting started

```bash
pnpm install
pnpm build:homepage
pnpm build:members
pnpm build:operations
pnpm build:playground
```

Start a specific app dev server:

```bash
pnpm dev:homepage
pnpm dev:members
pnpm dev:operations
pnpm dev:playground
```

## Repository layout

| Path             | Role                                                |
| ---------------- | --------------------------------------------------- |
| `apps/playground` | Reference Next.js shell consuming `@packages/ui`    |
| `packages/ui`    | Internal source-first UI package (`@packages/ui`)     |
| `docs/nezumi-ui` | Product/architecture docs for Nezumi in this repo  |
| `docs/` (else)    | Offline vendor snapshots for agents; navigation hub [`docs/README.md`](docs/README.md)  |
