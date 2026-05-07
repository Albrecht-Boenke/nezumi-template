# Layout Components Analysis

## Task

Review the layout component pairs in `packages/ui`, determine the expected SOLL-state from local React and Tailwind documentation, evaluate which implementation in each pair is better, and explain how the code should be combined into working components.

Scope notes:

- I did not read or use `docs/nezumi-ui`, per request.
- React and Tailwind documentation research was delegated to subagents, also per request.
- No implementation changes were made to the layout components.

## Local Documentation Read

- `AGENTS.md`
- `docs/react/INDEX.md`
- `docs/react/030-learn-keeping-components-pure.mdx`
- `docs/react/035-learn-passing-props-to-a-component.mdx`
- `docs/react/061-learn-typescript.mdx`
- `docs/react/109-reference-react-forwardref.mdx`
- `docs/react/149-reference-react-dom-components-common.mdx`
- `docs/react/200-warnings-unknown-prop.mdx`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/tailwind-css/054-display.mdx`
- `docs/tailwind-css/068-flex-basis.mdx`
- `docs/tailwind-css/069-flex-direction.mdx`
- `docs/tailwind-css/070-flex-grow.mdx`
- `docs/tailwind-css/071-flex-shrink.mdx`
- `docs/tailwind-css/072-flex-wrap.mdx`
- `docs/tailwind-css/073-flex.mdx`
- `docs/tailwind-css/085-gap.mdx`
- `docs/tailwind-css/087-grid-auto-flow.mdx`
- `docs/tailwind-css/088-grid-auto-rows.mdx`
- `docs/tailwind-css/091-grid-template-columns.mdx`
- `docs/tailwind-css/092-grid-template-rows.mdx`
- `docs/tailwind-css/107-margin.mdx`
- `docs/tailwind-css/120-max-width.mdx`
- `docs/tailwind-css/124-min-width.mdx`
- `docs/tailwind-css/137-padding.mdx`
- `docs/tailwind-css/147-responsive-design.mdx`
- `docs/tailwind-css/159-styling-with-utility-classes.mdx`
- `docs/tailwind-css/172-theme.mdx`
- `docs/cn/INDEX.md`
- `docs/cn/003-tailwind-merge-what-is-it-for.mdx`
- `docs/cn/004-tailwind-merge-when-and-how-to-use-it.mdx`
- `docs/cn/005-tailwind-merge-features.mdx`
- `docs/cn/006-tailwind-merge-limitations.mdx`

## External Sources

None. Local docs were sufficient.

## Derived SOLL-State

React:

- Layout primitives should be pure function components: same props, same JSX, no render-time side effects, and no mutation of props or external values.
- Component-only props must be consumed before `...props` reaches a DOM element. Native DOM props such as `id`, `role`, `aria-*`, `data-*`, events, `className`, and `style` should pass through.
- In React 19, direct `ref` as a prop is acceptable; `forwardRef` is no longer necessary. Ref support is still expected for reusable DOM primitives.
- Pure class-composition primitives should not require `"use client"` and should remain server-component compatible.

Tailwind CSS:

- Props must resolve to complete, statically detectable Tailwind class names. Runtime string interpolation such as `grid-cols-${n}` or arbitrary classes built from user values is not reliable unless safelisted.
- Responsive behavior should be mobile-first: unprefixed class for base/mobile, prefixed classes for breakpoints and above.
- Flex and Grid spacing should prefer `gap`, `gap-x`, and `gap-y`; `space-x/y` is not appropriate for wrapping or grid layouts.
- Tailwind v4 max-width should use documented classes such as `max-w-md`, `max-w-7xl`, `max-w-full`, `container`, or explicit arbitrary values. The docs reviewed did not list `max-w-screen-sm` style classes.
- `container` does not center itself and does not include padding; a project `Container` component must add `mx-auto` and `px-*` intentionally.
- `tailwind-merge` is appropriate for merging internal classes with a consumer `className`, but it does not fix classes that Tailwind never generated.

Project context:

- `packages/ui/tsconfig.json` is strict, uses bundler module resolution, and has `forceConsistentCasingInFileNames: true` at line 14.
- `packages/ui/package.json` exports public component leaves at lines 24-30 and `./layout` at line 30.
- App styles explicitly scan `packages/ui/src` via `@source "../../../packages/ui/src"`, so static classes in the UI package can be detected.

## Analyzed Files

- `packages/ui/package.json`
- `packages/ui/tsconfig.json`
- `packages/ui/src/components/box.tsx`
- `packages/ui/src/components/container.tsx`
- `packages/ui/src/components/flex.tsx`
- `packages/ui/src/components/grid.tsx`
- `packages/ui/src/components/section.tsx`
- `packages/ui/src/layout/index.ts`
- `packages/ui/src/layout/README.md`
- `packages/ui/src/layout/spacing.ts`
- `packages/ui/src/layout/types.ts`
- `packages/ui/src/layout/utils.ts`
- `packages/ui/src/layout/Stack.tsx`
- `packages/ui/src/layout/Box/box.tsx`
- `packages/ui/src/layout/Box/Box2.tsx`
- `packages/ui/src/layout/Box/index.ts`
- `packages/ui/src/layout/Container/container.tsx`
- `packages/ui/src/layout/Container/Container2.tsx`
- `packages/ui/src/layout/Container/index.ts`
- `packages/ui/src/layout/Flex/flex.tsx`
- `packages/ui/src/layout/Flex/Flex2.tsx`
- `packages/ui/src/layout/Flex/index.ts`
- `packages/ui/src/layout/Grid/grid.tsx`
- `packages/ui/src/layout/Grid/Grid2.tsx`
- `packages/ui/src/layout/Grid/index.ts`
- `packages/ui/src/layout/Section/section.tsx`
- `packages/ui/src/layout/Section/Section2.tsx`
- `packages/ui/src/layout/Section/index.ts`
- `apps/*/app/globals.css`

Verification run:

```bash
pnpm --filter @nezumi/ui typecheck
```

Result: failed with `TS2307`, `TS2459`, `TS1261`, `TS1149`, and `TS2308` errors.

## Pair Evaluation

### Box: `box.tsx` vs `Box2.tsx`

Better base: `Box2.tsx`, after fixing imports and exports.

Why:

- `Box2.tsx` matches the desired layout primitive shape: polymorphic `as`, direct `ref`, rest-prop passthrough, style merge, responsive spacing props, display prop, and dimension helpers (`Box2.tsx:22-73`).
- `box.tsx` is closer to a themed surface/card component than a layout primitive. It only accepts a small custom prop set, does not pass through normal DOM props, and does not forward `ref` (`box.tsx:46-61`, `box.tsx:75-99`).
- `box.tsx` imports `@/lib/utils` (`box.tsx:2`), but the UI package tsconfig has no `@/*` path mapping.

What to combine:

- Use the `Box2.tsx` architecture.
- Decide whether `variant`, `radius`, and surface colors from `box.tsx` belong in `Box`. If the component is intended to be a neutral layout primitive, keep them out and create a separate `Surface`/`CardSurface` component. If the design system wants `Box` to be both layout and surface, add those props to the shared type model and consume them before spreading DOM props.
- Fix the misleading example in `Box2.tsx:11`: `BoxProps` does not include `gap`, so `<Box display="flex" gap="16">` is not currently valid.

### Container: `container.tsx` vs `Container2.tsx`

Better base: `Container2.tsx`, after fixing imports and adding a padding policy.

Why:

- `Container2.tsx` uses Tailwind v4-compatible container-scale max-width classes (`max-w-md`, `max-w-2xl`, `max-w-4xl`, etc.) and supports responsive sizes (`Container2.tsx:26-51`).
- `Container2.tsx` passes through DOM props, `style`, and `ref`, and adds `w-full` plus conditional `mx-auto` (`Container2.tsx:53-115`).
- `container.tsx` uses `max-w-screen-sm` through `max-w-screen-2xl` (`container.tsx:9-17`), which were not present in the reviewed Tailwind v4 max-width docs. It also uses spacing classes such as `px-6` and `px-8` (`container.tsx:19-24`) while the local spacing API favors pixel-named values from `spacing.ts`.

What to combine:

- Keep `Container2.tsx` as the structural base.
- Borrow only the ergonomic concept of a default horizontal padding preset from `container.tsx`, but express it in the project spacing scale, for example `px="16"` or `px={{ initial: "16", md: "24" }}`.
- Consider adding `size="full"` and `size="prose"` only if needed by consumers; map them to documented v4 utilities (`max-w-full`, `max-w-prose` if supported by the active Tailwind build) or a static project utility.

### Flex: `flex.tsx` vs `Flex2.tsx`

Better base: `Flex2.tsx`, but it needs two fixes before it is safe.

Why:

- `Flex2.tsx` has the expected primitive API: responsive direction, wrap, gap, alignment, display, dimensions, style, ref, and DOM passthrough (`Flex2.tsx:89-166`).
- `flex.tsx` has useful static lookup maps and is Tailwind-scanner friendly (`flex.tsx:9-72`), but it lacks DOM passthrough/ref/style and uses a narrower API (`flex.tsx:81-98`, `flex.tsx:104-135`).
- Current public `components/flex.tsx` imports `type FlexProps` from `../layout/Flex/Flex2` (`components/flex.tsx:7`), but `Flex2.tsx` only imports that type locally and does not re-export it. The typecheck confirms this as `TS2459`.

What to combine:

- Keep `Flex2.tsx` as the base.
- Reuse the static map discipline from `flex.tsx`. `Flex2.tsx` currently generates arbitrary classes from runtime values for `flex` and `basis` (`Flex2.tsx:77-86`). Tailwind cannot reliably detect those values. Use static maps for supported values and inline styles or CSS variables for truly custom values.
- Narrow or correctly implement `display`. `types.ts` allows `"block"`, `"inline"`, `"none"`, `"grid"`, etc. (`types.ts:38-46`), but `Flex2.tsx` maps every non-`inline-flex` display value back to `flex` (`Flex2.tsx:55-72`). Either type `display` as `"flex" | "inline-flex" | "none"` for Flex, or use the shared `getResponsiveDisplayClass` and preserve `hidden`.

### Grid: `grid.tsx` vs `Grid2.tsx`

Better base: `Grid2.tsx`, with static maps from `grid.tsx`.

Why:

- `Grid2.tsx` provides the stronger component shape: responsive object API, custom template intent, display, gap overrides, dimensions, style, ref, and DOM passthrough (`Grid2.tsx:115-192`).
- `grid.tsx` has safer static maps for columns, responsive breakpoints, row/column gaps, flow, auto rows/cols, and item alignment (`grid.tsx:10-182`, `grid.tsx:223-264`), but no DOM passthrough/ref/style.
- `Grid2.tsx` dynamically builds arbitrary classes for template strings and unsupported numbers (`Grid2.tsx:52-65`, `Grid2.tsx:68-90`). That conflicts with Tailwind's plain-text class detection model.

What to combine:

- Keep `Grid2.tsx` as the component base.
- Pull over static maps from `grid.tsx`, especially column counts 9-11 (`grid.tsx:19-22`) and dense flow variants (`grid.tsx:136-142`).
- For custom `cols`/`rows` strings, use inline styles (`gridTemplateColumns`, `gridTemplateRows`) or static CSS-variable classes such as a literal `grid-cols-[var(--nz-grid-cols)]`, then set the variable through `style`. Do not interpolate arbitrary Tailwind class strings at render time.
- Fix display semantics as with Flex. `Grid2.tsx` maps every non-`inline-grid` display value back to `grid` (`Grid2.tsx:95-112`) despite the wider `DisplayValue` type.

### Section: `section.tsx` vs `Section2.tsx`

Better base: `Section2.tsx`.

Why:

- `Section2.tsx` is a layout primitive: semantic default element, configurable `as`, spacing size presets, DOM passthrough, style, ref, and dimensions (`Section2.tsx:54-112`).
- `section.tsx` is a higher-level content section. It renders optional title and description markup (`section.tsx:61-74`) and hardcodes typography classes. That can be useful, but it is not the same abstraction as a primitive layout wrapper.
- `section.tsx` does not pass through general DOM props, `style`, or `ref` (`section.tsx:20-33`, `section.tsx:46-78`).

What to combine:

- Keep `Section2.tsx` as the primitive.
- If the title/description pattern is desired, implement it as a separate composed component (`SectionHeader`, `SectionTitle`, `SectionDescription`, or `PageSection`) instead of baking content structure into the primitive.
- Preserve `id`, `aria-label`, and role support through rest props rather than a custom one-off prop list.

## Findings By Severity

### P0 - The package is not currently buildable

Evidence:

- Public leaves still point at deleted atom directories: `components/box.tsx:1`, `components/container.tsx:7`, `components/grid.tsx:7`, `components/section.tsx:1`.
- The only updated public leaf, `components/flex.tsx:7`, imports a type that `Flex2.tsx` does not export.
- Layout folder indexes export case-mismatched or non-existent files: `layout/Box/index.ts:1`, `layout/Container/index.ts:1`, `layout/Flex/index.ts:1`, `layout/Grid/index.ts:1`, `layout/Section/index.ts:1`.
- `layout/index.ts:6-12` mixes component exports and shared type exports, producing duplicate exported type names.
- `pnpm --filter @nezumi/ui typecheck` fails.

Risk and impact:

- Consumers cannot reliably import `@nezumi/ui/components/*` or `@nezumi/ui/layout`.
- Case-insensitive macOS behavior can mask issues that fail on CI or Linux.

Recommended correction:

- Choose one canonical file per component.
- Make file names and index exports match exactly in casing.
- Point public leaves to the new canonical layout components or remove those leaves.
- Export shared prop types from a single location, or use explicit named exports to avoid duplicate type re-exports.

### P0 - Most moved `*2.tsx` files have broken relative imports

Evidence:

- `Box2.tsx` imports `./utils` and `./types` from inside `layout/Box` (`Box2.tsx:14-20`).
- `Container2.tsx` imports `./utils` and `./types` from inside `layout/Container` (`Container2.tsx:20-22`).
- `Grid2.tsx` imports `./utils` and `./types` from inside `layout/Grid` (`Grid2.tsx:21-28`).
- `Section2.tsx` imports `./utils` and `./types` from inside `layout/Section` (`Section2.tsx:21-23`).
- Only `Flex2.tsx` uses the correct `../utils` and `../types` pattern (`Flex2.tsx:23-30`).

Risk and impact:

- The preferred implementation family cannot compile after being moved into subfolders.

Recommended correction:

- Update moved files to use `../utils` and `../types`, or move shared helpers into each folder intentionally.
- Prefer renaming `*2.tsx` to the canonical component file after deleting the competing implementation.

### P1 - Dynamic Tailwind class generation can produce missing CSS

Evidence:

- `Flex2.tsx` returns arbitrary classes from runtime values (`Flex2.tsx:77-86`).
- `Grid2.tsx` returns arbitrary grid-template classes from runtime values (`Grid2.tsx:52-65`) and wraps them in responsive variants (`Grid2.tsx:68-90`).
- Tailwind docs state that source files are scanned as plain text and class names built dynamically are not understood.

Risk and impact:

- TypeScript can pass while production CSS omits required grid/flex styles.
- Responsive custom template values are especially risky because the full class string will not exist literally in source.

Recommended correction:

- Use static lookup maps for all supported Tailwind utility values.
- Use inline styles or CSS variables for arbitrary user-provided values.
- If arbitrary classes are unavoidable, safelist them with `@source inline()`, but this should be the exception.

### P1 - `display` accepts values that Flex/Grid ignore

Evidence:

- `DisplayValue` includes `"block"`, `"inline"`, `"none"`, `"grid"`, and `"inline-grid"` (`types.ts:38-46`).
- `Flex2.tsx` maps all non-`inline-flex` display values to `flex` (`Flex2.tsx:55-72`).
- `Grid2.tsx` maps all non-`inline-grid` display values to `grid` (`Grid2.tsx:95-112`).

Risk and impact:

- `display="none"` renders as visible `flex` or `grid`.
- Responsive display overrides silently do the wrong thing.

Recommended correction:

- Narrow each component's display prop type to supported values, or reuse the shared `getResponsiveDisplayClass` and provide a default only when `display` is undefined.

### P1 - The lowercase/simple variants use invalid package imports and weaker DOM behavior

Evidence:

- `box.tsx`, `container.tsx`, `flex.tsx`, `grid.tsx`, and `section.tsx` import `@/lib/utils` (`box.tsx:2`, `container.tsx:2`, `flex.tsx:2`, `grid.tsx:2`, `section.tsx:2`).
- `packages/ui/tsconfig.json` has no `@/*` path mapping.
- These variants do not spread rest DOM props or forward `ref`.

Risk and impact:

- These files do not typecheck in the package.
- Even if the import is fixed, consumers lose normal DOM behavior such as `id`, `data-*`, event handlers, `style`, and `ref`.

Recommended correction:

- Do not use the lowercase variants as the final primitive base.
- If keeping any logic from them, move only their static maps or high-level convenience props into the canonical implementation.

### P1 - `container.tsx` uses old/non-documented Tailwind v4 max-width classes

Evidence:

- `container.tsx` maps sizes to `max-w-screen-sm` through `max-w-screen-2xl` (`container.tsx:9-17`).
- The reviewed Tailwind v4 max-width docs list `max-w-*` container-scale utilities and `max-w-screen`, not `max-w-screen-sm`.

Risk and impact:

- Containers may render without expected max-width CSS.

Recommended correction:

- Use `Container2.tsx` size mapping as the baseline (`max-w-md`, `max-w-2xl`, `max-w-4xl`, etc.).
- Add explicit `mx-auto` and `px-*` policy because Tailwind's `container` utility does not do this automatically.

### P2 - `Box2.tsx` documents a prop it does not support

Evidence:

- Example uses `<Box display="flex" gap="16">` (`Box2.tsx:11`).
- `BoxProps` is currently `BaseLayoutProps` (`types.ts:96`), and `BaseLayoutProps` has no `gap` prop (`types.ts:55-92`).

Risk and impact:

- Users following the local example get a TypeScript error.

Recommended correction:

- Either remove the example or add a deliberate `gap` prop to `BaseLayoutProps`.

### P2 - Root layout exports create duplicate type names

Evidence:

- `layout/index.ts` exports component folders and then exports all shared types (`layout/index.ts:6-12`).
- The typecheck reports duplicate exports for `BoxProps`, `ContainerProps`, `GridProps`, and `SectionProps`.

Risk and impact:

- Even after import paths are fixed, barrel exports remain fragile.

Recommended correction:

- Prefer explicit exports:
  - component values from canonical files
  - prop types from `types.ts`
  - no duplicate `export type` from component files unless intentionally re-exported once

### P2 - Section has two mixed abstraction levels

Evidence:

- `section.tsx` renders a heading and description (`section.tsx:61-74`).
- `Section2.tsx` is a pure wrapper with spacing and passthrough (`Section2.tsx:54-112`).

Risk and impact:

- Consumers cannot tell whether `Section` is a semantic layout primitive or a page-content section pattern.

Recommended correction:

- Keep primitive `Section` minimal.
- Move title/description markup into a separate composed page-section component if needed.

### P3 - Runtime type imports should be type-only

Evidence:

- Several lowercase files import `JSX` as a runtime import from React (`box.tsx:3`, `container.tsx:3`, `flex.tsx:3`, `grid.tsx:3`).

Risk and impact:

- Low, but unnecessary runtime imports make module output noisier and can conflict with stricter TS settings later.

Recommended correction:

- Use `import type { JSX } from "react"` or rely on `React.ElementType` / `keyof React.JSX.IntrinsicElements`.

## Recommended Target Structure

Choose one canonical implementation family and remove the duplicate pair files. A conservative target is:

```text
packages/ui/src/layout/
  Box/
    Box.tsx
    index.ts
  Container/
    Container.tsx
    index.ts
  Flex/
    Flex.tsx
    index.ts
  Grid/
    Grid.tsx
    index.ts
  Section/
    Section.tsx
    index.ts
  Stack.tsx
  spacing.ts
  types.ts
  utils.ts
  index.ts
```

Use the `*2.tsx` implementations as the starting point, because they align better with React DOM passthrough, React 19 ref-as-prop, responsive layout props, and the documented `@nezumi/ui/layout` API. Then merge in only selected pieces from the lowercase/simple variants:

- Box: optionally surface variants and radius, only if `Box` is intentionally a surface component.
- Container: padding presets, rewritten to project spacing values and v4 max-width classes.
- Flex: static map discipline for generated utilities.
- Grid: static maps for complete column/row/flow coverage.
- Section: title/description pattern as a separate composed component, not the primitive.

## Concrete Recommendations

1. Fix buildability first:
   - Delete or rename duplicate/case-conflicting files.
   - Fix relative imports in moved files.
   - Update `components/*` public leaves away from deleted `atoms/*`.
   - Make `layout/index.ts` explicit and conflict-free.

2. Make Tailwind output deterministic:
   - Replace runtime arbitrary class generation with static maps or inline styles/CSS variables.
   - Keep app `@source "../../../packages/ui/src"` entries because the package relies on app Tailwind builds detecting UI classes.

3. Clarify API boundaries:
   - `Box`, `Flex`, `Grid`, `Container`, and `Section` should be layout primitives.
   - Surface styling and section headings should be separate composed components unless explicitly required in the primitive API.

4. Add verification:
   - `pnpm --filter @nezumi/ui typecheck`
   - focused tests for `getSpacingClasses`, responsive class helpers, and each component's class output
   - one import test for every public package export in `packages/ui/package.json`

## Open Questions And Residual Risks

- Should `Box` be a neutral layout wrapper, or is it also intended to be the design-system surface primitive?
- Should `Container` include default horizontal padding, or should callers always pass `px`?
- Do consumers need arbitrary responsive grid templates, or can `Grid` restrict responsive templates to known static values?
- The current worktree contains a migration in progress: tracked atom and flat layout files are deleted while new layout folders are untracked. The final implementation should avoid leaving both old and new API surfaces half-wired.

## Suggested Next Steps

1. Normalize the file structure and barrel exports.
2. Convert `*2.tsx` files into canonical component files.
3. Replace dynamic Tailwind arbitrary class generation.
4. Re-run `pnpm --filter @nezumi/ui typecheck`.
5. Add import/class-output tests for the public layout API.
