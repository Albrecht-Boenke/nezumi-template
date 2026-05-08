# AI Slop Review Verification Checklist — Nezumi Template

**Date:** 2026-05-08  
**Scope:** `packages/ui`, `apps/*`, root/tooling, local docs  
**Mode:** Verified read-only against local project docs, vendor docs, code, and subagent review. No source-code fixes are included here.

## Verification Baseline

Expected state was derived in this order:

- `AGENTS.md`
- Local doc indexes first: `docs/nezumi-ui/INDEX.md`, `docs/react/INDEX.md`, `docs/nextjs/INDEX.md`, `docs/typescript/INDEX.md`, `docs/tailwind-css/INDEX.md`, `docs/shadcn-ui/INDEX.md`, `docs/turbo/INDEX.md`, `docs/cn/INDEX.md`
- Relevant local docs and `DESIGN.md`
- Actual code in `packages/` and `apps/`
- Official Satori README for the `ImageResponse` CSS-variable question

Important correction: the old report said `docs/nezumi-ui/` was excluded. That is invalid for this repository. `AGENTS.md` requires `docs/nezumi-ui/INDEX.md` as the project-specific supplement, and several old findings change severity when checked against Nezumi's own SSOT.

## Status Legend

- `[ ]` confirmed issue, not fixed
- `[~]` partially confirmed or needs a narrower fix
- `[x]` verified false or should be removed from the old report

---

## A. Repository Hygiene & Generated Slop

### [ ] A1. Tracked `_typo/` v0/shadcn sandbox is outside the monorepo topology

**Severity:** High  
**Code:** `_typo/package.json`, `_typo/components.json`, `_typo/pnpm-lock.yaml`, `_typo/.gitignore`, `_typo/components/ui/*`  
**Docs:** `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`, `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`, `pnpm-workspace.yaml`

`_typo/` is tracked but is not part of `apps/*` or `packages/*`. It carries its own lockfile, v0 sandbox ignores, `@/components/ui` imports, and different dependency versions such as `next 16.2.4`, `typescript 5.7.3`, and `@types/node ^22`, while the workspace pins Next `^16.2.5`, TypeScript `^6.0.3`, and Node types `^24.12.2`.

Checklist:

- [ ] Decide whether `_typo/` is a real app, reference artifact, or disposable generator output.
- [ ] If real, move it into `apps/` and align it with workspace pins, `components.json`, and package imports.
- [ ] If not real, remove it from the tracked repo.

### [ ] A2. 54 placeholder component boundary files advertise unimplemented components

**Severity:** Medium  
**Code:** `packages/ui/src/atoms/*/index.ts`, `packages/ui/src/molecules/*/index.ts`, `packages/ui/src/organisms/*/index.ts`, `packages/ui/src/providers/Direction/index.ts`  
**Docs:** `docs/nezumi-ui/003-nezumi-ui-atomic-design.mdx`, `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`, `docs/nezumi-ui/006-nezumi-ui-component-development.mdx`

There are 54 files with the identical placeholder pattern:

```ts
// Placeholder export boundary for future shadcn/ui ...
// Keep this file component-free until the implementation is intentionally added.
export {}
```

This is real AI/template bloat. It is less severe than the old report claimed because most placeholders are not public package exports, but they still create misleading internal structure and noise.

Checklist:

- [ ] Remove placeholder-only component directories that are not part of an active implementation plan.
- [ ] Keep only implemented internals and documented public leaf exports.
- [ ] Generate future shadcn components intentionally through the configured workflow.

### [ ] A3. Component token files exist for many unimplemented components

**Severity:** High  
**Code:** `packages/ui/src/**/tokens.css`  
**Docs:** `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`, `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`, `DESIGN.md`

There are 59 component-level token files. Many are not imported anywhere and sit next to placeholder components. Large examples include `DatePicker/tokens.css`, `Select/tokens.css`, `Command/tokens.css`, `Sidebar/tokens.css`, and `DataTable/tokens.css`. The old report's exact Badge example was wrong: `Badge/tokens.css` does not contain `panel-header` tokens. The broader issue is still confirmed for many placeholder components.

Checklist:

