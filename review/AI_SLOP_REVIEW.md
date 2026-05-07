# AI Slop Review — Nezumi Monorepo

**Review-Datum:** 2026-05-06
**Reviewer:** Claude Code (Review Specialist)
**Scope:** `packages/ui/`, `apps/`, Konfigurationen, Design Tokens & Styles
**Dokumentation referenziert:** `docs/react/`, `docs/nextjs/`, `docs/typescript/`, `docs/tailwind-css/`, `docs/shadcn-ui/`, `docs/turbo/`

---

## Executive Summary

| Kategorie | Critical | Warning | Info |
|-----------|----------|---------|------|
| Packages UI | 2 | 10 | 3 |
| Apps | 4 | 9 | 2 |
| Konfiguration | 5 | 7 | 4 |
| Design Tokens & Styles | 2 | 9 | 9 |
| **Gesamt** | **13** | **35** | **18** |

**Gesamtnote: C** — Funktional, aber mit deutlichen AI-Slop-Mustern: ungenutzte Tokens, tote Dateien, inkonsistente Patterns, kaputte Tailwind-v4-Integration und unvollstaendige Build-Konfiguration.

---

## Teil 1: Packages UI (`packages/ui/`)

### Critical

#### 1.1 Phantom-Tokens in `button.css` — nicht konsumiert
- **Datei:** `packages/ui/src/styles/components/button.css`, Zeilen 2–16
- **Problem:** `--button-radius`, `--button-padding-x`, `--button-padding-y`, `--button-font-size`, `--button-font-weight` werden definiert, aber `Button.tsx` hardcoded Tailwind-Utilities (`rounded-md`, `px-16`, `text-sm`, `font-medium`). Aenderungen an den CSS-Tokens haben keinen Effekt.
- **Fix:** Tokens in CVA-Definition einbinden oder Tokens entfernen.

#### 1.2 `input.css` ohne Input-Komponente
- **Datei:** `packages/ui/src/styles/components/input.css`, Zeilen 1–8
- **Problem:** Vollstaendiger Token-Sheet fuer ein Input-Element, aber kein `Input.tsx` existiert. Tote CSS, die ins Bundle gepackt wird.
- **Fix:** `input.css` loeschen oder Input-Komponente implementieren.

### Warning

#### 1.3 `Card` nutzt Arbitrary-Value-Syntax fuer alle Theme-Variablen
- **Datei:** `packages/ui/src/atoms/Card/card.tsx`, Zeilen 7, 10, 22, 40, 52, 62
- **Problem:** `bg-[--card-bg]`, `border-[--card-border]`, `rounded-[--card-radius]` etc. Tailwind v4 erzeugt keine First-Class-Utilities fuer diese Syntax. Inkonsistent mit `Button.tsx`, das `bg-brand` nutzt.
- **Fix:** Tokens in `--color-*`-Namespaces umbenennen oder inline `style` statt Arbitrary-Syntax verwenden.

#### 1.4 Doppelte `cn`-Implementierung
- **Dateien:** `packages/ui/src/lib/utils.ts` (1–6) und `packages/ui/src/layout/utils.ts` (43–47)
- **Problem:** Identische `twMerge(clsx(inputs))`-Funktion zweimal definiert. Layout-Index re-exportiert die Kopie.
- **Fix:** `cn` in `layout/utils.ts` loeschen, stattdessen aus `lib/utils.ts` importieren.

#### 1.5 Copy-Paste-Dimension-Loop in fuenf Layout-Komponenten
- **Dateien:** `Box.tsx` (33–47), `Container.tsx` (68–82), `Flex.tsx` (112–123), `Grid.tsx` (137–148), `Section.tsx` (68–82)
- **Problem:** Identischer `for (const [prefix, val] of ...)`-Block in jeder Layout-Primitive. Wartungsgefahr.
- **Fix:** Einen Helper wie `resolveAllDimensions(props)` in `layout/utils.ts` extrahieren.

