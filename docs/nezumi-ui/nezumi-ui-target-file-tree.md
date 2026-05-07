# Nezumi UI Target File Tree

This document describes a **target** monorepo layout and responsibilities. **Normative behavior and structure for frameworks and tools** come from the **offline vendor mirrors** under `docs/` (Turborepo, Next.js, Tailwind CSS, shadcn/ui, TypeScript). Where the vendors are silent (naming-only choices, optional packages), **this repository’s current tree** is used as the tie-breaker.

**Pinned tool versions** (Next.js 16.2.4, React 19.2.x, Tailwind 4.2.4, pnpm 10.x, TypeScript 6.x, etc.) should follow your workspace **catalog / lockfile**; they are not repeated here as architecture rules.

---

## Normative vendor references (read before inferring)

| Topic | What the vendor specifies (this repo’s mirror) |
| ----- | ----------------------------------------------- |
| **Monorepo layout** | [docs/turbo/20-crafting-your-repository-structuring-a-repository.mdx](docs/turbo/20-crafting-your-repository-structuring-a-repository.mdx): `apps/*` + `packages/*`, workspace globs, `package.json` per package, root `turbo.json`. |
| **shadcn + Turborepo** | [docs/shadcn-ui/overview/monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx): `apps/web`, `packages/ui`, **both** workspaces have **`components.json`**; Tailwind v4 → **empty** `tailwind.config` in `components.json`; `packages/ui/src/styles/globals.css`; `package.json#exports` including `./globals.css`. |
| **Tailwind v4 tokens** | [172-theme.mdx](docs/tailwind-css/172-theme.mdx): design tokens as **theme variables** (`@theme` / theme namespaces). [002-adding-custom-styles.mdx](docs/tailwind-css/002-adding-custom-styles.mdx): extend/customize via CSS. |
| **Class detection + monorepos** | [053-detecting-classes-in-source-files.mdx](docs/tailwind-css/053-detecting-classes-in-source-files.mdx): no dynamic class-string assembly; use `@source` (or `source()`) when scan paths must include shared packages. [084-functions-and-directives.mdx](docs/tailwind-css/084-functions-and-directives.mdx): `@source`, `@import`, `@theme`. |
| **Next.js app + Tailwind** | [docs/nextjs/001-01-app-01-getting-started-01-installation.mdx](docs/nextjs/001-01-app-01-getting-started-01-installation.mdx): **minimum Node.js 20.9**. [docs/nextjs/011-01-app-01-getting-started-11-css.mdx](docs/nextjs/011-01-app-01-getting-started-11-css.mdx): `postcss.config.mjs` with `@tailwindcss/postcss`, import Tailwind in **`app/globals.css`**, import that CSS from the root layout. |
| **Next + workspace UI package** | [docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx](docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx): `transpilePackages` for local packages. |
| **Animation (shadcn + Tailwind v4)** | [docs/shadcn-ui/overview/tailwind-v4.mdx](docs/shadcn-ui/overview/tailwind-v4.mdx): `tailwindcss-animate` deprecated; use **`tw-animate-css`** and `@import "tw-animate-css"` in globals (when that stack is used). |

**Supplementary project conventions** (Atomic Design, Nezumi public API): [docs/nezumi-ui/README.md](docs/nezumi-ui/README.md) — use **after** the vendor rules above.

---

## Offline documentation hubs (`docs/`)

| Topic | Primary entry |
| ----- | ------------- |
| **Turborepo** | [docs/turbo/INDEX.md](docs/turbo/INDEX.md) |
| **Next.js** | [docs/nextjs/INDEX.md](docs/nextjs/INDEX.md) · App Router overview [257-01-app-index.mdx](docs/nextjs/257-01-app-index.mdx) |
| **React** | [docs/react/INDEX.md](docs/react/INDEX.md) |
| **Tailwind CSS v4** | [docs/tailwind-css/INDEX.md](docs/tailwind-css/INDEX.md) |
| **shadcn/ui v4** | [docs/shadcn-ui/INDEX.md](docs/shadcn-ui/INDEX.md) |
| **TypeScript** | [docs/typescript/INDEX.md](docs/typescript/INDEX.md) |
| **`cn()` / clsx / tailwind-merge** | [docs/cn/INDEX.md](docs/cn/INDEX.md) |
| **Nezumi (project)** | [docs/nezumi-ui/README.md](docs/nezumi-ui/README.md) |

