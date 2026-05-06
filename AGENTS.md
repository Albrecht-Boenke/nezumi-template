# AGENTS.md

**Instruction for AI Agents:**
You MUST always verify architectural and implementation decisions against the official, current documentation of the frameworks and tools used in this repository. Do not rely on training data alone. Always reference the documentation index below for the most current, authoritative sources.

## Nezumi Template — verbindliche Haupt-Versionen

Diese Versionen sind im Repo festgelegt (`pnpm-workspace.yaml` **Catalog**, Root `package.json` **`packageManager`** / **`engines`**). **Nicht** generisch „React 19“ / „Tailwind v4“ annehmen — für dieses Template gilt:

| Paket / Runtime | Pin (Semver-Range im Repo) | Typische Auflösung (siehe `pnpm-lock.yaml`) |
|-----------------|----------------------------|-----------------------------------------------|
| **`react`** | `^19.2.5` (Catalog) | **19.2.5** |
| **`react-dom`** | `^19.2.5` (Catalog) | **19.2.5** |
| **`typescript`** | `^6.0.3` (Catalog) | **6.0.3** |
| **`tailwindcss`** & **`@tailwindcss/postcss`** | je `^4.2.4` (Catalog) | **4.2.4** |
| **`next`** | `^16.2.4` (Catalog) | **16.2.4** |
| **pnpm** | `10.33.3` (`packageManager`) | exakt **10.33.3** |
| **Node.js** | `^24.0.0` (`engines`) | **24.x** (kein Patch-Pin; Major-Reihe verbindlich) |

Ausführliche Dateiverweise: [`FRAMEWORK_VERSION_REFERENCES.md`](FRAMEWORK_VERSION_REFERENCES.md).

### Offline Dokumentation in diesem Repo (Retrieval ohne Netz)

- Zentraler Überblick: [`docs/README.md`](docs/README.md) und lokaler Index-Stil (llms.txt-format): [`docs/llms.txt`](docs/llms.txt).
- Vendor-Snapshots (MD/MDX) haben **pro Bereich** eine `INDEX.md`: `docs/react/`, `docs/nextjs/`, `docs/tailwind-css/`, `docs/shadcn-ui/`, `docs/typescript/`, `docs/turbo/`, `docs/cn/`. **Turborepo:** ausschließlich [`docs/turbo/INDEX.md`](docs/turbo/INDEX.md) — hierarchischer Index; danach gezielt **eine** MDX-Datei öffnen.
- **TypeScript:** ausschließlich [`docs/typescript/INDEX.md`](docs/typescript/INDEX.md) — flache `NNN-*.mdx` im gleichen Ordner; Recherche-Regeln unter **Agent retrieval** in dieser `INDEX.md` (kein veraltetes `handbook/` / `tsconfig/`-Verzeichnis mehr annehmen).
- **Next.js:** ausschließlich [`docs/nextjs/INDEX.md`](docs/nextjs/INDEX.md) — flache `NNN-*.mdx` im gleichen Ordner; Recherche-Regeln unter **Agent retrieval** in dieser `INDEX.md` (kein verschachteltes `01-app/`-Baumlayout mehr annehmen).
- **React:** ausschließlich [`docs/react/INDEX.md`](docs/react/INDEX.md) — flache `NNN-*.mdx` im gleichen Ordner; Recherche-Regeln unter **Agent retrieval** in dieser `INDEX.md` (keine veralteten `learn/` / `reference/…`-Unterordner mehr annehmen).
- **Tailwind CSS:** ausschließlich [`docs/tailwind-css/INDEX.md`](docs/tailwind-css/INDEX.md) — flache `NNN-*.mdx` im gleichen Ordner; Recherche-Regeln unter **Agent retrieval** in dieser `INDEX.md`.
- Regel beim Lesen: **zuerst** die passende `INDEX.md` oder [`docs/nezumi-ui/README.md`](docs/nezumi-ui/README.md); **danach** erst gezielt einzelne Dateien öffnen (nicht `docs/` blind rekursiv durchsuchen).
- Für Nezumi-Architektur und Konvention gilt **Projekt-Doku unter `docs/nezumi-ui/`** vor den Vendor-Spiegeln; Details: [`docs/vendor-framework-docs.md`](docs/vendor-framework-docs.md).
- Vollständige Umsetzung der **Offline-Retrieval**-Org: Repo-Root [`OFFLINE_AGENT_RETRIEVAL_CHECKLIST.md`](OFFLINE_AGENT_RETRIEVAL_CHECKLIST.md).

### Online verification (authority)

Die folgende Liste **Framework Documentation Index** enthält weiterhin die **aktuellen Webs** zur **Verifikation** nach dem Lesen lokaler Mirrors.

## Framework Documentation Index