#### 1.6 `lucide-react` als ungenutzte Runtime-Dependency
- **Datei:** `packages/ui/package.json`, Zeile 58
- **Problem:** `lucide-react` in `dependencies` gelistet, aber keine Source-Datei importiert es.
- **Fix:** Aus `dependencies` entfernen.

#### 1.7 `Button.test.tsx` umgeht den Test-Stack
- **Datei:** `packages/ui/src/atoms/Button/Button.test.tsx`, Zeilen 1–38
- **Problem:** Manuell `createRoot`, `act`, custom `render()` statt `@testing-library/react`. Verliert Accessibility-Queries und `vitest-axe`.
- **Fix:** Mit `@testing-library/react` umschreiben.

#### 1.8 Auskommentierte Placeholder-Exports in Index-Dateien
- **Dateien:** `atoms/index.ts` (13–18), `molecules/index.ts` (11–15), `organisms/index.ts` (11–15), `templates/index.ts` (12–15), `components/index.ts` (26–44)
- **Problem:** Dutzende `// export { ... }`-Zeilen als Scaffolding eingecheckt, nie aufgeraeumt.
- **Fix:** Alle auskommentierten Exports loeschen.

#### 1.9 `@theme` missbraucht fuer Non-Utility-Variablen
- **Dateien:** `semantic/colors.css` (36–39) und `semantic/spacing.css` (2–4)
- **Problem:** `--focus-ring-width`, `--focus-ring-offset`, `--space-content` etc. liegen in `@theme`-Bloecken, aber sie generieren keine Tailwind-Utilities.
- **Fix:** In `:root` oder dedizierte `@layer` verschieben.

#### 1.10 `card.css` dupliziert semantische Spacing-Tokens
- **Datei:** `packages/ui/src/styles/components/card.css`, Zeilen 8–10
- **Problem:** `--space-content`, `--space-section`, `--space-page` sind bereits in `semantic/spacing.css` definiert.
- **Fix:** Duplikate aus `card.css` entfernen.

#### 1.11 Polymorphe Layout-Typen unterstuetzen keine element-spezifischen Props
- **Datei:** `packages/ui/src/layout/types.ts`, Zeilen 55–91
- **Problem:** `BaseLayoutProps extends HTMLAttributes<HTMLElement>` — `<Box as="a" href="/">` scheitert wegen zu engem Typ.
- **Fix:** Generischen Polymorphismus (`PolymorphicProps<T extends ElementType>`) einfuehren.

#### 1.12 Unerklaerliches `ignoreDeprecations` in `tsconfig`
- **Datei:** `packages/ui/tsconfig.json`, Zeile 25
- **Problem:** `"ignoreDeprecations": "6.0"` obwohl TS 5.9 im Einsatz ist. Sieht nach Copy-Paste von einem Starter-Template aus.
- **Fix:** Entfernen, es sei denn, es gibt eine dokumentierte Begruendung.

### Info

#### 1.13 `Card`-Subkomponenten ohne `displayName`
- **Datei:** `packages/ui/src/atoms/Card/card.tsx`, Zeilen 4, 18, 28, 38, 48, 58
- **Problem:** `Card`, `CardHeader`, `CardTitle`, etc. haben keine `displayName`-Zuweisungen. Inkonsistent mit allen anderen Komponenten im Paket.
- **Fix:** `displayName` hinzufuegen oder ueberall entfernen.

#### 1.14 `components.json` enthaelt Tailwind-v3-Artefakt
- **Datei:** `packages/ui/components.json`, Zeile 10
- **Problem:** `"cssVariables": true` ist ein shadcn/ui-v3-Flag. In Tailwind v4 sind alle Theme-Variablen standardmaessig CSS-Variablen.
- **Fix:** `"cssVariables": true` entfernen.