---

## Root topology

Turborepo and the shadcn monorepo template converge on **`apps/`** for deployable apps and **`packages/`** for shared libraries ([20-crafting-your-repository-structuring-a-repository.mdx](docs/turbo/20-crafting-your-repository-structuring-a-repository.mdx), [monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)).

```text
<workspace>/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── apps/
│   ├── homepage/
│   ├── members/
│   └── operations/
└── packages/
    ├── ui/                      # shared design system (@nezumi/ui)
    ├── typescript-config/       # optional — shared TS base/next/react configs
    └── storybook/               # optional — visual docs / review
```

The **shadcn monorepo** template in the vendor docs uses a single **`apps/web`** workspace ([monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)). **This target** instead defines **three** product Next.js apps under `apps/`; **each** app still follows the same vendor rules (own `app/`, `components.json`, `postcss.config.mjs`, `transpilePackages`, etc.).

Optional (not required by the minimal shadcn example; add when you need them):

- `packages/typescript-config/` and `packages/storybook/` are shown in the topology above when you adopt them; they are **not** mandated by the minimal shadcn example. Storybook: **no** Storybook content in `docs/` mirrors here—version and addons are **not** fixed by this vendor set—see Storybook’s own documentation.
- `.nvmrc` — **not** required by Turborepo/Next vendor docs; optional team pin if it satisfies Next’s **minimum Node** (currently **≥ 20.9** per [001-01-app-01-getting-started-01-installation.mdx](docs/nextjs/001-01-app-01-getting-started-01-installation.mdx)).

**Boundary rule (Nezumi):** apps may depend on `@nezumi/ui`; apps do not import each other; `@nezumi/ui` does not import apps ([011-nezumi-ui-monorepo-architecture.mdx](docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx)).

---

## Root files

