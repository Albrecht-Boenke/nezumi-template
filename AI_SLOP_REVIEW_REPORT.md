# AI Slop Review Report — Nezumi Template

**Date:** 2026-05-08  
**Scope:** Full codebase (`packages/ui`, `apps/*`, infrastructure)  
**Method:** Deep read-only audit against official vendor documentation in `docs/` (react, nextjs, typescript, tailwind-css, shadcn-ui, turbo, cn). `docs/nezumi-ui/` was excluded per project instructions.  

---

## Executive Summary

| Area | Grade | Critical Issues | High Issues | Medium/Low Issues |
|------|-------|----------------|-------------|-------------------|
| `packages/ui` | **C** | 3 | 6 | 11 |
| `apps/*` | **C** | 4 | 0 | 7 |
| **Total** | **C** | **7** | **6** | **18** |

The codebase is functional but carries significant AI-generated bloat: ~50 empty placeholder files with identical copy-paste comments, massive token CSS duplication for non-existent components, byte-identical config files across four apps, and React 19 anti-patterns alongside modern patterns in the same package.

---

## 1. Critical Issues (Fix Immediately)

### [C1] `Typography` uses obsolete `forwardRef` + `createElement` (React 19 Anti-Pattern)
- **File:** `packages/ui/src/atoms/Typography/index.ts` (lines 102–136)
- **Rule violated:** `docs/react/INDEX.md` — React 19 makes `forwardRef` obsolete; `ref` is a direct prop.
- **Current code:**
  ```tsx
  export const Typography = forwardRef<HTMLElement, TypographyProps>(
    function Typography({ ... }, ref) {
      const Component = (as ?? variantDefaultTag[variant]) as ElementType
      return createElement(Component, { ref, className: cn(...), ...typographyProps }, children)
    },
  )
  ```
- **Why wrong:** React 19 allows `ref` as a direct prop. `forwardRef` and `createElement` are legacy patterns that hurt JSX optimization and type inference. `Typography` is the only atom still using `forwardRef` — all layout primitives and `Button` already use direct `ref` props.
- **Fix:** Convert to a normal function component using JSX:
  ```tsx
  export function Typography({ variant, tone = "default", as, ...props }: TypographyProps) {
    const Component = as ?? variantDefaultTag[variant]
    return <Component ref={props.ref} className={cn(...)} {...props}>{children}</Component>
  }
  ```

---

### [C2] `Button` API deviates massively from shadcn/ui documentation
- **File:** `packages/ui/src/atoms/Button/Button.tsx` (lines 25–84)
- **Rule violated:** `docs/shadcn-ui/components/radix/button.md` — defines variants: `default | outline | ghost | destructive | secondary | link` and sizes: `default | xs | sm | lg | icon | icon-xs | icon-sm | icon-lg`.
- **Current code:**
  ```tsx
  variants: {
    variant: {
      default: [...],
      primary: [...],      // identical to default
      tonal: [...],        // identical to secondary
      secondary: [...],
      destructive: [...],
      outline: [...],
      ghost: [...],
      elevated: [...],     // not in shadcn docs
      link: [...],
    },
    size: {
      sm: "h-button-sm px-button-sm-x typography-label-medium",
      md: "h-button-md px-button-md-x typography-label-large",
      lg: "h-button-lg px-button-lg-x typography-label-large",
      xl: "h-button-xl px-button-xl-x typography-label-large",  // not in shadcn docs
      icon: "h-button-icon w-button-icon p-0 typography-label-medium",
    },
  }
  ```
- **Why wrong:** The local implementation extends the API with `primary`, `tonal`, `elevated`, and `xl` without shadcn compatibility. This breaks the contract that shadcn/ui sets as the de-facto standard. Consumers reading shadcn docs expect `xs`, `icon-xs`, `icon-sm`, `icon-lg` — these are completely missing.
- **Fix:** Reduce to shadcn variant set or clearly document this as a Nezumi extension. Align sizes to shadcn standard.

---

### [C3] ~50 files are empty placeholder exports with identical AI template
- **Files:** Nearly all `src/atoms/*/index.ts` (except Button, Typography), all `src/molecules/*/index.ts`, all `src/organisms/*/index.ts`, `src/providers/Direction/index.ts`
- **Current code:**
  ```ts
  // Placeholder export boundary for future shadcn/ui [Component] implementation.
  // Keep this file component-free until the implementation is intentionally added.
  export {}
  ```
