# Token System Review Report

## Aufgabenstellung

`DESIGN.md` prüfen, Tailwind- und Nezumi-UI-Dokumentation lesen, danach sicherstellen, dass Farben ausschließlich aus dem Nezumi-Token-System kommen und vorhandene Komponenten korrekt und vollständig Token nutzen. Bestätigte Probleme wurden direkt behoben.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `DESIGN.md`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/002-adding-custom-styles.mdx`
- `docs/tailwind-css/047-colors.mdx`
- `docs/tailwind-css/052-dark-mode.mdx`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/tailwind-css/084-functions-and-directives.mdx`
- `docs/tailwind-css/147-responsive-design.mdx`
- `docs/tailwind-css/172-theme.mdx`
- `docs/tailwind-css/184-upgrade-guide.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`
- `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`
- `docs/nezumi-ui/013-nezumi-ui-customization-theming.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Vendor- und Projektdokumente waren ausreichend.

## Abgeleiteter SOLL-Zustand

- Tailwind v4 Tokens, die Utilities erzeugen sollen, liegen in CSS `@theme`, nicht in parallelen TypeScript-Tokenobjekten.
- Primitive Farben sind ausschließlich `--color-nezumi-*` in `packages/ui/src/styles/tokens/colors.css`, mit `oklch(from #... l c h)` aus `DESIGN.md`.
- Tailwind Default-Farben müssen mit `--color-*: initial` deaktiviert sein, damit keine Default-Palette-Utilities wie `bg-blue-*` verfügbar bleiben.
- App- und Komponenten-Code nutzt semantische oder Component-Tokens, nicht Raw-Hex, RGB/HSL/OKLCH-Direktwerte, Tailwind Default-Palette oder manuelle `dark:`-Farbklassen.
- Component Tokens folgen der Layer-Regel: Primitive -> Semantic -> Component. Component Tokens referenzieren semantische Tokens, nicht direkt Primitive.
- Dark Mode ist klassenbasiert; `.dark` überschreibt semantische Tokens.
- Produkt-Breakpoints sind nur `md = 768px` und `lg = 1024px`.

## Analysierte Dateien

- `apps/*/app/globals.css`
- `apps/homepage/app/opengraph-image.tsx`
- `apps/playground/app/tutorials/_components.tsx`
- `apps/playground/app/tutorials/container/page.tsx`
- `packages/ui/src/atoms/Button/Button.tsx`
- `packages/ui/src/styles/tokens/colors.css`
- `packages/ui/src/styles/tokens/breakpoints.css`
- `packages/ui/src/styles/tokens/spacing.css`
- `packages/ui/src/styles/semantic/colors.css`
- `packages/ui/src/styles/components/button.css`
- `packages/ui/src/styles/design-tokens.css`
- `packages/ui/src/layout/*`
- `packages/ui/src/lib/utils.ts`
- zugehörige Tests unter `packages/ui/src/**/*.test.*`

## Findings nach Schweregrad

### Behoben - Mittel

1. Tailwind Default-Farben waren nicht deaktiviert.
   - Datei: `packages/ui/src/styles/tokens/colors.css`
   - Risiko: Default-Palette-Utilities konnten trotz DESIGN-Regel genutzt werden.
   - Fix: `--color-*: initial` ergänzt.

2. Produkt-Breakpoints waren nicht auf `md`/`lg` begrenzt.
   - Dateien: `packages/ui/src/styles/design-tokens.css`, `packages/ui/src/styles/tokens/breakpoints.css`, Layout-Responsive-Helfer.
   - Risiko: `sm`, `xl`, `2xl` konnten in Produktcode und Layout-Primitives weiterleben.
   - Fix: `--breakpoint-*: initial`, nur `md`/`lg`; Safelist und Responsive-Typen/Helfer angepasst.

3. Button Component Tokens referenzierten Primitive direkt.
   - Datei: `packages/ui/src/styles/components/button.css`
   - Risiko: Layer-Regel Primitive -> Semantic -> Component wurde übersprungen.
   - Fix: Button-Interaction-Tokens nutzen nur semantische Tokens.

4. Button-Varianten waren nicht vollständig interaktiv tokenisiert.
   - Datei: `packages/ui/src/atoms/Button/Button.tsx`
   - Risiko: inkonsistente Hover/Active-Zustände.
   - Fix: Active-Tokens für `secondary`, `tonal`, `destructive`, `outline`, `ghost`, `elevated`; Ghost nutzt nun Brand-Text gemäß DESIGN.

### Behoben - Niedrig

1. OpenGraph Image enthielt Raw-Hex bzw. später primitive Farbvariablen im App-Code.
   - Datei: `apps/homepage/app/opengraph-image.tsx`
   - Fix: auf semantische CSS-Variablen umgestellt.

2. Layout-Test nutzte `style={{ color: "red" }}` als Passthrough-Fixture.
   - Datei: `packages/ui/src/layout/layout-components.test.tsx`
   - Fix: auf nicht-farbbezogene Style-Fixture geändert.

3. DESIGN-Spacing-Werte `80`, `112`, `128` fehlten in CSS/TS-Skala.
   - Dateien: `packages/ui/src/styles/tokens/spacing.css`, `packages/ui/src/layout/spacing.ts`
   - Fix: Werte ergänzt und Safelist erweitert.

## Konkrete Empfehlungen

- Den Farbscan als CI-Check automatisieren, damit Raw-Hex/default-palette in App- und Komponenten-Code nicht zurückkommt.
- Das Nezumi-UI-Index-Dokument korrigieren: `010-nezumi-ui-design-tokens-tailwind-v4.mdx` ist im Dateisystem `.md`.
- Typography bleibt ein separater Review-Kandidat: `DESIGN.md` fordert Urbanist und andere Gewichtsnamen, diese Aufgabe war auf Farben/Token-Implementierung fokussiert.

## Offene Fragen oder Restrisiken

- `packages/ui/src/styles/tokens/shadows.css` enthält Shadow-Primitives mit `rgb(...)` und `#0000`. Das sind Elevation Tokens, keine Farbverwendung in App-/Komponenten-Code; bei strikt globalem Farbverbot sollte ein eigener Shadow-Token-Review folgen.
- `packages/ui/src/styles/design-tokens.css` registriert `@source inline` vor Imports. Die Builds sind grün; falls weitere Toolchains wie Storybook hinzukommen, sollte die Entry-Reihenfolge dort separat geprüft werden.

## Verifikation

- `pnpm --filter @packages/ui test` - bestanden, 4 Testfiles, 19 Tests.
- `pnpm --filter @packages/ui typecheck` - bestanden.
- `pnpm build:homepage` - bestanden.
- `pnpm build:playground` - bestanden.
- Repo-Scan auf Raw-Hex, RGB/HSL/OKLCH-Direktwerte, Tailwind Default-Palette-Klassen und `dark:`-Farbklassen in App-/Komponenten-Code - keine Treffer außerhalb erlaubter Token-Dateien.