#### 1.15 Inkonsistente Null-Check-Stil in Responsive-Helpers
- **Datei:** `packages/ui/src/layout/Flex.tsx`, Zeilen 44, 66–71
- **Problem:** `getWrapClass` nutzt `if (wrap.initial)` (falsy), `getResponsiveDirection` nutzt `if (value.initial != null)`. Inkonsistent.
- **Fix:** Ueberall auf `!= null` standardisieren.

---

## Teil 2: Apps (`apps/`)

### Critical

#### 2.1 OG-Image nutzt Generic-Tailwind-Farben statt Nezumi-Tokens
- **Datei:** `apps/homepage/app/opengraph-image.tsx`, Zeilen 18–19, 34
- **Problem:** `#0f172a`, `#1e3a5f`, `#2563eb`, `#f8fafc` sind Tailwind-Default-Farben. Nezumi-Palette nutzt `#121014`, `#1a181c`, `#47585c`, `#f5f4f1`.
- **Fix:** Nezumi-Farbtokens verwenden oder ins SVG injizieren.

#### 2.2 `metadataBase` fehlt in 3 von 4 Apps
- **Dateien:** `apps/members/app/layout.tsx` (5), `apps/operations/app/layout.tsx` (5), `apps/playground/app/layout.tsx` (5)
- **Problem:** Nur `homepage` definiert `metadataBase`. Next.js 15/16 benoetigt dies fuer relative Metadata-URLs.
- **Fix:** In jeder App `metadataBase` hinzufuegen.

#### 2.3 Operations-Konsole nutzt `<div>`-Soup fuer tabellarische Daten
- **Datei:** `apps/operations/app/(console)/console/page.tsx`, Zeilen 34–63
- **Problem:** Datengrid aus verschachtelten `<div>`-Elementen ohne `role="table"`, `role="row"`, `role="cell"`.
- **Fix:** Semantisches `<table>`-Markup oder ARIA-Roles hinzufuegen.

#### 2.4 Fake-Interaktive Suchbar als Landmark deklariert
- **Datei:** `apps/operations/components/command-bar.tsx`, Zeilen 1–11
- **Problem:** Statisches `<div role="search">` ohne `<input>`, `<form>` oder interaktives Element. Screenreader zeigen es als Search-Landmark an, aber es ist nicht bedienbar.
- **Fix:** Echte `<input>` in `<form role="search">` einbauen oder `role="search"` entfernen.

### Warning

#### 2.5 Deutsche Umlaute durch ASCII-Ersatz ersetzt (AI-Slop-Signatur)
- **Dateien:** `apps/operations/app/(console)/console/page.tsx` (28, 29), `apps/operations/app/global-error.tsx` (40)
- **Problem:** `Ueberblick` statt `Ueberblick`, `Laeufe` statt `Laeufe`, `verfuegbar` statt `verfuegbar`. Klassisches Zeichen fuer AI-generierten Text ohne Unicode-Unterstuetzung.
- **Fix:** Korrekte UTF-8-Umlaute einsetzen.

#### 2.6 Operations-Konsole ohne `<main>`-Landmark
- **Dateien:** `apps/operations/components/operations-shell.tsx` (4–19), `apps/operations/app/(console)/console/page.tsx` (26)
- **Problem:** Kein `<main>`-Element im Operations-App-Baum.
- **Fix:** Outer-Container auf `<main>` aendern oder `{children}` in `<main>` wrappen.

#### 2.7 Placeholder-Toolbar-Buttons nicht disabled
- **Datei:** `apps/operations/components/data-view-toolbar.tsx`, Zeilen 4–16
- **Problem:** Buttons "Filter" und "Spalten" haben kein `onClick`, aber auch kein `disabled` oder `aria-disabled`.
- **Fix:** `disabled` oder `aria-disabled="true"` hinzufuegen.

#### 2.8 Redundante `antialiased`-Tailwind-Klasse in einigen Apps
- **Dateien:** `apps/members/app/layout.tsx` (17), `apps/operations/app/layout.tsx` (13)
- **Problem:** `antialiased` auf `<body>`, aber `packages/ui/src/styles/design-tokens.css` setzt bereits `-webkit-font-smoothing: antialiased` global auf `html` (71–74).
- **Fix:** `antialiased` aus App-Layouts entfernen.