```text
<workspace>/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

Responsibilities (vendor-aligned):

- **`package.json`:** private root, `packageManager: "pnpm@10.33.3"` (or current pnpm from your lockfile), scripts that delegate to Turbo; **`engines.node`** must be compatible with **Next.js ≥ 20.9** (you may pin higher—e.g. this repo uses **`^24.0.0`**—that is a **project** choice, not Turborepo’s).
- **`pnpm-workspace.yaml`:** `apps/*`, `packages/*` ([20-crafting-your-repository-structuring-a-repository.mdx](docs/turbo/20-crafting-your-repository-structuring-a-repository.mdx)).
- **`turbo.json`:** task graph per [47-reference-configuration.mdx](docs/turbo/47-reference-configuration.mdx). Which tasks exist (`build`, `dev`, `typecheck`, `lint`, …) is **project-defined**.

---

## Apps (Next.js App Router)

Each of **`homepage`**, **`members`**, and **`operations`** is a separate Next.js **App Router** package under `apps/`, with the same shape and vendor rules (compare the shadcn **`apps/web`** pattern: [monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)).

```text
apps/
├── homepage/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── blocks/
│   │   ├── organisms/
│   │   └── templates/
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs      # Next.js Tailwind v4 — use .mjs ([011-01-app-01-getting-started-11-css.mdx](docs/nextjs/011-01-app-01-getting-started-11-css.mdx))
│   └── tsconfig.json
├── members/
│   └── …                       # same responsibilities as homepage
└── operations/
    └── …                       # same responsibilities as homepage
```

**Vendor-backed responsibilities (every app):**

- **`app/`:** routes, layouts, metadata, data fetching, app-specific logic.
- **`app/globals.css`:** `@import "tailwindcss"` ([011-01-app-01-getting-started-11-css.mdx](docs/nextjs/011-01-app-01-getting-started-11-css.mdx)); **`@source`** for `packages/ui` when needed ([053-detecting-classes-in-source-files.mdx](docs/tailwind-css/053-detecting-classes-in-source-files.mdx)); import shared CSS via **`package.json#exports`** (e.g. **`@import "@nezumi/ui/design-tokens.css"`** — actual export names follow `packages/ui/package.json`).
- **`app/layout.tsx`:** import `./globals.css` ([011-01-app-01-getting-started-11-css.mdx](docs/nextjs/011-01-app-01-getting-started-11-css.mdx)); optional **`ThemeProvider`** if using `next-themes` / shadcn theming ([theming.mdx](docs/shadcn-ui/overview/theming.mdx)); `<html lang="..." suppressHydrationWarning>` as needed.
- **`components/blocks/`:** app-owned shadcn registry blocks and page regions.
- **`components/organisms/`** / **`components/templates/`:** app-specific Atomic-Design compositions.
- **`components.json`:** shadcn bridge — map **`utils`** → `@nezumi/ui/lib/utils`, **`ui`** → `@nezumi/ui/components`; keep **`style`**, **`iconLibrary`**, **`baseColor`** identical to `packages/ui/components.json`; **`tailwind.config` empty** for Tailwind v4 ([monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)).
- **`next.config.ts`:** `transpilePackages: ["@nezumi/ui"]` ([223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx](docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx)).
- **`postcss.config.mjs`:** `@tailwindcss/postcss` ([011-01-app-01-getting-started-11-css.mdx](docs/nextjs/011-01-app-01-getting-started-11-css.mdx)).
- **`package.json`:** `workspace:*` → `@nezumi/ui`; React / Next per catalog or lockfile.

**Docs:** [001-01-app-01-getting-started-01-installation.mdx](docs/nextjs/001-01-app-01-getting-started-01-installation.mdx) · [011-01-app-01-getting-started-11-css.mdx](docs/nextjs/011-01-app-01-getting-started-11-css.mdx) · [005-01-app-01-getting-started-05-server-and-client-components.mdx](docs/nextjs/005-01-app-01-getting-started-05-server-and-client-components.mdx) · [223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx](docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx) · [monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx) · [components-json.mdx](docs/shadcn-ui/overview/components-json.mdx).

---

## App route example

```text
apps/homepage/app/cards/page.tsx
```

**Docs:** [005-01-app-01-getting-started-05-server-and-client-components.mdx](docs/nextjs/005-01-app-01-getting-started-05-server-and-client-components.mdx) · [006-01-app-01-getting-started-06-fetching-data.mdx](docs/nextjs/006-01-app-01-getting-started-06-fetching-data.mdx).

---

## Shared TypeScript config package (optional)

Not shown in the minimal shadcn monorepo diagram but common in larger Turborepos:

```text
packages/typescript-config/
├── package.json
├── base.json
├── nextjs.json
└── react-library.json
```

**Docs:** [docs/typescript/157-tsconfig-intro.mdx](docs/typescript/157-tsconfig-intro.mdx) · [tsconfig.json (handbook)](docs/typescript/062-handbook-project-config-tsconfig.json.mdx).

---

## UI package (`packages/ui`)

### Baseline file tree (shadcn monorepo + exports)

The **shadcn** monorepo template places the design system under `packages/ui` with **`src/styles/globals.css`**, **`src/components`**, **`src/lib/utils.ts`**, and **`components.json`** ([monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)). **`package.json#exports`** must expose any path other workspaces import (e.g. **`./globals.css`**, **`./components/*`**, **`./lib/utils`**) ([monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx), [package-imports.mdx](docs/shadcn-ui/overview/package-imports.mdx)).

```text
packages/ui/
├── package.json
├── tsconfig.json
├── components.json
└── src/
    ├── styles/
    │   └── globals.css          # primary Tailwind + token entry (shadcn template)
    ├── components/              # public-facing or re-exported component modules
    ├── lib/
    │   └── utils.ts
    ├── hooks/                   # optional (shadcn template includes the folder)
    └── …                        # optional: atoms/, molecules/, layout/ — Nezumi / Atomic Design (see docs/nezumi-ui)
```

**Token CSS layout (vendor):** Tailwind does **not** mandate a single `tokens.css` path. Design tokens are **theme variables**; define them in CSS (often under `@theme`) and split across files via **`@import`** ([172-theme.mdx](docs/tailwind-css/172-theme.mdx), [002-adding-custom-styles.mdx](docs/tailwind-css/002-adding-custom-styles.mdx)). **This repository** additionally exports **`design-tokens.css`** and splits primitives under `src/styles/tokens/`, `semantic/`, `components/` — valid as long as the import graph ends in one app-owned Tailwind entry or documented **`@source`** paths.

**Animations (vendor):** If following current shadcn Tailwind v4 guidance, add **`@import "tw-animate-css"`** to globals after installing `tw-animate-css` ([tailwind-v4.mdx](docs/shadcn-ui/overview/tailwind-v4.mdx)).

**Build output:** shadcn’s `exports` may point at **source** `.tsx` ([package-imports.mdx](docs/shadcn-ui/overview/package-imports.mdx)). A library may instead ship **`dist/`** via a bundler (**tsup**, etc.) as long as **`exports`** and `transpilePackages` stay consistent—**this repo** uses **`tsup`** + `dist/` for `@nezumi/ui`. That is a **packaging** choice, not contradicted by Next when `transpilePackages` is set.

---

## UI package public `exports` (no root barrel)

Normative pattern: **subpath `exports`**, no default `@nezumi/ui` barrel ([components-json.mdx](docs/shadcn-ui/overview/components-json.mdx), [package-imports.mdx](docs/shadcn-ui/overview/package-imports.mdx)).

Illustrative paths (adjust names to your package):

```text
@nezumi/ui/globals.css              # maps to src/styles/globals.css (or shared global entry)
@nezumi/ui/design-tokens.css       # optional second CSS entry (this repo)
@nezumi/ui/components/button
@nezumi/ui/layout
@nezumi/ui/lib/utils
```

Do **not** expose **internal** atomic folders as stable public imports unless you deliberately add an export (vendor/shadcn public API is **`components/*`**, **`lib/*`**, **`hooks/*`**).

**Rules:**

- Apps and CLI-generated blocks resolve UI through **`package.json#exports`** and workspace aliases in **`components.json`**—not ad-hoc `compilerOptions.paths` for published paths ([monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)).
- **`"use client"`** where required ([188-reference-rsc-use-client.mdx](docs/react/188-reference-rsc-use-client.mdx)).

**Docs:** [223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx](docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx) · [004-nezumi-ui-public-api.mdx](docs/nezumi-ui/004-nezumi-ui-public-api.mdx).

---

## UI token and style entry (CSS)

Expected **ingredients** (compose to taste):

```css
@import "tailwindcss";
@import "tw-animate-css";                   /* if using shadcn’s current animation path */
/* @import other partials that only define @theme / variables */