- **Why wrong:** 50+ files contain no code, no exports, no purpose. They slow down builds (scanning, linting, type-checking), clutter the codebase, and suggest components exist that are not actually implemented. For these components there are often huge `tokens.css` files (see [H3]) that are also unused.
- **Fix:** Remove all unimplemented atoms/molecules/organisms. If shadcn CLI is used, generate these via `npx shadcn add`, not as empty shells.

---

### [C4] `ImageResponse` in OG Image uses CSS Custom Properties — unsupported in Satori
- **File:** `apps/homepage/app/opengraph-image.tsx` (lines 7–12, 25–26)
- **Rule violated:** `docs/nextjs/INDEX.md` — Satori (rendering engine behind `next/og ImageResponse`) does **not** support CSS Custom Properties.
- **Current code:** Uses `var(--color-surface)`, `var(--color-surface-raised)`, `var(--color-brand)`, `var(--color-on-brand)`.
- **Why wrong:** These variables resolve to `undefined`/fallback, rendering the OG Image with wrong/default colors in social previews.
- **Fix:** Replace CSS variables with static hex/RGB values or a theme-to-hex mapping inside the file.

---

### [C5] `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `globals.css` are byte-identical across all 4 apps
- **Files:** `apps/*/next.config.ts`, `apps/*/postcss.config.mjs`, `apps/*/tsconfig.json`, `apps/*/app/globals.css`, `apps/*/package.json` (nearly identical), `apps/*/components.json` (3 apps identical, playground missing)
- **Rule violated:** DRY principle; `docs/typescript/INDEX.md` project references.
- **Why wrong:** Full copy-paste of config files across all apps. No use of monorepo shared configs via `extends` or symlinks. Changes must be maintained at 4 locations.
- **Fix:** Extract shared configs into `packages/configs/` or root files and reference via `extends` (e.g., `tsconfig.json` → `"extends": "@repo/tsconfig/nextjs.json"`).

---

### [C6] `members/app/page.tsx` and `operations/app/page.tsx` are near-identical copy-paste
- **Files:** `apps/members/app/page.tsx` (lines 1–13), `apps/operations/app/page.tsx` (lines 1–13)
- **Current state:** Both files differ only in 3 text strings (`Mitgliederbereich` vs `Operations-Konsole`, `Members` vs `Operations`) and one class. The entire layout structure (`main`, `section`, `p`, `h1`) is duplicated.
- **Why wrong:** Every layout change must be made at 2+ places.
- **Fix:** Extract a shared App Shell component into `@packages/ui` or `packages/shared`.

---

### [C7] `playground/app/globals.css` global `@layer base` reset for h1–h6
- **File:** `apps/playground/app/globals.css` (lines 10–19)
- **Rule violated:** `docs/tailwind-css/INDEX.md` → Preflight philosophy.
- **Current code:** Global `@layer base` rule sets `letter-spacing: 0` for all `h1`–`h6`, overriding Tailwind v4 Preflight and design-system tokens.
- **Why wrong:** Unwanted global side effects, design-system violation. If `@packages/ui` defines its own typography tokens (e.g., `tracking-tight`), this global rule either wins or causes unexpected cascading.
- **Fix:** Remove. If headings should have no letter-spacing, solve it in the Typography atom or via Tailwind utility classes, not globally.

---

## 2. High Issues (Fix Soon)

### [H1] `cn()` utility is duplicated three times
- **Files:** `src/lib/utils.ts` (L1–6), `src/layout/utils.ts` (L58–60), `src/molecules/utils.ts` (L1–6)
- **Rule violated:** DRY; `docs/cn/INDEX.md` describes clsx + tailwind-merge as a central pattern.
- **Fix:** Delete `layout/utils.ts` and `molecules/utils.ts`; redirect all imports to `#lib/utils` or `@packages/ui/lib/utils`.

---

### [H2] CVA variants `default`/`primary` and `tonal`/`secondary` are identical
- **File:** `packages/ui/src/atoms/Button/Button.tsx` (lines 27–46)
- **Current code:** `default` and `primary` have identical class arrays. `tonal` and `secondary` have identical class arrays.
- **Why wrong:** Two variant names with identical output confuse consumers and bloat the bundle.
- **Fix:** Remove one of each pair. If `primary` and `tonal` come from DESIGN.md, implement `default` and `secondary` as aliases (not standalone keys) or vice versa.

---