#### 2.9 Inkonsistente Layout-Shell-Patterns ueber Apps
- **Dateien:** Alle `apps/*/app/layout.tsx`
- **Problem:**
  - `homepage`: hat `metadataBase`, kein body-class
  - `members`: kein `metadataBase`, body hat `min-h-screen bg-surface text-text antialiased`
  - `operations`: kein `metadataBase`, body hat `min-h-screen bg-surface text-text antialiased`
  - `playground`: kein `metadataBase`, kein body-class
- **Fix:** Gemeinsame `RootLayout`-Shell in `@nezumi/ui/layout` erstellen oder Konvention dokumentieren.

#### 2.10 `global-error.tsx` fehlt in Members-App
- **Datei:** `apps/members/app/` (Datei fehlt)
- **Problem:** `operations` hat `error.tsx` und `global-error.tsx`. `members` nur `error.tsx`. Next.js faellt auf generische Fehlerseite zurueck, wenn das Root-Layout wirft.
- **Fix:** `global-error.tsx` zu `members` hinzufuegen.

#### 2.11 Inline-Arbitrary Tailwind-Grid-Value
- **Datei:** `apps/operations/app/(console)/console/page.tsx`, Zeilen 38 und 48
- **Problem:** `grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)_auto]` ist ein Arbitrary-Value, der das Design-System umgeht. Zudem dupliziert.
- **Fix:** Custom Utility in `@theme` oder App-CSS definieren.

#### 2.12 Fehlende explizite Return-Typen in Page-Komponenten
- **Dateien:** `apps/homepage/app/page.tsx`, `apps/members/app/(account)/page.tsx`, `apps/operations/app/(console)/console/page.tsx`, `apps/playground/app/page.tsx`, `apps/operations/app/error.tsx`
- **Problem:** Keine expliziten `: ReactNode` oder `: JSX.Element`-Annotationen.
- **Fix:** Explizite Return-Typen hinzufuegen.

### Info

#### 2.13 Minimale Loading-Placeholder
- **Dateien:** `apps/members/app/loading.tsx`, `apps/operations/app/loading.tsx`
- **Problem:** Nur `<div>Laden ...</div>` ohne Skeleton oder Layout-Erhaltung.
- **Fix:** Mit Skeleton-Screens ersetzen, die die Shell-Struktur spiegeln.

#### 2.14 Root-Redirect in Operations nur dynamisch
- **Datei:** `apps/operations/app/page.tsx`
- **Problem:** `redirect("/console")` im Server Component erzwingt dynamisches Rendering. Static redirect in `next.config.ts` waere effizienter.
- **Fix:** Redirect in `next.config.ts` verschieben.

---

## Teil 3: Konfiguration

### Critical

#### 3.1 `tsup.config.ts` baut nur 3 Dateien, Quellbaum hat 20+
- **Datei:** `packages/ui/tsup.config.ts`, Zeilen 4–8
- **Problem:** `entry` deklariert nur `components/button`, `layout/index`, `lib/utils`. `atoms/Button/`, `atoms/Card/`, `components/index.ts`, `molecules/`, `organisms/`, `templates/`, 7 Layout-Subkomponenten werden nicht gebaut.
- **Fix:** `entry` dynamisch aus `src/**/index.ts` generieren oder alle Public Entry Points explizit listen.

#### 3.2 `package.json` `exports` ist unvollstaendig
- **Datei:** `packages/ui/package.json`, Zeilen 16–41
- **Problem:** `exports` hat nur `./components/button`, `./layout`, `./lib/utils`. `./atoms/*`, `./components`, `./molecules/*`, `./organisms/*`, `./templates/*` fehlen.
- **Fix:** Conditional exports fuer alle Public Subpaths hinzufuegen.

