# SSOT — Typography (Nezumi-Template)

**Hands-on / How-to für Schrift, Text und Hierarchie**

> Stand: Mai 2026 · Tailwind 4.2.x · Next.js 16.2.x · React 19.2.x · `next/font/google`
>
> Diese Datei ist die **Single Source of Truth** für alle Typografie-Entscheidungen im Repo.
> Sie ergänzt [`DESIGN.md`](./DESIGN.md), [`DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md`](./DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md) und [`SSOT_LAYOUT.md`](./SSOT_LAYOUT.md).
>
> **Hands-on-Pairing:** Urbanist (Sans, Body & UI) + Fraunces (Variable Serif, Akzent & Editorial-Headlines).

---

## Inhalt

1. [TL;DR — die 8 Typografie-Regeln](#tldr--die-8-typografie-regeln)
2. [Architektur — wo lebt was](#architektur--wo-lebt-was)
3. [Review der Typography-Komponente](#review-der-typography-komponente)
4. [Die Variant-Skala](#die-variant-skala)
5. [Tones — semantische Farbe](#tones--semantische-farbe)
6. [Hands-on: Urbanist + Fraunces als Font-Pairing einrichten](#hands-on-urbanist--fraunces-als-font-pairing-einrichten)
7. [Variable Fonts korrekt nutzen](#variable-fonts-korrekt-nutzen)
8. [Hierarchie-Patterns](#hierarchie-patterns)
9. [Lese-Ergonomie](#lese-ergonomie)
10. [Internationalisierung & Sonderzeichen](#internationalisierung--sonderzeichen)
11. [Performance — CLS, Subsetting, Preload](#performance--cls-subsetting-preload)
12. [Edge Cases & Troubleshooting](#edge-cases--troubleshooting)
13. [Anti-Patterns](#anti-patterns)
14. [Reviewer-Checkliste](#reviewer-checkliste)

---

## TL;DR — die 8 Typografie-Regeln

| # | Regel | Begründung |
|---|-------|-----------|
| 1 | **`<Typography variant="…" />` ist die einzige API.** Niemals `<h1 className="text-3xl font-bold">`. | Variants sind die Vertragsschicht — Designwerte werden zentral verändert. |
| 2 | **Variant ≠ Tag.** Variant ist visuell, `as` ist semantisch. | `<Typography variant="title-medium" as="h1">` — visuell „medium", semantisch h1. |
| 3 | **Maximal zwei Schriftfamilien.** Sans für UI/Body (`--font-sans`), Akzent für Headlines/Editorial (`--font-accent`). | Mehr Familien → kognitive Last + Webfont-Kosten. |
| 4 | **Variable Fonts bevorzugt.** `Urbanist` und `Fraunces` sind Variable — eine Datei, alle Weights. | Halbiert den Webfont-Traffic, eröffnet `font-variation-settings`. |
| 5 | **`text-balance` für Headlines, `text-pretty` für Absätze.** | Browser-native Lese-Ergonomie ohne JS. |
| 6 | **Line-Height ist relativ für Body, fix in `px` für UI.** Body braucht Atemraum, UI braucht Pixel-Genauigkeit. | UI-Komponenten alignieren auf Pixel-Raster. |
| 7 | **Letter-Spacing ist Teil der Skala — kein Bauchgefühl.** | Negative `tracking` für große Headlines, leicht positive für Caps/Labels. |
| 8 | **Maximal 65–75 Zeichen pro Zeile.** | Lesbarkeit. `Container size="md"` und `maxW="65ch"` sind die Standardwege. |

---

## Architektur — wo lebt was

```text
DESIGN.md                                       ← visuelle SSOT (Schriftfamilien, Skala-Idee)
   │
   ▼
packages/ui/src/styles/tokens/typography.css    ← Layer 1: --font-family-* + Weights
   │
   ▼
packages/ui/src/styles/components/typography.css ← Layer 3 (kanonisch): Variant-Tokens + Klassen
   │
   ▼ gebündelt durch
packages/ui/src/styles/design-tokens.css        ← @import "./components/typography.css"
   │
   ▼
packages/ui/src/atoms/Typography/
   ├── index.tsx                                ← React-Komponente
   ├── tokens.css                               ← Lokaler Token-Spiegel (Component-Level-Doku)
   └── tokens.md                                ← (optional) Auto-generierte Doku
   │
   ▼
apps/<app>/app/layout.tsx                       ← next/font/google + className auf <html>
   │
   ▼
JSX                                             ← <Typography variant="…" tone="…" as="…">
```

### SOLL-Pfad-Tabelle

| # | Datei | Zweck |
|---|-------|-------|
| 1 | `DESIGN.md` (§ Typografie) | Visuelle SSOT, Authoring-Format |
| 2 | `packages/ui/src/styles/tokens/typography.css` | Schriftfamilien (`--font-family-sans`, `--font-family-accent`), Weights |
| 3 | `packages/ui/src/styles/components/typography.css` | **Kanonische** Variant-Tokens + `.typography-*`-Klassen |
| 4 | `packages/ui/src/atoms/Typography/index.tsx` | React-Komponente |
| 5 | `packages/ui/src/atoms/Typography/tokens.css` | Lokaler Token-Spiegel (für isolierte Komponenten-Dokumentation) — **muss bei Änderungen synchron mit (3) gehalten werden** |
| 6 | `packages/ui/src/components/typography.tsx` | Re-Export-Shim auf den Atom |
| 7 | `apps/<app>/app/layout.tsx` | `next/font/google`-Loader + CSS-Variablen-Bindung |

---

## Review der Typography-Komponente

**Datei:** `packages/ui/src/atoms/Typography/index.tsx`

### API

```tsx
interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant   // ← einziges Pflichtfeld
  tone?: TypographyTone        // default: "default"
  as?: ElementType             // override für Default-Tag
  balance?: boolean            // text-balance — Headlines
  pretty?: boolean             // text-pretty — Absätze
  truncate?: boolean           // 1-Zeiler mit Ellipsis
  ref?: Ref<HTMLElement>
}
```

### Variant → Default-Tag-Mapping (Auszug)

| Variant | Default-Tag | Anlass |
|---------|-------------|--------|
| `clamp-large` | `h1` | Hero-Headline |
| `clamp-medium` | `h2` | Section-Headline |
| `clamp-small` | `h3` | Sub-Section |
| `clamp-text` | `p` | Lead-Absatz, fluid |
| `title-large` | `h1` | Page-Titel (UI) |
| `title-medium` | `h2` | Card-Titel |
| `body-medium` | `p` | Standard-Body |
| `label-large` | `span` | Form-Label, Button-Text |
| `label-medium` | `span` | Caps-Label, Eyebrow |
| `accent-large` | `h3` | Editorial-Akzent |
| `accent-small` | `span` | Editorial-Eyebrow |

### Was die Komponente gut macht

- **Reine Mapping-Komponente** — keine Logik, kein State.
- **Polymorphes `as`** — visuelle Hierarchie und semantische Hierarchie können unabhängig gewählt werden.
- **`balance`/`pretty`** sind als Props ausgelagert, statt Standard zu sein — guter Default, weil `text-balance` auf langen Body-Texten teuer ist.
- **`tone`** trennt **Farbe** sauber von **Skala** — eine `body-medium` kann ohne Variant-Erfindung in `error`-Farbe laufen.
- **React 19.2 `ref`-Prop** — keine `forwardRef`-Wrapper, keine Composition-Issues mit Framer Motion.

### Gefundene Beobachtungen (kein Bug, aber wert zu wissen)

1. **Token-Spiegel** (`atoms/Typography/tokens.css`) ist eine 1:1-Kopie von `styles/components/typography.css`. Bei Token-Änderungen müssen beide synchronisiert werden. Empfehlung: in der Component-Doku darauf verweisen (siehe SOLL-Pfad-Tabelle).
2. **Kein `link`/`code`/`em`/`strong`-Variant.** Inline-Auszeichnung passiert via klassischem HTML im `children`. Das ist akzeptabel, könnte aber bei Bedarf mit `inline-strong`, `inline-em`, `inline-code` ergänzt werden — niedrige Priorität.
3. **`label-medium` und `accent-small` setzen `text-transform: uppercase` per CSS.** Das ist Absicht (semantisch caps), aber bei Stringen mit deutschen Sonderzeichen wirkt CSS-Uppercase auf `ß` → `SS` (browser-abhängig). Wer korrektes Großbuchstaben-Verhalten will, schreibt den String bereits in Caps oder verwendet `font-variant-caps: all-small-caps` — siehe [§ I18n](#internationalisierung--sonderzeichen).
4. **Default-Mapping `variant="title-large" → h1`** kollidiert mit `variant="clamp-large" → h1`. Innerhalb einer Page sollten nicht beide vorkommen, weil dann zwei `h1` entstehen. Pattern: Hero nutzt `clamp-large`, Sub-Pages nutzen `title-large`.

---

## Die Variant-Skala

Elf Variants, drei Familien:

### Clamp-Familie — fluid, für Marketing/Editorial

Werte stammen aus `styles/components/typography.css`.

| Variant | `font-size` (CSS) | Min/Max | Line-Height | Tracking | Verwendung |
|---------|-------------------|---------|-------------|----------|------------|
| `clamp-large` | `clamp(2.5rem, 4vw + 1rem, 4.5rem)` | 40 → 72px | 0.98 | -0.055em | Hero-Headline |
| `clamp-medium` | `clamp(2rem, 2.4vw + 1rem, 3.25rem)` | 32 → 52px | 1.05 | -0.055em | Section-Headline |
| `clamp-small` | `clamp(1.5rem, 1.25vw + 1rem, 2.25rem)` | 24 → 36px | 1.12 | -0.055em | Sub-Section |
| `clamp-text` | `clamp(1rem, 0.45vw + 0.9rem, 1.25rem)` | 16 → 20px | 1.5 | -0.055em | Lead-Absatz |

> 💡 **Warum negativer Tracking?** Geometrische Sans-Serifs (wie Urbanist) wirken bei großen Größen optisch zu locker gesetzt. -0.055em ist der Sweet Spot — eng genug für visuelle Geschlossenheit, weit genug für Lesbarkeit. **Niemals** auf Body-Text anwenden.

### Title-/Body-Familie — feste Pixel, für UI

| Variant | Size/LH/Tracking | Weight | Anlass |
|---------|------------------|--------|--------|
| `title-large` | 22/28/0 | bold | Page-Titel im App-Kontext |
| `title-medium` | 18/24/0 | medium | Card-Titel, Modal-Header |
| `body-medium` | 16/24/0.012em | regular | Standard-Body |
| `label-large` | 14/20/0.02em | medium | Form-Labels, Button-Text, Tabs |
| `label-medium` | 12/16/0.06em | bold + UPPERCASE | Eyebrow, Caps-Label |

### Accent-Familie — Editorial-Akzent (eigene Schrift)

Diese Variants nutzen `--font-accent` (default: Space Grotesk; im Hands-on tauschen wir auf Fraunces).

| Variant | Size/LH/Tracking | Weight | Anlass |
|---------|------------------|--------|--------|
| `accent-large` | 20/28/-0.01em | medium | Editorial-Subhead, Pull-Quote |
| `accent-small` | 13/18/0.08em | bold + UPPERCASE | Editorial-Eyebrow |

---

## Tones — semantische Farbe

Tone wird **nie** für visuellen Schmuck verwendet, sondern für **Bedeutung**.

| Tone | Mapping | Verwendung |
|------|---------|------------|
| `default` | `text-text` | Standardtext |
| `muted` | `text-text-muted` | Sekundärtext, Captions, Meta |
| `brand` | `text-brand` | Brand-Wort/Marke im Fließtext |
| `on-brand` | `text-on-brand` | Text auf einem Brand-Hintergrund |
| `on-brand-bg` | `text-on-brand-bg` | Text auf `bg-brand-bg` |
| `on-error` | `text-on-error` | Text auf `bg-error` (Snackbar etc.) |
| `success` / `warning` / `error` / `info` | semantische Status-Farben | Status-Inline-Text, Feedback-Messages |

```tsx
// ✅ Statusmeldung
<Typography variant="body-medium" tone="error">
  Die Datei konnte nicht gespeichert werden.
</Typography>

// ✅ Brand-Akzent in Headline
<Typography variant="clamp-large">
  Calm interfaces for{" "}
  <Typography variant="clamp-large" tone="brand" as="span">
    serious
  </Typography>{" "}
  products
</Typography>

// ❌ Anti-Pattern — Tone als Dekoration
<Typography variant="body-medium" tone="info">
  Beliebiger Text der zufällig blau aussehen soll
</Typography>
```

---

## Hands-on: Urbanist + Fraunces als Font-Pairing einrichten

Ziel: **Urbanist** als geometrischer Sans für UI/Body, **Fraunces** als variable Serif für Editorial-Akzente. Beide sind Variable Fonts — eine Datei, volle Achsen-Kontrolle.

### Warum Fraunces?

| Eigenschaft | Wert |
|-------------|------|
| Klassifikation | Variable Serif (Display + Text) |
| Achsen | `wght` (100–900), `opsz` (9–144), `SOFT` (0–100), `WONK` (0–1) |
| Charakter | Warm, leicht „wonkig" — perfekter Kontrast zu der nüchternen Geometrie von Urbanist |
| Lizenz | OFL — Google Fonts |
| Latin Subset Kosten | ~25 KB woff2 (variable, gesamtes Latin Extended) |

Urbanist (geometrisch, neutral, modern) + Fraunces (charaktervoll, serif, „menschlich") ergeben das klassische Sans-Body / Serif-Display-Pairing — vertraut von Editorial-Sites, ohne in Convention zu erstarren.

### Schritt 1 — Fonts laden (`apps/<app>/app/layout.tsx`)

```tsx
// apps/homepage/app/layout.tsx
import type { Metadata, Viewport } from "next"
import { Fraunces, Urbanist } from "next/font/google"
import type { ReactNode } from "react"
import { ThemeProvider } from "@packages/ui/providers/theme"
import "./globals.css"

const urbanist = Urbanist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-urbanist",
  display: "swap",
  axes: [],            // wght ist Default-Achse, kein zusätzliches Token nötig
  weight: "variable",  // Variable Font — alle Weights aus einer Datei
})

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],  // optional — wenn font-variation-settings genutzt werden
  weight: "variable",
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      className={`${urbanist.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-surface text-text">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Was hier wichtig ist:**

- `next/font/google` lädt die Fonts **selbst-gehostet** (Next 16 spiegelt Google Fonts in den Build) — DSGVO-konform, kein Third-Party-Request.
- `display: "swap"` zeigt sofort System-Font, dann tauscht der Browser. Verhindert FOIT (Flash of Invisible Text).
- `variable` als Weight-Wert lädt die Variable-Font-Datei. Eine Datei statt 5–7 Weight-Dateien.
- `axes: ["opsz", "SOFT", "WONK"]` aktiviert die Fraunces-Spezialachsen — nur einbinden, wenn man sie tatsächlich nutzt (sonst Bytes sparen).
- `subsets: ["latin", "latin-ext"]` deckt Deutsch (Umlaute), Französisch, Polnisch, Tschechisch etc. ab. Reines `["latin"]` würde z. B. polnisch nicht abdecken.
- `className={`${urbanist.variable} ${fraunces.variable}`}` setzt **CSS-Variablen** auf `<html>` — keine direkten Klassen mit Schriftnamen.

### Schritt 2 — Token-Mapping aktualisieren (`packages/ui/src/styles/tokens/typography.css`)

```css
/* packages/ui/src/styles/tokens/typography.css */
@theme {
  --font-family-sans:
    var(--font-urbanist, "Urbanist"),
    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --font-family-accent:
    var(--font-fraunces, "Fraunces"),
    Georgia, "Times New Roman", Times, serif;

  --font-sans:   var(--font-family-sans);
  --font-accent: var(--font-family-accent);

  --font-weight-light:   300;
  --font-weight-regular: 400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;
  /* Optional: höhere Weights für Display-Headlines mit Fraunces */
  --font-weight-display: 800;
}
```

Der **Fallback-Stack** ist wichtig: falls die Variable nicht geladen wird (Network-Error, JS-Disabled, Fallback-Phase), greifen System-Serifs. Das verhindert, dass Akzent-Text in Urbanist „wegrutscht".

### Schritt 3 — Token-Spiegel & DESIGN.md synchronisieren

- `packages/ui/src/atoms/Typography/tokens.css` — falls dort font-family-Verweise liegen (aktuell nur via `var(--font-sans)`, also automatisch synchron).
- `DESIGN.md` § Typografie — den Akzent-Font-Eintrag von „Space Grotesk" auf „Fraunces" aktualisieren.

### Schritt 4 — Akzent-Variants nutzen

Nach dem Tausch greifen `accent-large` und `accent-small` automatisch auf Fraunces zu, weil die Klassen in `styles/components/typography.css` `font-family: var(--font-accent)` setzen:

```tsx
<Section size="xl">
  <Container size="xl">
    <Stack spacing="16">
      <Typography variant="accent-small" tone="muted">
        Editorial · Mai 2026
      </Typography>
      <Typography variant="clamp-large" balance>
        Wie ein Designsystem ein Team unterstützt
      </Typography>
      <Typography variant="accent-large" tone="muted">
        Eine Studie über stille Prozesse
      </Typography>
      <Typography variant="clamp-text" pretty maxW="65ch">
        Wenn Konsistenz nicht mehr verhandelt werden muss, beginnt Designarbeit
        wieder mit Fragen statt mit Werten.
      </Typography>
    </Stack>
  </Container>
</Section>
```

> **Visualisierung:** Headline in Urbanist Bold (geometrisch, klar, technisch), darüber ein Eyebrow in Fraunces Bold uppercase (warm, charaktervoll), darunter eine Subhead in Fraunces Medium. Der Kontrast zwischen geometrischem Headline-Sans und charakterstarkem Serif-Eyebrow ist die typische Editorial-Geste.

---

## Variable Fonts korrekt nutzen

Variable Fonts erlauben Achsen-Manipulation via `font-variation-settings`. Das geht über reine Weights weit hinaus.

### Fraunces-Achsen

| Achse | Range | Wirkung |
|-------|-------|---------|
| `wght` | 100–900 | Strichstärke |
| `opsz` | 9–144 | **Optical Size** — Glyphen werden für die Anzeigegröße optimiert (filigraner bei großen Größen, robuster bei kleinen) |
| `SOFT` | 0–100 | Weichheit der Endungen — 0 = scharf, 100 = sehr weich |
| `WONK` | 0–1 | „Wonkiness" — alternative Glyphen mit verspielten Details |

### Beispiel — Component-Token für Editorial-Display

**Datei:** `packages/ui/src/styles/components/editorial.css` (anlegen, falls noch nicht existent — und in `design-tokens.css` einbinden):

```css
@theme {
  --font-display-fraunces:
    "opsz" 96,    /* optisch für Display optimiert */
    "wght" 800,
    "SOFT" 30,
    "WONK" 1;     /* leichte Wonk-Geste */

  --font-editorial-fraunces:
    "opsz" 24,
    "wght" 500,
    "SOFT" 50,
    "WONK" 0;
}

@layer components {
  .typography-display-fraunces {
    font-family: var(--font-fraunces), serif;
    font-variation-settings: var(--font-display-fraunces);
    letter-spacing: -0.04em;
    line-height: 0.95;
  }
}
```

**Verwendung** (mit Custom-Class auf `Typography`-Komponente):

```tsx
<Typography
  variant="clamp-large"
  className="typography-display-fraunces"
  balance
  as="h1"
>
  Stillstand ist die Form, die Bewegung am wenigsten verbirgt.
</Typography>
```

> ⚠️ **`font-variation-settings` überschreibt `font-weight`.** Wer beides setzt, gewinnt der `font-variation-settings`-Wert. Daher in `--font-display-fraunces` immer auch `wght` mitführen.

### Performance-Hinweis

Variable Fonts sind eine **Datei pro Familie**, nicht pro Weight. Bei Urbanist + Fraunces → 2 woff2-Files (~50 KB gzipped) statt potenziell 10+. Das ist signifikant schneller als statische Weight-Files.

---

## Hierarchie-Patterns

Hierarchie entsteht aus drei Achsen: **Größe**, **Gewicht**, **Familie**. Die wirksamste Geste ist meist Familie (Sans → Serif), nicht Größe.

### Pattern 1 — Eyebrow + Headline + Lead

```tsx
<Stack spacing="16" maxW="55ch">
  <Typography variant="accent-small" tone="muted">
    Engineering · 6 Min Lesezeit
  </Typography>
  <Typography variant="clamp-large" balance>
    Wie wir Latenzen unter 50 ms gedrückt haben
  </Typography>
  <Typography variant="clamp-text" tone="muted" pretty>
    Eine Untersuchung zur Cache-Strategie und ihrer realen Wirkung im Produkt.
  </Typography>
</Stack>
```

Drei Hierarchie-Ebenen mit drei verschiedenen Schriftgrößen + zwei Familien (Eyebrow Fraunces, Rest Urbanist) + drei Tones (muted/default/muted).

### Pattern 2 — Card-Titel + Beschreibung

```tsx
<Card>
  <Stack spacing="8">
    <Typography variant="title-medium">Audit-Log exportieren</Typography>
    <Typography variant="body-medium" tone="muted">
      Lädt die letzten 30 Tage als CSV.
    </Typography>
  </Stack>
</Card>
```

Klein, aber konsistent: 18px Bold + 16px Regular muted. Dieselbe Geste in jeder Card — keine Card erfindet eigene Größen.

### Pattern 3 — Page-Titel mit Brand-Akzent (Inline)

```tsx
<Typography variant="title-large">
  Willkommen,{" "}
  <Typography variant="title-large" tone="brand" as="span">
    Albrecht
  </Typography>
</Typography>
```

Inline-Wechsel via `as="span"` und `tone="brand"`. Einziger Inline-Variant-Wechsel, der akzeptabel ist — sonst wird das HTML laut.

### Pattern 4 — Caps-Label als Funktional-Eyebrow

```tsx
<Stack spacing="8">
  <Typography variant="label-medium" tone="muted">
    Status
  </Typography>
  <Typography variant="title-medium">In Bearbeitung</Typography>
</Stack>
```

Form-Label-Pattern aus dem App-Kontext. `label-medium` ist 12px Bold uppercase mit `tracking-0.06em` — funktionaler Caps, kein dekorativer.

### Pattern 5 — Pull-Quote / Editorial-Block

```tsx
<Box as="blockquote" className="border-l-4 border-brand pl-24">
  <Typography variant="accent-large" balance pretty>
    „Wenn jeder Designwert einen Namen hat, hat jede Diskussion einen Anker."
  </Typography>
  <Typography variant="label-medium" tone="muted" className="mt-12">
    — Designsystem-Team, intern
  </Typography>
</Box>
```

Fraunces in Medium für die Quote, Urbanist Caps für die Attribution. Der Familien-Wechsel macht den Block visuell zur Citation.

---

## Lese-Ergonomie

### Zeilenbreite

| Kontext | Empfehlung |
|---------|------------|
| Body-Text (Marketing, Blog) | 60–75 Zeichen — `Container size="md"` (~672px) erreicht das mit `body-medium`. |
| Lead-Absatz (`clamp-text`) | 50–65 Zeichen — `maxW="55ch"`. |
| App-UI-Text in Cards | 40–55 Zeichen — wird durch Card-Breite begrenzt, kein expliziter `maxW` nötig. |

```tsx
<Typography variant="body-medium" pretty className="max-w-[65ch]">
  …
</Typography>
```

### `text-balance` vs. `text-pretty`

| CSS | Wann | Was passiert |
|-----|------|--------------|
| `text-balance` | Headlines, Hero-Texte (1–4 Zeilen) | Browser balanciert Zeilen so, dass die letzte nicht „zu lang" ist. Teuer — nur für **kurze** Texte. |
| `text-pretty` | Absätze, Body-Text | Browser vermeidet Witwen/Waisen. Günstig — kann auf langen Absätzen aktiv bleiben. |

**Heuristik:** `clamp-large`/`clamp-medium`/`title-*` → `balance`. `body-medium`/`clamp-text` → `pretty`.

### Truncate vs. Line-Clamp

```tsx
// 1-Zeiler mit Ellipsis
<Typography variant="body-medium" truncate>
  Sehr langer Text der nur eine Zeile haben soll
</Typography>

// Mehrere Zeilen — line-clamp via Tailwind-Utility
<Typography variant="body-medium" className="line-clamp-3">
  …
</Typography>
```

`truncate` ist im Atom als Prop verfügbar. `line-clamp-N` kommt aus Tailwind direkt.

### Lese-Indikatoren (Word-Count, Reading-Time)

Reading-Time wird als `accent-small` oder `label-medium` ausgegeben — niemals als `body`. Reading-Time ist Meta, nicht Inhalt.

```tsx
<Typography variant="label-medium" tone="muted">
  6 Min Lesezeit · 1.250 Wörter
</Typography>
```

---

## Internationalisierung & Sonderzeichen

### Subset-Strategie

`subsets: ["latin", "latin-ext"]` deckt fast alle europäischen Sprachen ab. Für **Cyrillic**, **Greek**, **Vietnamese** etc. zusätzliche Subsets laden:

```tsx
const urbanist = Urbanist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-urbanist",
  weight: "variable",
})
```

Jeder zusätzliche Subset → eigene Variable-Font-Datei. Nur laden, was wirklich angezeigt wird.

### Caps-Verhalten mit `ß` (Deutsch)

`label-medium` und `accent-small` haben `text-transform: uppercase` per CSS. Browser-Verhalten für `ß`:

- Modern: `ß` → `ẞ` (Capital Eszett, U+1E9E) — korrekt seit 2017 offiziell.
- Älter: `ß` → `SS` — zwei Zeichen, kann Layout brechen.

**Fix:** wenn Caps wichtig sind, das Wort bereits in Caps schreiben (`STRASSE` oder `STRAẞE`) oder in Designsystemen `font-variant-caps: all-small-caps` statt `text-transform` nutzen — aber das geht nur, wenn der Font Small-Caps mitliefert. Urbanist tut es nicht; Fraunces ja (über `ss01` Stylistic Set, je nach Version).

### Hyphenation

Für deutsche Texte mit langen Komposita (`Datenschutzgrundverordnung`):

```tsx
<Typography
  variant="body-medium"
  className="hyphens-auto"
  lang="de"
>
  Datenschutzgrundverordnungsgesetzgebungsverfahren
</Typography>
```

`lang="de"` ist Pflicht — der Browser nutzt sprach-spezifische Trennregeln.

### `lang`-Attribut

Wenn ein einzelnes Element in einer anderen Sprache ist:

```tsx
<Typography variant="body-medium">
  Wir folgen dem Prinzip{" "}
  <span lang="ja">侘寂</span> {" "}— wabi-sabi.
</Typography>
```

Screen-Reader sprechen das Wort dann korrekt aus, der Browser nutzt CJK-Fonts.

---

## Performance — CLS, Subsetting, Preload

### CLS verhindern (Cumulative Layout Shift)

Webfont lädt → Layout springt. Lösung: `next/font` legt automatisch eine **`adjustFontFallback`** an, die den System-Fallback so kalibriert, dass die Höhe **vor** und **nach** dem Font-Tausch identisch bleibt.

Das ist Default-Verhalten — funktioniert ohne Konfiguration. Wer eigene Fallbacks setzt, muss `adjustFontFallback: false` setzen und die Kalibrierung selbst übernehmen — meist nicht nötig.

### Preload

`next/font` setzt automatisch `<link rel="preload">` für alle Fonts, die im Layout referenziert sind. Wer einen Font nur auf einer einzelnen Page braucht, kann ihn dort lokal laden — dann wird **nur dort** geladen.

### Display-Strategie

| `display`-Wert | Verhalten |
|----------------|-----------|
| `swap` | System-Font sofort, tauscht beim Laden. Verhindert FOIT, erlaubt FOUT. **Default für Nezumi.** |
| `optional` | System-Font sofort, tauscht **nur**, wenn Webfont innerhalb 100ms fertig ist. Sonst System bleibt. Beste Performance, ungewohnte UX. |
| `fallback` | System 100ms, dann 3s Webfont-Chance. Konservativer Default. |
| `block` | 3s warten — niemals nutzen. |

### Bundle-Größen-Check

```bash
# Welche Variable-Font-Files lädt die Page wirklich?
pnpm --filter homepage build
# In .next/static/media/ liegen die woff2-Files.
ls -lh apps/homepage/.next/static/media/
```

Erwartung: 2 Variable-Font-Files (Urbanist Latin-Ext, Fraunces Latin-Ext), zusammen ~50–80 KB gzipped. Mehr → wahrscheinlich werden Subsets/Achsen geladen, die nicht benötigt sind.

---

## Edge Cases & Troubleshooting

| Symptom | Ursache | Fix |
|---------|---------|-----|
| Kein Sans-Font sichtbar — alles in Times | `--font-urbanist` ist nicht auf `<html>` gesetzt | `className={urbanist.variable}` auf `<html>` prüfen. |
| Fraunces wird nicht geladen | `variable: "--font-fraunces"` fehlt oder `axes` falsch | `next/font`-Konfiguration prüfen, `pnpm dev` neu starten. |
| Schrift „springt" beim Laden (CLS) | Fallback-Adjustment greift nicht | `next/font` korrekt verwenden — keine selbst gehosteten `<link>`-Tags daneben. |
| `<Typography variant="clamp-large">` rendert in feststehender Größe | `clamp()` wird in `<table>` oder `<flex>`-Containern teils fix berechnet | In einen Block-Container heben (`<Box display="block">`). |
| Caps-Label zeigt `STRASSE` statt `STRAẞE` | Browser-Default für `text-transform: uppercase` mit `ß` | Wort manuell in Caps schreiben oder `font-variant-caps` nutzen. |
| Variable Font lädt, aber Achse `WONK` wirkt nicht | `axes: ["WONK"]` fehlt im `next/font`-Loader | Achse explizit in `axes` listen — sonst wird sie aus dem Subset entfernt. |
| `font-variation-settings` und `font-weight` widersprechen sich | `font-variation-settings: "wght" 800` überschreibt `font-weight: 400` | Eines von beiden — bei Variation-Settings auch `wght` mitführen. |
| Tracking auf Body wirkt zu eng | Body-Variants haben `0.012em` — bewusst leicht offen | Nicht überschreiben. Wer enger will, hat einen anderen Variant gemeint. |
| Mobile-Hero-Headline bricht in 5 Zeilen | `clamp-large` rendert mobile mit 40px, langer Text reicht nicht | `<Typography balance>` setzen, ggf. `Container size="md"`. |
| Polish-/Tschechisch-Buchstaben fehlen | `subsets: ["latin"]` ist zu schmal | `["latin", "latin-ext"]` nutzen. |
| Webfont lädt erst nach Hydration | Page ist `"use client"` und ohne Layout | Fonts werden in `app/layout.tsx` (Server) geladen — niemals in Client-Komponenten. |
| Akzent-Font erscheint überall, nicht nur in `accent-*` | `--font-sans` zeigt versehentlich auf Fraunces | `tokens/typography.css`: `--font-sans: var(--font-family-sans)` muss auf Urbanist zeigen. |
| `<h1>` mehrfach pro Page | `clamp-large` und `title-large` haben beide `h1` als Default | Einer der beiden via `as="h2"` umschreiben. |
| Headline endet mit alleinstehendem Wort | `text-balance` fehlt | `<Typography variant="clamp-large" balance>` setzen. |
| `truncate` schneidet nicht | Container hat keine feste Breite | Eltern-`Box` braucht `maxW` oder ein flex-min-w-0-Pattern. |

---

## Anti-Patterns

| ❌ Anti-Pattern | ✅ Stattdessen |
|----------------|----------------|
| `<h1 className="text-3xl font-bold">` | `<Typography variant="title-large" />` |
| `<p className="text-gray-500 text-sm">` | `<Typography variant="label-large" tone="muted" />` |
| Eigene Schriftgröße per `text-[19px]` | Variant wählen oder Variant ergänzen |
| `style={{ fontFamily: "Urbanist" }}` | Variant nutzen oder `className="font-sans"` |
| Drei `<Typography>` mit unterschiedlichen Variants übereinander | Eine `Stack`-Hierarchie mit dem korrekten Pattern |
| `text-balance` auf jedem Body-Text | Nur auf Headlines |
| `tone="info"` für „blauen Schmuck-Text" | Tone ist semantisch — Default für Inhalt |
| `font-bold` als Override auf `body-medium` | Eigener Variant oder `<strong>` in Children |
| `<span style={{ textTransform: "uppercase" }}>` | `variant="label-medium"` oder `accent-small` |
| Hardcoded Hex-Farben für Text | `tone="…"` |
| Eigene Schriftfamilie pro Komponente | Maximal zwei Familien, im Tokensystem definiert |
| Variable Font + statische Weight-Datei für dieselbe Familie | Variable Font allein |

---

## Reviewer-Checkliste

Vor dem Merge eines Typografie-PRs:

- [ ] Alle Texte gehen durch `<Typography>` — keine raw `<h1>`, `<p>`, `<span>` mit Style-Klassen.
- [ ] `variant` ist gesetzt; `as` nur wenn semantischer Tag vom Default abweicht.
- [ ] Genau ein `<h1>` pro Page (per `as="h2"` korrigieren, falls zwei Variants beide `h1` defaulten).
- [ ] `tone` wird semantisch verwendet, nicht dekorativ.
- [ ] Headlines haben `balance`, lange Absätze haben `pretty`.
- [ ] Body-Text ist auf 60–75 Zeichen begrenzt (`maxW="65ch"` oder Container).
- [ ] Lead-Absätze nutzen `clamp-text`, Body-Absätze `body-medium`.
- [ ] Eyebrows/Caps-Labels nutzen `label-medium` oder `accent-small` — kein `uppercase` auf Body.
- [ ] `next/font/google` lädt Fonts mit `variable: "--font-…"` und `display: "swap"`.
- [ ] Beide Font-Variablen sind auf `<html>` gesetzt (`className="${urbanist.variable} ${fraunces.variable}"`).
- [ ] `subsets` enthält `"latin-ext"` für deutsche Sonderzeichen.
- [ ] Bei Variable Fonts: nur Achsen geladen, die wirklich genutzt werden.
- [ ] Keine `font-family`-Inline-Styles — immer über CSS-Variablen.
- [ ] Bei Token-Änderungen: `styles/components/typography.css` **und** `atoms/Typography/tokens.css` synchron + DESIGN.md aktualisiert.
- [ ] Lange Komposita haben `lang="de"` und `hyphens-auto`.

Wenn alle Punkte ✅, ist der Typografie-Anteil ready to merge.

---

## Anhang: Variant-Quick-Reference

| Variant | Default-Tag | Familie | Größe | LH | Tracking | Use Case |
|---------|-------------|---------|-------|----|----|----------|
| `clamp-large` | `h1` | Sans | 40–72px fluid | 0.98 | -0.055em | Hero |
| `clamp-medium` | `h2` | Sans | 32–52px fluid | 1.05 | -0.055em | Section-Headline |
| `clamp-small` | `h3` | Sans | 24–36px fluid | 1.12 | -0.055em | Sub-Section |
| `clamp-text` | `p` | Sans | 16–20px fluid | 1.5 | -0.055em | Lead |
| `title-large` | `h1` | Sans | 22px | 28px | 0 | App-Page-Titel |
| `title-medium` | `h2` | Sans | 18px | 24px | 0 | Card-Titel |
| `body-medium` | `p` | Sans | 16px | 24px | 0.012em | Body |
| `label-large` | `span` | Sans | 14px | 20px | 0.02em | Form-Label, Button |
| `label-medium` | `span` | Sans | 12px CAPS | 16px | 0.06em | Eyebrow, Status |
| `accent-large` | `h3` | Akzent (Fraunces) | 20px | 28px | -0.01em | Editorial-Subhead |
| `accent-small` | `span` | Akzent (Fraunces) | 13px CAPS | 18px | 0.08em | Editorial-Eyebrow |

---

> **Verwandte SSOTs:**
> - Visuelle Tokens: [`DESIGN.md`](./DESIGN.md)
> - Token-Hands-on: [`DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md`](./DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md)
> - Layout-SSOT: [`SSOT_LAYOUT.md`](./SSOT_LAYOUT.md)
> - Agenten-Konventionen: [`AGENTS.md`](./AGENTS.md) · [`CLAUDE.md`](./CLAUDE.md)
