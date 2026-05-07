# AI Slop Review Validation

**Datum:** 2026-05-07  
**Aufgabe:** AI-Slop-Berichte mit Subagents validieren, bestätigte Findings fixen, abgearbeitete Findings aus Review-Dokumenten entfernen und relevante Dokumentation aktualisieren.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/react/INDEX.md`
- `docs/nextjs/INDEX.md`
- `docs/typescript/INDEX.md`
- `docs/tailwind-css/INDEX.md`
- `docs/shadcn-ui/INDEX.md`
- `docs/turbo/INDEX.md`
- `docs/cn/INDEX.md`
- `docs/nezumi-ui/INDEX.md`
- Relevante Detailseiten: Next Metadata, Next ESLint, Next TypeScript/`next-env.d.ts`, Tailwind `@source`, Tailwind `@custom-variant`, Tailwind Theme, shadcn monorepo/Tailwind v4, TypeScript 6.0 deprecations, Turbo task config, Nezumi UI public API/foundation/design tokens/repository tree.

## Gelesene externe Quellen

- [MDN: ARIA search role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/search_role)
- [MDN: HTML table element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table)
- [MDN: HTML disabled attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled)
- [MDN: HTML button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)

## Abgeleiteter SOLL-Zustand

- Apps besitzen eine eigene Tailwind-v4-CSS-Entry mit `@import "tailwindcss"`, `@custom-variant dark`, präzisen `@source`-Pfaden auf `packages/ui/src` und die eigene App, danach `@import "@nezumi/ui/design-tokens.css"`.
- URL-basierte Next-Metadata wird über `metadataBase` app-weit abgesichert.
- Tabellarische Daten verwenden native Tabellen-Semantik; ARIA-Landmarks werden nur für tatsächlich vorhandene Funktionalität gesetzt; nicht funktionale Buttons sind disabled.
- `@nezumi/ui` bietet stabile public leaf exports und baut alle exportierten Subpaths.
- shadcn/Radix-Slot-Nutzung erfolgt über `@radix-ui/react-slot`, nicht über den Radix-Monolith; shadcn-kompatible Farbaliase mappen auf Nezumi-Semantik.
- Component-Tokens verwenden Tailwind-v4-Namensräume, aus denen Utilities entstehen (`--color-*`, `--radius-*`, `--spacing-*`, `--shadow-*`).
- TypeScript/Turbo/ESLint sind über Root-Scripts und Turbo-Tasks verifizierbar.

## Analysierte Dateien

- `review/AI_SLOP_REVIEW.md`, `review/REVIEW_APPS.md`, `review/REVIEW_PACKAGES_UI.md`, `review/REVIEW_DOCS_CONFIGS.md`
- `apps/*/app/layout.tsx`, `apps/*/app/globals.css`, `apps/*/tsconfig.json`, `apps/*/package.json`
- `apps/homepage/app/opengraph-image.tsx`
- `apps/operations/app/(console)/console/page.tsx`, `apps/operations/components/*`, `apps/operations/app/global-error.tsx`
- `packages/ui/package.json`, `packages/ui/tsup.config.ts`, `packages/ui/tsconfig.json`
- `packages/ui/src/atoms/Button/Button.tsx`, `packages/ui/src/atoms/Card/card.tsx`
- `packages/ui/src/styles/**/*`
- `package.json`, `turbo.json`, `.gitignore`, `eslint.config.mjs`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`, `004-nezumi-ui-public-api.mdx`, `010-nezumi-ui-design-tokens-tailwind-v4.mdx`

## Findings nach Schweregrad

### High

- **Bestätigt und gefixt:** App-Metadata-, Tabellen-, Landmark-, Disabled-Button-, Umlaut-, App-`target`, Turbo-Task-, ESLint- und Radix-Monolith-Findings.
- **Bestätigt und gefixt:** Card-Tokens/arbitrary values, redundante Card-Spacing-Tokens, App-`@source` auf `dist`, fehlendes `@custom-variant dark`, fehlende Font-Tokens, `html` `font-size: 16px`, Scrollbar-Pixelwerte, shadcn-Farbaliase und Button-Variantensemantik.
- **Widerlegt:** `ignoreDeprecations: "6.0"` entfernen. Der `@nezumi/ui` DTS-Build schlägt ohne dieses Flag unter TypeScript 6.0.3 fehl; das Flag bleibt als dokumentierte Übergangsmaßnahme.

### Medium

- **Offen:** Testing-Library-Migration für `Button.test.tsx`.
- **Offen:** `input.css` ohne public Input-Komponente.
- **Offen:** Layout-Helper-Deduplizierung und präziseres polymorphes Typing.
- **Offen:** Shared App-/Next-/TypeScript-Config statt duplizierter App-Konfiguration.
- **Offen:** `FRAMEWORK_VERSION_REFERENCES.md`, Root-`tsconfig.json`, `CLAUDE.md` und stale App-Roadmaps.

### Low

- **Widerlegt:** `components.json` `cssVariables: true`, fehlende `displayName` bei named function components, OKLCH-from-Hex, `--color-nezumi-d-*`, Design-dokumentierte Fokus-/Spacing-Tokens.
- **Offen:** Placeholder-Produktinhalte und weitere Error-/Not-Found-Abdeckung in Apps.

## Konkrete Empfehlungen

- `next-env.d.ts` in einem dedizierten Git-Cleanup aus dem Index entfernen, nachdem `.gitignore` aktualisiert ist.
- Vor TypeScript 7 das zugrunde liegende `baseUrl`/DTS-Tooling-Thema migrieren und erst dann `ignoreDeprecations: "6.0"` entfernen.
- Für `@nezumi/ui` als nächsten Slice Tests auf Testing Library migrieren und Card/Layout-Coverage ergänzen.
- App-Roadmaps entweder synchronisieren oder archivieren, damit sie nicht wieder als falsche SSOT gelesen werden.

## Offene Fragen oder Restrisiken

- Die neu aktivierte ESLint-Konfiguration ist bewusst pragmatisch für das aktuelle Monorepo angepasst und ignoriert `.next`, `dist`, `build`, `out`, `coverage` sowie `next-env.d.ts`.
- `metadataBase` nutzt lokale Fallbacks. Für echte Deployments sollte CI/Hosting eine Produktions-URL erzwingen.
- `@custom-variant dark` ist vorbereitet, aber ein aktiver Theme-Toggle/Provider war nicht Teil dieses Slices.

## Implementierte Fixes

- Apps: Metadata, OG-Farben, Operations-Tabelle, CommandBar-Semantik, Disabled-Toolbar, Main-Landmark, Umlaute, Port 3003 für Playground, App-Targets `ES2022`.
- UI: Radix Slot scoped package, Button default type/data-slot, DESIGN-kompatible Button-Varianten, Card-Tokens/utilities/data-slots, public leaf build entries.
- Styles: `@custom-variant dark`, saubere App-`@source`-Pfade, Font-Tokens, Base-Font-Nutzung, `font-size: 100%`, scrollbar spacing token.
- Config: `lint`/`test` Root-Scripts, Turbo-Tasks, ESLint Flat Config, `.gitignore` für `next-env.d.ts`, aktualisierte Dependencies/Lockfile.
- Docs/Review: Abgearbeitete Findings aus Review-Dokumenten entfernt, Nezumi-Docs zu Imports, Exports und Tokens aktualisiert.