#### 3.3 App-`tsconfig.json` nutzt `target: ES2017`
- **Dateien:** `apps/homepage/tsconfig.json` (3), `apps/members/tsconfig.json` (3), `apps/operations/tsconfig.json` (3), `apps/playground/tsconfig.json` (3)
- **Problem:** Next.js 16 benoetigt Node 20.9+ und moderne Features. ES2017 erzwingt Downleveling.
- **Fix:** `target` auf `ES2022` aendern.

#### 3.4 `next-env.d.ts` enthaelt nicht-standard `import`-Statements
- **Dateien:** `apps/*/next-env.d.ts`, Zeile 3
- **Problem:** `import "./.next/types/routes.d.ts"` statt `/// <reference types="..." />`. Next.js generiert diese Datei automatisch und ueberschreibt sie.
- **Fix:** Auf Standard-Triple-Slash-Direktiven zuruecksetzen. `next-env.d.ts` zu `.gitignore` hinzufuegen.

#### 3.5 `next-env.d.ts` nicht in `.gitignore`
- **Datei:** `.gitignore`
- **Problem:** Next.js empfiehlt explizit, `next-env.d.ts` in `.gitignore` aufzunehmen. Nicht vorhanden → Merge-Konflikte.
- **Fix:** `next-env.d.ts` zu `.gitignore` hinzufuegen.

### Warning

#### 3.6 `packages/ui/tsconfig.json` hat `emitDeclarationOnly: false` mit Bundler-Build
- **Datei:** `packages/ui/tsconfig.json`, Zeile 11
- **Problem:** `emitDeclarationOnly: false` und `declaration: true`. `tsup` baut, `typecheck` nutzt `--noEmit`. Accidental `tsc` ohne `--noEmit` verschmutzt `src/` mit `.js`-Dateien.
- **Fix:** `emitDeclarationOnly: true` oder `noEmit: true` setzen.

#### 3.7 `packages/ui/tsconfig.json` nutzt `ignoreDeprecations: "6.0"`
- **Datei:** `packages/ui/tsconfig.json`, Zeile 25
- **Problem:** TS 6.0 ist installiert. Das Flag unterdrueckt Warnungen fuer Features, die moeglicherweise bereits entfernt sind.
- **Fix:** `ignoreDeprecations` entfernen.

#### 3.8 `turbo.json` fehlen `test`- und `lint`-Tasks
- **Datei:** `turbo.json`
- **Problem:** Nur `build`, `dev`, `typecheck` definiert. `turbo test` oder `turbo lint` schlaegt fehl.
- **Fix:** `test` und `lint` Tasks hinzufuegen.

#### 3.9 Root-`package.json` fehlen `test`- und `lint`-Scripts
- **Datei:** `package.json`, Zeilen 9–13
- **Problem:** Keine Scripts `test`, `lint`, `format`, `ci`.
- **Fix:** `"test": "turbo test"`, `"lint": "turbo lint"` etc. hinzufuegen.

#### 3.10 Alle App-`tsconfig.json` setzen `skipLibCheck: true`
- **Dateien:** Alle `apps/*/tsconfig.json`, Zeile 10
- **Problem:** Verbreitetes AI-Slop-Muster. Unterdrueckt Type-Fehler in `node_modules`, kann echte Inkompatibilitaeten verschleiern.
- **Fix:** `skipLibCheck: false` setzen und echte Probleme beheben.

#### 3.11 Keine ESLint-Konfiguration im gesamten Monorepo
- **Dateien:** Root, `apps/*`, `packages/*`
- **Problem:** Kein `eslint.config.mjs`, `.eslintrc.*` oder `eslint`-Dependency. Next.js 16 empfiehlt ESLint.
- **Fix:** `eslint` und `@next/eslint-plugin-next` hinzufuegen, `eslint.config.mjs` erstellen.

#### 3.12 `packages/ui` nutzt monolithisches `radix-ui`-Paket statt Scoped Primitives
- **Datei:** `packages/ui/package.json`, Zeile 59
- **Problem:** `"radix-ui": "^1.4.3"` bundlet alle Primitives. Standard-shadcn nutzt einzelne `@radix-ui/react-*` fuer besseres Tree-Shaking.
- **Fix:** Auf einzelne `@radix-ui/react-*`-Pakete umstellen.