### [H3] `tokens.css` files for non-existent components contain copy-paste bloat
- **Files:** `src/atoms/Badge/tokens.css`, `src/molecules/Card/tokens.css`, `src/molecules/Dialog/tokens.css`, `src/organisms/Sidebar/tokens.css`, and many more
- **Evidence:** `Badge/tokens.css` contains:
  ```css
  --color-badge-panel-header-surface: var(--color-surface-raised);
  --color-badge-panel-footer-surface: var(--color-surface-raised);
  --spacing-badge-panel-header-padding-x: var(--spacing-24);
  --spacing-badge-panel-footer-padding-x: var(--spacing-24);
  ```
  A badge has no "panel-header" or "panel-footer". These tokens are 1:1 copied from a component template and not adapted to Badge. Same for Card, Dialog, Sidebar, etc.
- **Why wrong:** Classic AI template pattern: a generator applied a `button.css` template to all components without adapting content. Creates tons of dead code referenced by no implementation or tests.
- **Fix:** Remove all `tokens.css` without an implemented component. Create tokens only when needed.

---

### [H4] `@custom-variant dark` is declared twice
- **Files:** `src/styles/global.css` (L3), `src/styles/design-tokens.css` (L26)
- **Rule violated:** `docs/tailwind-css/INDEX.md` — `@custom-variant` should exist once in entry CSS.
- **Why wrong:** Duplicate declarations can cause unexpected behavior in variant resolution. `global.css` imports `design-tokens.css`, so the variant is theoretically registered twice.
- **Fix:** Remove from `design-tokens.css`; keep only in `global.css` (the entry point).

---

### [H5] `design-tokens.css` mixes token imports with base styles and dark-mode overrides
- **File:** `src/styles/design-tokens.css` (lines 1–128)
- **Rule violated:** Tailwind v4 docs — `@theme` variables and `@layer base` should be separated.
- **Current code:** Imports token layers, then defines `@custom-variant dark`, then `.dark { --color-brand: ...; }` overrides, then `@layer base` with CSS reset, body styles, scrollbar styling.
- **Why wrong:** A file named `design-tokens.css` should contain only design tokens. Base styles belong in `base.css` or `global.css`. Dark-mode overrides belong in a dedicated `dark.css` or as `@theme` variants, not manual `.dark { }` block rulesets.
- **Fix:** Move `@layer base` block to separate `base.css`. Move `.dark` overrides to dedicated theme file.

---

### [H6] Layout Grid over-engineering with custom CSS variables
- **File:** `src/layout/Grid/Grid.tsx` (lines 16–188)
- **Rule violated:** KISS; Tailwind v4 arbitrary values are sufficient.
- **Current code:** `resolveTemplateValue`, `resolveResponsiveTemplate`, `customVariableName`, `staticTrackClass`, `GridStyle`, `--nz-grid-cols-lg`, `MAX_TRACK_COUNT = 12`.
- **Why wrong:** Tailwind v4 already provides `grid-cols-{1..12}` and arbitrary values (`grid-cols-[200px_1fr]`). Introducing `--nz-grid-cols-lg` etc. via inline styles is unnecessarily complex, breaks Tailwind's utility-first paradigm, and creates runtime overhead (style object merging). The `@source inline` directive in `design-tokens.css` already safelists static classes; arbitrary values must be literals in source — the custom-variable solution circumvents this in the most expensive way.
- **Fix:** Use direct Tailwind classes (`grid-cols-1 md:grid-cols-3`) or, if dynamic, simple arbitrary values without CSS custom properties.

---

## 3. Medium Issues

### [M1] `oklch(from #hex l c h)` is suboptimal Tailwind v4 pattern
- **File:** `src/styles/tokens/colors.css` (lines 5–31)
- **Rule violated:** `docs/tailwind-css/047-colors.mdx` / `172-theme.mdx` — theme variables use direct OKLCH values, not relative color syntax.
- **Current code:** `--color-nezumi-sabi: oklch(from #47585c l c h);`
- **Why wrong:** `oklch(from ...)` is Relative Color Syntax (CSS Color Module Level 5). It has more limited browser support than direct `oklch()` values and slows CSS parsing time since the browser must first parse the hex value. Tailwind docs show only direct OKLCH values for theme variables.
- **Fix:** Convert hex values to direct OKLCH values and store as `--color-nezumi-sabi: oklch(0.42 0.03 215);`.

---