### 1. React 19.2.5 & react-dom 19.2.5
- **Main Reference:** [react.dev/reference/react](https://react.dev/reference/react)
- **Key Subpages:**
  - [Function Components & Refs](https://react.dev/reference/react/useRef)
  - [Server Components vs. Client Components](https://react.dev/reference/react/use-client)
  - [Actions & useActionState](https://react.dev/reference/react/useActionState)

### 2. Next.js 16.2.4 (App Router)
- **Main Reference:** [nextjs.org/docs](https://nextjs.org/docs)
- **Key Subpages:**
  - [App Router Architecture](https://nextjs.org/docs/app)
  - [Turbopack Configuration](https://nextjs.org/docs/app/api-reference/next-config-js/turbopack)
  - [Async Request APIs (cookies, headers)](https://nextjs.org/docs/app/api-reference/functions/cookies)
  - [ESLint Flat Config Integration](https://nextjs.org/docs/app/building-your-application/configuring/eslint)

### 3. Tailwind CSS 4.2.4
- **Main Reference:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Key Subpages:**
  - [CSS-first Configuration (@theme)](https://tailwindcss.com/docs#css-first-configuration)
  - [Custom Variants (@custom-variant)](https://tailwindcss.com/docs#custom-variants)
  - [Theme Inference & tailwind-merge](https://tailwindcss.com/docs#theme-inference)
  - [Tailwind CSS v4 Features & Upgrade Guide](https://tailwindcss.com/blog/tailwindcss-v4)

### 4. Radix UI - Primitives
- **Main Reference:** [radix-ui.com/primitives](https://www.radix-ui.com/primitives/docs)
- **Key Subpages:**
  - [Slot Primitive (asChild)](https://www.radix-ui.com/primitives/docs/utilities/slot)
  - [Interactive Primitives (Dialog, Popover, etc.)](https://www.radix-ui.com/primitives/docs/components/dialog)
  - [Releases & Changelog](https://www.radix-ui.com/primitives/docs/overview/releases)
- **GitHub:** [radix-ui/primitives](https://github.com/radix-ui/primitives)

### 5. Radix UI - Themes (Latest: v3.3.0)
- **Main Reference:** [radix-ui.com/themes/docs](https://www.radix-ui.com/themes/docs/overview/getting-started)
- **Key Subpages:**
  - [Theme Configuration](https://www.radix-ui.com/themes/docs/theme/overview)
  - [Styling Guide](https://www.radix-ui.com/themes/docs/overview/styling)
  - [Theme Component](https://www.radix-ui.com/themes/docs/components/theme)
  - [Releases & Changelog](https://www.radix-ui.com/themes/docs/overview/releases)
- **GitHub:** [radix-ui/themes](https://github.com/radix-ui/themes)

### 6. Motion (formerly Framer Motion) - Latest
- **Main Reference:** [motion.dev/docs](https://motion.dev/docs)
- **Key Subpages:**
  - [Motion for React](https://motion.dev/docs/react)
  - [Motion Component API](https://motion.dev/docs/react-motion-component)
  - [Upgrade Guide (Framer Motion → Motion)](https://motion.dev/docs/react-upgrade-guide)
- **GitHub:** [motiondivision/motion](https://github.com/motiondivision/motion)

### 7. Turbo (Turborepo & Turbopack)
- **Main Reference:** [turbo.build/repo/docs](https://turbo.build/repo/docs)
- **Key Subpages:**
  - [Task Pipeline (turbo.json)](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
  - [Caching & Outputs](https://turbo.build/repo/docs/core-concepts/caching)

### 8. TypeScript 6.0.3
- **Main Reference:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **Key Subpages:**
  - [TSConfig Reference](https://www.typescriptlang.org/tsconfig)

### 9. pnpm 10.33.3
- **Main Reference:** [pnpm.io/motivation](https://pnpm.io/motivation)
- **Key Subpages:**
  - [Workspaces](https://pnpm.io/workspaces)
  - [Catalogs (pnpm 10 feature)](https://pnpm.io/catalogs)

### 10. shadcn/ui (Latest: v4 with Tailwind CSS 4.2.4 & React / react-dom 19.2.5)
- **Main Reference:** [ui.shadcn.com/docs](https://ui.shadcn.com/docs)
- **Key Subpages:**
  - [CLI & components.json](https://ui.shadcn.com/docs/components-json)
  - [Registry Blocks](https://ui.shadcn.com/docs/blocks)
  - [v4 Demo & Updated Components](https://v4.shadcn.com)
- **GitHub:** [shadcn-ui/ui](https://github.com/shadcn-ui/ui)

### 11. CVA (Class Variance Authority)
- **Main Reference:** [cva.style/docs](https://cva.style/docs)
- **Key Subpages:**
  - [Getting Started & Installation](https://cva.style/docs/getting-started/installation)
  - [Creating Variants](https://cva.style/docs/getting-started/variants)
  - [Tailwind CSS Integration](https://cva.style/docs/guides/tailwind-css)
  - [Compound Variants](https://cva.style/docs/getting-started/compound-variants)
- **GitHub:** [joe-bell/cva](https://github.com/joe-bell/cva)
- **NPM:** [class-variance-authority](https://www.npmjs.com/package/class-variance-authority)

### 12. Utility Functions - Class Merging
- **clsx** (className Constructor)
  - **NPM:** [clsx](https://www.npmjs.com/package/clsx)
  - **GitHub:** [lukeed/clsx](https://github.com/lukeed/clsx)
  - **Purpose:** Tiny utility for constructing className strings conditionally
  - **Pattern:** Use with `tailwind-merge` for conflict resolution
- **tailwind-merge**
  - **NPM:** [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
  - **Purpose:** Merge Tailwind CSS classes and resolve conflicts
  - **Common Pattern:**
    ```typescript
    import { clsx, type ClassValue } from 'clsx';
    import { twMerge } from 'tailwind-merge';
    
    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }
    ```

### 13. Storybook 10.3.6
- **Main Reference:** [storybook.js.org/docs](https://storybook.js.org/docs/react/get-started/introduction)

### 14. Testing (Vitest & Playwright)
- **Vitest:** [vitest.dev/guide](https://vitest.dev/guide/)
- **Playwright:** [playwright.dev/docs/intro](https://playwright.dev/docs/intro)