### Info

#### 3.13 App-`tsconfig.json`-Dateien sind identisch
- **Dateien:** `apps/*/tsconfig.json`
- **Problem:** Alle vier Configs sind Byte-fuer-Byte gleich. Monorepo-Standard: Shared Base Config.
- **Fix:** `packages/tsconfig` mit `nextjs.json` erstellen und via `extends` nutzen.

#### 3.14 App-`next.config.ts`-Dateien sind identisch
- **Dateien:** `apps/*/next.config.ts`
- **Problem:** Alle vier Configs enthalten nur `transpilePackages: ["@nezumi/ui"]`.
- **Fix:** Gemeinsame `next.config.base.ts` in Config-Paket erstellen.

#### 3.15 Fehlende `.nvmrc` oder `.node-version`
- **Datei:** Root
- **Problem:** `package.json` spezifiziert `"node": "^24.0.0"`, aber keine `.nvmrc`.
- **Fix:** `.nvmrc` mit `24` erstellen.

#### 3.16 `pnpm-workspace.yaml`-Kommentar zu `peerDependencies` wird korrekt befolgt
- **Datei:** `pnpm-workspace.yaml`, Zeilen 6–7
- **Bemerkung:** **Positiv.** Publishable Packages nutzen konkrete Semver-Ranges statt `catalog:` in `peerDependencies`.

---

## Teil 4: Design Tokens & Styles

### Critical

#### 4.1 Fehlendes `@custom-variant dark` zerstoert `dark:`-Utilities
- **Dateien:** `apps/*/app/globals.css`, `packages/ui/src/styles/global.css`
- **Problem:** Dark Mode wird ueber manuelle `.dark`-Klasse auf `html` geschaltet, aber `@custom-variant dark (&:where(.dark, .dark *))` fehlt. Tailwind v4 nutzt `prefers-color-scheme` statt der `.dark`-Klasse.
- **Fix:** `@custom-variant dark (&:where(.dark, .dark *))` nach `@import "tailwindcss"` in jedem App-Entry und `global.css` hinzufuegen.

#### 4.2 Komponenten-spezifische Tokens innerhalb `@theme` verschmutzen Utility-Namespace
- **Datei:** `packages/ui/src/styles/components/button.css`, Zeilen 9–16
- **Problem:** `--color-button-brand-hover`, `--color-button-brand-active` etc. in `@theme` definieren generiert `bg-button-brand-hover` und `text-button-brand-hover` als Public Utilities.
- **Fix:** Aus `@theme` verschieben oder ohne `--color-*`-Praefix benennen.

### Warning

#### 4.3 Inkonsistente Primitive-Farben-Namen
- **Datei:** `packages/ui/src/styles/tokens/colors.css`, Zeilen 27–28
- **Problem:** `--color-nezumi-d-destructive` und `--color-nezumi-d-error-dark` nutzen unerklaerbares `d-`-Praefix. Alle anderen Dark-Tokens nutzen `dark-`.
- **Fix:** In `--color-nezumi-dark-destructive` und `--color-nezumi-dark-error` umbenennen.

#### 4.4 Redundante semantische Spacing-Definitionen in `card.css`
- **Datei:** `packages/ui/src/styles/components/card.css`, Zeilen 7–9
- **Problem:** `--space-content`, `--space-section`, `--space-page` bereits in `semantic/spacing.css` definiert.
- **Fix:** Aus `card.css` entfernen.

#### 4.5 Light/Dark-Komponentenlogik ueber Dateien verteilt
- **Dateien:** `packages/ui/src/styles/components/button.css` (9–16) und `packages/ui/src/styles/design-tokens.css` (50–57)
- **Problem:** Button-Hover/Active-Farbwerte in `button.css` fuer Light, Overrides in `design-tokens.css` fuer Dark.
- **Fix:** Dark-Overrides mit der Komponente zusammenfuehren (`.dark`-Block in `button.css` oder `@variant dark`).