- [ ] Remove token files for unimplemented components.
- [ ] Keep component tokens only when a real component references them or they are explicitly documented as implementation references.
- [ ] Avoid duplicating token declarations in both `src/styles/components/*.css` and component-local `tokens.css` unless one is intentionally reference-only.

### [ ] A4. App build artifacts are present in the working tree

**Severity:** Medium  
**Code:** `apps/*/.next`, `apps/*/.turbo`, `apps/*/next-env.d.ts`, `apps/*/tsconfig.tsbuildinfo`  
**Docs:** `.gitignore`, `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

The workspace currently contains generated `.next`, `.turbo`, `next-env.d.ts`, and `.tsbuildinfo` files under apps. `.gitignore` covers these patterns, so they should not become committed project state. This is repository hygiene rather than source-code correctness.

Checklist:

- [ ] Confirm whether any generated files are tracked.
- [ ] Remove tracked build artifacts if present.
- [ ] Keep generated outputs out of future reviews and diffs.

---

## B. Documentation & SSOT Drift

### [ ] B1. `docs/nezumi-ui/INDEX.md` has a broken link for the Tailwind token chapter

**Severity:** Medium  
**Code:** `docs/nezumi-ui/INDEX.md`  
**Docs:** `AGENTS.md`, `docs/nezumi-ui/INDEX.md`

The index points to `./010-nezumi-ui-design-tokens-tailwind-v4.mdx`, but the actual file is `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`. Because `AGENTS.md` requires opening relevant `INDEX.md` files first, broken index links directly harm the mandated research workflow.

Checklist:

- [ ] Update the index link to `.md`.
- [ ] Check the rest of `docs/nezumi-ui/INDEX.md` for stale filenames.

### [ ] B2. Public API documentation is stale versus actual `@packages/ui` exports

**Severity:** Medium  
**Code:** `packages/ui/package.json`, `packages/ui/src/components/*.tsx`, `packages/ui/src/providers/Theme/index.tsx`  
**Docs:** `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`

The public API doc shows only Button/Layout/lib exports, while the package also exports `typography`, `input`, `card`, `toast`, and `providers/theme`. The same doc says new public leaves must be documented.

Checklist:

- [ ] Update `docs/nezumi-ui/004-nezumi-ui-public-api.mdx` to match `packages/ui/package.json`.
- [ ] Document `./providers/theme`.
- [ ] Add a rule for when implemented internals become public leaves.

### [ ] B3. Shared TypeScript config is documented but not wired

**Severity:** Medium  
**Code:** `packages/typescript-config/`, `packages/ui/tsconfig.json`, `apps/*/tsconfig.json`, `packages/ui/package.json`  
**Docs:** `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`, `docs/turbo/42-guides-tools-typescript.mdx`, `docs/typescript/196-tsconfig-options-extends.mdx`

The normative file tree describes `packages/typescript-config` with `base.json`, `nextjs.json`, and `react-library.json`, and says UI `tsconfig.json` inherits from it. The directory exists but has no files, and app/UI `tsconfig.json` files inline their config instead of using `extends`.

Checklist:

- [ ] Create or remove the documented `packages/typescript-config` package.
- [ ] If kept, add `base.json`, `nextjs.json`, `react-library.json`, and package metadata.
- [ ] Convert app/UI `tsconfig.json` files to `extends` where appropriate.

### [ ] B4. App-level TSX violates the `Typography` rule from `DESIGN.md`

**Severity:** Medium  
**Code:** `apps/members/app/page.tsx`, `apps/operations/app/page.tsx`, `apps/playground/app/page.tsx`, `apps/playground/app/tutorials/*`  
**Docs:** `DESIGN.md`, `docs/nezumi-ui/007-nezumi-ui-best-practices.mdx`, `docs/nezumi-ui/015-nezumi-ui-styling.mdx`

`DESIGN.md` states visible app text should use `Typography` and app-level UI should not use raw `p`, `span`, or `h1-h6`. `homepage` mostly follows the public Typography component, but `members`, `operations`, and `playground` use raw headings and text tags extensively.

Checklist:

- [ ] Decide whether `DESIGN.md` is normative for playground/tutorial pages or only product apps.
- [ ] Replace app-level raw text elements with `Typography` where the rule applies.
- [ ] Document any playground/tutorial exceptions.

---

## C. UI Public API & Component Contracts

### [~] C1. Button API is neither fully shadcn-compatible nor clearly documented as a Nezumi extension

**Severity:** High  
**Code:** `packages/ui/src/atoms/Button/Button.tsx`, `packages/ui/src/atoms/Button/Button.test.tsx`  
**Docs:** `docs/shadcn-ui/components/radix/button.md`, `docs/nezumi-ui/013-nezumi-ui-customization-theming.mdx`, `DESIGN.md`

shadcn documents variants `default | outline | ghost | destructive | secondary | link` and sizes `default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg`. The current Button adds `primary`, `tonal`, `elevated`, `md`, `xl`, omits several shadcn sizes, and defaults to `size: "md"`.

This is not automatically wrong: `DESIGN.md` requires Nezumi variants like `tonal`, `elevated`, and size `xl`. The problem is the public contract is unclear, and `primary` is not justified by either shadcn or `DESIGN.md`.

Checklist:

- [ ] Decide and document whether Button is shadcn-compatible plus Nezumi extensions, or a Nezumi-specific API.
- [ ] Add shadcn-compatible size aliases where intended.
- [ ] Remove or document `primary`.
- [ ] Keep `tonal`, `elevated`, and `xl` only as documented Nezumi extensions.

### [ ] C2. Button duplicate variants produce identical output

**Severity:** Medium  
**Code:** `packages/ui/src/atoms/Button/Button.tsx`  
**Docs:** `DESIGN.md`, `docs/shadcn-ui/components/radix/button.md`

`default` and `primary` are identical. `tonal` and `secondary` are identical. This creates API ambiguity even if both shadcn names and Nezumi names are supported.

Checklist:

- [ ] Convert intentional aliases into documented aliases.
- [ ] Remove unsupported duplicate names.
- [ ] Add tests that assert the intended public naming contract, not accidental duplication.

### [ ] C3. `cn()` is duplicated in three places

**Severity:** Medium  
**Code:** `packages/ui/src/lib/utils.ts`, `packages/ui/src/layout/utils.ts`, `packages/ui/src/molecules/utils.ts`  
**Docs:** `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`, `docs/nezumi-ui/015-nezumi-ui-styling.mdx`, `docs/cn/001-clsx-readme.mdx`, `docs/cn/002-tailwind-merge-readme.mdx`

The documented public utility is `@packages/ui/lib/utils`. Duplicating `cn()` in layout and molecules creates drift risk and one copy already uses different quote style.

Checklist:

- [ ] Keep `cn()` in `src/lib/utils.ts`.
- [ ] Import that helper from layout/molecules if needed.
- [ ] Remove unused `src/molecules/utils.ts`.

### [ ] C4. Typography default tags couple visual variants to document semantics

**Severity:** Medium  
**Code:** `packages/ui/src/atoms/Typography/index.tsx`  
**Docs:** `DESIGN.md`, `docs/shadcn-ui/components/radix/typography.mdx`

The current Typography component is React-19-compatible, but `variantDefaultTag` maps visual variants to heading tags, e.g. `title-large -> h1`. That can create incorrect heading hierarchies when consumers use visual sizes for non-heading roles. The `as` prop exists, but the defaults still encode semantic assumptions.

Checklist:

- [ ] Separate visual variant from semantic element defaults.
- [ ] Consider neutral defaults for non-obvious variants.
- [ ] Document when consumers must pass `as`.

### [~] C5. Grid dynamic template implementation is complex and tests lock it in

**Severity:** Low/Medium  
**Code:** `packages/ui/src/layout/Grid/Grid.tsx`, `packages/ui/src/layout/layout-components.test.tsx`  
**Docs:** `docs/tailwind-css/002-adding-custom-styles.mdx`, `docs/tailwind-css/091-grid-template-columns.mdx`, `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`

The old report called this a Tailwind violation. That is not accurate: Tailwind supports literal arbitrary classes using custom properties, and dynamic runtime strings cannot be reliably detected. The real issue is maintainability: the implementation introduces several custom helpers and `--nz-grid-*` variables, and the tests explicitly require that behavior.

Checklist:

- [ ] Decide whether dynamic responsive template strings are part of the public Grid API.
- [ ] If yes, document the CSS-variable strategy.
- [ ] If no, simplify the API and update tests that currently lock in `--nz-grid-*`.

### [~] C6. `resolveDimension()` supports only a narrow documented keyword set

**Severity:** Low/Medium  
**Code:** `packages/ui/src/layout/utils.ts`  
**Docs:** `docs/tailwind-css/189-width.mdx`, `docs/tailwind-css/002-adding-custom-styles.mdx`

The old report overstated this as hidden behavior: the code comment does document the inline-style fallback. Still, the API does not support common Tailwind values like fractions through classes, and users may not know which values generate utilities versus inline styles.

Checklist:

- [ ] Document dimension prop value semantics in the layout README/docs.
- [ ] Decide whether to support fractions/arbitrary syntax explicitly.
- [ ] Keep finite generated classes safelisted if the utility approach remains.

---

## D. Styling, Tokens & Tailwind

### [ ] D1. `@custom-variant dark` is declared in app entries and in imported UI token CSS

**Severity:** Medium  
**Code:** `apps/*/app/globals.css`, `packages/ui/src/styles/global.css`, `packages/ui/src/styles/design-tokens.css`, `packages/ui/src/styles/design-tokens.test.ts`  
**Docs:** `docs/tailwind-css/002-adding-custom-styles.mdx`, `docs/shadcn-ui/overview/theming.mdx`, `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`

Apps declare `@custom-variant dark` and then import `@packages/ui/design-tokens.css`, which declares it again. `packages/ui/src/styles/global.css` also declares it for one-shot environments. The current test suite expects the duplicate in `design-tokens.css`.

Checklist:

- [ ] Choose one owner for dark variant registration per CSS entry.
- [ ] Update `design-tokens.test.ts` if `design-tokens.css` should no longer declare it.
- [ ] Keep `global.css` as the one-shot UI-owned entry only if documented.

### [ ] D2. Implemented component token references are duplicated between local token files and `styles/components`

**Severity:** Medium  
**Code:** `packages/ui/src/molecules/Card/tokens.css`, `packages/ui/src/styles/components/card.css`, `packages/ui/src/atoms/Input/tokens.css`, `packages/ui/src/styles/components/input.css`, `packages/ui/src/organisms/Toast/tokens.css`, `packages/ui/src/styles/components/toast.css`  
**Docs:** `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`, `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`

For Card, Input, and Toast, component-local `tokens.css` files duplicate declarations that are also registered under `src/styles/components/*.css`. The comments say local files are implementation references, but this still creates a two-source maintenance burden.

Checklist:

- [ ] Decide whether component-local token files are documentation/reference or real token sources.
- [ ] If reference-only, keep them out of runtime imports and state that clearly.
- [ ] If real sources, import them from a single token entry instead of duplicating declarations.

### [ ] D3. `Button/tokens.css` is unimported and contains unused token surface

**Severity:** Medium  
**Code:** `packages/ui/src/atoms/Button/tokens.css`, `packages/ui/src/styles/components/button.css`, `packages/ui/src/atoms/Button/Button.tsx`  
**Docs:** `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`

Button uses tokens from `src/styles/components/button.css`, while `src/atoms/Button/tokens.css` is not imported and defines unused `button-action-*` and other component tokens.

Checklist:

- [ ] Remove `atoms/Button/tokens.css` or convert it into the single source.
- [ ] Keep only token names referenced by Button or documented component variants.

### [~] D4. `design-tokens.css` mixes tokens, dark overrides, and base styles by project design

**Severity:** Low  
**Code:** `packages/ui/src/styles/design-tokens.css`  
**Docs:** `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`, `DESIGN.md`

The old report framed this as a Tailwind violation. Local Nezumi docs explicitly place `.dark` overrides and base styles in `design-tokens.css`, so it is not a confirmed violation. It may still be worth splitting if maintainability suffers, but that would be a project-doc change first.

Checklist:

- [ ] Keep as-is unless the Nezumi token architecture is intentionally revised.
- [ ] If split, update `docs/nezumi-ui/005`, `010`, `DESIGN.md`, and tests together.

### [~] D5. OG image depends on CSS variables not declared inside the `ImageResponse` tree

**Severity:** High  
**Code:** `apps/homepage/app/opengraph-image.tsx`  
**Docs:** `docs/nextjs/101-01-app-03-api-reference-03-file-conventions-01-metadata-opengraph-image.mdx`, `docs/nextjs/148-01-app-03-api-reference-04-functions-image-response.mdx`, official Satori README

The old report said Satori does not support CSS custom properties. That is false: current Satori documents support for CSS variables. The real problem is that `opengraph-image.tsx` uses `var(--color-surface)` and similar values without declaring those variables in the rendered OG tree. App CSS is not automatically available as a browser cascade inside `ImageResponse`.

Checklist:

- [ ] Replace OG colors with literal hex/OKLCH values or define the required CSS variables in the top-level OG element.
- [ ] If exact brand font matters, provide font data via the `fonts` option instead of relying on layout `next/font` variables.

### [ ] D6. `--font-urbanist` and `--font-space-grotesk` are package contracts but only homepage defines them

**Severity:** Medium  
**Code:** `packages/ui/src/styles/tokens/typography.css`, `apps/homepage/app/layout.tsx`, `apps/members/app/layout.tsx`, `apps/operations/app/layout.tsx`, `apps/playground/app/layout.tsx`  
**Docs:** `DESIGN.md`, `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`, `docs/nextjs/092-01-app-03-api-reference-02-components-font.mdx`

Typography tokens refer to app-provided font variables with fallbacks. Homepage defines them via `next/font`; members, operations, and playground do not. This may be intentional fallback behavior, but the contract is undocumented for consuming apps.

Checklist:

- [ ] Document required font variables for apps consuming `@packages/ui/design-tokens.css`.
- [ ] Either define the variables in every app layout or accept/document fallback font behavior.

### [~] D7. Playground global heading reset is allowed by Tailwind but conflicts with token-owned typography direction

**Severity:** Low  
**Code:** `apps/playground/app/globals.css`  
**Docs:** `docs/tailwind-css/145-preflight.mdx`, `DESIGN.md`

Tailwind explicitly allows adding base styles after Preflight. The issue is not Tailwind compliance; it is project consistency. Playground globally sets heading letter-spacing instead of using Typography/token classes.

Checklist:

- [ ] Remove the playground-only heading reset or document it as a playground exception.
- [ ] Prefer Typography/token classes where the `DESIGN.md` app text rule applies.

---

## E. Apps, Config & Runtime Conventions

### [~] E1. App config duplication is real, but the old report overstated byte-identical files

**Severity:** Medium  
**Code:** `apps/*/next.config.ts`, `apps/*/postcss.config.mjs`, `apps/*/tsconfig.json`, `apps/*/package.json`, `apps/*/components.json`  
**Docs:** `docs/typescript/196-tsconfig-options-extends.mdx`, `docs/turbo/42-guides-tools-typescript.mdx`, `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

