# Design Tokens, die 2026 skalieren: Tailwind v4 und Nezumi CSS Tokens

> Hinweis: Dieses Dokument ist eine eigenständige, projektadaptierte Fassung auf Basis der Themen des verlinkten Mavik-Labs-Artikels. Der Webartikel wurde nicht wortgetreu reproduziert; die Beispiele wurden auf die Nezumi-Template-Tokens aus `DESIGN.md` und die tatsächlichen Dateien in `packages/ui/src/styles` übertragen.

## Aufgabenstellung

Ausgehend vom Artikel [Design Tokens That Scale in 2026 (Tailwind v4 + CSS Variables)](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026/) soll ein sauber formatiertes Root-Markdown entstehen, dessen Token-Beispiele nicht generisch bleiben, sondern das Token-System dieses Repositories verwenden. Zusätzlich entsteht eine eigenständige HTML-Ansicht mit Hands-on, Best Practices und Data-Flow-Modell für Nezumi-Template.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `DESIGN.md`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/172-theme.mdx`
- `docs/tailwind-css/084-functions-and-directives.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.md`

## Gelesene externe Quellen

- [Mavik Labs: Design Tokens That Scale in 2026](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026/)

## Abgeleiteter SOLL-Zustand

Nezumi-Template soll Tokens als CSS-first System behandeln. Tailwind v4 liest Designwerte über `@theme`, erzeugt daraus Utility-Klassen und stellt die Werte zugleich als CSS Custom Properties bereit. Für dieses Projekt heißt das:

- Primitive Token-Werte leben in `packages/ui/src/styles/tokens/*`.
- Farb-Primitives folgen `DESIGN.md` und werden als `--color-nezumi-*` in `@theme` registriert.
- Semantische Tokens leben in `packages/ui/src/styles/semantic/*` und drücken Zweck aus, zum Beispiel `--color-brand`, `--color-text`, `--color-surface`, `--color-border`.
- Component Tokens leben in `packages/ui/src/styles/components/*` und kapseln variantenspezifisches Verhalten, zum Beispiel Button-Hover- und Active-Farben.
- App-Code nutzt semantische Tailwind-Klassen wie `bg-surface`, `text-text`, `border-border`, `bg-brand`, `text-on-brand`.
- Raw Hex, Tailwind-Default-Paletten, willkürliche Arbitrary Values und direkte Primitive-Nutzung in App-TSX sind Abweichungen vom Zielbild.

## Analysierte Dateien

- `packages/ui/src/styles/design-tokens.css`
- `packages/ui/src/styles/tokens/colors.css`
- `packages/ui/src/styles/tokens/spacing.css`
- `packages/ui/src/styles/tokens/typography.css`
- `packages/ui/src/styles/tokens/motion.css`
- `packages/ui/src/styles/tokens/radius.css`
- `packages/ui/src/styles/tokens/shadows.css`
- `packages/ui/src/styles/semantic/colors.css`
- `packages/ui/src/styles/semantic/spacing.css`
- `packages/ui/src/styles/components/button.css`

---

## TL;DR

- Design Tokens verhindern Style Drift, weil Farben, Spacing, Typografie, Radius, Schatten und Motion zentral definiert werden.
- Tailwind v4 macht Tokens CSS-first: `@theme` registriert CSS Custom Properties als Utility-API.
- Nezumi nutzt ein Drei-Schichten-Modell: Primitive Tokens, Semantic Tokens, Component Tokens.
- `DESIGN.md` ist die visuelle SSOT; `packages/ui/src/styles` ist die technische CSS-SSOT.
- App-Code soll semantische Utilities verwenden, nicht Raw Values und nicht direkt die Tailwind-Default-Palette.
- Dark Mode überschreibt semantische Tokens in `.dark`, nicht einzelne Komponenten.
- Drift wird durch klare Token-Nutzung, Reviews und Scans auf Raw Hex, Default-Palette und Arbitrary Values begrenzt.

---

## Warum Design Tokens wichtig sind

Ein Interface skaliert nicht, wenn jede Komponente ihre eigenen Farben, Abstände, Rundungen und Transition-Werte mitbringt. Ohne Tokens entsteht ein System aus Einzelfällen: zufällige Hex-Codes, abweichende Spacing-Werte, individuelle Shadows und inkonsistente Motion.

| Problem | Auswirkung im Projekt |
|---|---|
| Style Drift | Komponenten sehen ähnlich gemeint, aber nicht gleich aus. |
| Refactor-Risiko | Eine visuelle Änderung muss an vielen Stellen gesucht und getestet werden. |
| Dark-Mode-Aufwand | Farben sind in Komponenten verteilt statt an semantischen Stellen überschreibbar. |
| Review-Reibung | Reviewer prüfen Geschmack statt Systemtreue. |
| Onboarding-Kosten | Neue Contributors wissen nicht, welche Werte erlaubt sind. |

Tokens geben dem UI eine belastbare Sprache. In Nezumi heißt diese Sprache nicht `blue-600` oder `gray-100`, sondern `brand`, `surface`, `text`, `border`, `success`, `error`, `paper`, `sabi`, `koi`, `kinu`.

---

## Tailwind v4: CSS-first Design Tokens

Tailwind v4 verschiebt Token-Konfiguration aus JavaScript in CSS. Der zentrale Mechanismus ist die `@theme`-Direktive. Sie ist nicht nur eine Stelle zum Ablegen von CSS-Variablen, sondern ein Vertrag mit Tailwind: Aus Namen in bestimmten Namespaces entstehen Utilities.

```css
@import "tailwindcss";

@theme {
  --color-brand: var(--color-nezumi-sabi);
  --color-text: var(--color-nezumi-koi);
  --color-surface: var(--color-nezumi-bg);
  --spacing-16: 1rem;
  --radius-lg: 0.5rem;
  --duration-normal: 200ms;
}
```

Aus diesen Tokens werden nutzbare Klassen:

```tsx
<section className="bg-surface text-text p-16 rounded-lg duration-normal">
  ...
</section>
```

Der Unterschied zu `:root` ist entscheidend: Normale CSS-Variablen sind zur Laufzeit nutzbar, erzeugen aber keine Tailwind-Utilities. `@theme` macht Tokens zu einer API für Markup und Komponenten.

---

## Die Token-Hierarchie

Nezumi folgt dem Drei-Schichten-Modell:

```text
Primitive Tokens -> Semantic Tokens -> Component Tokens -> Components -> Apps
```

Diese Trennung hält Refactors klein. Eine Komponente muss nicht wissen, ob `brand` aktuell auf `sabi`, `minato` oder einen Dark-Mode-Wert zeigt. Sie muss nur wissen, dass sie `brand` als primäre Handlung verwendet.

### Layer 1: Primitive Tokens

Primitive Tokens sind rohe Werte ohne UI-Absicht. In diesem Projekt sind die Farb-Primitives in `DESIGN.md` definiert und in `packages/ui/src/styles/tokens/colors.css` als `@theme` registriert.

```css
@theme {
  --color-*: initial;

  --color-nezumi-sabi: oklch(from #47585c l c h);
  --color-nezumi-minato: oklch(from #80989b l c h);
  --color-nezumi-ume: oklch(from #c099a0 l c h);
  --color-nezumi-sakura: oklch(from #e9dfe5 l c h);
  --color-nezumi-fuji: oklch(from #a6a5c4 l c h);
  --color-nezumi-kinu: oklch(from #dddcd6 l c h);
  --color-nezumi-genji: oklch(from #888084 l c h);
  --color-nezumi-koi: oklch(from #4f455c l c h);
  --color-nezumi-bg: oklch(from #f5f4f1 l c h);
  --color-nezumi-paper: oklch(from #faf9f5 l c h);
  --color-nezumi-line: oklch(from #d4d3cf l c h);
  --color-nezumi-snow: oklch(from #ffffff l c h);
  --color-nezumi-dark-bg: oklch(from #121014 l c h);
  --color-nezumi-dark-raised: oklch(from #1a181c l c h);
  --color-nezumi-dark-line: oklch(from #3a383c l c h);
}
```

Spacing ist ebenfalls eine Primitive-Skala. Nezumi verwendet eine pixelnahe Skala, die als Tailwind-Spacing-Namespace registriert ist:

```css
@theme {
  --spacing: initial;
  --spacing-0: 0rem;
  --spacing-1: 0.0625rem;
  --spacing-2: 0.125rem;
  --spacing-4: 0.25rem;
  --spacing-8: 0.5rem;
  --spacing-16: 1rem;
  --spacing-24: 1.5rem;
  --spacing-32: 2rem;
  --spacing-48: 3rem;
  --spacing-64: 4rem;
  --spacing-96: 6rem;
}
```

### Layer 2: Semantic Tokens

Semantic Tokens geben den Primitives Bedeutung. App-Code soll diese Ebene verwenden.

```css
@theme {
  --color-brand: var(--color-nezumi-sabi);
  --color-on-brand: var(--color-nezumi-paper);
  --color-brand-bg: var(--color-nezumi-minato);
  --color-on-brand-bg: var(--color-nezumi-koi);

  --color-secondary: var(--color-nezumi-ume);
  --color-secondary-bg: var(--color-nezumi-sakura);
  --color-accent: var(--color-nezumi-fuji);

  --color-text: var(--color-nezumi-koi);
  --color-text-muted: var(--color-nezumi-genji);

  --color-surface: var(--color-nezumi-bg);
  --color-surface-raised: var(--color-nezumi-snow);
  --color-surface-raised-subtle: var(--color-nezumi-akatsuki);
  --color-surface-muted: var(--color-nezumi-kinu);

  --color-border: var(--color-nezumi-line);

  --color-success: var(--color-nezumi-fukagawa-deep);
  --color-warning: var(--color-nezumi-cha);
  --color-error: var(--color-nezumi-d-destructive);
  --color-on-error: var(--color-nezumi-snow);
  --color-info: var(--color-nezumi-minato);
}
```

Diese Ebene ermöglicht stabile Komponenten. Ein Button verwendet `bg-brand text-on-brand`, nicht `bg-nezumi-sabi text-nezumi-paper`. Ein Dashboard verwendet `bg-surface text-text border-border`, nicht einzelne Palette-Werte.

### Layer 3: Component Tokens

Component Tokens kapseln Varianten und Interaktionszustände. Sie dürfen semantische Tokens kombinieren, abdunkeln, aufhellen oder mischen.

```css
@theme {
  --color-button-brand-hover: color-mix(in oklch, var(--color-brand) 88%, var(--color-nezumi-koi));
  --color-button-brand-active: color-mix(in oklch, var(--color-brand) 78%, var(--color-nezumi-koi));
  --color-button-outline-hover: var(--color-surface-raised-subtle);
  --color-button-ghost-hover: var(--color-surface-muted);
}
```

Die Regel ist streng: Komponenten überspringen die Schichten nicht. Primitive ändern sich selten. Semantik kann pro Theme wechseln. Component Tokens bleiben nahe an der Komponente, ohne Designwerte in TSX zu verstreuen.

---

## Motion Tokens

Motion ist Teil des Design Systems. Wenn jede Komponente eigene Transition-Zeiten setzt, entsteht Drift genauso schnell wie bei Farben.

```css
@theme {
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-lazy: 800ms;

  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  --stagger-fast: 30ms;
  --stagger-base: 50ms;
  --stagger-slow: 100ms;
}
```

| UI-Ereignis | Token | Easing |
|---|---|---|
| Hover | `--duration-fast` | `--ease-out` |
| Button press | `--duration-normal` | `--ease-out` |
| Dropdown | `--duration-normal` | `--ease-in-out` |
| Dialog | `--duration-slow` | `--ease-spring` |
| Page transition | `--duration-slower` | `--ease-in-out` |

---

## OKLCH im Nezumi-System

`DESIGN.md` führt Referenz-Hexwerte als Authoring-SSOT. Im CSS werden diese Werte über relative OKLCH-Farben gespeichert:

```css
--color-nezumi-sabi: oklch(from #47585c l c h);
```

Das erhält die DESIGN.md-Farbe als Eingabe, macht sie aber im modernen Farbraum verfügbar. Für Statusflächen nutzt das Projekt `color-mix(in oklch, ...)`, damit helle und dunkle Flächen tonal statt hart gesättigt wirken:

```css
@theme {
  --color-success-bg: color-mix(in oklch, var(--color-success) 12%, var(--color-surface));
  --color-warning-bg: color-mix(in oklch, var(--color-warning) 15%, var(--color-surface));
  --color-error-bg: color-mix(in oklch, var(--color-error) 12%, var(--color-surface));
  --color-info-bg: color-mix(in oklch, var(--color-info) 12%, var(--color-surface));
}
```

---

## Theming mit CSS Variablen

Dark Mode überschreibt in Nezumi die semantischen Tokens unter `.dark`. Komponenten bleiben unverändert.

```css
.dark {
  --color-brand: var(--color-nezumi-minato);
  --color-text: var(--color-nezumi-kinu);
  --color-surface: var(--color-nezumi-dark-bg);
  --color-surface-raised: var(--color-nezumi-dark-raised);
  --color-border: var(--color-nezumi-dark-line);

  --color-success-bg: color-mix(in oklch, var(--color-success) 25%, var(--color-surface));
  --color-warning-bg: color-mix(in oklch, var(--color-warning) 25%, var(--color-surface));
  --color-error-bg: color-mix(in oklch, var(--color-error) 25%, var(--color-surface));
  --color-info-bg: color-mix(in oklch, var(--color-info) 25%, var(--color-surface));

  color-scheme: dark;
}
```

Das ist die zentrale Stärke von CSS Custom Properties: Theme-Wechsel sind Runtime-Verhalten, keine Komponenten-Migration.

---

## Token-Organisation im Repo

```text
packages/ui/src/styles/
├── design-tokens.css
├── global.css
├── tokens/
│   ├── breakpoints.css
│   ├── colors.css
│   ├── motion.css
│   ├── radius.css
│   ├── shadows.css
│   ├── spacing.css
│   └── typography.css
├── semantic/
│   ├── colors.css
│   └── spacing.css
└── components/
    └── button.css
```

Apps importieren die gemeinsame Token-Datei über ihre `app/globals.css`. Dadurch erhalten Homepage, Members, Operations und Playground dieselbe Utility-API.

---

## Drift-Checkliste für Nezumi

| Warnsignal | Besser |
|---|---|
| `bg-[#47585c]` | `bg-brand` |
| `text-[#4f455c]` | `text-text` |
| `border-[#d4d3cf]` | `border-border` |
| `p-[17px]` | nächster Spacing-Token, z. B. `p-16` |
| `rounded-[7px]` | `rounded-lg` oder Token-Entscheidung |
| `duration-[180ms]` | `duration-normal` oder definierter Motion Token |
| `bg-blue-600` | semantischer Nezumi-Token |

Drift beheben:

1. App-Code auf Raw Hex, Default-Palette und Arbitrary Values scannen.
2. Jeden Fund einem vorhandenen semantischen Token zuordnen.
3. Nur dann neue Tokens anlegen, wenn mehrere echte Use Cases denselben fehlenden Begriff brauchen.
4. Neue Primitives in `DESIGN.md` begründen und dann in `tokens/*` abbilden.
5. Komponenten auf semantische oder Component Tokens zurückführen.

---

## Hands-on: Ein neues UI-Element tokenkonform bauen

### 1. Zweck bestimmen

Bevor ein Wert gewählt wird, muss die Rolle klar sein:

- Ist es eine Seite? `bg-surface text-text`
- Ist es eine gehobene Fläche? `bg-surface-raised`
- Ist es eine Standardfläche im App-Kontext? `Paper`
- Ist es ein diskretes wiederholtes Objekt? `Card`
- Ist es eine primäre Handlung? `bg-brand text-on-brand`
- Ist es Statuskommunikation? `bg-success-bg text-success`, `bg-error-bg text-error`

### 2. Semantische Utilities verwenden

```tsx
import { Paper, Typography } from "@packages/ui";

export function OperationSummary() {
  return (
    <Paper className="bg-surface-raised text-text border border-border p-24">
      <Typography variant="title-medium">Statusuebersicht</Typography>
      <Typography variant="body-medium" className="text-text-muted">
        Aktuelle Service-Kennzahlen und offene Pruefpunkte.
      </Typography>
    </Paper>
  );
}
```

### 3. Component Token nur bei echter Variantenlogik anlegen

Wenn ein Button, Input oder Dialog wiederkehrende Interaction-Werte braucht, gehört der Wert in `components/*.css`, nicht in die Komponente:

```css
@theme {
  --color-dialog-backdrop: color-mix(in oklch, var(--color-text) 40%, transparent);
  --duration-dialog-enter: var(--duration-slow);
  --ease-dialog-enter: var(--ease-spring);
}
```

---

## Data-Flow-Modell

```text
DESIGN.md
  -> packages/ui/src/styles/tokens/*
  -> packages/ui/src/styles/semantic/*
  -> packages/ui/src/styles/components/*
  -> packages/ui/src/styles/design-tokens.css
  -> apps/*/app/globals.css
  -> AppShell -> PageLayout -> Section -> Paper/Card/Button/Typography