#### 4.6 Non-Color-Tokens in `semantic/colors.css`
- **Datei:** `packages/ui/src/styles/semantic/colors.css`, Zeilen 36–37
- **Problem:** `--focus-ring-width: 1px` und `--focus-ring-offset: 2px` sind keine Farben.
- **Fix:** In `tokens/effects.css` oder `semantic/focus.css` verschieben.

#### 4.7 Hardcoded Font-Stack statt Token
- **Datei:** `packages/ui/src/styles/design-tokens.css`, Zeilen 87–88
- **Problem:** `body` hardcoded einen System-Font-Stack, aber `--font-sans` existiert nie.
- **Fix:** `--font-sans` in `tokens/typography.css` definieren und `font-family: var(--font-sans)` setzen.

#### 4.8 No-Op OKLCH Relative-Color-Syntax
- **Datei:** `packages/ui/src/styles/tokens/colors.css`, Zeilen 3–28
- **Problem:** `oklch(from #47585c l c h)` kopiert exakt die berechneten Komponenten und produziert identische Farbe. Der Kommentar "Stored as OKLCH via relative color" deutet auf Missverstaendnis hin.
- **Fix:** Entweder Raw-Hex-Werte verwenden oder echte OKLCH-Koordinaten vorberechnen.

#### 4.9 `@source` scannt gebaute `dist`-Artefakte
- **Dateien:** `apps/*/app/globals.css`, Zeile 5
- **Problem:** `@source "../../../packages/ui/dist/**/*.{js,mjs}"` scannt kompilierte Ausgabe. Redundant weil `src` bereits gesourced.
- **Fix:** `dist`-`@source`-Zeile entfernen.

### Info

#### 4.10 Hardcoded `font-size: 16px` auf `html`
- **Datei:** `packages/ui/src/styles/design-tokens.css`, Zeile 75
- **Problem:** Verhindert Benutzer-Skalierung ueber Browser-Einstellungen.
- **Fix:** `font-size: 100%` verwenden.

#### 4.11 Hardcoded Scrollbar-Dimensionen
- **Datei:** `packages/ui/src/styles/design-tokens.css`, Zeilen 150–151
- **Problem:** `width: 8px; height: 8px;` sollte Spacing-System referenzieren.
- **Fix:** `var(--spacing-8)` verwenden.

#### 4.12 Hardcoded Input-Border-Width
- **Datei:** `packages/ui/src/styles/components/input.css`, Zeile 3
- **Problem:** `--input-border-width: 1px;` ist Raw-Pixel.
- **Fix:** `--spacing-1` (0.0625rem = 1px) oder `--border-width`-Token verwenden.

#### 4.13 Ungenutzter Color-Token
- **Datei:** `packages/ui/src/styles/tokens/colors.css`, Zeile 17
- **Problem:** `--color-nezumi-chigusa` definiert, aber nirgends referenziert.
- **Fix:** Entfernen oder Zweck dokumentieren.

#### 4.14 Redundanter Global-Reset in `@layer base`
- **Datei:** `packages/ui/src/styles/design-tokens.css`, Zeilen 63–69
- **Problem:** `*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }` dupliziert Tailwind v4-Preflight.
- **Fix:** Entfernen und auf eingebautes Preflight vertrauen.

#### 4.15 Shadows ohne Dark-Mode-Varianten
- **Datei:** `packages/ui/src/styles/tokens/shadows.css`, Zeilen 2–7
- **Problem:** Alle Shadows nutzen `rgb(0 0 0 / ...)`, keine Dark-Mode-Alternativen.
- **Fix:** Shadow-Farben ueber semantische Tokens definieren oder `.dark`-Overrides.

