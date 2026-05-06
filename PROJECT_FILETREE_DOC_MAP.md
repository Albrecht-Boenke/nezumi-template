# Projektbaum → Dokumentation (Zuordnung)

**Generator:** `python tools/generate-project-doc-map.py` aktualisiert diese Datei.  
**Ausgeschlossen aus dem Baum:** **`docs/`** (gesamte Offline‑Doku liegt dort separat — siehe [`docs/README.md`](docs/README.md)), `node_modules/`, `.git/`.  
Die **Links in der Spalte „→“** verweisen weiterhin auf passende Seiten unter **`docs/...`** (offline) bzw. auf das Web — der Baum listet nur noch **Quell- und Konfigurationsdateien** des Repos.

**Legende:**

- Links mit `docs/...` sind **Offline-Spiegel** im Repo (sofern nicht mit ⚠ markiert).
- Externe `https://` Links dienen zur **Nachprüfung** gegen die Live-Doku.
- ⚠ bedeutet: **passende Offline-Kopie liegt (noch) nicht** unter `docs/` — nur Online oder Tooling-Eigenwebsite.

---

## Bekannte Lücken im Offline-Spiegel (Projektbezug)

| Thema im Code | Offline unter `docs/`? | Online / Tooling |
|---------------|-------------------------|-------------------|
| pnpm workspaces / catalogs / lockfile | ⚠ Nein — nur Erwähnung in Turborepo-Handbuch möglich | pnpm.io |
| Vitest (Konfiguration, APIs jenseits Turbo-Guide) | ⚠ nur [Vitest unter Turbo](docs/turbo/handbook/guides/tools/vitest.mdx) | vitest.dev |
| **Radix UI** Komponenten-API dieses Stacks | ⚠ nicht als Markdown-Mirror eingecheckt | [radix primitives](https://www.radix-ui.com/primitives/docs) |

## Baum (`/` = Repo-Root)

- **.cursor/**
  - **rules/**
    - `offline-docs-retrieval.mdc` → [Cursor Rules-Doku](https://cursor.com/docs/context/rules) · [offline-docs-retrieval.mdc](.cursor/rules/offline-docs-retrieval.mdc)
    - `vendor-tailwind-offline-docs.mdc` → [Cursor Rules-Doku](https://cursor.com/docs/context/rules) · [Tailwind Offline Rule](.cursor/rules/vendor-tailwind-offline-docs.mdc) · [docs/tailwind-css/INDEX.md](docs/tailwind-css/INDEX.md)
- **packages/**
  - **ui/**
    - **dist/**
      - **components/**
        - `button.d.mts` → [nezumi README](docs/nezumi-ui/README.md)
        - `button.d.ts` → [nezumi README](docs/nezumi-ui/README.md)
        - `button.js` → [nezumi README](docs/nezumi-ui/README.md)
        - `button.mjs` → [nezumi README](docs/nezumi-ui/README.md)
      - **layout/**
        - `index.d.mts` → [nezumi README](docs/nezumi-ui/README.md)
        - `index.d.ts` → [nezumi README](docs/nezumi-ui/README.md)
        - `index.js` → [nezumi README](docs/nezumi-ui/README.md)
        - `index.mjs` → [nezumi README](docs/nezumi-ui/README.md)
      - **lib/**
        - `utils.d.mts` → [nezumi README](docs/nezumi-ui/README.md)
        - `utils.d.ts` → [nezumi README](docs/nezumi-ui/README.md)
        - `utils.js` → [nezumi README](docs/nezumi-ui/README.md)
        - `utils.mjs` → [nezumi README](docs/nezumi-ui/README.md)
      - `.DS_Store` → [nezumi README](docs/nezumi-ui/README.md)
    - **src/**
      - **atoms/**
        - **Button/**
          - `Button.test.tsx` → [Vitest in Turbo](docs/turbo/handbook/guides/tools/vitest.mdx) ⚠ **Vitest Core-Doku offline fehlt**
          - `Button.tsx` → [Atomic Design nezumi](docs/nezumi-ui/03-atomic-design.md) · [shadcn radix](docs/shadcn-ui/components/radix/)
          - `index.ts` → [Atomic Design nezumi](docs/nezumi-ui/03-atomic-design.md) · [shadcn radix](docs/shadcn-ui/components/radix/)
        - `index.ts` → [Atomic Design nezumi](docs/nezumi-ui/03-atomic-design.md) · [shadcn radix](docs/shadcn-ui/components/radix/)
      - **components/**
        - `button.tsx` → [shadcn components](docs/shadcn-ui/components/index.mdx) · [React DOM](docs/react/reference/react-dom/components/index.md) · [nezumi dev](docs/nezumi-ui/06-component-development.md)
        - `index.ts` → [shadcn components](docs/shadcn-ui/components/index.mdx) · [React DOM](docs/react/reference/react-dom/components/index.md) · [nezumi dev](docs/nezumi-ui/06-component-development.md)
      - **layout/**
        - `Box.tsx` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `Container.tsx` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `Flex.tsx` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `Grid.tsx` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `index.ts` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `README.md` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `Section.tsx` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `spacing.test.ts` → [Vitest in Turbo](docs/turbo/handbook/guides/tools/vitest.mdx) ⚠ **Vitest Core-Doku offline fehlt**
        - `spacing.ts` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `Stack.tsx` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `types.ts` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
        - `utils.ts` → [Public API / layout](docs/nezumi-ui/04-public-api.md) · [Tailwind utilities](docs/tailwind-css/INDEX.md)
      - **lib/**
        - `index.ts` → [TS Handbook](docs/typescript/handbook/handbook-v2/The%20Handbook.md) · [INDEX](docs/typescript/INDEX.md)
        - `utils.ts` → [cn INDEX](docs/cn/INDEX.md) · [nezumi customization](docs/nezumi-ui/customization.md)
      - **molecules/**
        - `index.ts` → [Atomic nezumi](docs/nezumi-ui/03-atomic-design.md)
      - **organisms/**
        - `index.ts` → [Atomic nezumi](docs/nezumi-ui/03-atomic-design.md)
      - **styles/**
        - **components/**
          - `button.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `card.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `input.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
        - **semantic/**
          - `colors.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `spacing.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
        - **tokens/**
          - `colors.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `motion.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `radius.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `shadows.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `spacing.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
          - `typography.css` → [Tailwind INDEX](docs/tailwind-css/INDEX.md) · [theme.mdx](docs/tailwind-css/theme.mdx) · [foundation](docs/nezumi-ui/05-foundation.md)
        - `global.css` → [adding-custom-styles](docs/tailwind-css/adding-custom-styles.mdx) · [design tokens v4](docs/nezumi-ui/10-design-tokens-tailwind-v4.md)
      - **templates/**
        - `index.ts` → [Atomic nezumi](docs/nezumi-ui/03-atomic-design.md)
    - `.DS_Store` → [nezumi README](docs/nezumi-ui/README.md)
    - `components.json` → [components.json](docs/shadcn-ui/overview/components-json.mdx) · [ui.shadcn.com/…/components-json](https://ui.shadcn.com/docs/components-json)
    - `package.json` → [pnpm package.json](https://pnpm.io/package_json) · [Turbo internal packages](docs/turbo/handbook/core-concepts/internal-packages.mdx)
    - `tsconfig.json` → [compilerOptions](docs/typescript/tsconfig/sections/compilerOptions.md) · [TS INDEX](docs/typescript/INDEX.md) · **Root-Projekt ohne eigenes Turborepo-`turbo.json` – siehe** [pnpm-workspace.yaml](pnpm-workspace.yaml)
    - `tsup.config.ts` → [Turbo publishing libraries](docs/turbo/handbook/guides/publishing-libraries.mdx) ⚠ **tsup** nur online · [tsup](https://tsup.egoist.dev)
    - `vitest.config.ts` → [Vitest + Turbo](docs/turbo/handbook/guides/tools/vitest.mdx) ⚠ **Vitest-Handbuch offline fehlt** · [vitest](https://vitest.dev/guide/)
  - `.DS_Store` → [MONOREPO](docs/nezumi-ui/MONOREPO_ARCHITECTURE.md) · [Turbo internal packages](docs/turbo/handbook/core-concepts/internal-packages.mdx)
- **tools/**
  - `generate-project-doc-map.py` → [docs/README.md](docs/README.md) · [AGENTS.md](AGENTS.md)
- `.DS_Store` → [docs/README.md](docs/README.md) · [AGENTS.md](AGENTS.md)
- `AGENTS.md` → `AGENTS.md` · [docs/README.md](docs/README.md)
- `CLAUDE.md` → [AGENTS.md](AGENTS.md)
- `package.json` → [Turbo — Tooling-Index](docs/turbo/handbook/guides/tools/index.mdx) · [pnpm workspaces](https://pnpm.io/workspaces) ⚠ **pnpm kein Offline-Mirror-Ordner**
- `pnpm-lock.yaml` → [pnpm lockfile](https://pnpm.io/git) ⚠
- `pnpm-workspace.yaml` → [pnpm workspaces](https://pnpm.io/workspaces) · [catalogs](https://pnpm.io/catalogs) ⚠
- `PROJECT_FILETREE_DOC_MAP.md` → *Ausgabe dieses Generators* · [docs/README.md](docs/README.md)