@custom-variant dark (&:where(.dark, .dark *));   /* if using class-based dark — see Tailwind dark mode doc */
```

**App-level:** if classes in `packages/ui` are not scanned, add **`@source`** to the **app** stylesheet pointing at the UI package ([053-detecting-classes-in-source-files.mdx](docs/tailwind-css/053-detecting-classes-in-source-files.mdx)). From `app/globals.css`, use **`../../../packages/ui/...`** for the workspace package; scan **only that app’s** sources with **`../`** (one segment up to `apps/<name>/`), not **`../../`** (that lands under `apps/` and pulls in every sibling app’s files). **Never** build utility class strings dynamically ([053-detecting-classes-in-source-files.mdx](docs/tailwind-css/053-detecting-classes-in-source-files.mdx)).

**Docs:** [172-theme.mdx](docs/tailwind-css/172-theme.mdx) · [052-dark-mode.mdx](docs/tailwind-css/052-dark-mode.mdx) · [053-detecting-classes-in-source-files.mdx](docs/tailwind-css/053-detecting-classes-in-source-files.mdx) · [tailwind-v4.mdx](docs/shadcn-ui/overview/tailwind-v4.mdx) · [010-nezumi-ui-design-tokens-tailwind-v4.mdx](docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx) (Nezumi narrative layered on `@theme`).

---

## Component implementation pattern

- **`data-slot`** on primitives where applicable (shadcn migration examples in [tailwind-v4.mdx](docs/shadcn-ui/overview/tailwind-v4.mdx)).
- **CVA** + **`cn()`** ([docs/cn/INDEX.md](docs/cn/INDEX.md)).
- **`asChild`:** use Radix **`Slot`** from **`@radix-ui/react-slot`** (shadcn convention)—not a fictional `Slot.Root` API.

---

## Storybook

**Not** specified in the offline `docs/` set bundled here. Treat Storybook version, `main.ts`/`preview.ts`, and port as **tooling choices**; keep Storybook deps **out of** `packages/ui` if you want the same separation as before.

---

## Optional future shared packages

Same extraction triggers as [08-core-concepts-internal-packages.mdx](docs/turbo/08-core-concepts-internal-packages.mdx):

`eslint-config/`, `forms/`, `charts/`, `icons/`, `patterns/` — only when duplication or release boundaries justify them.

---

## Import boundaries

Allowed:

```text
apps/*     -> @nezumi/ui
apps/*     -> that app’s npm dependencies
@nezumi/ui -> its own dependencies
@nezumi/ui -> @nezumi/typescript-config   # at dev / type-check time, if that package exists
packages/storybook -> @nezumi/ui           # if you add a Storybook package
```

Not allowed:

```text
@nezumi/ui -> apps/*
apps/homepage -> apps/members
apps/members -> apps/operations
apps/* -> app-specific code from another app
@nezumi/ui -> root barrel import from consumers
```

---

## Minimal implementation order (vendor-first, then Nezumi)

1. Workspace root: `package.json`, `pnpm-workspace.yaml`, `turbo.json` ([20-crafting-your-repository-structuring-a-repository.mdx](docs/turbo/20-crafting-your-repository-structuring-a-repository.mdx)).
2. **`packages/ui`** with **`components.json`**, **`src/styles/globals.css`**, **`lib/utils.ts`**, granular **`exports`** ([monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)).
3. **`apps/homepage`**, **`apps/members`**, **`apps/operations`** — each with **`app/globals.css`** (Tailwind + `@source` as needed), **`postcss.config.mjs`**, **`next.config.ts`** + `transpilePackages`, **`components.json`** ([011-01-app-01-getting-started-11-css.mdx](docs/nextjs/011-01-app-01-getting-started-11-css.mdx), [monorepo.mdx](docs/shadcn-ui/overview/monorepo.mdx)).
4. Add components and token CSS layers following Tailwind **`@theme`** + **`@import`** ([172-theme.mdx](docs/tailwind-css/172-theme.mdx)).
5. Optional: **`packages/typescript-config`**, **`packages/storybook`**, deeper Atomic layers per [docs/nezumi-ui/001-nezumi-ui-getting-started.mdx](docs/nezumi-ui/001-nezumi-ui-getting-started.mdx).

---

*When a rule is ambiguous offline, prefer: (1) re-read the `docs/*/INDEX.md` entry, (2) align filenames with the **shadcn monorepo** template, (3) match **this repository** for Nezumi-specific splits (e.g. `design-tokens.css`).*