#### 4.16 Identische `globals.css` in jeder App
- **Dateien:** `apps/*/app/globals.css`
- **Problem:** Alle vier App-Entries sind Byte-fuer-Byte gleich.
- **Fix:** Shared Entry Point aus `packages/ui` exportieren (z.B. `@nezumi/ui/base.css`).

#### 4.17 Inkorrekter `@source`-Kommentar
- **Dateien:** `apps/*/app/globals.css`, Zeile 3
- **Problem:** `../../../packages/ui = repo root` ist falsch — es zeigt auf `packages/ui`.
- **Fix:** Kommentar korrigieren.

#### 4.18 Spacing-Token-Namen weichen von Tailwind-Konvention ab
- **Datei:** `packages/ui/src/styles/tokens/spacing.css`
- **Problem:** `--spacing-4` = 4px statt Tailwind-Default 1rem. Fussangel fuer Entwickler.
- **Fix:** In `--spacing-px-4` umbenennen oder Custom Scale prominent dokumentieren.

---

## Teil 5: Positive Beobachtungen

1. **Zentralisierte Token-Architektur:** `@import`-Komposition von `design-tokens.css` aus Primitive-, Semantic- und Component-Layern ist solide.
2. **Semantische Abstraktion:** Farben sauber in Primitive (`tokens/colors.css`) und Semantic Aliases (`semantic/colors.css`) getrennt.
3. **`color-mix` fuer abgeleitete Surfaces:** Moderner, perceptuell uniformer Ansatz in `semantic/colors.css`.
4. **Konsistente App-Konfiguration:** Alle Apps importieren dieselben Design-Tokens und nutzen Tailwind v4 `@import "tailwindcss"`.
5. **pnpm-Catalog-Nutzung:** Alle Apps und `packages/ui` nutzen `catalog:` fuer Dependencies.
6. **Korrekte Tailwind-v4-PostCSS-Integration:** `@tailwindcss/postcss` in allen `postcss.config.mjs`.
7. **Modernes Monorepo-Wiring:** Apps deklarieren korrekt `@nezumi/ui: "workspace:*"` und `transpilePackages: ["@nezumi/ui"]`.
8. **Global-Error-Pattern in Operations:** `operations/app/global-error.tsx` nutzt korrekt inline-Styles als Fallback, da CSS-Imports im Root-Layout-Fehlerfall nicht verfuegbar sind.

---

## Empfohlene Priorisierung

### Sofort (Critical)
1. `tsup.config.ts` und `package.json` `exports` reparieren (Packages UI unbrauchbar)
2. `@custom-variant dark` in allen App-Entries ergaenzen (Dark Mode kaputt)
3. `metadataBase` in allen Apps ergaenzen (SEO-URLs broken)
4. `next-env.d.ts` korrigieren und in `.gitignore` aufnehmen
5. App-`tsconfig.json` auf `ES2022` aktualisieren

### Kurzfristig (Warning)
6. Design-System-Farben in OG-Image korrigieren
7. Redundante `cn`-Implementierung zusammenfuehren
8. `Card`-Arbitrary-Values auf Token-Utilities umstellen
9. `lucide-react` entfernen
10. `Button.test.tsx` mit `@testing-library/react` umschreiben
11. Semantisches HTML in Operations-Konsole korrigieren
12. Umlaute in Operations-App fixen
13. `turbo.json` und Root-`package.json` um `test`/`lint` erweitern
14. ESLint einfuehren

### Mittelfristig (Info)
15. Layout-Shell ueber Apps standardisieren
16. Shared `globals.css` aus `packages/ui` exportieren
17. `displayName` in Card-Subkomponenten vereinheitlichen
18. `.nvmrc` hinzufuegen
19. Ausgemusterte `input.css` entfernen
20. Spacing-Token-Namen dokumentieren oder umbenennen

---

*Dieses Dokument wurde durch systematische Code-Review mit Vergleich gegen offizielle Framework-Dokumentation erstellt. Die `docs/nezumi-ui/`-Dokumentation wurde wie angefordert ausgeschlossen.*
