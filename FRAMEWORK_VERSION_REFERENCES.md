# Framework Version References

**Last verified:** 2026-05-07

This file is the repo-level source of truth for framework and tooling versions used by the Nezumi Template. Local vendor documentation under `docs/` is an offline mirror and can describe broader or older upstream behavior; dependency truth for this repository comes from `pnpm-workspace.yaml`, `package.json`, and `pnpm-lock.yaml`.

## Runtime and Package Manager

| Tool | Repo requirement | Source |
| --- | --- | --- |
| Node.js | `^24.0.0` | Root `package.json` `engines.node` |
| pnpm | `10.33.3` | Root `package.json` `packageManager` |

## Workspace Catalog

| Package | Catalog range | Locked version | Notes |
| --- | --- | --- | --- |
| `next` | `^16.2.5` | `16.2.5` | App Router, Turbopack; apps consume via `catalog:` |
| `react` | `^19.2.6` | `19.2.6` | Apps and `@nezumi/ui` dev dependency consume via `catalog:` |
| `react-dom` | `^19.2.6` | `19.2.6` | Apps and `@nezumi/ui` dev dependency consume via `catalog:` |
| `tailwindcss` | `^4.2.4` | `4.2.4` | CSS-first Tailwind v4 setup |
| `@tailwindcss/postcss` | `^4.2.4` | `4.2.4` | App PostCSS integration |
| `typescript` | `^6.0.3` | `6.0.3` | `@nezumi/ui` currently keeps `ignoreDeprecations: "6.0"` for the DTS build transition |
| `@types/node` | `^24.12.2` | `24.12.2` | Shared app/UI type dependency |
| `@types/react` | `^19.2.14` | `19.2.14` | Shared app/UI type dependency |
| `@types/react-dom` | `^19.2.3` | `19.2.3` | Shared app/UI type dependency |

## Root Tooling

| Package | Declared range | Locked version | Notes |
| --- | --- | --- | --- |
| `turbo` | `^2.9.9` | `2.9.9` | Root task orchestration |
| `eslint` | `^9.39.2` | `9.39.4` | Root lint base |
| `eslint-config-next` | `^16.1.0` | `16.2.5` | Next ESLint flat-config integration |

## UI Package Runtime Contracts

| Package | Declared range | Locked version | Notes |
| --- | --- | --- | --- |
| `@radix-ui/react-slot` | `^1.2.3` | `1.2.3` | shadcn-compatible `asChild` composition |
| `class-variance-authority` | `^0.7.1` | `0.7.1` | Variant composition |
| `clsx` | `^2.1.1` | `2.1.1` | Class value normalization |
| `tailwind-merge` | `^3.5.0` | `3.5.0` | Tailwind class conflict resolution |

## Verification Sources

- Local dependency truth: `pnpm-workspace.yaml`, root `package.json`, package manifests, and `pnpm-lock.yaml`.
- External registry check used for this update: `npm view next react react-dom tailwindcss typescript turbo shadcn clsx tailwind-merge version` on 2026-05-07.
- Vendor behavior references: local `docs/*/INDEX.md` first; if a local mirror is inconclusive, use official vendor docs or package registry pages.

## Maintenance Rules

- Update this file in the same change as any catalog or framework package bump.
- Do not edit mirrored vendor pages just to replace every upstream version mention; keep repo-specific pins prominent in each `INDEX.md` instead.
- For publishable packages, keep `peerDependencies` concrete semver ranges rather than `catalog:`.
