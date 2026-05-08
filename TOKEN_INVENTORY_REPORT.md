# Token Inventory und Refactor Report

## Aufgabenstellung

Die externe Mavik-Labs-Seite zu Tailwind-v4-Design-Tokens wurde gelesen. Danach wurden alle Token-Definitionen und Token-Konsumstellen in `packages/ui` und `apps/*` inventarisiert. Anschliessend wurden konkrete Findings sofort gefixt, mit Fokus auf `packages/ui`.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `DESIGN.md`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/172-theme.mdx`
- `docs/tailwind-css/084-functions-and-directives.mdx`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/tailwind-css/052-dark-mode.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`

## Gelesene externe Quellen

- [Design Tokens That Scale in 2026 (Tailwind v4 + CSS Variables)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026/) - gelesen am 2026-05-08. Relevante Vorgaben: CSS-first mit `@theme`, drei Layer Primitive/Semantic/Component, Component Tokens referenzieren Semantic Tokens, Semantic Tokens referenzieren Primitive, Main-Import zuerst Token-Dateien, dann Semantic, dann Component.

## Abgeleiteter SOLL-Zustand

- Tailwind-v4-Utilities werden ueber CSS-First `@theme`-Variablen erzeugt.
- Layer 1: Primitive Tokens liegen in `packages/ui/src/styles/tokens/*.css` und enthalten Nezumi-Palette, Spacing, Typography, Motion, Radius, Shadows, Breakpoints.
- Layer 2: Semantic Tokens liegen in `packages/ui/src/styles/semantic/*.css` und referenzieren ausschliesslich Primitive oder andere Semantic Tokens.
- Layer 3: Component Tokens liegen in `packages/ui/src/styles/components/*.css` und referenzieren Semantic/Primitive Tokens, nicht App-Code.
- Komponenten konsumieren Farben ueber Semantic oder Component Tokens, nicht ueber Tailwind-Default-Paletten oder Hexwerte.
- `apps/*` importieren `@packages/ui/design-tokens.css` und konsumieren fuer Farben Semantic Utilities. Primitive Layout-/Typography-Utilities sind tolerierbar, muessen aber aus der Nezumi-Skala stammen.

## Analysierte Dateien

- Alle CSS-Dateien in `packages/ui/src/styles/**/*.css`
- Alle relevanten Komponenten, Layout-Primitives und Tests in `packages/ui/src/**/*.ts(x)`
- Alle App-Router-Dateien und `globals.css` in `apps/*`, ohne `.next/`

## Findings nach Schweregrad

### Hoch

- `apps/homepage`, `apps/members` und `apps/operations` nutzten `px-6`, das nicht zur dokumentierten Nezumi-Spacing-Skala gehoert. Gefixt auf `px-24`; `gap-4` wurde auf `gap-16` normalisiert.

### Mittel

- `packages/ui/src/atoms/Button/Button.tsx` nutzte `rounded-md` fuer Buttons, obwohl `DESIGN.md` 4px Button-Radius fordert. Gefixt durch Component Token `--radius-button` und Utility `rounded-button`.
- Button-Paddings lagen unter der `DESIGN.md`-Size-Tabelle. Gefixt durch Component Spacing Tokens `--spacing-button-*-x` und angepasste Size-Klassen.
- Button-Strukturwerte waren Primitive-Utilities direkt im Component-Code. Refactored auf Component Tokens fuer Radius, Gap, Height, X-Padding und Font Weight.

### Niedrig

- `design-tokens.css` hatte `@source` vor den lokalen `@import`-Regeln und duplizierte Button-Component-Token im Dark-Block. Gefixt: Import-Reihenfolge folgt jetzt der empfohlenen Token-Struktur; Button-Component-Token bleiben in `components/button.css` und reagieren ueber ihre Semantic-Referenzen automatisch auf Dark-Mode-Semantik.
- `focus-visible:ring-1` und `focus-visible:ring-offset-2` bleiben als konkrete Tailwind-Klassen im Button. Die Werte entsprechen aktuell `--focus-ring-width` und `--focus-ring-offset`, sind aber noch keine direct Component Tokens.
- `--nz-grid-*` Custom Properties in `Grid` sind keine Design Tokens, sondern runtime Layout-Variablen fuer arbitrary grid templates. Sie bleiben als bewusstes Implementierungsdetail markiert.

## Umgesetzte Korrekturen

- `packages/ui/src/styles/design-tokens.css`: Imports vor `@source`, Component-Dark-Duplikate entfernt.
- `packages/ui/src/styles/components/button.css`: Button Component Tokens fuer Radius, Gap, Hoehen, X-Paddings, Font Weight und interaktive Farben erweitert.
- `packages/ui/src/atoms/Button/Button.tsx`: Button nutzt Component Tokens fuer Struktur und angepasste DESIGN.md-Size-Werte.
- `packages/ui/src/atoms/Button/Button.test.tsx` und `packages/ui/src/styles/design-tokens.test.ts`: Tests an neue Tokenstruktur angepasst.
- `apps/homepage/app/page.tsx`, `apps/members/app/page.tsx`, `apps/operations/app/page.tsx`: nicht-Nezumi `px-6` entfernt.

## Token-Definitionen: Primitive/Base