```

Der Datenfluss ist absichtlich einseitig. Designentscheidungen fließen von der SSOT in CSS-Tokens und von dort in Komponenten. App-Code konsumiert die API, definiert aber keine eigenen Designwerte.

---

## Findings nach Schweregrad

Keine Code-Findings im Sinne einer Bug-Review; diese Aufgabe erzeugt Dokumentationsartefakte. Relevante Beobachtung: `docs/nezumi-ui/INDEX.md` verweist auf `010-nezumi-ui-design-tokens-tailwind-v4.mdx`, im Dateisystem liegt die Datei als `010-nezumi-ui-design-tokens-tailwind-v4.md`. Das ist ein Dokumentationslink-Risiko, aber nicht Teil der angeforderten Artikeldateien.

## Konkrete Empfehlungen

- `DESIGN.md` als fachliche Token-Quelle beibehalten und neue Designwerte dort zuerst begründen.
- `@theme` für alle Tokens verwenden, aus denen Tailwind-Utilities entstehen sollen.
- App-Code auf semantische Klassen begrenzen; Primitive nur in Token-Dateien oder sehr bewusst in Foundation-Code verwenden.
- Component Tokens erst anlegen, wenn wiederkehrende Variantenlogik existiert.
- Drift-Scans regelmäßig auf `#[0-9a-fA-F]`, `bg-blue-*`, `text-gray-*`, `p-[...]`, `rounded-[...]`, `shadow-[...]` ausführen.

## Offene Fragen oder Restrisiken

- Die aktuelle technische Typografie in `tokens/typography.css` weicht von der `DESIGN.md`-Font-Family `Urbanist` ab. Das kann bewusst oder ein Umsetzungsrückstand sein.
- `docs/nezumi-ui/INDEX.md` enthält einen Dateiendungs-Mismatch für das lokale Token-Kapitel.
- Multi-Brand-Theming ist in der lokalen Doku als optionaler nächster Schritt markiert, aber im aktuellen CSS nicht als `[data-brand]`-System umgesetzt.

## Vorgeschlagene nächste Schritte

- Dokumentationslink in `docs/nezumi-ui/INDEX.md` von `.mdx` auf `.md` korrigieren.
- Token-Audit für App-TSX auf Raw Hex, Default-Palette und Arbitrary Values durchführen.
- Typografie-SOLL aus `DESIGN.md` gegen `packages/ui/src/styles/tokens/typography.css` prüfen.