`next.config.ts` and `postcss.config.mjs` are byte-identical across all apps. `tsconfig.json` is semantically duplicated but formatted differently. `package.json` files are nearly identical but differ by name. `globals.css` is not byte-identical across all apps; only members and operations are identical.

Checklist:

- [ ] Extract TypeScript config via shared `extends` first.
- [ ] Consider whether shared Next/PostCSS config adds value or just indirection.
- [ ] Preserve app-owned Tailwind entry files because Nezumi docs require app-local `@source` paths.

### [ ] E2. Root scripts bypass the configured Turbo task pipeline

**Severity:** Low/Medium  
**Code:** `package.json`, `turbo.json`, `apps/*/package.json`  
**Docs:** `docs/turbo/19-crafting-your-repository-running-tasks.mdx`, `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

`turbo.json` defines `build`, `dev`, `lint`, `test`, and `typecheck`, and app packages expose those scripts. Root scripts manually call `next build apps/...` and `next dev apps/...` instead of `turbo run`.

Checklist:

- [ ] Add root scripts such as `build`, `dev`, `lint`, `typecheck`, `test` using `turbo run`.
- [ ] Keep app-specific scripts only where direct app targeting is useful.

### [ ] E3. Members and Operations pages are near-identical copy-paste

**Severity:** Low/Medium  
**Code:** `apps/members/app/page.tsx`, `apps/operations/app/page.tsx`  
**Docs:** `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