| Token | Pfad | Wert |
| --- | --- | --- |
| --breakpoint-* | packages/ui/src/styles/tokens/breakpoints.css:2 | initial |
| --breakpoint-md | packages/ui/src/styles/tokens/breakpoints.css:3 | 48rem |
| --breakpoint-lg | packages/ui/src/styles/tokens/breakpoints.css:4 | 64rem |
| --color-* | packages/ui/src/styles/tokens/colors.css:3 | initial |
| --color-nezumi-sabi | packages/ui/src/styles/tokens/colors.css:5 | oklch(from #47585c l c h) |
| --color-nezumi-minato | packages/ui/src/styles/tokens/colors.css:6 | oklch(from #80989b l c h) |
| --color-nezumi-ume | packages/ui/src/styles/tokens/colors.css:7 | oklch(from #c099a0 l c h) |
| --color-nezumi-sakura | packages/ui/src/styles/tokens/colors.css:8 | oklch(from #e9dfe5 l c h) |
| --color-nezumi-fuji | packages/ui/src/styles/tokens/colors.css:9 | oklch(from #a6a5c4 l c h) |
| --color-nezumi-kinu | packages/ui/src/styles/tokens/colors.css:10 | oklch(from #dddcd6 l c h) |
| --color-nezumi-genji | packages/ui/src/styles/tokens/colors.css:11 | oklch(from #888084 l c h) |
| --color-nezumi-koi | packages/ui/src/styles/tokens/colors.css:12 | oklch(from #4f455c l c h) |
| --color-nezumi-bg | packages/ui/src/styles/tokens/colors.css:13 | oklch(from #f5f4f1 l c h) |
| --color-nezumi-akatsuki | packages/ui/src/styles/tokens/colors.css:14 | oklch(from #d3cfd9 l c h) |
| --color-nezumi-fukagawa | packages/ui/src/styles/tokens/colors.css:15 | oklch(from #97a791 l c h) |
| --color-nezumi-fukagawa-deep | packages/ui/src/styles/tokens/colors.css:16 | oklch(from #4d6e47 l c h) |
| --color-nezumi-cha | packages/ui/src/styles/tokens/colors.css:17 | oklch(from #a99e93 l c h) |
| --color-nezumi-budo | packages/ui/src/styles/tokens/colors.css:18 | oklch(from #705b67 l c h) |
| --color-nezumi-chigusa | packages/ui/src/styles/tokens/colors.css:19 | oklch(from #bed3ca l c h) |
| --color-nezumi-paper | packages/ui/src/styles/tokens/colors.css:20 | oklch(from #faf9f5 l c h) |
| --color-nezumi-line | packages/ui/src/styles/tokens/colors.css:21 | oklch(from #d4d3cf l c h) |
| --color-nezumi-snow | packages/ui/src/styles/tokens/colors.css:22 | oklch(from #ffffff l c h) |
| --color-nezumi-dark-bg | packages/ui/src/styles/tokens/colors.css:23 | oklch(from #121014 l c h) |
| --color-nezumi-dark-raised | packages/ui/src/styles/tokens/colors.css:24 | oklch(from #1a181c l c h) |
| --color-nezumi-dark-subtle | packages/ui/src/styles/tokens/colors.css:25 | oklch(from #242226 l c h) |
| --color-nezumi-dark-muted | packages/ui/src/styles/tokens/colors.css:26 | oklch(from #2a272b l c h) |
| --color-nezumi-dark-line | packages/ui/src/styles/tokens/colors.css:27 | oklch(from #3a383c l c h) |
| --color-nezumi-dark-secondary-bg | packages/ui/src/styles/tokens/colors.css:28 | oklch(from #4a3d42 l c h) |
| --color-nezumi-d-destructive | packages/ui/src/styles/tokens/colors.css:29 | oklch(from #9c5246 l c h) |
| --color-nezumi-d-error-dark | packages/ui/src/styles/tokens/colors.css:30 | oklch(from #e07a6b l c h) |
| --duration-instant | packages/ui/src/styles/tokens/motion.css:2 | 0ms |
| --duration-fast | packages/ui/src/styles/tokens/motion.css:3 | 100ms |
| --duration-normal | packages/ui/src/styles/tokens/motion.css:4 | 200ms |
| --duration-slow | packages/ui/src/styles/tokens/motion.css:5 | 300ms |
| --duration-slower | packages/ui/src/styles/tokens/motion.css:6 | 500ms |
| --duration-lazy | packages/ui/src/styles/tokens/motion.css:7 | 800ms |
| --ease-linear | packages/ui/src/styles/tokens/motion.css:9 | linear |
| --ease-in | packages/ui/src/styles/tokens/motion.css:10 | cubic-bezier(0.4, 0, 1, 1) |
| --ease-out | packages/ui/src/styles/tokens/motion.css:11 | cubic-bezier(0, 0, 0.2, 1) |
| --ease-in-out | packages/ui/src/styles/tokens/motion.css:12 | cubic-bezier(0.4, 0, 0.2, 1) |
| --ease-bounce | packages/ui/src/styles/tokens/motion.css:13 | cubic-bezier(0.34, 1.56, 0.64, 1) |
| --ease-spring | packages/ui/src/styles/tokens/motion.css:14 | cubic-bezier(0.175, 0.885, 0.32, 1.275) |
| --stagger-fast | packages/ui/src/styles/tokens/motion.css:16 | 30ms |
| --stagger-base | packages/ui/src/styles/tokens/motion.css:17 | 50ms |
| --stagger-slow | packages/ui/src/styles/tokens/motion.css:18 | 100ms |
| --radius-none | packages/ui/src/styles/tokens/radius.css:2 | 0 |
| --radius-sm | packages/ui/src/styles/tokens/radius.css:3 | 0.25rem |
| --radius-md | packages/ui/src/styles/tokens/radius.css:4 | 0.375rem |
| --radius-lg | packages/ui/src/styles/tokens/radius.css:5 | 0.5rem |
| --radius-xl | packages/ui/src/styles/tokens/radius.css:6 | 0.75rem |
| --radius-2xl | packages/ui/src/styles/tokens/radius.css:7 | 1rem |
| --radius-3xl | packages/ui/src/styles/tokens/radius.css:8 | 1.5rem |
| --radius-full | packages/ui/src/styles/tokens/radius.css:9 | 9999px |
| --shadow-sm | packages/ui/src/styles/tokens/shadows.css:2 | 0 1px 2px 0 rgb(0 0 0 / 0.05) |
| --shadow-md | packages/ui/src/styles/tokens/shadows.css:3 | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) |
| --shadow-lg | packages/ui/src/styles/tokens/shadows.css:4 | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) |
| --shadow-xl | packages/ui/src/styles/tokens/shadows.css:5 | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) |
| --shadow-2xl | packages/ui/src/styles/tokens/shadows.css:6 | 0 25px 50px -12px rgb(0 0 0 / 0.25) |
| --shadow-inner | packages/ui/src/styles/tokens/shadows.css:7 | inset 0 2px 4px 0 rgb(0 0 0 / 0.05) |
| --shadow-none | packages/ui/src/styles/tokens/shadows.css:8 | 0 0 #0000 |
| --spacing | packages/ui/src/styles/tokens/spacing.css:2 | initial |
| --spacing-0 | packages/ui/src/styles/tokens/spacing.css:3 | 0rem |
| --spacing-1 | packages/ui/src/styles/tokens/spacing.css:4 | 0.0625rem |
| --spacing-2 | packages/ui/src/styles/tokens/spacing.css:5 | 0.125rem |
| --spacing-4 | packages/ui/src/styles/tokens/spacing.css:6 | 0.25rem |
| --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 | 0.5rem |
| --spacing-12 | packages/ui/src/styles/tokens/spacing.css:8 | 0.75rem |
| --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 | 1rem |
| --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 | 1.5rem |
| --spacing-32 | packages/ui/src/styles/tokens/spacing.css:11 | 2rem |
| --spacing-40 | packages/ui/src/styles/tokens/spacing.css:12 | 2.5rem |
| --spacing-48 | packages/ui/src/styles/tokens/spacing.css:13 | 3rem |
| --spacing-56 | packages/ui/src/styles/tokens/spacing.css:14 | 3.5rem |
| --spacing-64 | packages/ui/src/styles/tokens/spacing.css:15 | 4rem |
| --spacing-80 | packages/ui/src/styles/tokens/spacing.css:16 | 5rem |
| --spacing-96 | packages/ui/src/styles/tokens/spacing.css:17 | 6rem |
| --spacing-112 | packages/ui/src/styles/tokens/spacing.css:18 | 7rem |
| --spacing-128 | packages/ui/src/styles/tokens/spacing.css:19 | 8rem |
| --font-sans | packages/ui/src/styles/tokens/typography.css:2 | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif |
| --font-mono | packages/ui/src/styles/tokens/typography.css:4 | "JetBrains Mono", "Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace |
| --text-xs | packages/ui/src/styles/tokens/typography.css:7 | 0.75rem |
| --text-sm | packages/ui/src/styles/tokens/typography.css:8 | 0.875rem |
| --text-base | packages/ui/src/styles/tokens/typography.css:9 | 1rem |
| --text-lg | packages/ui/src/styles/tokens/typography.css:10 | 1.125rem |
| --text-xl | packages/ui/src/styles/tokens/typography.css:11 | 1.25rem |
| --text-2xl | packages/ui/src/styles/tokens/typography.css:12 | 1.5rem |
| --text-3xl | packages/ui/src/styles/tokens/typography.css:13 | 1.875rem |
| --text-4xl | packages/ui/src/styles/tokens/typography.css:14 | 2.25rem |
| --text-5xl | packages/ui/src/styles/tokens/typography.css:15 | 3rem |
| --font-weight-light | packages/ui/src/styles/tokens/typography.css:17 | 300 |
| --font-weight-normal | packages/ui/src/styles/tokens/typography.css:18 | 400 |
| --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 | 500 |
| --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 | 600 |
| --font-weight-bold | packages/ui/src/styles/tokens/typography.css:21 | 700 |
| --leading-tight | packages/ui/src/styles/tokens/typography.css:23 | 1.2 |
| --leading-snug | packages/ui/src/styles/tokens/typography.css:24 | 1.375 |
| --leading-normal | packages/ui/src/styles/tokens/typography.css:25 | 1.5 |
| --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 | 1.625 |
| --leading-loose | packages/ui/src/styles/tokens/typography.css:27 | 2 |
| --tracking-tighter | packages/ui/src/styles/tokens/typography.css:29 | -0.05em |
| --tracking-tight | packages/ui/src/styles/tokens/typography.css:30 | -0.025em |
| --tracking-normal | packages/ui/src/styles/tokens/typography.css:31 | 0em |
| --tracking-wide | packages/ui/src/styles/tokens/typography.css:32 | 0.025em |
| --tracking-wider | packages/ui/src/styles/tokens/typography.css:33 | 0.05em |

## Token-Definitionen: Semantic

| Token | Pfad | Wert |
| --- | --- | --- |
| --color-brand | packages/ui/src/styles/semantic/colors.css:4 | var(--color-nezumi-sabi) |
| --color-on-brand | packages/ui/src/styles/semantic/colors.css:5 | var(--color-nezumi-paper) |
| --color-brand-bg | packages/ui/src/styles/semantic/colors.css:6 | var(--color-nezumi-minato) |
| --color-on-brand-bg | packages/ui/src/styles/semantic/colors.css:7 | var(--color-nezumi-koi) |
| --color-secondary | packages/ui/src/styles/semantic/colors.css:9 | var(--color-nezumi-ume) |
| --color-on-secondary | packages/ui/src/styles/semantic/colors.css:10 | var(--color-nezumi-koi) |
| --color-secondary-bg | packages/ui/src/styles/semantic/colors.css:11 | var(--color-nezumi-sakura) |
| --color-accent | packages/ui/src/styles/semantic/colors.css:12 | var(--color-nezumi-fuji) |
| --color-text | packages/ui/src/styles/semantic/colors.css:14 | var(--color-nezumi-koi) |
| --color-text-muted | packages/ui/src/styles/semantic/colors.css:15 | var(--color-nezumi-genji) |
| --color-surface | packages/ui/src/styles/semantic/colors.css:17 | var(--color-nezumi-bg) |
| --color-surface-raised | packages/ui/src/styles/semantic/colors.css:18 | var(--color-nezumi-snow) |
| --color-surface-raised-subtle | packages/ui/src/styles/semantic/colors.css:19 | var(--color-nezumi-akatsuki) |
| --color-surface-muted | packages/ui/src/styles/semantic/colors.css:20 | var(--color-nezumi-kinu) |
| --color-border | packages/ui/src/styles/semantic/colors.css:22 | var(--color-nezumi-line) |
| --color-success | packages/ui/src/styles/semantic/colors.css:24 | var(--color-nezumi-fukagawa-deep) |
| --color-warning | packages/ui/src/styles/semantic/colors.css:25 | var(--color-nezumi-cha) |
| --color-error | packages/ui/src/styles/semantic/colors.css:26 | var(--color-nezumi-d-destructive) |
| --color-on-error | packages/ui/src/styles/semantic/colors.css:27 | var(--color-nezumi-snow) |
| --color-info | packages/ui/src/styles/semantic/colors.css:28 | var(--color-nezumi-minato) |
| --color-success-bg | packages/ui/src/styles/semantic/colors.css:31 | color-mix(in oklch, var(--color-success) 12%, var(--color-surface)) |
| --color-warning-bg | packages/ui/src/styles/semantic/colors.css:32 | color-mix(in oklch, var(--color-warning) 15%, var(--color-surface)) |
| --color-error-bg | packages/ui/src/styles/semantic/colors.css:33 | color-mix(in oklch, var(--color-error) 12%, var(--color-surface)) |
| --color-info-bg | packages/ui/src/styles/semantic/colors.css:34 | color-mix(in oklch, var(--color-info) 12%, var(--color-surface)) |
| --focus-ring-width | packages/ui/src/styles/semantic/colors.css:37 | 1px |
| --focus-ring-offset | packages/ui/src/styles/semantic/colors.css:38 | 2px |
| --focus-ring-color | packages/ui/src/styles/semantic/colors.css:39 | var(--color-text) |
| --color-ring | packages/ui/src/styles/semantic/colors.css:40 | var(--focus-ring-color) |
| --color-background | packages/ui/src/styles/semantic/colors.css:43 | var(--color-surface) |
| --color-foreground | packages/ui/src/styles/semantic/colors.css:44 | var(--color-text) |
| --color-card | packages/ui/src/styles/semantic/colors.css:45 | var(--color-surface-raised) |
| --color-card-foreground | packages/ui/src/styles/semantic/colors.css:46 | var(--color-text) |
| --color-popover | packages/ui/src/styles/semantic/colors.css:47 | var(--color-surface-raised) |
| --color-popover-foreground | packages/ui/src/styles/semantic/colors.css:48 | var(--color-text) |
| --color-primary | packages/ui/src/styles/semantic/colors.css:49 | var(--color-brand) |
| --color-primary-foreground | packages/ui/src/styles/semantic/colors.css:50 | var(--color-on-brand) |
| --color-secondary-foreground | packages/ui/src/styles/semantic/colors.css:51 | var(--color-on-secondary) |
| --color-muted | packages/ui/src/styles/semantic/colors.css:52 | var(--color-surface-muted) |
| --color-muted-foreground | packages/ui/src/styles/semantic/colors.css:53 | var(--color-text-muted) |
| --color-accent-foreground | packages/ui/src/styles/semantic/colors.css:54 | var(--color-text) |
| --color-destructive | packages/ui/src/styles/semantic/colors.css:55 | var(--color-error) |
| --color-destructive-foreground | packages/ui/src/styles/semantic/colors.css:56 | var(--color-on-error) |
| --color-input | packages/ui/src/styles/semantic/colors.css:57 | var(--color-border) |
| --space-content | packages/ui/src/styles/semantic/spacing.css:2 | var(--spacing-16) |
| --space-section | packages/ui/src/styles/semantic/spacing.css:3 | var(--spacing-48) |
| --space-page | packages/ui/src/styles/semantic/spacing.css:4 | var(--spacing-64) |

## Token-Definitionen: Component

| Token | Pfad | Wert |
| --- | --- | --- |
| --radius-button | packages/ui/src/styles/components/button.css:2 | var(--radius-sm) |
| --spacing-button-gap | packages/ui/src/styles/components/button.css:3 | var(--spacing-8) |
| --spacing-button-sm | packages/ui/src/styles/components/button.css:4 | var(--spacing-32) |
| --spacing-button-md | packages/ui/src/styles/components/button.css:5 | var(--spacing-40) |
| --spacing-button-lg | packages/ui/src/styles/components/button.css:6 | var(--spacing-48) |
| --spacing-button-xl | packages/ui/src/styles/components/button.css:7 | var(--spacing-56) |
| --spacing-button-icon | packages/ui/src/styles/components/button.css:8 | var(--spacing-40) |
| --spacing-button-sm-x | packages/ui/src/styles/components/button.css:9 | var(--spacing-16) |
| --spacing-button-md-x | packages/ui/src/styles/components/button.css:10 | var(--spacing-24) |
| --spacing-button-lg-x | packages/ui/src/styles/components/button.css:11 | var(--spacing-32) |
| --spacing-button-xl-x | packages/ui/src/styles/components/button.css:12 | var(--spacing-40) |
| --font-weight-button | packages/ui/src/styles/components/button.css:13 | var(--font-weight-medium) |
| --color-button-brand-hover | packages/ui/src/styles/components/button.css:16 | color-mix(in oklch, var(--color-brand) 88%, var(--color-text)) |
| --color-button-brand-active | packages/ui/src/styles/components/button.css:17 | color-mix(in oklch, var(--color-brand) 78%, var(--color-text)) |
| --color-button-secondary-hover | packages/ui/src/styles/components/button.css:18 | color-mix(in oklch, var(--color-secondary) 82%, var(--color-text)) |
| --color-button-secondary-active | packages/ui/src/styles/components/button.css:19 | color-mix(in oklch, var(--color-secondary) 72%, var(--color-text)) |
| --color-button-error-hover | packages/ui/src/styles/components/button.css:20 | color-mix(in oklch, var(--color-error) 85%, var(--color-surface)) |
| --color-button-error-active | packages/ui/src/styles/components/button.css:21 | color-mix(in oklch, var(--color-error) 74%, var(--color-surface)) |
| --color-button-outline-hover | packages/ui/src/styles/components/button.css:22 | var(--color-surface-raised-subtle) |
| --color-button-outline-active | packages/ui/src/styles/components/button.css:23 | var(--color-surface-muted) |
| --color-button-ghost-hover | packages/ui/src/styles/components/button.css:24 | var(--color-surface-muted) |
| --color-button-ghost-active | packages/ui/src/styles/components/button.css:25 | var(--color-surface-raised-subtle) |
| --color-button-elevated-hover | packages/ui/src/styles/components/button.css:26 | var(--color-surface-raised-subtle) |
| --color-button-elevated-active | packages/ui/src/styles/components/button.css:27 | var(--color-surface-muted) |

## Token-Definitionen: Dark Override und Base Consumption

| Token | Pfad | Wert |
| --- | --- | --- |
| --color-brand | packages/ui/src/styles/design-tokens.css:28 | var(--color-nezumi-minato) |
| --color-on-brand | packages/ui/src/styles/design-tokens.css:29 | var(--color-nezumi-paper) |
| --color-brand-bg | packages/ui/src/styles/design-tokens.css:30 | var(--color-nezumi-sabi) |
| --color-on-brand-bg | packages/ui/src/styles/design-tokens.css:31 | var(--color-nezumi-snow) |
| --color-secondary | packages/ui/src/styles/design-tokens.css:33 | var(--color-nezumi-ume) |
| --color-on-secondary | packages/ui/src/styles/design-tokens.css:34 | var(--color-nezumi-dark-bg) |
| --color-secondary-bg | packages/ui/src/styles/design-tokens.css:35 | var(--color-nezumi-dark-secondary-bg) |
| --color-accent | packages/ui/src/styles/design-tokens.css:36 | var(--color-nezumi-fuji) |
| --color-text | packages/ui/src/styles/design-tokens.css:38 | var(--color-nezumi-kinu) |
| --color-text-muted | packages/ui/src/styles/design-tokens.css:39 | var(--color-nezumi-genji) |
| --color-surface | packages/ui/src/styles/design-tokens.css:41 | var(--color-nezumi-dark-bg) |
| --color-surface-raised | packages/ui/src/styles/design-tokens.css:42 | var(--color-nezumi-dark-raised) |
| --color-surface-raised-subtle | packages/ui/src/styles/design-tokens.css:43 | var(--color-nezumi-dark-subtle) |
| --color-surface-muted | packages/ui/src/styles/design-tokens.css:44 | var(--color-nezumi-dark-muted) |
| --color-border | packages/ui/src/styles/design-tokens.css:46 | var(--color-nezumi-dark-line) |
| --color-success | packages/ui/src/styles/design-tokens.css:48 | var(--color-nezumi-fukagawa) |
| --color-warning | packages/ui/src/styles/design-tokens.css:49 | var(--color-nezumi-cha) |
| --color-error | packages/ui/src/styles/design-tokens.css:50 | var(--color-nezumi-d-error-dark) |
| --color-on-error | packages/ui/src/styles/design-tokens.css:51 | var(--color-nezumi-dark-bg) |
| --color-info | packages/ui/src/styles/design-tokens.css:52 | var(--color-nezumi-minato) |
| --color-success-bg | packages/ui/src/styles/design-tokens.css:54 | color-mix(in oklch, var(--color-success) 25%, var(--color-surface)) |
| --color-warning-bg | packages/ui/src/styles/design-tokens.css:55 | color-mix(in oklch, var(--color-warning) 25%, var(--color-surface)) |
| --color-error-bg | packages/ui/src/styles/design-tokens.css:56 | color-mix(in oklch, var(--color-error) 25%, var(--color-surface)) |
| --color-info-bg | packages/ui/src/styles/design-tokens.css:57 | color-mix(in oklch, var(--color-info) 25%, var(--color-surface)) |
| --focus-ring-color | packages/ui/src/styles/design-tokens.css:59 | var(--color-text) |
| --color-ring | packages/ui/src/styles/design-tokens.css:60 | var(--focus-ring-color) |

## Token-Definitionen: Other / Namespace Reset

| Token | Pfad | Wert |
| --- | --- | --- |

## Token-Konsum in packages/ui

| Pfad | Vorkommen | Token | Token-Pfad |
| --- | --- | --- | --- |
| packages/ui/src/layout/Grid/Grid.tsx:39 | var(--nz-grid-cols) | --nz-grid-cols | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:40 | var(--nz-grid-cols-md) | --nz-grid-cols-md | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:41 | var(--nz-grid-cols-lg) | --nz-grid-cols-lg | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:45 | var(--nz-grid-rows) | --nz-grid-rows | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:46 | var(--nz-grid-rows-md) | --nz-grid-rows-md | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:47 | var(--nz-grid-rows-lg) | --nz-grid-rows-lg | UNRESOLVED |
| packages/ui/src/layout/layout-components.test.tsx:131 | var(--nz-grid-cols-lg) | --nz-grid-cols-lg | UNRESOLVED |
| packages/ui/src/layout/layout-components.test.tsx:132 | var(--nz-grid-rows) | --nz-grid-rows | UNRESOLVED |
| packages/ui/src/styles/components/button.css:2 | var(--radius-sm) | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| packages/ui/src/styles/components/button.css:3 | var(--spacing-8) | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| packages/ui/src/styles/components/button.css:4 | var(--spacing-32) | --spacing-32 | packages/ui/src/styles/tokens/spacing.css:11 |
| packages/ui/src/styles/components/button.css:5 | var(--spacing-40) | --spacing-40 | packages/ui/src/styles/tokens/spacing.css:12 |
| packages/ui/src/styles/components/button.css:6 | var(--spacing-48) | --spacing-48 | packages/ui/src/styles/tokens/spacing.css:13 |
| packages/ui/src/styles/components/button.css:7 | var(--spacing-56) | --spacing-56 | packages/ui/src/styles/tokens/spacing.css:14 |
| packages/ui/src/styles/components/button.css:8 | var(--spacing-40) | --spacing-40 | packages/ui/src/styles/tokens/spacing.css:12 |
| packages/ui/src/styles/components/button.css:9 | var(--spacing-16) | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| packages/ui/src/styles/components/button.css:10 | var(--spacing-24) | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| packages/ui/src/styles/components/button.css:11 | var(--spacing-32) | --spacing-32 | packages/ui/src/styles/tokens/spacing.css:11 |
| packages/ui/src/styles/components/button.css:12 | var(--spacing-40) | --spacing-40 | packages/ui/src/styles/tokens/spacing.css:12 |
| packages/ui/src/styles/components/button.css:13 | var(--font-weight-medium) | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| packages/ui/src/styles/components/button.css:16 | var(--color-brand) | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| packages/ui/src/styles/components/button.css:16 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/components/button.css:17 | var(--color-brand) | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| packages/ui/src/styles/components/button.css:17 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/components/button.css:18 | var(--color-secondary) | --color-secondary | packages/ui/src/styles/design-tokens.css:33, packages/ui/src/styles/semantic/colors.css:9 |
| packages/ui/src/styles/components/button.css:18 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/components/button.css:19 | var(--color-secondary) | --color-secondary | packages/ui/src/styles/design-tokens.css:33, packages/ui/src/styles/semantic/colors.css:9 |
| packages/ui/src/styles/components/button.css:19 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/components/button.css:20 | var(--color-error) | --color-error | packages/ui/src/styles/design-tokens.css:50, packages/ui/src/styles/semantic/colors.css:26 |
| packages/ui/src/styles/components/button.css:20 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/components/button.css:21 | var(--color-error) | --color-error | packages/ui/src/styles/design-tokens.css:50, packages/ui/src/styles/semantic/colors.css:26 |
| packages/ui/src/styles/components/button.css:21 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/components/button.css:22 | var(--color-surface-raised-subtle) | --color-surface-raised-subtle | packages/ui/src/styles/design-tokens.css:43, packages/ui/src/styles/semantic/colors.css:19 |
| packages/ui/src/styles/components/button.css:23 | var(--color-surface-muted) | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| packages/ui/src/styles/components/button.css:24 | var(--color-surface-muted) | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| packages/ui/src/styles/components/button.css:25 | var(--color-surface-raised-subtle) | --color-surface-raised-subtle | packages/ui/src/styles/design-tokens.css:43, packages/ui/src/styles/semantic/colors.css:19 |
| packages/ui/src/styles/components/button.css:26 | var(--color-surface-raised-subtle) | --color-surface-raised-subtle | packages/ui/src/styles/design-tokens.css:43, packages/ui/src/styles/semantic/colors.css:19 |
| packages/ui/src/styles/components/button.css:27 | var(--color-surface-muted) | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| packages/ui/src/styles/design-tokens.css:28 | var(--color-nezumi-minato) | --color-nezumi-minato | packages/ui/src/styles/tokens/colors.css:6 |
| packages/ui/src/styles/design-tokens.css:29 | var(--color-nezumi-paper) | --color-nezumi-paper | packages/ui/src/styles/tokens/colors.css:20 |
| packages/ui/src/styles/design-tokens.css:30 | var(--color-nezumi-sabi) | --color-nezumi-sabi | packages/ui/src/styles/tokens/colors.css:5 |
| packages/ui/src/styles/design-tokens.css:31 | var(--color-nezumi-snow) | --color-nezumi-snow | packages/ui/src/styles/tokens/colors.css:22 |
| packages/ui/src/styles/design-tokens.css:33 | var(--color-nezumi-ume) | --color-nezumi-ume | packages/ui/src/styles/tokens/colors.css:7 |
| packages/ui/src/styles/design-tokens.css:34 | var(--color-nezumi-dark-bg) | --color-nezumi-dark-bg | packages/ui/src/styles/tokens/colors.css:23 |
| packages/ui/src/styles/design-tokens.css:35 | var(--color-nezumi-dark-secondary-bg) | --color-nezumi-dark-secondary-bg | packages/ui/src/styles/tokens/colors.css:28 |
| packages/ui/src/styles/design-tokens.css:36 | var(--color-nezumi-fuji) | --color-nezumi-fuji | packages/ui/src/styles/tokens/colors.css:9 |
| packages/ui/src/styles/design-tokens.css:38 | var(--color-nezumi-kinu) | --color-nezumi-kinu | packages/ui/src/styles/tokens/colors.css:10 |
| packages/ui/src/styles/design-tokens.css:39 | var(--color-nezumi-genji) | --color-nezumi-genji | packages/ui/src/styles/tokens/colors.css:11 |
| packages/ui/src/styles/design-tokens.css:41 | var(--color-nezumi-dark-bg) | --color-nezumi-dark-bg | packages/ui/src/styles/tokens/colors.css:23 |
| packages/ui/src/styles/design-tokens.css:42 | var(--color-nezumi-dark-raised) | --color-nezumi-dark-raised | packages/ui/src/styles/tokens/colors.css:24 |
| packages/ui/src/styles/design-tokens.css:43 | var(--color-nezumi-dark-subtle) | --color-nezumi-dark-subtle | packages/ui/src/styles/tokens/colors.css:25 |
| packages/ui/src/styles/design-tokens.css:44 | var(--color-nezumi-dark-muted) | --color-nezumi-dark-muted | packages/ui/src/styles/tokens/colors.css:26 |
| packages/ui/src/styles/design-tokens.css:46 | var(--color-nezumi-dark-line) | --color-nezumi-dark-line | packages/ui/src/styles/tokens/colors.css:27 |
| packages/ui/src/styles/design-tokens.css:48 | var(--color-nezumi-fukagawa) | --color-nezumi-fukagawa | packages/ui/src/styles/tokens/colors.css:15 |
| packages/ui/src/styles/design-tokens.css:49 | var(--color-nezumi-cha) | --color-nezumi-cha | packages/ui/src/styles/tokens/colors.css:17 |
| packages/ui/src/styles/design-tokens.css:50 | var(--color-nezumi-d-error-dark) | --color-nezumi-d-error-dark | packages/ui/src/styles/tokens/colors.css:30 |
| packages/ui/src/styles/design-tokens.css:51 | var(--color-nezumi-dark-bg) | --color-nezumi-dark-bg | packages/ui/src/styles/tokens/colors.css:23 |
| packages/ui/src/styles/design-tokens.css:52 | var(--color-nezumi-minato) | --color-nezumi-minato | packages/ui/src/styles/tokens/colors.css:6 |
| packages/ui/src/styles/design-tokens.css:54 | var(--color-success) | --color-success | packages/ui/src/styles/design-tokens.css:48, packages/ui/src/styles/semantic/colors.css:24 |
| packages/ui/src/styles/design-tokens.css:54 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/design-tokens.css:55 | var(--color-warning) | --color-warning | packages/ui/src/styles/design-tokens.css:49, packages/ui/src/styles/semantic/colors.css:25 |
| packages/ui/src/styles/design-tokens.css:55 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/design-tokens.css:56 | var(--color-error) | --color-error | packages/ui/src/styles/design-tokens.css:50, packages/ui/src/styles/semantic/colors.css:26 |
| packages/ui/src/styles/design-tokens.css:56 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/design-tokens.css:57 | var(--color-info) | --color-info | packages/ui/src/styles/design-tokens.css:52, packages/ui/src/styles/semantic/colors.css:28 |
| packages/ui/src/styles/design-tokens.css:57 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/design-tokens.css:59 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/design-tokens.css:60 | var(--focus-ring-color) | --focus-ring-color | packages/ui/src/styles/design-tokens.css:59, packages/ui/src/styles/semantic/colors.css:39 |
| packages/ui/src/styles/design-tokens.css:88 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/design-tokens.css:89 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/design-tokens.css:90 | var(--font-sans) | --font-sans | packages/ui/src/styles/tokens/typography.css:2 |
| packages/ui/src/styles/design-tokens.css:91 | var(--text-base) | --text-base | packages/ui/src/styles/tokens/typography.css:9 |
| packages/ui/src/styles/design-tokens.css:92 | var(--font-weight-normal) | --font-weight-normal | packages/ui/src/styles/tokens/typography.css:18 |
| packages/ui/src/styles/design-tokens.css:93 | var(--leading-normal) | --leading-normal | packages/ui/src/styles/tokens/typography.css:25 |
| packages/ui/src/styles/design-tokens.css:95 | var(--duration-normal) | --duration-normal | packages/ui/src/styles/tokens/motion.css:4 |
| packages/ui/src/styles/design-tokens.css:95 | var(--ease-in-out) | --ease-in-out | packages/ui/src/styles/tokens/motion.css:12 |
| packages/ui/src/styles/design-tokens.css:96 | var(--duration-normal) | --duration-normal | packages/ui/src/styles/tokens/motion.css:4 |
| packages/ui/src/styles/design-tokens.css:96 | var(--ease-in-out) | --ease-in-out | packages/ui/src/styles/tokens/motion.css:12 |
| packages/ui/src/styles/design-tokens.css:105 | var(--font-weight-semibold) | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| packages/ui/src/styles/design-tokens.css:106 | var(--leading-tight) | --leading-tight | packages/ui/src/styles/tokens/typography.css:23 |
| packages/ui/src/styles/design-tokens.css:107 | var(--tracking-tight) | --tracking-tight | packages/ui/src/styles/tokens/typography.css:30 |
| packages/ui/src/styles/design-tokens.css:111 | var(--text-4xl) | --text-4xl | packages/ui/src/styles/tokens/typography.css:14 |
| packages/ui/src/styles/design-tokens.css:114 | var(--text-3xl) | --text-3xl | packages/ui/src/styles/tokens/typography.css:13 |
| packages/ui/src/styles/design-tokens.css:117 | var(--text-2xl) | --text-2xl | packages/ui/src/styles/tokens/typography.css:12 |
| packages/ui/src/styles/design-tokens.css:120 | var(--text-xl) | --text-xl | packages/ui/src/styles/tokens/typography.css:11 |
| packages/ui/src/styles/design-tokens.css:123 | var(--text-lg) | --text-lg | packages/ui/src/styles/tokens/typography.css:10 |
| packages/ui/src/styles/design-tokens.css:126 | var(--text-base) | --text-base | packages/ui/src/styles/tokens/typography.css:9 |
| packages/ui/src/styles/design-tokens.css:130 | var(--leading-relaxed) | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| packages/ui/src/styles/design-tokens.css:134 | var(--text-sm) | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| packages/ui/src/styles/design-tokens.css:141 | var(--font-mono) | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| packages/ui/src/styles/design-tokens.css:146 | var(--focus-ring-width) | --focus-ring-width | packages/ui/src/styles/semantic/colors.css:37 |
| packages/ui/src/styles/design-tokens.css:146 | var(--color-ring) | --color-ring | packages/ui/src/styles/design-tokens.css:60, packages/ui/src/styles/semantic/colors.css:40 |
| packages/ui/src/styles/design-tokens.css:147 | var(--focus-ring-offset) | --focus-ring-offset | packages/ui/src/styles/semantic/colors.css:38 |
| packages/ui/src/styles/design-tokens.css:151 | var(--spacing-8) | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| packages/ui/src/styles/design-tokens.css:152 | var(--spacing-8) | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| packages/ui/src/styles/design-tokens.css:158 | var(--color-border) | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| packages/ui/src/styles/design-tokens.css:159 | var(--radius-full) | --radius-full | packages/ui/src/styles/tokens/radius.css:9 |
| packages/ui/src/styles/design-tokens.css:162 | var(--color-text-muted) | --color-text-muted | packages/ui/src/styles/design-tokens.css:39, packages/ui/src/styles/semantic/colors.css:15 |
| packages/ui/src/styles/design-tokens.test.ts:17 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/design-tokens.test.ts:18 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/design-tokens.test.ts:19 | var(--color-brand) | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| packages/ui/src/styles/design-tokens.test.ts:20 | var(--color-on-brand) | --color-on-brand | packages/ui/src/styles/design-tokens.css:29, packages/ui/src/styles/semantic/colors.css:5 |
| packages/ui/src/styles/design-tokens.test.ts:21 | var(--color-on-secondary) | --color-on-secondary | packages/ui/src/styles/design-tokens.css:34, packages/ui/src/styles/semantic/colors.css:10 |
| packages/ui/src/styles/design-tokens.test.ts:22 | var(--color-surface-muted) | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| packages/ui/src/styles/design-tokens.test.ts:23 | var(--color-text-muted) | --color-text-muted | packages/ui/src/styles/design-tokens.css:39, packages/ui/src/styles/semantic/colors.css:15 |
| packages/ui/src/styles/design-tokens.test.ts:24 | var(--color-surface-raised) | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| packages/ui/src/styles/design-tokens.test.ts:25 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/design-tokens.test.ts:26 | var(--color-surface-raised) | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| packages/ui/src/styles/design-tokens.test.ts:27 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/design-tokens.test.ts:28 | var(--color-border) | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| packages/ui/src/styles/design-tokens.test.ts:29 | var(--color-error) | --color-error | packages/ui/src/styles/design-tokens.css:50, packages/ui/src/styles/semantic/colors.css:26 |
| packages/ui/src/styles/design-tokens.test.ts:30 | var(--color-on-error) | --color-on-error | packages/ui/src/styles/design-tokens.css:51, packages/ui/src/styles/semantic/colors.css:27 |
| packages/ui/src/styles/design-tokens.test.ts:49 | var(--radius-sm) | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| packages/ui/src/styles/design-tokens.test.ts:50 | var(--spacing-24) | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| packages/ui/src/styles/design-tokens.test.ts:51 | var(--font-weight-medium) | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| packages/ui/src/styles/semantic/colors.css:4 | var(--color-nezumi-sabi) | --color-nezumi-sabi | packages/ui/src/styles/tokens/colors.css:5 |
| packages/ui/src/styles/semantic/colors.css:5 | var(--color-nezumi-paper) | --color-nezumi-paper | packages/ui/src/styles/tokens/colors.css:20 |
| packages/ui/src/styles/semantic/colors.css:6 | var(--color-nezumi-minato) | --color-nezumi-minato | packages/ui/src/styles/tokens/colors.css:6 |
| packages/ui/src/styles/semantic/colors.css:7 | var(--color-nezumi-koi) | --color-nezumi-koi | packages/ui/src/styles/tokens/colors.css:12 |
| packages/ui/src/styles/semantic/colors.css:9 | var(--color-nezumi-ume) | --color-nezumi-ume | packages/ui/src/styles/tokens/colors.css:7 |
| packages/ui/src/styles/semantic/colors.css:10 | var(--color-nezumi-koi) | --color-nezumi-koi | packages/ui/src/styles/tokens/colors.css:12 |
| packages/ui/src/styles/semantic/colors.css:11 | var(--color-nezumi-sakura) | --color-nezumi-sakura | packages/ui/src/styles/tokens/colors.css:8 |
| packages/ui/src/styles/semantic/colors.css:12 | var(--color-nezumi-fuji) | --color-nezumi-fuji | packages/ui/src/styles/tokens/colors.css:9 |
| packages/ui/src/styles/semantic/colors.css:14 | var(--color-nezumi-koi) | --color-nezumi-koi | packages/ui/src/styles/tokens/colors.css:12 |
| packages/ui/src/styles/semantic/colors.css:15 | var(--color-nezumi-genji) | --color-nezumi-genji | packages/ui/src/styles/tokens/colors.css:11 |
| packages/ui/src/styles/semantic/colors.css:17 | var(--color-nezumi-bg) | --color-nezumi-bg | packages/ui/src/styles/tokens/colors.css:13 |
| packages/ui/src/styles/semantic/colors.css:18 | var(--color-nezumi-snow) | --color-nezumi-snow | packages/ui/src/styles/tokens/colors.css:22 |
| packages/ui/src/styles/semantic/colors.css:19 | var(--color-nezumi-akatsuki) | --color-nezumi-akatsuki | packages/ui/src/styles/tokens/colors.css:14 |
| packages/ui/src/styles/semantic/colors.css:20 | var(--color-nezumi-kinu) | --color-nezumi-kinu | packages/ui/src/styles/tokens/colors.css:10 |
| packages/ui/src/styles/semantic/colors.css:22 | var(--color-nezumi-line) | --color-nezumi-line | packages/ui/src/styles/tokens/colors.css:21 |
| packages/ui/src/styles/semantic/colors.css:24 | var(--color-nezumi-fukagawa-deep) | --color-nezumi-fukagawa-deep | packages/ui/src/styles/tokens/colors.css:16 |
| packages/ui/src/styles/semantic/colors.css:25 | var(--color-nezumi-cha) | --color-nezumi-cha | packages/ui/src/styles/tokens/colors.css:17 |
| packages/ui/src/styles/semantic/colors.css:26 | var(--color-nezumi-d-destructive) | --color-nezumi-d-destructive | packages/ui/src/styles/tokens/colors.css:29 |
| packages/ui/src/styles/semantic/colors.css:27 | var(--color-nezumi-snow) | --color-nezumi-snow | packages/ui/src/styles/tokens/colors.css:22 |
| packages/ui/src/styles/semantic/colors.css:28 | var(--color-nezumi-minato) | --color-nezumi-minato | packages/ui/src/styles/tokens/colors.css:6 |
| packages/ui/src/styles/semantic/colors.css:31 | var(--color-success) | --color-success | packages/ui/src/styles/design-tokens.css:48, packages/ui/src/styles/semantic/colors.css:24 |
| packages/ui/src/styles/semantic/colors.css:31 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/semantic/colors.css:32 | var(--color-warning) | --color-warning | packages/ui/src/styles/design-tokens.css:49, packages/ui/src/styles/semantic/colors.css:25 |
| packages/ui/src/styles/semantic/colors.css:32 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/semantic/colors.css:33 | var(--color-error) | --color-error | packages/ui/src/styles/design-tokens.css:50, packages/ui/src/styles/semantic/colors.css:26 |
| packages/ui/src/styles/semantic/colors.css:33 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/semantic/colors.css:34 | var(--color-info) | --color-info | packages/ui/src/styles/design-tokens.css:52, packages/ui/src/styles/semantic/colors.css:28 |
| packages/ui/src/styles/semantic/colors.css:34 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/semantic/colors.css:39 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/semantic/colors.css:40 | var(--focus-ring-color) | --focus-ring-color | packages/ui/src/styles/design-tokens.css:59, packages/ui/src/styles/semantic/colors.css:39 |
| packages/ui/src/styles/semantic/colors.css:43 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| packages/ui/src/styles/semantic/colors.css:44 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/semantic/colors.css:45 | var(--color-surface-raised) | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| packages/ui/src/styles/semantic/colors.css:46 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/semantic/colors.css:47 | var(--color-surface-raised) | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| packages/ui/src/styles/semantic/colors.css:48 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/semantic/colors.css:49 | var(--color-brand) | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| packages/ui/src/styles/semantic/colors.css:50 | var(--color-on-brand) | --color-on-brand | packages/ui/src/styles/design-tokens.css:29, packages/ui/src/styles/semantic/colors.css:5 |
| packages/ui/src/styles/semantic/colors.css:51 | var(--color-on-secondary) | --color-on-secondary | packages/ui/src/styles/design-tokens.css:34, packages/ui/src/styles/semantic/colors.css:10 |
| packages/ui/src/styles/semantic/colors.css:52 | var(--color-surface-muted) | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| packages/ui/src/styles/semantic/colors.css:53 | var(--color-text-muted) | --color-text-muted | packages/ui/src/styles/design-tokens.css:39, packages/ui/src/styles/semantic/colors.css:15 |
| packages/ui/src/styles/semantic/colors.css:54 | var(--color-text) | --color-text | packages/ui/src/styles/design-tokens.css:38, packages/ui/src/styles/semantic/colors.css:14 |
| packages/ui/src/styles/semantic/colors.css:55 | var(--color-error) | --color-error | packages/ui/src/styles/design-tokens.css:50, packages/ui/src/styles/semantic/colors.css:26 |
| packages/ui/src/styles/semantic/colors.css:56 | var(--color-on-error) | --color-on-error | packages/ui/src/styles/design-tokens.css:51, packages/ui/src/styles/semantic/colors.css:27 |
| packages/ui/src/styles/semantic/colors.css:57 | var(--color-border) | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| packages/ui/src/styles/semantic/spacing.css:2 | var(--spacing-16) | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| packages/ui/src/styles/semantic/spacing.css:3 | var(--spacing-48) | --spacing-48 | packages/ui/src/styles/tokens/spacing.css:13 |
| packages/ui/src/styles/semantic/spacing.css:4 | var(--spacing-64) | --spacing-64 | packages/ui/src/styles/tokens/spacing.css:15 |

## Token-Konsum in apps/*

| Pfad | Vorkommen | Token | Token-Pfad |
| --- | --- | --- | --- |
| apps/homepage/app/layout.tsx:20 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/homepage/app/opengraph-image.tsx:9 | var(--color-surface) | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/homepage/app/opengraph-image.tsx:10 | var(--color-surface-raised) | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/homepage/app/opengraph-image.tsx:11 | var(--color-brand) | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/homepage/app/opengraph-image.tsx:26 | var(--color-on-brand) | --color-on-brand | packages/ui/src/styles/design-tokens.css:29, packages/ui/src/styles/semantic/colors.css:5 |
| apps/homepage/app/page.tsx:3 | px-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/homepage/app/page.tsx:3 | py-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/homepage/app/page.tsx:4 | gap-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/homepage/app/page.tsx:5 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/homepage/app/page.tsx:5 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/homepage/app/page.tsx:6 | text-4xl | --text-4xl | packages/ui/src/styles/tokens/typography.css:14 |
| apps/homepage/app/page.tsx:6 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/homepage/app/page.tsx:6 | tracking-tight | --tracking-tight | packages/ui/src/styles/tokens/typography.css:30 |
| apps/homepage/app/page.tsx:7 | text-base | --text-base | packages/ui/src/styles/tokens/typography.css:9 |
| apps/members/app/layout.tsx:20 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/members/app/page.tsx:3 | px-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/members/app/page.tsx:3 | py-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/members/app/page.tsx:4 | gap-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/members/app/page.tsx:5 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/members/app/page.tsx:5 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/members/app/page.tsx:6 | text-4xl | --text-4xl | packages/ui/src/styles/tokens/typography.css:14 |
| apps/members/app/page.tsx:6 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/members/app/page.tsx:6 | tracking-tight | --tracking-tight | packages/ui/src/styles/tokens/typography.css:30 |
| apps/members/app/page.tsx:7 | text-base | --text-base | packages/ui/src/styles/tokens/typography.css:9 |
| apps/operations/app/layout.tsx:16 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/operations/app/page.tsx:3 | px-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/operations/app/page.tsx:3 | py-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/operations/app/page.tsx:4 | gap-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/operations/app/page.tsx:5 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/operations/app/page.tsx:5 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/operations/app/page.tsx:6 | text-4xl | --text-4xl | packages/ui/src/styles/tokens/typography.css:14 |
| apps/operations/app/page.tsx:6 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/operations/app/page.tsx:6 | tracking-tight | --tracking-tight | packages/ui/src/styles/tokens/typography.css:30 |
| apps/operations/app/page.tsx:7 | text-base | --text-base | packages/ui/src/styles/tokens/typography.css:9 |
| apps/playground/app/layout.tsx:20 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/playground/app/page.tsx:49 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/page.tsx:49 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/page.tsx:49 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/page.tsx:49 | shadow-sm | --shadow-sm | packages/ui/src/styles/tokens/shadows.css:2 |
| apps/playground/app/page.tsx:56 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/page.tsx:59 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/page.tsx:59 | bg-brand | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/page.tsx:60 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/page.tsx:60 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/page.tsx:63 | h-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/page.tsx:63 | w-64 | --spacing-64 | packages/ui/src/styles/tokens/spacing.css:15 |
| apps/playground/app/page.tsx:63 | rounded-sm | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| apps/playground/app/page.tsx:63 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/page.tsx:64 | h-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/page.tsx:64 | w-64 | --spacing-64 | packages/ui/src/styles/tokens/spacing.css:15 |
| apps/playground/app/page.tsx:64 | rounded-sm | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| apps/playground/app/page.tsx:64 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/page.tsx:65 | h-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/page.tsx:65 | w-64 | --spacing-64 | packages/ui/src/styles/tokens/spacing.css:15 |
| apps/playground/app/page.tsx:65 | rounded-sm | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| apps/playground/app/page.tsx:65 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/page.tsx:75 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/page.tsx:75 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/page.tsx:75 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/playground/app/page.tsx:78 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/page.tsx:79 | text-xl | --text-xl | packages/ui/src/styles/tokens/typography.css:11 |
| apps/playground/app/page.tsx:79 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/page.tsx:82 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/page.tsx:82 | text-success | --color-success | packages/ui/src/styles/design-tokens.css:48, packages/ui/src/styles/semantic/colors.css:24 |
| apps/playground/app/page.tsx:89 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/page.tsx:89 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/page.tsx:89 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/playground/app/page.tsx:92 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/page.tsx:92 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/page.tsx:93 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/page.tsx:95 | h-40 | --spacing-40 | packages/ui/src/styles/tokens/spacing.css:12 |
| apps/playground/app/page.tsx:99 | rounded-sm | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| apps/playground/app/page.tsx:99 | bg-brand | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/page.tsx:107 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/page.tsx:107 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/page.tsx:107 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/playground/app/page.tsx:111 | rounded-full | --radius-full | packages/ui/src/styles/tokens/radius.css:9 |
| apps/playground/app/page.tsx:111 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/page.tsx:112 | h-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/page.tsx:112 | rounded-sm | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| apps/playground/app/page.tsx:112 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/page.tsx:113 | min-w-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/playground/app/page.tsx:113 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/page.tsx:127 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/page.tsx:132 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/page.tsx:132 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/page.tsx:135 | text-4xl | --text-4xl | packages/ui/src/styles/tokens/typography.css:14 |
| apps/playground/app/page.tsx:135 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/page.tsx:135 | leading-tight | --leading-tight | packages/ui/src/styles/tokens/typography.css:23 |
| apps/playground/app/page.tsx:138 | text-lg | --text-lg | packages/ui/src/styles/tokens/typography.css:10 |
| apps/playground/app/page.tsx:138 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/page.tsx:163 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/page.tsx:163 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/page.tsx:166 | text-3xl | --text-3xl | packages/ui/src/styles/tokens/typography.css:13 |
| apps/playground/app/page.tsx:166 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/page.tsx:166 | leading-tight | --leading-tight | packages/ui/src/styles/tokens/typography.css:23 |
| apps/playground/app/page.tsx:174 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/page.tsx:174 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/page.tsx:174 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/page.tsx:179 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/page.tsx:179 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/page.tsx:180 | text-xl | --text-xl | packages/ui/src/styles/tokens/typography.css:11 |
| apps/playground/app/page.tsx:180 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/page.tsx:186 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/page.tsx:186 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/page.tsx:191 | rounded-sm | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| apps/playground/app/page.tsx:191 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/page.tsx:191 | px-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/page.tsx:191 | py-4 | --spacing-4 | packages/ui/src/styles/tokens/spacing.css:6 |
| apps/playground/app/page.tsx:191 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/page.tsx:191 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/tutorials/_components.tsx:35 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:38 | px-0 | --spacing-0 | packages/ui/src/styles/tokens/spacing.css:3 |
| apps/playground/app/tutorials/_components.tsx:42 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/tutorials/_components.tsx:42 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/tutorials/_components.tsx:45 | text-4xl | --text-4xl | packages/ui/src/styles/tokens/typography.css:14 |
| apps/playground/app/tutorials/_components.tsx:45 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/_components.tsx:45 | leading-tight | --leading-tight | packages/ui/src/styles/tokens/typography.css:23 |
| apps/playground/app/tutorials/_components.tsx:45 | md:text-5xl | --text-5xl | packages/ui/src/styles/tokens/typography.css:15 |
| apps/playground/app/tutorials/_components.tsx:48 | text-lg | --text-lg | packages/ui/src/styles/tokens/typography.css:10 |
| apps/playground/app/tutorials/_components.tsx:48 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/tutorials/_components.tsx:73 | text-2xl | --text-2xl | packages/ui/src/styles/tokens/typography.css:12 |
| apps/playground/app/tutorials/_components.tsx:73 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/_components.tsx:73 | leading-tight | --leading-tight | packages/ui/src/styles/tokens/typography.css:23 |
| apps/playground/app/tutorials/_components.tsx:74 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/_components.tsx:74 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/tutorials/_components.tsx:95 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/_components.tsx:95 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:95 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/_components.tsx:99 | text-base | --text-base | packages/ui/src/styles/tokens/typography.css:9 |
| apps/playground/app/tutorials/_components.tsx:99 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/_components.tsx:101 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/_components.tsx:101 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/tutorials/_components.tsx:104 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/_components.tsx:104 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:104 | bg-surface | --color-surface | packages/ui/src/styles/design-tokens.css:41, packages/ui/src/styles/semantic/colors.css:17 |
| apps/playground/app/tutorials/_components.tsx:116 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:116 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/_components.tsx:116 | p-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/playground/app/tutorials/_components.tsx:116 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/tutorials/_components.tsx:116 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/tutorials/_components.tsx:124 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/_components.tsx:124 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:124 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/_components.tsx:127 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:127 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/_components.tsx:127 | px-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/_components.tsx:127 | py-12 | --spacing-12 | packages/ui/src/styles/tokens/spacing.css:8 |
| apps/playground/app/tutorials/_components.tsx:127 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/tutorials/_components.tsx:127 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/_components.tsx:139 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:139 | px-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/_components.tsx:139 | py-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/_components.tsx:141 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/tutorials/_components.tsx:141 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/_components.tsx:142 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/tutorials/_components.tsx:142 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/tutorials/_components.tsx:143 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/tutorials/_components.tsx:143 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/tutorials/_components.tsx:144 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/_components.tsx:144 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/tutorials/_components.tsx:172 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/_components.tsx:175 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/box/page.tsx:34 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/box/page.tsx:34 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/box/page.tsx:34 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/box/page.tsx:39 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/box/page.tsx:39 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/box/page.tsx:39 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/box/page.tsx:41 | text-xl | --text-xl | packages/ui/src/styles/tokens/typography.css:11 |
| apps/playground/app/tutorials/box/page.tsx:41 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/box/page.tsx:42 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/box/page.tsx:42 | leading-relaxed | --leading-relaxed | packages/ui/src/styles/tokens/typography.css:26 |
| apps/playground/app/tutorials/box/page.tsx:65 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/box/page.tsx:65 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/box/page.tsx:65 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/box/page.tsx:68 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/box/page.tsx:69 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/box/page.tsx:80 | gap-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/box/page.tsx:80 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/box/page.tsx:80 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/box/page.tsx:80 | p-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/box/page.tsx:92 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/box/page.tsx:92 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/box/page.tsx:92 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/box/page.tsx:109 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/container/page.tsx:40 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/container/page.tsx:40 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/container/page.tsx:67 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/container/page.tsx:67 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/container/page.tsx:67 | p-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/tutorials/container/page.tsx:69 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/container/page.tsx:69 | bg-brand/25 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/container/page.tsx:69 | px-12 | --spacing-12 | packages/ui/src/styles/tokens/spacing.css:8 |
| apps/playground/app/tutorials/container/page.tsx:69 | py-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/tutorials/container/page.tsx:71 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/container/page.tsx:71 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/container/page.tsx:72 | font-mono | --font-mono | packages/ui/src/styles/tokens/typography.css:4 |
| apps/playground/app/tutorials/container/page.tsx:72 | text-xs | --text-xs | packages/ui/src/styles/tokens/typography.css:7 |
| apps/playground/app/tutorials/container/page.tsx:90 | h-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/playground/app/tutorials/container/page.tsx:90 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/container/page.tsx:90 | bg-brand/20 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/container/page.tsx:91 | h-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/playground/app/tutorials/container/page.tsx:91 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/container/page.tsx:91 | bg-brand/30 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/container/page.tsx:92 | h-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/playground/app/tutorials/container/page.tsx:92 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/container/page.tsx:92 | bg-brand/40 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/container/page.tsx:107 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/container/page.tsx:107 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/container/page.tsx:107 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/container/page.tsx:107 | p-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/container/page.tsx:108 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/container/page.tsx:120 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/container/page.tsx:120 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/container/page.tsx:120 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/container/page.tsx:120 | p-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/container/page.tsx:121 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/flex/page.tsx:41 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/flex/page.tsx:41 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/flex/page.tsx:44 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/flex/page.tsx:44 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/flex/page.tsx:62 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/flex/page.tsx:62 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/flex/page.tsx:62 | p-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/flex/page.tsx:64 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/flex/page.tsx:64 | bg-brand | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/flex/page.tsx:65 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/flex/page.tsx:65 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/flex/page.tsx:68 | h-32 | --spacing-32 | packages/ui/src/styles/tokens/spacing.css:11 |
| apps/playground/app/tutorials/flex/page.tsx:68 | w-64 | --spacing-64 | packages/ui/src/styles/tokens/spacing.css:15 |
| apps/playground/app/tutorials/flex/page.tsx:68 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/flex/page.tsx:68 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/flex/page.tsx:69 | h-32 | --spacing-32 | packages/ui/src/styles/tokens/spacing.css:11 |
| apps/playground/app/tutorials/flex/page.tsx:69 | w-96 | --spacing-96 | packages/ui/src/styles/tokens/spacing.css:17 |
| apps/playground/app/tutorials/flex/page.tsx:69 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/flex/page.tsx:69 | bg-brand/25 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/flex/page.tsx:82 | rounded-full | --radius-full | packages/ui/src/styles/tokens/radius.css:9 |
| apps/playground/app/tutorials/flex/page.tsx:82 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/flex/page.tsx:82 | bg-surface-raised | --color-surface-raised | packages/ui/src/styles/design-tokens.css:42, packages/ui/src/styles/semantic/colors.css:18 |
| apps/playground/app/tutorials/flex/page.tsx:82 | px-12 | --spacing-12 | packages/ui/src/styles/tokens/spacing.css:8 |
| apps/playground/app/tutorials/flex/page.tsx:82 | py-8 | --spacing-8 | packages/ui/src/styles/tokens/spacing.css:7 |
| apps/playground/app/tutorials/flex/page.tsx:82 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/flex/page.tsx:99 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/flex/page.tsx:99 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/flex/page.tsx:100 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/flex/page.tsx:102 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/flex/page.tsx:102 | bg-brand/20 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/flex/page.tsx:103 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/grid/page.tsx:45 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/grid/page.tsx:45 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/grid/page.tsx:46 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/grid/page.tsx:68 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/grid/page.tsx:68 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/grid/page.tsx:69 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/grid/page.tsx:69 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/grid/page.tsx:71 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/grid/page.tsx:71 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/grid/page.tsx:73 | h-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/playground/app/tutorials/grid/page.tsx:73 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/grid/page.tsx:73 | bg-brand/20 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/grid/page.tsx:74 | h-24 | --spacing-24 | packages/ui/src/styles/tokens/spacing.css:10 |
| apps/playground/app/tutorials/grid/page.tsx:74 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/grid/page.tsx:74 | bg-brand/30 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/grid/page.tsx:89 | h-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/grid/page.tsx:89 | rounded-md | --radius-md | packages/ui/src/styles/tokens/radius.css:4 |
| apps/playground/app/tutorials/grid/page.tsx:89 | bg-brand/25 | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/grid/page.tsx:107 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/grid/page.tsx:108 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/grid/page.tsx:110 | h-40 | --spacing-40 | packages/ui/src/styles/tokens/spacing.css:12 |
| apps/playground/app/tutorials/grid/page.tsx:114 | rounded-sm | --radius-sm | packages/ui/src/styles/tokens/radius.css:3 |
| apps/playground/app/tutorials/grid/page.tsx:114 | bg-brand | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/grid/page.tsx:125 | rounded-full | --radius-full | packages/ui/src/styles/tokens/radius.css:9 |
| apps/playground/app/tutorials/grid/page.tsx:125 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/grid/page.tsx:126 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/section/page.tsx:42 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/section/page.tsx:42 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/section/page.tsx:45 | text-2xl | --text-2xl | packages/ui/src/styles/tokens/typography.css:12 |
| apps/playground/app/tutorials/section/page.tsx:45 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/section/page.tsx:46 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/section/page.tsx:77 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/section/page.tsx:77 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/section/page.tsx:79 | w-96 | --spacing-96 | packages/ui/src/styles/tokens/spacing.css:17 |
| apps/playground/app/tutorials/section/page.tsx:79 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/section/page.tsx:79 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/section/page.tsx:79 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/section/page.tsx:80 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/section/page.tsx:93 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/section/page.tsx:93 | bg-surface-muted | --color-surface-muted | packages/ui/src/styles/design-tokens.css:44, packages/ui/src/styles/semantic/colors.css:20 |
| apps/playground/app/tutorials/section/page.tsx:95 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/section/page.tsx:95 | font-medium | --font-weight-medium | packages/ui/src/styles/tokens/typography.css:19 |
| apps/playground/app/tutorials/section/page.tsx:111 | rounded-lg | --radius-lg | packages/ui/src/styles/tokens/radius.css:5 |
| apps/playground/app/tutorials/section/page.tsx:111 | border-border | --color-border | packages/ui/src/styles/design-tokens.css:46, packages/ui/src/styles/semantic/colors.css:22 |
| apps/playground/app/tutorials/section/page.tsx:112 | bg-brand | --color-brand | packages/ui/src/styles/design-tokens.css:28, packages/ui/src/styles/semantic/colors.css:4 |
| apps/playground/app/tutorials/section/page.tsx:112 | text-on-brand | --color-on-brand | packages/ui/src/styles/design-tokens.css:29, packages/ui/src/styles/semantic/colors.css:5 |
| apps/playground/app/tutorials/section/page.tsx:113 | px-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |
| apps/playground/app/tutorials/section/page.tsx:114 | text-2xl | --text-2xl | packages/ui/src/styles/tokens/typography.css:12 |
| apps/playground/app/tutorials/section/page.tsx:114 | font-semibold | --font-weight-semibold | packages/ui/src/styles/tokens/typography.css:20 |
| apps/playground/app/tutorials/section/page.tsx:115 | text-sm | --text-sm | packages/ui/src/styles/tokens/typography.css:8 |
| apps/playground/app/tutorials/section/page.tsx:120 | px-16 | --spacing-16 | packages/ui/src/styles/tokens/spacing.css:9 |

## Unaufgeloeste oder nicht-Nezumi-Token-Utilities im Scan

Diese Liste enthaelt Utility-Vorkommen, die wie tokenisierte Utilities aussehen, aber nicht auf eine aktuell definierte Nezumi-Token-Definition gemappt werden konnten. Nicht jede Zeile ist automatisch ein Bug; `max-w-*`, `min-h-screen`, Alpha-Modifikatoren und Tutorial-Beispiele koennen bewusst ausserhalb des Token-Layers liegen.

### packages/ui

| Pfad | Vorkommen | Erwarteter Token | Token-Pfad |
| --- | --- | --- | --- |
| packages/ui/src/layout/Grid/Grid.tsx:39 | var(--nz-grid-cols) | --nz-grid-cols | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:40 | var(--nz-grid-cols-md) | --nz-grid-cols-md | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:41 | var(--nz-grid-cols-lg) | --nz-grid-cols-lg | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:45 | var(--nz-grid-rows) | --nz-grid-rows | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:46 | var(--nz-grid-rows-md) | --nz-grid-rows-md | UNRESOLVED |
| packages/ui/src/layout/Grid/Grid.tsx:47 | var(--nz-grid-rows-lg) | --nz-grid-rows-lg | UNRESOLVED |
| packages/ui/src/layout/layout-components.test.tsx:131 | var(--nz-grid-cols-lg) | --nz-grid-cols-lg | UNRESOLVED |
| packages/ui/src/layout/layout-components.test.tsx:132 | var(--nz-grid-rows) | --nz-grid-rows | UNRESOLVED |

### apps/*

Keine.

## Konkrete Empfehlungen

- Als naechsten Token-Refactor `Container`-Max-Widths als eigene Layout- oder Component Tokens modellieren, weil `max-w-md/2xl/4xl/6xl/7xl` aktuell Tailwind-Sizing-Presets konsumiert.
- Fokus-Ring-Width/Offset fuer Button in eine Utility-kompatible Token-Loesung bringen oder bewusst als shadcn-kompatible Fixed-Klassen dokumentieren.
- Playground-Tutorials behalten viele Primitive-Utilities absichtlich sichtbar. Fuer produktive Apps sollte diese direkte Nutzung ueber Page/Layout/Typosystem-Komponenten reduziert werden.
- Eine Lint-Regel oder CI-Pruefung fuer nicht erlaubte Farben, Hexwerte und nicht-Nezumi-Spacing wie `px-6` ergaenzen.

## Offene Fragen oder Restrisiken

- Die Apps enthalten noch primitive Typography- und Sizing-Utilities. Farblich ist der Tokenkonsum korrekt; fuer vollstaendige Enterprise-Konformitaet sollten App-Level-Templates auf dokumentierte Page-/Typography-Primitives gehoben werden.
- Component Typography Tokens mit `--text-button-*` wurden nicht eingefuehrt, weil Tailwind-Merge diese aktuell mit semantischen `text-on-*` Farbklassen kollidieren laesst. Die Textgroessen bleiben deshalb bewusst Primitive-Utilities in den Button-Size-Varianten.
- `--nz-grid-*` ist weiterhin unaufgeloest im Token-Pfad-Sinn, weil es dynamische Grid-Templates transportiert und nicht im `@theme`-Tokenmodell liegt.

## Verifikation

- `pnpm --filter @packages/ui test`: bestanden, 4 Test Files / 20 Tests.
- `pnpm --filter @packages/ui typecheck`: bestanden.
- `pnpm build:homepage && pnpm build:members && pnpm build:operations && pnpm build:playground`: bestanden.