### [M2] `--font-urbanist` is referenced but never defined
- **File:** `src/styles/tokens/typography.css` (line 2)
- **Current code:** `--font-family-sans: var(--font-urbanist, "Urbanist"), system-ui, ...`
- **Why wrong:** If `--font-urbanist` is not defined by the consuming app, the fallback applies. The dependency on an external variable is undocumented and can cause unexpected font switches.
- **Fix:** Either define `--font-urbanist` in the token layer or use an explicit stack without the variable.

---

### [M3] `resolveDimension` is "too clever" — magic keyword set
- **File:** `src/layout/utils.ts` (lines 189–225)
- **Current code:** A hardcoded whitelist (`DIMENSION_KEYWORDS = new Set([...])`) decides whether a value is emitted as Tailwind class or inline style.
- **Why wrong:** Fragile: if someone passes `w="50%"`, `style={{ width: "50%" }}` is generated — surprising behavior. Tailwind's `w-1/2` etc. are not supported. Important behavior is hidden behind an undocumented keyword list.
- **Fix:** Always allow inline styles for non-standard keywords but document. Or use Tailwind's arbitrary-value syntax `w-[50%]`.

---

### [M4] `Button/tokens.css` defines unused tokens
- **File:** `src/atoms/Button/tokens.css` (lines 15–44)
- **Evidence:** `--spacing-button-action-height-sm`, `--spacing-button-action-padding-x-sm`, `--radius-button-action`, etc. are defined, but `Button.tsx` uses only `--spacing-button-sm/md/lg/xl/icon` and `--radius-button` from `components/button.css`. The `action` tokens are dead.
- **Fix:** Remove unused tokens or implement them in Button.

---

### [M5] `Typography` couples visual size to semantic HTML tag
- **File:** `src/atoms/Typography/index.ts` (lines 60–78)
- **Current code:**
  ```ts
  const variantDefaultTag: Record<TypographyVariant, ElementType> = {
    "display-large": "h1", "title-large": "h1", ...
  }
  ```
- **Why wrong:** A `title-large` is forced to render as `<h1>` even when it is a subtitle. This causes accessibility issues (wrong heading hierarchies) and violates separation of meaning and presentation.
- **Fix:** Default to neutral `<span>` or `<p>`. The `as` prop already exists to allow explicit semantics.

---

### [M6] `layout/utils.ts` and `layout/types.ts` have excessive German JSDoc blocks
- **Files:** `src/layout/utils.ts` (L1–7), `src/layout/types.ts` (L1–9)
- **Current code:** Lengthy German comments explaining obvious facts. Example:
  ```ts
  /**
   * @packages/ui/layout — Class-Name Utilities
   *
   * Responsive Tailwind-Klassen-Generierung für die Layout-Primitives.
   * Alle Helfer sind pure und teilen sich denselben `responsiveClass`-Generator,
   * damit sich Breakpoint-Logik nicht über die einzelnen Komponenten verteilt.
   */
  ```
- **Why wrong:** The comment says nothing the code doesn't reveal itself. "Alle Helfer sind pure" is an unverified claim. `@packages/ui/layout` is a fictional JSDoc tag. Such comments lengthen files without adding value.
- **Fix:** Remove or reduce to a one-line description.

---

### [M7] `ThemeProvider` forces `"use client"` without need for a thin wrapper
- **File:** `src/providers/Theme/index.tsx` (lines 1–12)
- **Current code:**
  ```tsx
  "use client"
  import { ThemeProvider as NextThemesProvider } from "next-themes"
  export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  }
  ```
- **Why wrong:** `next-themes` already exports a `ThemeProvider` that internally has `"use client"`. A thin wrapper adds no type safety or logic (the type is re-exported), but increases bundle size and the number of client-boundary files.
- **Fix:** Use direct export from `next-themes` or, if branding is desired, re-export without a dedicated file.

---

### [M8] `playground/app/layout.tsx` uses `lang="en"` instead of `lang="de"`
- **File:** `apps/playground/app/layout.tsx` (line 19)
- **Why wrong:** `homepage`, `members`, `operations` consistently use `<html lang="de">`. Playground uses `<html lang="en">`, although contents are partly German or intended for a German project.
- **Fix:** Change to `lang="de"` or document why Playground is English.

---

### [M9] `homepage/layout.tsx` disables system theme detection without documentation
- **File:** `apps/homepage/app/layout.tsx` (line 39)
- **Current code:** `enableSystem={false}` in `ThemeProvider`.
- **Why wrong:** System dark-mode preference is ignored. No comment or doc explains this design decision. `members` and `operations` have no `ThemeProvider` at all.
- **Fix:** Explain or set `enableSystem={true}`. For consistency, all apps should have the same ThemeProvider setup.