The pages differ only by function name and copy. This is true duplication, but not critical. A shared app-local shell or future `packages/ui/src/templates` component is enough if this pattern persists.

Checklist:

- [ ] Extract only if these placeholder pages will remain or grow.
- [ ] Do not put app-specific business shell into `@packages/ui` unless it is a real reusable template.

### [~] E4. Homepage disables system theme detection without documenting the product decision

**Severity:** Low/Medium  
**Code:** `apps/homepage/app/layout.tsx`  
**Docs:** `docs/nezumi-ui/013-nezumi-ui-customization-theming.mdx`, `docs/shadcn-ui/dark-mode/next.mdx`

Homepage uses `defaultTheme="light"` and `enableSystem={false}`. Nezumi/shadcn examples favor `defaultTheme="system"` and `enableSystem`. This may be an intentional light-only product decision, but it is not documented.

Checklist:

- [ ] Document intentional light-only behavior or align with system theme behavior.
- [ ] Decide whether members/operations/playground should also use `ThemeProvider`.

### [~] E5. Missing route-level `error.tsx`, `loading.tsx`, and `not-found.tsx` is a resilience gap, not a framework violation

**Severity:** Low/Medium  
**Code:** `apps/*/app`  
**Docs:** `docs/nextjs/113-01-app-03-api-reference-03-file-conventions-error.mdx`, `docs/nextjs/120-01-app-03-api-reference-03-file-conventions-loading.mdx`, `docs/nextjs/123-01-app-03-api-reference-03-file-conventions-not-found.mdx`

