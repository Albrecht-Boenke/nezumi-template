# Layout Components Analysis

## Aufgabenstellung

`LAYOUT_COMPONENTS_ANALYSIS.md` wurde gegen lokale Projekt- und Vendor-Dokumentation sowie gegen den aktuellen Code in `packages/ui` und den Apps geprüft. Danach wurden die finalen Layout-Komponenten `Box`, `Container`, `Flex`, `Grid` und `Section` implementiert.

Kurzfazit: Die urspruengliche Analyse war in den Kernpunkten korrekt. Sie musste aber aktualisiert werden, weil sie `docs/nezumi-ui` bewusst ausgelassen hatte und weil die endgueltige Umsetzung fuer endlich viele prop-generierte Tailwind-Klassen eine explizite Tailwind-v4-Source-Abdeckung benoetigt.

## Gelesene lokale Dokumentation

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
- `docs/tailwind-css/098-justify-content.mdx`
- `docs/tailwind-css/099-justify-items.mdx`
- `docs/tailwind-css/120-max-width.mdx`
- `docs/tailwind-css/137-padding.mdx`
- `docs/tailwind-css/147-responsive-design.mdx`
- `docs/tailwind-css/159-styling-with-utility-classes.mdx`
- `docs/tailwind-css/172-theme.mdx`
- `docs/tailwind-css/084-functions-and-directives.mdx`
- `docs/cn/INDEX.md`
- `docs/cn/001-clsx-readme.mdx`
- `docs/cn/003-tailwind-merge-what-is-it-for.mdx`
- `docs/cn/004-tailwind-merge-when-and-how-to-use-it.mdx`
- `docs/cn/005-tailwind-merge-features.mdx`
- `docs/cn/006-tailwind-merge-limitations.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`
- `docs/nezumi-ui/003-nezumi-ui-atomic-design.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/006-nezumi-ui-component-development.mdx`
- `docs/nezumi-ui/007-nezumi-ui-best-practices.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Vendor- und Projektdokumente waren fuer diese Aufgabe ausreichend.

## Abgeleiteter SOLL-Zustand

- Layout-Komponenten sind pure React-Funktionskomponenten ohne Render-Side-Effects und ohne Mutation von Props.
- React 19 erlaubt `ref` als normales Prop; wiederverwendbare DOM-Primitives sollen `ref` an das gerenderte Element weitergeben.
- Komponenten-eigene Props muessen vor dem DOM-Spread konsumiert werden. Native DOM-Props wie `id`, `role`, `aria-*`, `data-*`, Events, `className` und `style` muessen durchgereicht werden.
- Nezumi UI nutzt granulare Public Leaves unter `src/components/*.tsx` und einen oeffentlichen Layout-Einstieg `@nezumi/ui/layout`; interne Refactorings duerfen diese API nicht brechen.
- Tailwind v4 scannt Source als Plain Text. Prop-basierte Klassen duerfen daher nur aus statisch abgedeckten endlichen Utility-Familien stammen oder muessen ueber `@source inline()` explizit erzeugt werden.
- Responsive Verhalten ist mobile-first: unpraefixte Klasse fuer Base, praefixte Klassen fuer Breakpoints und groesser.
- Flex- und Grid-Abstaende verwenden `gap`, `gap-x` und `gap-y`; `space-x/y` ist fuer diese Primitives nicht die richtige Basis.
- `Container` muss `mx-auto` und horizontales Padding selbst definieren; Tailwinds Container-Scale-Klassen wie `max-w-md` bis `max-w-7xl` sind die passende v4-Basis.
- `tailwind-merge`/`cn()` ist passend fuer das Zusammenfuehren interner Klassen mit `className`, erzeugt aber keine fehlenden Tailwind-Klassen.

## Analysierte Dateien

- `packages/ui/package.json`
- `packages/ui/tsconfig.json`
- `packages/ui/vitest.config.ts`
- `packages/ui/src/components/box.tsx`
- `packages/ui/src/components/container.tsx`
- `packages/ui/src/components/flex.tsx`
- `packages/ui/src/components/grid.tsx`
- `packages/ui/src/components/section.tsx`
- `packages/ui/src/layout/index.ts`
- `packages/ui/src/layout/README.md`
- `packages/ui/src/layout/Stack.tsx`
- `packages/ui/src/layout/types.ts`
- `packages/ui/src/layout/utils.ts`
- `packages/ui/src/layout/spacing.ts`
- `packages/ui/src/layout/spacing.test.ts`
- `packages/ui/src/layout/Box/*`
- `packages/ui/src/layout/Container/*`
- `packages/ui/src/layout/Flex/*`
- `packages/ui/src/layout/Grid/*`
- `packages/ui/src/layout/Section/*`
- `packages/ui/src/styles/design-tokens.css`
- `apps/*/app/globals.css`

## Findings nach Schweregrad

### P0 - Package war nicht buildbar

Status: behoben.

Die alte Struktur enthielt case-konfliktierende Dateien (`box.tsx` vs. erwartetes `Box.tsx` usw.), kaputte `../atoms/*` Public Leaves, kaputte `*2.tsx`-Imports und doppelte Type-Exports. Das bestaetigte `pnpm --filter @nezumi/ui typecheck` vor der Implementierung mit `TS2307`, `TS2459`, `TS1261`, `TS1149` und `TS2308`.

Korrektur:

- Canonical files: `Box/Box.tsx`, `Container/Container.tsx`, `Flex/Flex.tsx`, `Grid/Grid.tsx`, `Section/Section.tsx`.
- Entfernt wurden die konkurrierenden lowercase- und `*2.tsx`-Implementierungen.
- Public Leaves exportieren jetzt aus `../layout/<Component>` und ihre Types aus `../layout/types`.
- `layout/index.ts` exportiert Werte und Types explizit, ohne doppelte Barrel-Konflikte.

### P1 - Dynamische Tailwind-Klassen waren nicht vollstaendig abgesichert

Status: behoben.

Die alte Analyse hat die dynamische Arbitrary-Class-Erzeugung in `Flex2.tsx` und `Grid2.tsx` korrekt kritisiert. Beim finalen Review wurde zusaetzlich klar: Auch finite prop-generierte Hilfsklassen fuer Spacing, Display, Direction, Alignment und Dimensionen brauchen eine deterministische Tailwind-v4-Source-Abdeckung.

Korrektur:

- `Grid` nutzt statische Klassen fuer bekannte `cols`/`rows` 1-12 und statische CSS-Variable-Klassen fuer Custom Templates.
- `Flex` nutzt statische Klassen fuer bekannte `flex`/`basis`-Werte und Inline-Styles fuer echte Custom-Werte.
- `packages/ui/src/styles/design-tokens.css` enthaelt `@source inline()` fuer die endlichen Layout-Utility-Familien, die aus Props erzeugt werden.

### P1 - `display` konnte Werte akzeptieren, die Flex/Grid ignorierten

Status: behoben.

`FlexProps` und `GridProps` verwenden jetzt eigene Display-Typen: `FlexDisplayValue = "flex" | "inline-flex" | "none"` und `GridDisplayValue = "grid" | "inline-grid" | "none"`. Damit kann `display="none"` nicht mehr still als sichtbares `flex` oder `grid` gerendert werden.

### P1 - Lowercase/simple Varianten hatten schwaches DOM-Verhalten

Status: behoben.

Die finalen Komponenten konsumieren Layout-Props, geben DOM-Props weiter, mergen `style`, mergen `className` via `cn()` und leiten `ref` an das gerenderte Element weiter.

### P2 - Container brauchte eine explizite Padding-Policy

Status: behoben.

`Container` rendert standardmaessig `w-full`, `max-w-4xl`, `mx-auto`, `px-16` und `md:px-24`. Explizite `p`/`px` Props koennen diese Policy ueberschreiben.

### P2 - Section vermischte Primitive und Content-Abstraktion

Status: behoben.

`Section` ist jetzt ein primitives Wrapper-Element mit `as`, Spacing, Dimensions, DOM-Passthrough und `ref`. Titel/Beschreibung gehoeren bei Bedarf in eine separate komponierte Komponente.

## Implementierte Komponenten

- `Box`: neutraler polymorpher Layout-Wrapper mit Display, Spacing, Dimensions, DOM-Passthrough, `style`, `className` und `ref`.
- `Container`: zentrierter Max-Width-Wrapper mit dokumentierter Default-Padding-Policy.
- `Flex`: Flexbox-Primitive mit responsive Direction/Wrap, Gap, Alignment, kontrolliertem Display, bekannten Flex/Basis-Utilities und Inline-Styles fuer Custom-Werte.
- `Grid`: Grid-Primitive mit responsive Columns/Rows, CSS-Variable-Templates fuer Custom Tracks, Gap-Achsensteuerung und erweiterten Auto-Flow-Werten.
- `Section`: semantisches Layout-Primitive mit vertikalen Size-Presets und explizitem Padding-Override.

## Konkrete Empfehlungen

- `Box` sollte neutral bleiben. Surface/Card-Varianten sollten als separate Komponente entstehen, falls das Designsystem sie braucht.
- Ein zukuenftiges `PageSection`/`SectionHeader` kann Titel/Beschreibung kapseln, ohne `Section` als Primitive aufzublaehen.
- Wenn die Spacing-Scale erweitert wird, muessen `spacing.ts`, `styles/tokens/spacing.css` und die `@source inline()`-Abdeckung gemeinsam aktualisiert werden.
- Wenn responsive Custom-Werte fuer `flex`, `basis` oder weitere Grid-Features benoetigt werden, sollten sie ueber statische CSS-Variable-Klassen oder explizite API-Erweiterungen umgesetzt werden, nicht ueber runtime-erzeugte Tailwind-Klassen.

## Offene Fragen oder Restrisiken

- Die CSS-Ausgabe wird durch die `@source inline()`-Abdeckung bewusst um die finite Layout-Utility-Familie erweitert. Das ist deterministisch, sollte aber bei Scale-Erweiterungen bewusst gepflegt werden.
- Nur `homepage` wurde als App-Build verifiziert. Die anderen Apps importieren dieselbe UI-CSS-Struktur und dieselben `@source "../../../packages/ui/src"`-Pfade, wurden aber nicht separat gebaut.

## Verification

Vor der Implementierung:

```bash
pnpm --filter @nezumi/ui typecheck
```

Ergebnis: fehlgeschlagen mit kaputten Imports, case-only Konflikten und doppelten Exports.

RED-Test vor Implementierung:

```bash
pnpm --filter @nezumi/ui test -- src/layout/layout-components.test.tsx --run
```

Ergebnis: fehlgeschlagen, weil `src/components/box.tsx` noch `../atoms/Box` importierte.

Nach der Implementierung:

```bash
pnpm --filter @nezumi/ui test -- --run
pnpm --filter @nezumi/ui typecheck
pnpm --filter homepage build
git diff --check
```

Ergebnis:

- UI Tests: 4 Testdateien, 17 Tests, alle bestanden.
- UI Typecheck: bestanden.
- Homepage Next/Tailwind Build: bestanden.
- Whitespace-Check: bestanden.

## Vorgeschlagene naechste Schritte

1. Optional die anderen drei Apps (`members`, `operations`, `playground`) bauen, falls die Aenderung vor einem Release app-uebergreifend validiert werden soll.
2. Bei Bedarf eine separate Surface/PageSection-Komponente designen, statt diese Semantik in `Box` oder `Section` zu mischen.