---

### [M10] Magic numbers and "too clever" code in Playground MiniDashboard
- **File:** `apps/playground/app/page.tsx` (lines 71–82, 95–101)
- **Current code:**
  - Line 80: `{index === 0 ? "$45.2k" : index === 1 ? "2,340" : index === 2 ? "1,210" : "573"}` — nested ternaries for demo data.
  - Line 82: `+{(index + 3) * 4}.2%` — mathematical formula generates arbitrary demo percentages.
  - Lines 95–101: `[34, 58, 42, 76, 64, 88, 52, 70, 92, 66, 84, 72]` — 12 hardcoded numbers for chart heights.
- **Fix:** Extract demo data into a constant array or use a helper function with a descriptive name.

---

### [M11] Inline styles in Server Components (Tailwind anti-pattern)
- **File:** `apps/playground/app/page.tsx` (line 100)
- **Current code:** `style={{ height: \`${height}%\`, opacity: 0.35 + index * 0.035 }}`
- **Why wrong:** In a Tailwind-based app, inline styles are used for visual effects. While dynamic height values are not easily expressed with Tailwind classes, `opacity` could use a limited token set (e.g., `opacity-35`, `opacity-40`) or CSS variables.
- **Fix:** Replace `opacity` values with Tailwind classes or utility mapping.

---

### [M12] `homepage/opengraph-image.tsx` duplicates font definition
- **File:** `apps/homepage/app/opengraph-image.tsx` (lines 27–29)
- **Why wrong:** Long hardcoded `fontFamily` string instead of using the `next/font` variable (`urbanist`). This duplicates the font definition already in `layout.tsx`.
- **Fix:** Satori supports some Google Fonts directly via the `fonts` option in `ImageResponse`. Use the `next/font` variable if possible, or document why it cannot be used.

---

### [M13] Missing error/loading UI in all apps
- **Location:** All apps — no `error.tsx`, `loading.tsx`, `not-found.tsx` files
- **Rule violated:** `docs/nextjs/INDEX.md` — App Router error boundary and loading UI conventions.
- **Fix:** Add minimal `error.tsx` and `loading.tsx` as app shell conventions.

---

## 4. Low / Style Issues

### [L1] `molecules/utils.ts` uses single quotes, rest of package uses double quotes
- **File:** `src/molecules/utils.ts` (lines 1–2)
- **Current code:** `import { clsx, type ClassValue } from 'clsx'`
- **Why wrong:** Inconsistent quote style within a package (rest uses `""`). Indicates copy-paste from an external generator.
- **Fix:** Align to double quotes.

---

### [L2] `layout-components.test.tsx` uses `renderToStaticMarkup` instead of `@testing-library/react`
- **File:** `src/layout/layout-components.test.tsx` (lines 4, 50–58)
- **Why wrong:** `@testing-library/react` is in `devDependencies` but unused. Instead, `react-dom/server` is used, which provides no real DOM testing (no events, no accessibility queries). Suboptimal test strategy.
- **Fix:** Switch to `@testing-library/react` for real DOM interactions.

---

### [L3] `package.json` `files` array is incomplete / misleading
- **File:** `packages/ui/package.json` (lines 6–9)
- **Current code:** `"files": ["src", "src/styles"]`
- **Why wrong:** `"src/styles"` is already inside `"src"`. Duplication is redundant. `dist` is missing if the package is built.
- **Fix:** Reduce to `["src"]` or, if build artifacts exist, correct accordingly.

---

### [L4] `vitest.config.ts` has `globals: false` but tests use `describe/it/expect` without import
- **File:** `packages/ui/vitest.config.ts` (line 6)
- **Current code:** `globals: false`
- **Why wrong:** All test files use `describe`, `it`, `expect` as globals. `globals: false` requires explicit imports, which are not present. It only works because Vitest implicitly injects the imports — the config is contradictory.
- **Fix:** Either set `globals: true` or add explicit `import { describe, it, expect } from "vitest"` to all tests.

---

### [L5] Tutorial pages are boilerplate-repetitive
- **Files:** `apps/playground/app/tutorials/*/page.tsx` (5 files)
- **Current code:** Each tutorial page has identical structure: `PropDefinition[]`, `PageShell`, `TutorialSection`(s), `DemoNav`. ~80% identical boilerplate.
- **Fix:** Create a generic `TutorialPage` component configured via props/JSON.

