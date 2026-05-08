# Layout Components Browser Verification Report

Generated: 2026-05-08

## Aufgabenstellung

Verify the Nezumi UI layout component demos in a real browser across mobile, tablet, and desktop viewports, with specific attention to nested components and child elements inside `Box`, `Container`, `Flex`, `Grid`, and `Section`.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/007-nezumi-ui-best-practices.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/003-01-app-01-getting-started-03-layouts-and-pages.mdx`
- `docs/nextjs/004-01-app-01-getting-started-04-linking-and-navigating.mdx`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/147-responsive-design.mdx`
- Tailwind utility references for display, gap, flex direction/wrap/basis, grid template columns/rows, and grid auto flow.

## Gelesene externe Quellen

None. The local repository documentation and code were sufficient for this verification.

## Abgeleiteter SOLL-Zustand

- Layout demos should import public Nezumi UI components via granular `@packages/ui/components/*` imports.
- Tailwind responsive behavior is mobile-first: `md` starts at `768px`, `lg` at `1024px`, and `xl` at `1280px`.
- Demo utility classes must use the documented Nezumi pixel-named token scale, for example `8`, `12`, `16`, `24`, `32`, `40`, `48`, `64`, and `96`.
- `Grid` demos should stack at mobile where configured, switch to two or three columns at the documented breakpoints, and keep nested chart bars and placeholder boxes nonzero.
- `Flex` demos should preserve responsive direction changes, wrapping behavior, alignment, and nested item sizing.
- `Box` demos should consume layout props, preserve semantic rendering such as `article`, and switch `display={{ initial: "block", md: "grid" }}` from stacked to row layout at `md`.
- `Container` demos should preserve centering, max-width behavior, default/explicit gutters, and nested responsive grids.
- `Section` demos should render semantic page bands, preserve explicit DOM passthrough such as `id` and `aria-label`, and keep nested grids responsive.

## Analysierte Dateien

- `packages/ui/src/layout/types.ts`
- `packages/ui/src/layout/utils.ts`
- `packages/ui/src/layout/Box/Box.tsx`
- `packages/ui/src/layout/Container/Container.tsx`
- `packages/ui/src/layout/Flex/Flex.tsx`
- `packages/ui/src/layout/Grid/Grid.tsx`
- `packages/ui/src/layout/Section/Section.tsx`
- `apps/playground/app/page.tsx`
- `apps/playground/app/tutorials/_components.tsx`
- `apps/playground/app/tutorials/box/page.tsx`
- `apps/playground/app/tutorials/container/page.tsx`
- `apps/playground/app/tutorials/flex/page.tsx`
- `apps/playground/app/tutorials/grid/page.tsx`
- `apps/playground/app/tutorials/section/page.tsx`
- `apps/playground/app/globals.css`

## Browser Verification

Verified with Chrome against the live playground dev server at `http://localhost:3003`.

- Mobile viewport: `390x844`
- Tablet viewport: `768x1024`
- Desktop viewport: `1440x1000`
- Routes checked: `/`, `/tutorials/grid`, `/tutorials/flex`, `/tutorials/box`, `/tutorials/container`, `/tutorials/section`
- Result JSON: `/tmp/nezumi-browser-check/layout-results-after.json`
- Screenshots: `/tmp/nezumi-browser-check/layout-screenshots-after`
- Final browser result: `failureCount: 0`

The browser checks asserted page load, expected `h1`, no page horizontal overflow, no visible Next.js error overlay, route links, responsive breakpoint layouts, nested demo content, semantic passthrough, and nonzero dimensions for visible placeholder/chart elements.

## Findings nach Schweregrad

### Critical

None.

### High

None remaining after fixes.

### Medium - Resolved: unsupported token classes collapsed nested demo visuals

Several demo utilities used classes outside the documented Nezumi spacing/dimension token scale. In Tailwind v4, these classes did not generate usable sizing in this repo, so nested placeholders and chart areas collapsed in the browser.

- `apps/playground/app/tutorials/grid/page.tsx:110`: changed the dashboard chart container from unsupported `h-36` to supported `h-40`.
- `apps/playground/app/tutorials/flex/page.tsx:69`: changed the toolbar nested block from unsupported `w-80` to supported `w-96`.
- `apps/playground/app/tutorials/container/page.tsx:90`: changed responsive nested grid placeholders from unsupported `h-20` to supported `h-24`.
- `apps/playground/app/tutorials/_components.tsx:139`: changed prop table row padding from unsupported `py-14` to supported `py-16`.

Impact before the fix: browser measurement found zero-height chart bars in the Grid tutorial, a collapsed nested Flex toolbar block, and collapsed nested Container placeholder boxes.

### Low - Documentation mismatch

`docs/nezumi-ui/INDEX.md` references the design-token document as `010-nezumi-ui-design-tokens-tailwind-v4.mdx`, while the repository file currently exists as `010-nezumi-ui-design-tokens-tailwind-v4.md`. This did not block the implementation, but it makes documentation navigation less reliable.

### Low - Unrelated dev-server noise

The local dev server emits a missing `/favicon.ico` browser console error and keeps an empty `nextjs-portal` node in development mode. These were excluded from the layout verdict because they are not visible layout failures and do not affect nested component behavior.

## Konkrete Empfehlungen

- Keep playground demo utility classes restricted to the documented Nezumi token scale.
- Add a lightweight browser regression check for the playground routes so unsupported utility classes are caught as zero-sized rendered elements.
- Correct the stale `docs/nezumi-ui/INDEX.md` design-token link in a separate documentation cleanup.

## Offene Fragen oder Restrisiken

- Verification covered local Chrome only, not Safari or Firefox.
- The browser script is an ad hoc verification artifact under `/tmp`, not a committed test. The current code is verified, but the check is not yet part of CI.

## Vorgeschlagene nächste Schritte

- Convert the viewport assertions into a committed Playwright test if this playground is expected to remain a long-lived visual regression surface.