Next.js defines these conventions but does not require every app to implement them. The current apps rely on defaults.

Checklist:

- [ ] Add route-level fallback files where user-facing recovery or streaming UX matters.
- [ ] Do not frame absence as a blanket Next.js violation.

### [ ] E6. Playground lacks `components.json` while other apps have shadcn app config

**Severity:** Low  
**Code:** `apps/playground/`, `apps/homepage/components.json`, `apps/members/components.json`, `apps/operations/components.json`  
**Docs:** `docs/nezumi-ui/012-nezumi-ui-shadcn-cli.mdx`, `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

Homepage, members, and operations have matching shadcn app configs. Playground does not. This is only a problem if shadcn CLI is expected to run from playground.

Checklist:

- [ ] Add `apps/playground/components.json` or document that playground only consumes `@packages/ui`.

### [ ] E7. Playground demo data uses magic formulas and raw inline opacity

**Severity:** Low  
**Code:** `apps/playground/app/page.tsx`  
**Docs:** `docs/tailwind-css/159-styling-with-utility-classes.mdx`, `docs/nezumi-ui/015-nezumi-ui-styling.mdx`

The dashboard preview uses nested ternaries for metric values and formulas for percentages/opacity. Inline dynamic height is acceptable for chart-like demo bars; the opaque formula is the maintainability issue.

Checklist:

- [ ] Extract metrics and chart bars into named data arrays.
- [ ] Store opacity explicitly in demo data or use a finite class map.

### [ ] E8. Tutorial pages repeat a lot of page boilerplate

**Severity:** Low  
**Code:** `apps/playground/app/tutorials/*/page.tsx`, `apps/playground/app/tutorials/_components.tsx`  
**Docs:** `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

The tutorial pages already share `PageShell`, `TutorialSection`, and `DemoNav`, so the old “80% identical” claim was not quantified. The remaining repetition is still a valid low-priority refactor candidate.

Checklist:

- [ ] Extract a data-driven `TutorialPage` only if more tutorial pages are expected.

---

## F. Low-Level Cleanup

### [ ] F1. `packages/ui/package.json` `files` array is redundant

**Severity:** Low  
**Code:** `packages/ui/package.json`  
**Docs:** `docs/turbo/08-core-concepts-internal-packages.mdx`, `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`

`files` includes both `"src"` and `"src/styles"`, but `src/styles` is already inside `src`. Since `@packages/ui` is currently private and source-first, this is minor metadata cleanup.

Checklist:

- [ ] Reduce to `["src"]` or remove if irrelevant for a private package.
- [ ] If the package becomes publishable, revisit exports/files together.

### [ ] F2. `molecules/utils.ts` quote style and existence diverge from package style

**Severity:** Low  
**Code:** `packages/ui/src/molecules/utils.ts`  
**Docs:** `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`

This file duplicates `cn()` and uses single quotes while the package uses double quotes. Removing the duplicate file is better than only reformatting it.

Checklist:

- [ ] Remove with C3.

### [~] F3. Layout comments are verbose, but only some are objectively stale/noisy

**Severity:** Low  
**Code:** `packages/ui/src/layout/utils.ts`, `packages/ui/src/layout/types.ts`  
**Docs:** local code style expectations in `AGENTS.md`

The old report's claim is partly subjective. Comments explaining responsive value semantics and inline fallbacks are useful. Broad claims such as “all helpers are pure” should be removed if they are not adding enforceable information.

Checklist:

- [ ] Keep comments that define public API behavior.
- [ ] Remove broad or decorative comments that repeat obvious code.

---

## Removed Or Disputed Old Findings

### [x] X1. Old C1: Typography uses `forwardRef` and `createElement`

**Status:** False/stale  
**Code:** `packages/ui/src/atoms/Typography/index.tsx`  
**Docs:** `docs/react/109-reference-react-forwardref.mdx`, `docs/react/105-reference-react-createelement.mdx`

Current Typography is a normal function component using JSX and direct `ref` prop. The old report referenced `index.ts` and obsolete code that is not present.

### [x] X2. Old M1: `oklch(from #hex l c h)` is a Tailwind violation

**Status:** False against local SSOT  
**Code:** `packages/ui/src/styles/tokens/colors.css`  
**Docs:** `DESIGN.md`, `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`, `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`

Nezumi docs explicitly require `oklch(from #... l c h)` so CSS values match the `DESIGN.md` hex table. Tailwind examples use direct OKLCH values but do not override this project-specific rule.

### [x] X3. Old M7: ThemeProvider wrapper is unnecessary slop

**Status:** False  
**Code:** `packages/ui/src/providers/Theme/index.tsx`  
**Docs:** `docs/shadcn-ui/dark-mode/next.mdx`, `docs/nextjs/090-01-app-03-api-reference-01-directives-use-client.mdx`

The wrapper matches the shadcn Next.js dark-mode pattern. `"use client"` is appropriate because it is imported from a Server Component layout.

### [x] X4. Old M8: Playground `lang="en"` is wrong because content is German

**Status:** Not confirmed  
**Code:** `apps/playground/app/layout.tsx`, `apps/playground/app/page.tsx`  
**Docs:** `DESIGN.md`

Playground content is primarily English. `DESIGN.md` says UI copy is German, so the broader question is whether playground/tutorial pages are governed by that product-copy rule. The old concrete claim is not supported.

### [x] X5. Old L4: Vitest `globals: false` contradicts tests

**Status:** False  
**Code:** `packages/ui/vitest.config.ts`, `packages/ui/src/**/*.test.ts*`  
**Docs:** local test files

All checked tests explicitly import `describe`, `it`, and `expect` from `vitest`, so `globals: false` is consistent.

### [x] X6. Old C7 wording: Playground heading reset violates Tailwind Preflight

**Status:** Overstated  
**Code:** `apps/playground/app/globals.css`  
**Docs:** `docs/tailwind-css/145-preflight.mdx`

Tailwind allows custom base styles. The issue is project/design-token consistency, not Tailwind correctness.

---

## Prioritized Cleanup Order

1. [ ] Remove or integrate `_typo/`.
2. [ ] Remove placeholder-only component directories and dead token files.
3. [ ] Fix docs SSOT drift: broken Nezumi index link, stale public API docs, shared TS config documentation.
4. [ ] Clarify Button public API against shadcn plus Nezumi extensions.
5. [ ] Centralize `cn()` and remove duplicate utilities.
6. [ ] Fix duplicate `@custom-variant dark` ownership and its test lock-in.
7. [ ] Fix OG image variable/font assumptions.
8. [ ] Decide whether app-level raw typography in playground/members/operations is allowed or must use `Typography`.
9. [ ] Simplify or document Grid/dimension runtime style APIs.
10. [ ] Clean low-priority metadata, comments, tutorial boilerplate, and demo magic values.

