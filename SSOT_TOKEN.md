# Design Tokens, die 2026 skalieren

**Tailwind v4 + CSS Variables + Framer Motion — Enterprise-Pattern für Nezumi-Template**

> Stand: Mai 2026 · Tailwind 4.2.x · Next.js 16.2.x · React 19.2.x · Framer Motion 12.x
>
> Dieses Dokument ist ein **Hands-on / How-to** für das Nezumi-Template. Alle Codebeispiele verwenden die echten Tokens aus [`DESIGN.md`](./DESIGN.md) und die Pfade aus `packages/ui/src/styles/`. Es ist gleichzeitig **Onboarding** für neue Contributor und **Referenz** für Reviewer.

---

## Inhalt

1. [TL;DR — die 7 Regeln](#tldr--die-7-regeln)
2. [Mentales Modell — die Token-Pyramide](#mentales-modell--die-token-pyramide)
3. [Datenfluss — von DESIGN.md bis JSX](#datenfluss--von-designmd-bis-jsx)
4. [Die SOLL-Datei-Kette](#die-soll-datei-kette)
5. [Layer 1 — Primitive Tokens](#layer-1--primitive-tokens)
6. [Layer 2 — Semantische Tokens](#layer-2--semantische-tokens)
7. [Layer 3 — Component Tokens](#layer-3--component-tokens)
8. [App-Integration (Next.js 16 + Tailwind v4)](#app-integration-nextjs-16--tailwind-v4)
9. [Dark Mode als Token-Override](#dark-mode-als-token-override)
10. [Motion Tokens für Framer Motion](#motion-tokens-für-framer-motion)
11. [Anti-Drift-Checkliste](#anti-drift-checkliste)
12. [Hands-on: Eine neue Komponente tokenkonform bauen](#hands-on-eine-neue-komponente-tokenkonform-bauen)
13. [Hands-on: Eine neue App im Monorepo](#hands-on-eine-neue-app-im-monorepo)
14. [Stolperfallen Mai 2026](#stolperfallen-mai-2026)

---

## TL;DR — die 7 Regeln

| # | Regel | Warum |
|---|-------|-------|
| 1 | **`@theme` ist das Vertragsformat.** Nur dort registrierte Custom Properties werden zu Tailwind-Utilities. | `:root`-Variablen sind Runtime-Werte, aber keine API. |
| 2 | **Drei Schichten — keine Abkürzungen.** Primitive → Semantic → Component → JSX. | Refactors bleiben lokal. Theme-Wechsel sind Runtime, keine Migration. |
| 3 | **JSX kennt nur die semantische Ebene.** `bg-surface`, `text-text`, `bg-brand` — niemals `bg-nezumi-sabi` oder `bg-[#47585c]`. | Design Drift wird dadurch im Review sofort sichtbar. |
| 4 | **Dark Mode überschreibt Tokens, nicht Komponenten.** `.dark { --color-surface: … }`. | Eine Theme-Quelle, nicht N. |
| 5 | **OKLCH als Farbraum, sRGB-Hex als Authoring-Eingabe.** `DESIGN.md` führt Hex; das CSS speichert OKLCH. | `color-mix()` und Theming bleiben tonal stabil. |
| 6 | **Motion ist ein Token-Namespace.** `--duration-*` und `--ease-*` werden in CSS und Framer Motion identisch konsumiert. | Konsistente Bewegung über CSS-Transitions und JS-Animationen. |
| 7 | **Component Tokens nur bei echter Variantenlogik.** Hover/Active/Selected — sonst zurück in die semantische Ebene. | Verhindert pseudo-semantische Token-Inflation. |

---

## Mentales Modell — die Token-Pyramide

```text
                       ┌─────────────────────────┐
                       │        JSX / TSX        │  ← bg-brand text-text p-16 duration-normal
                       └────────────┬────────────┘
                                    │ konsumiert nur Utilities
                       ┌────────────┴────────────┐
                       │   Component Tokens      │  ← --color-button-brand-hover
                       │   (components/*.css)    │     --radius-card, --shadow-toast
                       └────────────┬────────────┘
                                    │ kombiniert / mischt
                       ┌────────────┴────────────┐
                       │   Semantic Tokens       │  ← --color-brand, --color-surface
                       │   (semantic/*.css)      │     --space-content, --color-error-bg
                       └────────────┬────────────┘
                                    │ benennt
                       ┌────────────┴────────────┐
                       │   Primitive Tokens      │  ← --color-nezumi-sabi
                       │   (tokens/*.css)        │     --spacing-16, --duration-normal
                       └─────────────────────────┘
                                    │
                       ┌────────────┴────────────┐
                       │      DESIGN.md          │  ← visuelle SSOT (Hex + OKLCH)
                       └─────────────────────────┘
```

**Faustregel zum Schichtwechsel:** Wenn du beim Schreiben einer Komponente einen Wert tippst, der nicht in `bg-*`, `text-*`, `border-*`, `space-*`, `duration-*`, `ease-*`, `radius-*`, `shadow-*` aus der semantischen Ebene existiert, fehlt ein Token — **kein Arbitrary Value**, sondern erst eine Token-Diskussion.

---

## Datenfluss — von DESIGN.md bis JSX

```text
DESIGN.md  (visuelle SSOT, Hex-Authoring)
   │
   ▼
packages/ui/src/styles/tokens/*.css        ← Layer 1: Primitives (OKLCH)
   │
   ▼
packages/ui/src/styles/semantic/*.css      ← Layer 2: Semantik
   │
   ▼
packages/ui/src/styles/components/*.css    ← Layer 3: Component-Varianten
   │
   ▼
packages/ui/src/styles/design-tokens.css   ← Bündel-Entry (importiert alle Layer + .dark Override)
   │   exports["./design-tokens.css"]
   ▼
apps/<app>/app/globals.css                 ← App-Entry (@import "tailwindcss" + Bündel + @source)
   │
   ▼
apps/<app>/app/layout.tsx                  ← <body className="bg-surface text-text">
   │
   ▼
React-Komponente (JSX)                     ← bg-brand, text-text, duration-normal, …
```

Der Fluss ist **strikt einseitig**. Designwerte fließen abwärts. App-Code definiert keine eigenen Designwerte — er konsumiert die API.

---

## Die SOLL-Datei-Kette

Diese Tabelle ist der vollständige Vertrag. Jede Datei hat genau einen Zweck. Wer eine zweite Datei für denselben Zweck erstellt, verletzt den Vertrag.

| # | SOLL-Pfad | Layer | Zweck |
|---|-----------|-------|-------|
| 1 | `DESIGN.md` | — | Visuelle SSOT. Authoring-Format (Hex), Beschriftung, Farb-Slugs. |
| 2 | `packages/ui/src/styles/tokens/breakpoints.css` | 1 | Responsive-Anker (`md`, `lg`). |
| 3 | `packages/ui/src/styles/tokens/colors.css` | 1 | `--color-nezumi-*` als OKLCH. |
| 4 | `packages/ui/src/styles/tokens/spacing.css` | 1 | `--spacing-{0..128}` rem-Skala. |
| 5 | `packages/ui/src/styles/tokens/radius.css` | 1 | `--radius-{none..3xl,full}`. |
| 6 | `packages/ui/src/styles/tokens/shadows.css` | 1 | `--shadow-{sm..2xl,inner,none}`. |
| 7 | `packages/ui/src/styles/tokens/motion.css` | 1 | `--duration-*`, `--ease-*`, `--stagger-*`. |
| 8 | `packages/ui/src/styles/tokens/typography.css` | 1 | Font-Familien, Font-Weights. |
| 9 | `packages/ui/src/styles/semantic/colors.css` | 2 | `--color-brand`, `--color-text`, `--color-surface`, Status-BG. |
| 10 | `packages/ui/src/styles/semantic/spacing.css` | 2 | `--space-content`, `--space-section`, `--space-page`. |
| 11 | `packages/ui/src/styles/components/typography.css` | 3 | Atom-Skalen (`--typography-title-large-*` etc.). |
| 12 | `packages/ui/src/styles/components/button.css` | 3 | Button-Varianten (Hover/Active). |
| 13 | `packages/ui/src/styles/components/badge.css` | 3 | Badge-Tokens. |
| 14 | `packages/ui/src/styles/components/card.css` | 3 | Card-Tokens. |
| 15 | `packages/ui/src/styles/components/input.css` | 3 | Input-Tokens. |
| 16 | `packages/ui/src/styles/components/textarea.css` | 3 | Textarea-Tokens. |
| 17 | `packages/ui/src/styles/components/tooltip.css` | 3 | Tooltip-Tokens. |
| 18 | `packages/ui/src/styles/components/toast.css` | 3 | Toast (Status-Surface/Border/Text). |
| 19 | `packages/ui/src/styles/components/sonner.css` | 3 | Sonner-Notifications. |
| 20 | `packages/ui/src/styles/components/toggle.css` | 3 | Toggle (Selected/Hover). |
| 21 | `packages/ui/src/styles/components/toggle-group.css` | 3 | Toggle-Group-Gap. |
| 22 | `packages/ui/src/styles/components/sidebar.css` | 3 | Sidebar (Width, Padding, Item-States). |
| 23 | `packages/ui/src/styles/components/editorial-blossom.css` | 3 | Homepage-Lab-Effekt. |
| 24 | `packages/ui/src/styles/design-tokens.css` | Bundle | Importiert 1–3, definiert `.dark`-Override + `@source inline()` Safelists + `@layer base`. |
| 25 | `packages/ui/package.json` (`exports`) | — | `"./design-tokens.css": "./src/styles/design-tokens.css"`. |
| 26 | `apps/<app>/app/globals.css` | App | `@import "tailwindcss"` + `@custom-variant dark` + `@source` + `@import "@packages/ui/design-tokens.css"`. |
| 27 | `apps/<app>/postcss.config.mjs` | App | `{ plugins: { "@tailwindcss/postcss": {} } }`. |
| 28 | `apps/<app>/next.config.ts` | App | `transpilePackages: ["@packages/ui"]`. |
| 29 | `apps/<app>/app/layout.tsx` | App | `<body className="bg-surface text-text">` + Font-CSS-Variablen. |

---

## Layer 1 — Primitive Tokens

**Primitive haben keine Bedeutung, nur einen Namen und einen Wert.** Sie sind das Vokabular, aus dem Semantik gebaut wird. In Nezumi sind sie nach japanischen Farb-Slugs benannt — das ist Absicht: Slugs wie `sabi`, `koi`, `ume` haben keine UI-Konnotation und können daher in jeder Rolle eingesetzt werden, ohne sprachlich vorzubelegen.

### 1.1 Farben — `tokens/colors.css`

```css
/* packages/ui/src/styles/tokens/colors.css */
@theme {
  --color-*: initial;

  --color-nezumi-akatsuki: oklch(0.8606 0.0143 304.11);  /* #d3cfd9 */
  --color-nezumi-bg:       oklch(0.9671 0.0041 91.45);   /* #f5f4f1 */
  --color-nezumi-budo:     oklch(0.4961 0.0327 343.08);  /* #705b67 */
  --color-nezumi-cha:      oklch(0.7055 0.0204 67.49);   /* #a99e93 */
  --color-nezumi-chigusa:  oklch(0.8485 0.0258 168.12);  /* #bed3ca */
  --color-nezumi-fuji:     oklch(0.7331 0.0445 286.73);  /* #a6a5c4 */
  --color-nezumi-fukagawa: oklch(0.7095 0.0362 137.12);  /* #97a791 */
  --color-nezumi-fukagawa-deep: oklch(0.5019 0.0713 140.68); /* #4d6e47 */
  --color-nezumi-genji:    oklch(0.6082 0.0113 345.62);  /* #888084 */
  --color-nezumi-kinu:     oklch(0.8936 0.0082 98.89);   /* #dddcd6 */
  --color-nezumi-koi:      oklch(0.4096 0.0398 304.50);  /* #4f455c */
  --color-nezumi-line:     oklch(0.8665 0.0056 95.11);   /* #d4d3cf */
  --color-nezumi-minato:   oklch(0.6621 0.0275 205.75);  /* #80989b */
  --color-nezumi-paper:    oklch(0.9818 0.0054 95.10);   /* #faf9f5 */
  --color-nezumi-sakura:   oklch(0.9133 0.0135 340.57);  /* #e9dfe5 */
  --color-nezumi-sabi:     oklch(0.4475 0.0220 213.59);  /* #47585c */
  --color-nezumi-snow:     oklch(1.0000 0.0000 0.00);    /* #ffffff */
  --color-nezumi-ume:      oklch(0.7208 0.0474 6.27);    /* #c099a0 */

  /* Status-Tints */
  --color-nezumi-d-destructive: oklch(0.5248 0.1009 30.44);  /* #9c5246 */
  --color-nezumi-d-error-dark:  oklch(0.6900 0.1295 29.54);  /* #e07a6b */

  /* Dark-Surfaces */
  --color-nezumi-dark-bg:           oklch(0.1773 0.0087 307.92); /* #121014 */
  --color-nezumi-dark-raised:       oklch(0.2130 0.0083 308.03); /* #1a181c */
  --color-nezumi-dark-subtle:       oklch(0.2558 0.0079 308.12); /* #242226 */
  --color-nezumi-dark-muted:        oklch(0.2775 0.0084 317.71); /* #2a272b */
  --color-nezumi-dark-line:         oklch(0.3442 0.0074 308.22); /* #3a383c */
  --color-nezumi-dark-secondary-bg: oklch(0.3755 0.0198 352.96); /* #4a3d42 */
}
```

> 💡 **Warum `--color-*: initial` zuerst?**
> Das löscht Tailwinds Default-Palette (Slate/Zinc/Sky/…). Ohne dieses Reset stünden `bg-blue-600`, `text-gray-500` etc. weiterhin als Klassen zur Verfügung — und würden im Review als Bug durchrutschen, weil sie syntaktisch valide sind, aber außerhalb des Systems liegen. Nach dem Reset existiert nur noch, was in Nezumi explizit definiert ist.

> 💡 **Warum Hex-Kommentare neben OKLCH?**
> `DESIGN.md` führt Hex als Authoring-Format. Designer arbeiten in Figma mit sRGB-Hex. Der Kommentar erlaubt Diff-Reviews zwischen Figma und Code, ohne ein Konvertierungs-Tool zu öffnen.

### 1.2 Spacing — `tokens/spacing.css`

```css
/* packages/ui/src/styles/tokens/spacing.css */
@theme {
  --spacing: initial;
  --spacing-0:   0rem;
  --spacing-1:   0.0625rem;  /* 1px */
  --spacing-2:   0.125rem;   /* 2px */
  --spacing-4:   0.25rem;    /* 4px */
  --spacing-8:   0.5rem;     /* 8px */
  --spacing-12:  0.75rem;    /* 12px */
  --spacing-16:  1rem;       /* 16px */
  --spacing-24:  1.5rem;     /* 24px */
  --spacing-32:  2rem;       /* 32px */
  --spacing-40:  2.5rem;     /* 40px */
  --spacing-48:  3rem;       /* 48px */
  --spacing-56:  3.5rem;     /* 56px */
  --spacing-64:  4rem;       /* 64px */
  --spacing-80:  5rem;       /* 80px */
  --spacing-96:  6rem;       /* 96px */
  --spacing-112: 7rem;       /* 112px */
  --spacing-128: 8rem;       /* 128px */
}
```

Die Skala ist **pixel-benannt, rem-getypt**. Pixel im Namen, weil Designer in Figma in Pixel denken. Rem im Wert, weil Browser-Zoom und User-Schriftgrößen respektiert werden müssen.

### 1.3 Radius / Shadows / Breakpoints / Typography

| Datei | Kerntoken |
|-------|-----------|
| `tokens/radius.css` | `--radius-{none, sm:4, md:6, lg:8, xl:12, 2xl:16, 3xl:24, full}` |
| `tokens/shadows.css` | `--shadow-{sm, md, lg, xl, 2xl, inner, none}` |
| `tokens/breakpoints.css` | `--breakpoint-md: 48rem`, `--breakpoint-lg: 64rem` (alle anderen `initial`) |
| `tokens/typography.css` | `--font-family-sans` (Urbanist), `--font-family-accent` (Space Grotesk), `--font-weight-{light, regular, medium, bold}` |

> 💡 **Breakpoints bewusst kürzen.** Tailwind v4 erzeugt Utility-Permutationen pro Breakpoint. Mit nur `md` und `lg` bleibt das CSS klein und Designentscheidungen werden auf zwei sinnvolle Anker gezwungen — statt pro Komponente zwischen `sm`, `md`, `lg`, `xl`, `2xl` zu jonglieren.

---

## Layer 2 — Semantische Tokens

**Semantik gibt Primitives Bedeutung.** Diese Ebene ist die einzige, die in JSX referenziert wird.

### 2.1 Farben — `semantic/colors.css`

```css
/* packages/ui/src/styles/semantic/colors.css */
@theme {
  /* Brand & Akzent */
  --color-brand:       var(--color-nezumi-sabi);
  --color-on-brand:    var(--color-nezumi-paper);
  --color-brand-bg:    var(--color-nezumi-minato);
  --color-on-brand-bg: var(--color-nezumi-koi);

  --color-secondary:    var(--color-nezumi-ume);
  --color-on-secondary: var(--color-nezumi-koi);
  --color-secondary-bg: var(--color-nezumi-sakura);
  --color-accent:       var(--color-nezumi-fuji);

  /* Text */
  --color-text:       var(--color-nezumi-koi);
  --color-text-muted: var(--color-nezumi-genji);

  /* Surfaces */
  --color-surface:               var(--color-nezumi-bg);
  --color-surface-raised:        var(--color-nezumi-snow);
  --color-surface-raised-subtle: var(--color-nezumi-akatsuki);
  --color-surface-muted:         var(--color-nezumi-kinu);

  --color-border: var(--color-nezumi-line);

  /* Status */
  --color-success:  var(--color-nezumi-fukagawa-deep);
  --color-warning:  var(--color-nezumi-cha);
  --color-error:    var(--color-nezumi-d-destructive);
  --color-on-error: var(--color-nezumi-snow);
  --color-info:     var(--color-nezumi-minato);

  /* Status-Backgrounds via color-mix in OKLCH */
  --color-success-bg: color-mix(in oklch, var(--color-success) 12%, var(--color-surface));
  --color-warning-bg: color-mix(in oklch, var(--color-warning) 15%, var(--color-surface));
  --color-error-bg:   color-mix(in oklch, var(--color-error)   12%, var(--color-surface));
  --color-info-bg:    color-mix(in oklch, var(--color-info)    12%, var(--color-surface));

  /* Focus-Ring */
  --focus-ring-width:  1px;
  --focus-ring-offset: 2px;
  --focus-ring-color:  var(--color-text);
  --color-ring:        var(--focus-ring-color);

  /* shadcn/ui Aliasing — gleicher Wert, andere Namen */
  --color-background:           var(--color-surface);
  --color-foreground:           var(--color-text);
  --color-card:                 var(--color-surface-raised);
  --color-card-foreground:      var(--color-text);
  --color-popover:              var(--color-surface-raised);
  --color-popover-foreground:   var(--color-text);
  --color-primary:              var(--color-brand);
  --color-primary-foreground:   var(--color-on-brand);
  --color-secondary-foreground: var(--color-on-secondary);
  --color-muted:                var(--color-surface-muted);
  --color-muted-foreground:     var(--color-text-muted);
  --color-accent-foreground:    var(--color-text);
  --color-destructive:          var(--color-error);
  --color-destructive-foreground: var(--color-on-error);
  --color-input:                var(--color-border);
}
```

> 💡 **Das `color-mix(in oklch, …)`-Muster** für Status-Backgrounds ist der Schlüssel zu tonal stimmigen Light/Dark-Surfaces. Statt einer harten Beimischung (`#fff8f8`) wird ein perzeptuell konsistenter Mix erzeugt. Im Dark Mode (siehe unten) wird derselbe Mix mit höherem Anteil (25 % statt 12 %) gerendert — die Status-Farbe bleibt erkennbar, ohne den dunklen Untergrund zu überstrahlen.

> 💡 **Warum gibt es `--color-background` und `--color-surface`?**
> shadcn/ui erwartet bestimmte Variablennamen. Statt die Komponenten zu forken, aliasen wir Nezumi-Semantik auf shadcn-Namen. So bleibt sowohl `bg-surface` (Nezumi-Idiom) als auch `bg-background` (shadcn-Idiom) funktional — beide zeigen auf denselben Wert.

### 2.2 Spacing — `semantic/spacing.css`

```css
/* packages/ui/src/styles/semantic/spacing.css */
@theme {
  --space-content: var(--spacing-16);  /* Innerhalb einer Card / Section */
  --space-section: var(--spacing-48);  /* Zwischen Sections einer Page */
  --space-page:    var(--spacing-64);  /* Page-Frame, Hero-Padding */
}
```

Drei semantische Stufen reichen. Mehr Stufen ohne klare Bedeutung führen zu „padding-Slot-Auswahl per Bauchgefühl“.

---

## Layer 3 — Component Tokens

**Component Tokens existieren nur, wenn ein Wert Variantenlogik trägt** (Hover, Active, Selected, Loading) oder Komponenten-eigenes Padding/Sizing definiert. Eine reine Wiederholung eines semantischen Tokens (`--color-card-text: var(--color-text)`) ist erlaubt, weil sie eine API stabilisiert: Wenn morgen Cards einen leicht abweichenden Text-Ton bekommen, wird nur dieses eine Token gedreht.

### Beispiel: `components/button.css`

```css
/* packages/ui/src/styles/components/button.css */
@theme {
  --radius-button:        var(--radius-sm);
  --spacing-button-gap:   var(--spacing-8);
  --spacing-button-sm:    var(--spacing-32);
  --spacing-button-md:    var(--spacing-40);
  --spacing-button-lg:    var(--spacing-48);
  --spacing-button-xl:    var(--spacing-56);
  --spacing-button-icon:  var(--spacing-40);
  --spacing-button-sm-x:  var(--spacing-16);
  --spacing-button-md-x:  var(--spacing-24);
  --spacing-button-lg-x:  var(--spacing-32);
  --spacing-button-xl-x:  var(--spacing-40);
  --font-weight-button:   var(--font-weight-medium);

  --color-button-brand-hover:    color-mix(in oklch, var(--color-brand)     88%, var(--color-text));
  --color-button-brand-active:   color-mix(in oklch, var(--color-brand)     78%, var(--color-text));
  --color-button-secondary-hover: color-mix(in oklch, var(--color-secondary) 82%, var(--color-text));
  --color-button-secondary-active: color-mix(in oklch, var(--color-secondary) 72%, var(--color-text));
  --color-button-error-hover:    color-mix(in oklch, var(--color-error) 85%, var(--color-surface));
  --color-button-error-active:   color-mix(in oklch, var(--color-error) 74%, var(--color-surface));
  --color-button-outline-hover:  var(--color-surface-raised-subtle);
  --color-button-outline-active: var(--color-surface-muted);
  --color-button-ghost-hover:    var(--color-surface-muted);
  --color-button-ghost-active:   var(--color-surface-raised-subtle);
  --color-button-elevated-hover: var(--color-surface-raised-subtle);
  --color-button-elevated-active: var(--color-surface-muted);
}
```

**Was hier korrekt ist:**

- Sizing-Tokens (`--spacing-button-md`, `…-md-x`) bündeln eine Variante (Höhe + horizontales Padding), statt jede Größe in CVA-Klassen zu duplizieren.
- Hover/Active werden via `color-mix` automatisch aus dem Brand-Token abgeleitet — wer morgen `--color-brand` ändert, dreht alle vier Hover/Active-States passend mit.
- Outline/Ghost/Elevated greifen auf semantische Surface-Tokens zurück, statt eigene Grautöne zu erfinden.

### Weitere Komponenten (vollständige Tokens in [`DESIGN.md`](./DESIGN.md))

| Komponente | Datei | Charakteristische Tokens |
|------------|-------|--------------------------|
| Badge | `components/badge.css` | `--radius-badge: var(--radius-full)`, `--text-badge: 0.75rem` |
| Card | `components/card.css` | `--radius-card`, `--shadow-card`, `--spacing-card-*-padding` |
| Input | `components/input.css` | `--spacing-input-height`, `--color-input-ring` |
| Textarea | `components/textarea.css` | `--spacing-textarea-min` |
| Tooltip | `components/tooltip.css` | `--shadow-tooltip: var(--shadow-md)` |
| Toast | `components/toast.css` | `--color-toast-{success,warning,error,info}-{surface,border,text}` |
| Sonner | `components/sonner.css` | wie Toast, plus Action/Cancel-Slots |
| Toggle | `components/toggle.css` | `--color-toggle-selected-{surface,text}` |
| Sidebar | `components/sidebar.css` | `--spacing-sidebar-{width,collapsed-width}` |
| Typography | `components/typography.css` | `--typography-{title,body,label,accent,clamp}-*` |

---

## App-Integration (Next.js 16 + Tailwind v4)

Der UI-Layer ist nur dann erreichbar, wenn die App-Seite drei Pflichten erfüllt: PostCSS-Plugin, CSS-Entry, Next-Transpile.

### `apps/<app>/postcss.config.mjs`

```js
/** @type {import("postcss-load-config").Config} */
export default {
  plugins: { "@tailwindcss/postcss": {} },
}
```

Tailwind v4 hat **keine** `tailwind.config.{js,ts}` mehr. Der alte v3-Plugin (`tailwindcss`) ist v4-inkompatibel.

### `apps/<app>/app/globals.css`

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

/* @source-Pfade sind RELATIV ZU DIESER CSS-DATEI.
   Tailwind v4 scannt nicht automatisch ins Monorepo hinein. */
@source "../../../packages/ui/src";
@source "../";

@import "@packages/ui/design-tokens.css";
```

Drei v4-Stolperfallen, die mit dieser Datei behoben sind:

1. **`@source "../../../packages/ui/src"`** — ohne diese Zeile fehlen alle Klassen aus dem geteilten UI-Paket im Build, ohne Fehlermeldung.
2. **`@import "@packages/ui/design-tokens.css"`** funktioniert über den `exports`-Subpath in `packages/ui/package.json` — Apps müssen den Monorepo-Pfad nicht kennen.
3. **`@custom-variant dark (&:where(.dark, .dark *))`** ersetzt den v3-Schalter `darkMode: "class"`. Ohne diese Zeile fällt v4 auf `prefers-color-scheme` zurück, was sich nicht via JS-Toggle steuern lässt.

### `apps/<app>/next.config.ts`

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@packages/ui"],
}

export default nextConfig
```

Ohne `transpilePackages` versucht Next, das TSX aus dem UI-Paket als rohes ESM zu importieren — und scheitert an JSX. Auch unter Turbopack (Next 16) ist das der einzige unterstützte Weg.

### `packages/ui/package.json` (Auszug)

```jsonc
{
  "name": "@packages/ui",
  "exports": {
    "./design-tokens.css":  "./src/styles/design-tokens.css",
    "./components/button":  "./src/components/button.tsx",
    "./layout":             "./src/layout/index.ts",
    "./lib/utils":          "./src/lib/utils.ts"
  },
  "sideEffects": ["./src/styles/**/*.css"],
  "peerDependencies": {
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "tailwindcss": "^4.2.4",
    "framer-motion": "^12.0.0"
  },
  "peerDependenciesMeta": {
    "tailwindcss":   { "optional": true },
    "framer-motion": { "optional": true }
  }
}
```

- **`sideEffects: ["…css"]`** verhindert, dass Tree-Shaking die Token-CSS rauswirft.
- **Tailwind und Framer als optionale Peers**, weil das Paket selbst nicht bundled — die App prozessiert.
- **Subpath-Exports statt Barrel.** `import { Button } from "@packages/ui/components/button"` lädt nur diese Datei.

---

## Dark Mode als Token-Override

Dark Mode ist **kein zweites Stylesheet**. Es ist **ein zweiter Wert auf bestehenden semantischen Variablen**.

```css
/* packages/ui/src/styles/design-tokens.css (Auszug) */
.dark {
  --color-brand:       var(--color-nezumi-minato);
  --color-on-brand:    var(--color-nezumi-paper);
  --color-brand-bg:    var(--color-nezumi-sabi);
  --color-on-brand-bg: var(--color-nezumi-snow);

  --color-text:       var(--color-nezumi-kinu);
  --color-text-muted: var(--color-nezumi-genji);

  --color-surface:               var(--color-nezumi-dark-bg);
  --color-surface-raised:        var(--color-nezumi-dark-raised);
  --color-surface-raised-subtle: var(--color-nezumi-dark-subtle);
  --color-surface-muted:         var(--color-nezumi-dark-muted);

  --color-border: var(--color-nezumi-dark-line);

  --color-success: var(--color-nezumi-fukagawa);
  --color-error:   var(--color-nezumi-d-error-dark);

  /* Status-BG-Mix mit höherem Anteil — Lesbarkeit auf dunkler Surface */
  --color-success-bg: color-mix(in oklch, var(--color-success) 25%, var(--color-surface));
  --color-error-bg:   color-mix(in oklch, var(--color-error)   25%, var(--color-surface));
  --color-warning-bg: color-mix(in oklch, var(--color-warning) 25%, var(--color-surface));
  --color-info-bg:    color-mix(in oklch, var(--color-info)    25%, var(--color-surface));

  color-scheme: dark;
}
```

**Was hier gut ist:**

- Komponenten bleiben **unverändert** — `bg-surface` zeigt im Light auf `--color-nezumi-bg`, im Dark auf `--color-nezumi-dark-bg`.
- Status-Mix wird im Dark Mode auf 25 % erhöht, damit Tints sichtbar bleiben.
- `color-scheme: dark` informiert den Browser über native Form-Controls und Scrollbars — vergisst man das, sehen `<input type="date">` und `<select>` im Dark Mode hellgrau aus.

**Was hier verboten wäre:**

- `dark:bg-zinc-900` in JSX — würde Theming aus der zentralen Quelle ausbrechen.
- Eine `Dialog.dark.tsx`-Variante — Komponenten kennen keinen Theme-Begriff.

---

## Motion Tokens für Framer Motion

Bewegung ist genauso ein Design Token wie Farbe. Die Herausforderung: CSS nutzt Sekunden/Millisekunden und `cubic-bezier`-Strings — Framer Motion erwartet Number-Sekunden und Tuple-Easings. Wir lösen das, indem die **Werte einmal in CSS leben** und JS sie über `getComputedStyle` liest.

### Stufe 0 — die CSS-Quelle (`tokens/motion.css`)

```css
/* packages/ui/src/styles/tokens/motion.css */
@theme {
  /* Editorial-Effekte (Homepage-Lab) */
  --duration-editorial-chroma: 6s;
  --duration-editorial-pulse:  1800ms;

  /* Standard-Skala — wird sowohl in CSS-Transitions als auch in Framer Motion gelesen */
  --duration-instant: 0ms;
  --duration-fast:    100ms;   /* Hover-Feedback */
  --duration-normal:  200ms;   /* Standard-State-Wechsel */
  --duration-slow:    300ms;   /* Dialog/Drawer-Open */
  --duration-slower:  500ms;   /* Page-Transition */
  --duration-lazy:    800ms;   /* Hero-Reveal */

  --ease-linear:  linear;
  --ease-in:      cubic-bezier(0.4, 0, 1, 1);
  --ease-out:     cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:  cubic-bezier(0.175, 0.885, 0.32, 1.275);

  --stagger-fast: 30ms;
  --stagger-base: 50ms;
  --stagger-slow: 100ms;
}
```

| UI-Ereignis | Duration | Easing |
|-------------|----------|--------|
| Hover-Feedback | `--duration-fast` | `--ease-out` |
| Button press / State-Wechsel | `--duration-normal` | `--ease-out` |
| Dropdown / Tooltip | `--duration-normal` | `--ease-in-out` |
| Dialog / Drawer | `--duration-slow` | `--ease-spring` |
| Page Transition | `--duration-slower` | `--ease-in-out` |
| Hero Reveal / Section Stagger | `--duration-lazy` | `--ease-out` |

### Stufe 1 — CSS-Transitions

```tsx
// Komponente verwendet die Tokens über generierte Tailwind-Utilities:
<button className="bg-brand text-on-brand transition-colors duration-fast ease-out">
  Speichern
</button>
```

`duration-fast` und `ease-out` werden aus `--duration-fast` und `--ease-out` automatisch generiert, weil sie in `@theme` registriert sind.

### Stufe 2 — Framer Motion liest dieselben Tokens

**SOLL-Datei: `packages/ui/src/lib/motion.ts`** (anlegen, falls noch nicht existent)

```ts
"use client"

import type { Transition, Variants } from "framer-motion"

/**
 * Liest eine CSS Custom Property vom <html>-Element.
 * SSR-safe: gibt im Server-Rendering den Fallback zurück.
 */
function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

/** "200ms" | "0.2s" → 0.2 (Sekunden, wie Framer Motion sie erwartet) */
function toSeconds(cssTime: string): number {
  if (cssTime.endsWith("ms")) return parseFloat(cssTime) / 1000
  if (cssTime.endsWith("s"))  return parseFloat(cssTime)
  return parseFloat(cssTime) || 0
}

/** "cubic-bezier(0.4, 0, 0.2, 1)" → [0.4, 0, 0.2, 1] */
function toCubicBezier(cssEase: string): [number, number, number, number] | string {
  const m = cssEase.match(/cubic-bezier\(([^)]+)\)/)
  if (!m) return cssEase as string
  const [a, b, c, d] = m[1].split(",").map((n) => parseFloat(n.trim()))
  return [a, b, c, d]
}

/**
 * SSOT-konformer Motion-Namespace.
 * Baut zur Laufzeit aus den CSS-Tokens — kein Wert wird hier dupliziert.
 */
export const motion = {
  duration: {
    instant: () => toSeconds(readVar("--duration-instant", "0ms")),
    fast:    () => toSeconds(readVar("--duration-fast",    "100ms")),
    normal:  () => toSeconds(readVar("--duration-normal",  "200ms")),
    slow:    () => toSeconds(readVar("--duration-slow",    "300ms")),
    slower:  () => toSeconds(readVar("--duration-slower",  "500ms")),
    lazy:    () => toSeconds(readVar("--duration-lazy",    "800ms")),
  },
  ease: {
    linear:  () => toCubicBezier(readVar("--ease-linear",  "linear")),
    in:      () => toCubicBezier(readVar("--ease-in",      "cubic-bezier(0.4, 0, 1, 1)")),
    out:     () => toCubicBezier(readVar("--ease-out",     "cubic-bezier(0, 0, 0.2, 1)")),
    inOut:   () => toCubicBezier(readVar("--ease-in-out",  "cubic-bezier(0.4, 0, 0.2, 1)")),
    bounce:  () => toCubicBezier(readVar("--ease-bounce",  "cubic-bezier(0.34, 1.56, 0.64, 1)")),
    spring:  () => toCubicBezier(readVar("--ease-spring",  "cubic-bezier(0.175, 0.885, 0.32, 1.275)")),
  },
  stagger: {
    fast: () => toSeconds(readVar("--stagger-fast", "30ms")),
    base: () => toSeconds(readVar("--stagger-base", "50ms")),
    slow: () => toSeconds(readVar("--stagger-slow", "100ms")),
  },
} as const

/** Vorgefertigte Transitions für die häufigsten Use Cases */
export const transitions = {
  hover:  (): Transition => ({ duration: motion.duration.fast(),   ease: motion.ease.out() }),
  state:  (): Transition => ({ duration: motion.duration.normal(), ease: motion.ease.out() }),
  dialog: (): Transition => ({ duration: motion.duration.slow(),   ease: motion.ease.spring() }),
  page:   (): Transition => ({ duration: motion.duration.slower(), ease: motion.ease.inOut() }),
  reveal: (): Transition => ({ duration: motion.duration.lazy(),   ease: motion.ease.out() }),
} as const

/** Vorgefertigte Variants für Section-Reveals mit Stagger */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown:  { opacity: 1, y: 0 },
}

export const containerVariants = (staggerKey: keyof typeof motion.stagger = "base"): Variants => ({
  hidden: {},
  shown: {
    transition: { staggerChildren: motion.stagger[staggerKey]() },
  },
})

/** A11y: respektiert prefers-reduced-motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
```

**SOLL-Export in `packages/ui/package.json`:**

```jsonc
{
  "exports": {
    "./lib/motion": "./src/lib/motion.ts"
  }
}
```

**Verwendung in einer Komponente:**

```tsx
"use client"

import { motion } from "framer-motion"
import { transitions, revealVariants, containerVariants, prefersReducedMotion } from "@packages/ui/lib/motion"

export function FeatureGrid({ items }: { items: { id: string; title: string }[] }) {
  const reduced = prefersReducedMotion()

  return (
    <motion.ul
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10%" }}
      variants={containerVariants("base")}
      className="grid grid-cols-1 md:grid-cols-3 gap-24"
    >
      {items.map((item) => (
        <motion.li
          key={item.id}
          variants={revealVariants}
          transition={reduced ? { duration: 0 } : transitions.reveal()}
          className="bg-surface-raised text-text border border-border rounded-lg p-24"
        >
          {item.title}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

**Was an diesem Pattern enterprise-tauglich ist:**

| Eigenschaft | Begründung |
|-------------|------------|
| **Kein Wert-Duplikat in JS.** | Wer `--duration-normal` in CSS dreht, dreht denselben Wert in Framer Motion mit. |
| **SSR-sicher.** | `readVar` returniert auf dem Server den Fallback; Werte werden erst im Client aufgelöst. |
| **Lazy-Funktionen statt Konstanten.** | `motion.duration.normal()` evaluiert beim Render, nach Theme-Switch wirken neue Werte sofort. |
| **`prefers-reduced-motion`-Brücke.** | Animationen werden bei System-Setting auf `duration: 0` gekappt — Token-Quelle bleibt unangetastet. |
| **Vorgefertigte Variants.** | Wer ein Reveal baut, denkt nicht über Werte nach, sondern wählt einen Use-Case. |

> ⚠️ **Was NICHT zu tun ist:**
> - Hardcoded `transition={{ duration: 0.2 }}` in Komponenten. → drift-anfällig.
> - Eine zweite TS-Konstante `export const DURATIONS = { fast: 0.1, … }`. → zwei Quellen, garantiert divergent.
> - `style={{ transition: "all 200ms ease-out" }}` in JSX. → umgeht Token-System komplett.

### Spring vs. Tween — wann was?

Framer Motion unterstützt zwei Modelle:

```ts
// Tween (zeitbasiert) — Standard für UI-States, weil deterministisch.
transition={{ duration: motion.duration.normal(), ease: motion.ease.out() }}

// Spring (physikbasiert) — für „lebendige“ Bewegungen wie Drag, Drawer, Modal.
transition={{ type: "spring", stiffness: 380, damping: 32 }}
```

**Regel:** Tween für State-Wechsel, Spring für Geste-getriebene Bewegung. Spring-Parameter sind aktuell **nicht** in CSS abbildbar — wenn sie wiederverwendet werden, gehören sie als JS-Konstanten in `lib/motion.ts`:

```ts
export const springs = {
  drawer:  { type: "spring", stiffness: 320, damping: 32 } as const,
  modal:   { type: "spring", stiffness: 380, damping: 30 } as const,
  drag:    { type: "spring", stiffness: 600, damping: 40 } as const,
}
```

---

## Anti-Drift-Checkliste

Diese Tabelle gehört in jeden PR-Review.

| Warnsignal | Token-konforme Alternative |
|------------|----------------------------|
| `bg-[#47585c]` | `bg-brand` |
| `text-[#4f455c]` | `text-text` |
| `border-[#d4d3cf]` | `border-border` |
| `bg-zinc-900`, `text-gray-500` | semantisches Token |
| `p-[17px]` | nächster Spacing-Token, z. B. `p-16` |
| `rounded-[7px]` | `rounded-lg` |
| `duration-[180ms]` | `duration-normal` |
| `shadow-[0_4px_8px_rgba(0,0,0,0.1)]` | `shadow-md` |
| `style={{ transition: "..." }}` | Tailwind-Utility oder `transitions.*()` aus `@packages/ui/lib/motion` |
| `dark:bg-...` | semantisches Token, das im `.dark`-Block überschrieben wird |
| Eigene `cubic-bezier(...)` in JS | `motion.ease.*()` |
| Hardcoded `0.2` als Duration in Framer | `motion.duration.normal()` |

### Drift-Scan-Befehle (Mai 2026)

```bash
# Raw Hex außerhalb der Token-Dateien
rg --type=tsx --type=ts '#[0-9a-fA-F]{3,8}\b' apps/

# Tailwind-Default-Palette
rg --type=tsx 'bg-(slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-' apps/

# Arbitrary Values
rg --type=tsx '\b(bg|text|border|p|m|gap|w|h|rounded|shadow|duration)-\[' apps/

# Hardcoded Framer-Motion-Durations
rg --type=tsx 'duration:\s*\d' apps/ packages/ui/src/components/
```

---

## Hands-on: Eine neue Komponente tokenkonform bauen

### Beispiel: `OperationSummary` (eine Status-Card mit Reveal-Animation)

**Schritt 1 — Zweck klären, bevor Werte fallen:**

| Frage | Antwort | Token |
|-------|---------|-------|
| Welche Fläche? | Gehobene Fläche im App-Kontext | `bg-surface-raised` |
| Welcher Text? | Standard-Body | `text-text` |
| Sekundärtext? | Dezent | `text-text-muted` |
| Trennung? | Hairline-Border | `border border-border` |
| Innenabstand? | Section-internes Padding | `p-24` |
| Reveal beim Scroll? | Standard-Reveal | `transitions.reveal()` |

**Schritt 2 — JSX schreiben (keine neuen Werte erfinden):**

```tsx
"use client"

import { motion } from "framer-motion"
import { Paper, Typography } from "@packages/ui"
import { transitions, revealVariants } from "@packages/ui/lib/motion"

export function OperationSummary() {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10%" }}
      variants={revealVariants}
      transition={transitions.reveal()}
    >
      <Paper className="bg-surface-raised text-text border border-border rounded-lg p-24">
        <Typography variant="title-medium">Statusübersicht</Typography>
        <Typography variant="body-medium" className="text-text-muted">
          Aktuelle Service-Kennzahlen und offene Prüfpunkte.
        </Typography>
      </Paper>
    </motion.div>
  )
}
```

**Schritt 3 — Review-Check:** ✅ Kein `#`, kein `bg-zinc-*`, kein `[…]`, kein `dark:*`, kein hardcoded `duration: 0.5`. **Token-konform.**

**Wenn ein Wert fehlt** — etwa eine spezielle Status-Card in „Cha"-Ton — dann **erst** in `DESIGN.md` begründen, **dann** semantisches Token in `semantic/colors.css` ergänzen, **dann** in JSX verwenden. Niemals `bg-[#a99e93]` als Provisorium.

---

## Hands-on: Eine neue App im Monorepo

Sechs Schritte. Wenn alle abgehakt sind, greift die volle Token-API.

1. **`apps/<name>/package.json`** — `next`, `react`, `react-dom`, `framer-motion` aus `catalog:`; `@packages/ui` als `workspace:*`.
2. **`apps/<name>/postcss.config.mjs`** — siehe oben.
3. **`apps/<name>/app/globals.css`** — siehe oben (Tailwind-Import + `@custom-variant dark` + zwei `@source` + `@import "@packages/ui/design-tokens.css"`).
4. **`apps/<name>/next.config.ts`** — `transpilePackages: ["@packages/ui"]`.
5. **`apps/<name>/app/layout.tsx`** — importiert `./globals.css`, setzt `<body className="bg-surface text-text">`, Font-CSS-Variablen via `next/font`:

   ```tsx
   import { Urbanist, Space_Grotesk } from "next/font/google"

   const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" })
   const grotesk  = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="de" className={`${urbanist.variable} ${grotesk.variable}`}>
         <body className="bg-surface text-text">{children}</body>
       </html>
     )
   }
   ```

6. `pnpm install` — `pnpm --filter <name> dev` — Klassen aus dem UI-Paket greifen sofort.

---

## Stolperfallen Mai 2026

| Symptom | Ursache | Fix |
|---------|---------|-----|
| Klassen aus `packages/ui` fehlen im Build | `@source` zeigt nicht auf das Paket | `@source "../../../packages/ui/src"` ergänzen |
| `Cannot find module 'tailwindcss'` im Paket | `tailwindcss` als `dependency` deklariert | nach `peerDependencies` (optional) verschieben |
| Dunkelmodus reagiert nicht auf `.dark`-Toggle | Default-v4-Variante `prefers-color-scheme` aktiv | `@custom-variant dark (&:where(.dark, .dark *));` setzen |
| `@apply` schlägt in RSC fehl | RSC kann CSS-Cascade nicht serialisieren | Utilities direkt in JSX, `@apply` nur in `.css` |
| Bundle größer als erwartet | Vergessenes `@source inline` plus zu breite Safelist | dynamisch generierte Klassen auf Static Maps zurückführen |
| TSX in `packages/ui` lädt nicht in einer App | `transpilePackages` fehlt in `next.config.ts` | `transpilePackages: ["@packages/ui"]` ergänzen |
| Framer-Motion-Animationen flackern bei Theme-Switch | Werte wurden einmal gecacht (`const D = motion.duration.normal()`) | Lazy-Funktionen verwenden — Aufrufe im Render belassen |
| `motion.duration.normal()` returniert `0` im Test | jsdom hat keine Computed-Styles aus Stylesheet | Fallback im `readVar` greift bewusst — alternativ `vitest` mit `happy-dom` |
| Native Form-Controls bleiben hell im Dark Mode | `color-scheme: dark` fehlt im `.dark`-Block | im `.dark`-Block ergänzen |
| `tailwind-merge` mergt Klassen falsch | Version < 3.x | auf `^3.x` aktualisieren — kennt v4-Familien (`size-*`, `inset-*`) |
| Dynamische Klassen verschwinden | Tailwind sieht `bg-${tone}` nicht | Static Map (`{ brand: "bg-brand" }`) ODER `@source inline("...")` |

---

## Anhang — Schnell-Lookup für Reviewer

**Wenn du diese Datei liest, weil du einen PR reviewst:**

1. Sind in geänderten `apps/`-TSX nur semantische Klassen? (`bg-surface`, `text-text`, `border-border`, `bg-brand`, `text-on-brand`, …)
2. Keine Arbitrary Values (`bg-[…]`, `p-[…]`, `duration-[…]`)?
3. Keine Tailwind-Default-Palette (`bg-zinc-*`, `text-gray-*`)?
4. Keine `dark:*`-Klassen — Dark wird über Tokens gemacht?
5. Wenn Framer Motion verwendet wird: kommen Durations und Easings aus `@packages/ui/lib/motion`?
6. Falls neue Tokens hinzugefügt wurden — sind sie in der korrekten Schicht? (Primitiv ↔ Semantik ↔ Component)
7. Wurde `DESIGN.md` mit aktualisiert, falls ein neues Primitive hinzukam?

Wenn alle sieben Punkte ✅ sind, ist der PR aus Token-Sicht ready to merge.