---

### [L6] `components.json` missing in playground
- **Location:** `apps/playground/` — no `components.json`
- **Why wrong:** `homepage`, `members`, `operations` have identical `components.json`. Playground has none. If shadcn/ui CLI is used, the configuration is missing.
- **Fix:** Add `components.json` or document why it is not needed.

---

### [L7] `package.json` scripts could be optimized via Turborepo pipeline
- **Location:** `apps/*/package.json` and root `package.json`
- **Current code:** Root `package.json` has manual `dev:*`/`build:*` scripts. Turbo is installed as devDependency, but `turbo.json` does not leverage app scripts.
- **Fix:** Configure `turbo.json` and switch `package.json` scripts to `turbo run`.

---

## 5. Positive Observations (Keep These)

1. **Button Atom (React 19 style):** `Button.tsx` correctly uses `ref` as a direct prop (not `forwardRef`) and uses `asChild` with `@radix-ui/react-slot` — follows modern shadcn patterns. (L93–113)
2. **CVA usage:** `buttonVariants` uses `class-variance-authority` for variant-based styling — the recommended shadcn way. (L15–85)
3. **Tailwind v4 `@theme` tokens:** Token layer (Primitives → Semantic → Component) is architecturally clean. `colors.css`, `spacing.css`, `semantic/colors.css` correctly follow Tailwind v4 `@theme` syntax.
4. **Layout tests with CSS contract checks:** `layout-components.test.tsx` checks not only rendering but also `@source inline` directives in `design-tokens.css` — excellent contract test. (L166–176)
5. **TypeScript strictness:** No `any` in implemented components. All props are strictly typed.
6. **Tailwind v4 correct application in apps:** `@import "tailwindcss"` (not `@tailwind base/components/utilities`), `@source` instead of `content`, `@custom-variant dark` correct for v4. No `tailwind.config.js` needed.
7. **Next.js 16 App Router patterns correct:** `viewport` as separate export, `next/font/google` with CSS variable, `ImageResponse` from `next/og`, `transpilePackages: ["@packages/ui"]`.
8. **Server Components as default:** No unnecessary `"use client"` in apps. All pages are correctly Server Components.

---

## 6. Documentation Gap Analysis

| Document | Status |
|----------|--------|
| `docs/shadcn-ui/components/radix/button.md` | **Code is non-compliant** — variants and sizes deviate. |
| `docs/tailwind-css/172-theme.mdx` | **Partially compliant** — `@theme` syntax correct, but `@custom-variant` duplicated and `oklch(from)` deviates. |
| `docs/tailwind-css/047-colors.mdx` | **Partially compliant** — Custom palette present, but relative color syntax instead of direct OKLCH. |
| `docs/cn/001-clsx-readme.mdx` | **Non-compliant** — `cn` is not used centrally. |
| `docs/react/INDEX.md` (React 19) | **Partially compliant** — Button/Layout use React 19 ref props, Typography uses obsolete `forwardRef`. |
| `docs/nextjs/INDEX.md` | **Partially compliant** — App Router patterns correct, but OG Image breaks Satori rules and shared configs violate DRY. |
| `docs/typescript/INDEX.md` | **Compliant** — strict mode, project references correct. |

---

## 7. Recommended Next Steps (Prioritized)

1. **Immediately:** Remove all 50+ placeholder files and their `tokens.css` bloat.
2. **Immediately:** Convert `Typography` to React 19 (remove `forwardRef` + `createElement`).
3. **Immediately:** Fix OG Image CSS variables (replace with static hex values).
4. **High:** Extract shared configs for `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `globals.css`.
5. **High:** Align `Button` API to shadcn standard or document as intentional Nezumi extension.
6. **High:** Remove `cn` duplicates and centralize.
7. **High:** Remove `members`/`operations` page duplication via shared shell component.
8. **Medium:** Split `design-tokens.css` into Tokens / Base / Dark files.
9. **Medium:** Remove Grid complexity (custom CSS variables).
10. **Medium:** Convert `oklch(from #hex)` to direct OKLCH values.
11. **Medium:** Fix playground `lang="en"` and global heading reset.
12. **Medium:** Add `error.tsx`/`loading.tsx` to all apps.
13. **Low:** Clean up AI comments, refactor demo data, fix quote inconsistency, correct `vitest.config.ts` globals setting.

---

*Report generated by review-specialist subagents against vendor documentation in `docs/` (excluding `docs/nezumi-ui/`).*
