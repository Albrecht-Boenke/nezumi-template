# AI Slop Review — aktueller Restbestand

**Stand:** 2026-05-07
**Status:** Abgearbeitete oder widerlegte Findings wurden aus diesem Arbeitsdokument entfernt. Die vollständige Validierung mit Quellen, Codebezug und Fix-Nachweis steht in [`AI_SLOP_REVIEW_VALIDATION.md`](../AI_SLOP_REVIEW_VALIDATION.md).

## Noch offen

### Packages UI

- `packages/ui/src/atoms/Button/Button.test.tsx`: Tests decken neue Button- und Token-Verträge ab, nutzen aber weiter ein manuelles `createRoot`/`act`-Harness statt Testing Library. Risiko: weniger nutzernahe Queries und schwächerer Accessibility-Teststil.
- `packages/ui/src/styles/components/input.css`: Input-Tokens existieren ohne public `Input`-Komponente. Entscheidung nötig: Komponente ergänzen oder Token-Sheet entfernen.
- `packages/ui/src/layout/*`: Dimension-/Responsive-Helper sind weiterhin teilweise dupliziert. Ein gemeinsamer Helper würde Wartungskosten senken.
- `packages/ui/src/layout/types.ts`: Das polymorphe `as`-Typing ist noch zu breit über `HTMLAttributes<HTMLElement>` modelliert und bildet element-spezifische Props nicht sauber ab.
- `packages/ui/src/atoms/Card/card.tsx`: Card hat weiterhin keine eigene Testdatei.

### Apps

- App-Shell-Konventionen sind nur teilweise vereinheitlicht. `metadataBase`, `antialiased`-Redundanz, Operations-Tabelle, Search-Landmark und Toolbar-Disabled-Zustand sind gefixt; ein dokumentierter Root-Layout-Standard für alle Apps fehlt noch.
- `apps/homepage`, `apps/playground` und `apps/members` haben noch nicht dieselbe Error-/Global-Error-/Not-Found-Abdeckung wie `apps/operations`.
- Placeholder-Inhalte wie `MarketingPlaceholderSection` und die statische Operations-CommandBar bleiben Produkt-/UX-Arbeit.

### Konfiguration

- `next-env.d.ts` ist nun in `.gitignore`, aber bereits getrackte generierte Dateien müssen bei einem dedizierten Git-Cleanup aus dem Index entfernt werden.
- Eine gemeinsame TypeScript-/Next-Config für Apps ist weiterhin offen. Die App-Targets sind auf `ES2022` gehoben, aber die Config-Dateien bleiben weitgehend dupliziert.
- `ignoreDeprecations: "6.0"` in `packages/ui/tsconfig.json` ist kein Slop-Finding mehr, sondern aktuell notwendig, damit `tsup` unter TypeScript 6.0.3 DTS bauen kann. Vor TypeScript 7 muss die zugrunde liegende `baseUrl`-Deprecation im DTS-Tooling migriert werden.

### Tokens & Styles

- `@custom-variant dark`, App-`@source`-Bereinigung, Card-Tokens, Font-Tokens, Scrollbar-Spacing und `html`-Font-Size sind gefixt.
- Offene Entscheidung: globale `body`-Transitions und globale Focus-Outline bleiben Projekt-Policy-Themen und wurden nicht im Rahmen dieses Fix-Slices verändert.

## Widerlegt

- `components.json` `cssVariables: true` ist laut shadcn/ui-Dokumentation weiterhin zulässig.
- `Card.displayName` ist kein bestätigter Standardverstoß bei named functions.
- `--color-nezumi-d-*`, OKLCH-from-Hex und mehrere Fokus-/Spacing-Tokens sind durch `DESIGN.md` und lokale Nezumi-Doku gedeckt.
- `metadataBase` ist nur für relative URL-Metadata zwingend; es wurde trotzdem als robuste App-Konvention ergänzt.
