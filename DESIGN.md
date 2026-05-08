# Design tokens (Nezumi)

Visuelle Token-Referenz und SSOT für Agenten. Implementierung: `packages/ui/src/styles/` (Einstieg `design-tokens.css`). Bei Farb-Primitives: **Autoren-Hex** in Kommentaren zum Abgleich; im Repo liegen die Werte als **OKLCH** in `tokens/colors.css`.

Die folgenden Blöcke sind **Referenz-DSL** (Tailwind v4 `@theme` bzw. Dark-Override) und entsprechen der gebündelten CSS-Schicht.

---

## Breakpoints (Produkt)

`packages/ui/src/styles/tokens/breakpoints.css`

```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-md: 48rem; /* 768px */
  --breakpoint-lg: 64rem; /* 1024px */
}
```

---

## Abstände (`--spacing-*`)

Primitive Skala; Werte in `rem`, Kommentare mit Pixelbezug.

`packages/ui/src/styles/tokens/spacing.css`

```css
@theme {
  --spacing: initial;
  --spacing-0:  0rem;
  --spacing-1:  0.0625rem; /* 1px */
  --spacing-2:  0.125rem;  /* 2px */
  --spacing-4:  0.25rem;   /* 4px */
  --spacing-8:  0.5rem;    /* 8px */
  --spacing-12: 0.75rem;   /* 12px */
  --spacing-16: 1rem;      /* 16px */
  --spacing-24: 1.5rem;    /* 24px */
  --spacing-32: 2rem;      /* 32px */
  --spacing-40: 2.5rem;    /* 40px */
  --spacing-48: 3rem;      /* 48px */
  --spacing-56: 3.5rem;    /* 56px */
  --spacing-64: 4rem;      /* 64px */
  --spacing-80: 5rem;      /* 80px */
  --spacing-96: 6rem;      /* 96px */
  --spacing-112: 7rem;     /* 112px */
  --spacing-128: 8rem;     /* 128px */
}
```

### Semantische Abstände

`packages/ui/src/styles/semantic/spacing.css`

```css
@theme {
  --space-content: var(--spacing-16);
  --space-section: var(--spacing-48);
  --space-page:    var(--spacing-64);
}
```

---

## Bewegung (Motion)

`packages/ui/src/styles/tokens/motion.css`

```css
@theme {
  /* Homepage editorial blossom — siehe components/editorial-blossom.css */
  --duration-editorial-chroma: 6s;
  --duration-editorial-pulse: 1800ms;

  --duration-instant: 0ms;
  --duration-fast:    100ms;
  --duration-normal:  200ms;
  --duration-slow:    300ms;
  --duration-slower:  500ms;
  --duration-lazy:    800ms;

  --ease-linear:   linear;
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);

  --stagger-fast:  30ms;
  --stagger-base:  50ms;
  --stagger-slow:  100ms;
}
```

---

## Eckenradius (`--radius-*`)

`packages/ui/src/styles/tokens/radius.css`

```css
@theme {
  --radius-none: 0;
  --radius-sm:   0.25rem;   /* 4px */
  --radius-md:   0.375rem;  /* 6px */
  --radius-lg:   0.5rem;    /* 8px */
  --radius-xl:   0.75rem;   /* 12px */
  --radius-2xl:  1rem;      /* 16px */
  --radius-3xl:  1.5rem;    /* 24px */
  --radius-full: 9999px;
}
```

---

## Schatten (`--shadow-*`)

`packages/ui/src/styles/tokens/shadows.css`

```css
@theme {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --shadow-none: 0 0 #0000;
}
```

---

## Farben — Primitive (`--color-nezumi-*`)

Sortierung alphabetisch nach Slug. Kommentar = Autoren-Hex (sRGB).

`packages/ui/src/styles/tokens/colors.css`

```css
@theme {
  --color-*: initial;

  --color-nezumi-akatsuki: oklch(0.8606 0.0143 304.11); /* #d3cfd9 */
  --color-nezumi-bg: oklch(0.9671 0.0041 91.45); /* #f5f4f1 */
  --color-nezumi-budo: oklch(0.4961 0.0327 343.08); /* #705b67 */
  --color-nezumi-cha: oklch(0.7055 0.0204 67.49); /* #a99e93 */
  --color-nezumi-chigusa: oklch(0.8485 0.0258 168.12); /* #bed3ca */
  --color-nezumi-d-destructive: oklch(0.5248 0.1009 30.44); /* #9c5246 */
  --color-nezumi-d-error-dark: oklch(0.6900 0.1295 29.54); /* #e07a6b */
  --color-nezumi-dark-bg: oklch(0.1773 0.0087 307.92); /* #121014 */
  --color-nezumi-dark-line: oklch(0.3442 0.0074 308.22); /* #3a383c */
  --color-nezumi-dark-muted: oklch(0.2775 0.0084 317.71); /* #2a272b */
  --color-nezumi-dark-raised: oklch(0.2130 0.0083 308.03); /* #1a181c */
  --color-nezumi-dark-secondary-bg: oklch(0.3755 0.0198 352.96); /* #4a3d42 */
  --color-nezumi-dark-subtle: oklch(0.2558 0.0079 308.12); /* #242226 */
  --color-nezumi-fuji: oklch(0.7331 0.0445 286.73); /* #a6a5c4 */
  --color-nezumi-fukagawa: oklch(0.7095 0.0362 137.12); /* #97a791 */
  --color-nezumi-fukagawa-deep: oklch(0.5019 0.0713 140.68); /* #4d6e47 */
  --color-nezumi-genji: oklch(0.6082 0.0113 345.62); /* #888084 */
  --color-nezumi-kinu: oklch(0.8936 0.0082 98.89); /* #dddcd6 */
  --color-nezumi-koi: oklch(0.4096 0.0398 304.50); /* #4f455c */
  --color-nezumi-line: oklch(0.8665 0.0056 95.11); /* #d4d3cf */
  --color-nezumi-minato: oklch(0.6621 0.0275 205.75); /* #80989b */
  --color-nezumi-paper: oklch(0.9818 0.0054 95.10); /* #faf9f5 */
  --color-nezumi-sakura: oklch(0.9133 0.0135 340.57); /* #e9dfe5 */
  --color-nezumi-sabi: oklch(0.4475 0.0220 213.59); /* #47585c */
  --color-nezumi-snow: oklch(1.0000 0.0000 0.00); /* #ffffff */
  --color-nezumi-ume: oklch(0.7208 0.0474 6.27); /* #c099a0 */
}
```

---

## Farben — Semantik & Fokus (Light)

Defaults in `packages/ui/src/styles/semantic/colors.css` (`@theme`).

```css
@theme {
  --color-brand: var(--color-nezumi-sabi);
  --color-on-brand: var(--color-nezumi-paper);
  --color-brand-bg: var(--color-nezumi-minato);
  --color-on-brand-bg: var(--color-nezumi-koi);

  --color-secondary: var(--color-nezumi-ume);
  --color-on-secondary: var(--color-nezumi-koi);
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

  --color-success-bg: color-mix(in oklch, var(--color-success) 12%, var(--color-surface));
  --color-warning-bg: color-mix(in oklch, var(--color-warning) 15%, var(--color-surface));
  --color-error-bg: color-mix(in oklch, var(--color-error) 12%, var(--color-surface));
  --color-info-bg: color-mix(in oklch, var(--color-info) 12%, var(--color-surface));

  --focus-ring-width: 1px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--color-text);
  --color-ring: var(--focus-ring-color);

  --color-background: var(--color-surface);
  --color-foreground: var(--color-text);
  --color-card: var(--color-surface-raised);
  --color-card-foreground: var(--color-text);
  --color-popover: var(--color-surface-raised);
  --color-popover-foreground: var(--color-text);
  --color-primary: var(--color-brand);
  --color-primary-foreground: var(--color-on-brand);
  --color-secondary-foreground: var(--color-on-secondary);
  --color-muted: var(--color-surface-muted);
  --color-muted-foreground: var(--color-text-muted);
  --color-accent-foreground: var(--color-text);
  --color-destructive: var(--color-error);
  --color-destructive-foreground: var(--color-on-error);
  --color-input: var(--color-border);
}
```

### Dark (`.dark`)

Overrides in `packages/ui/src/styles/design-tokens.css`.

```css
.dark {
  --color-brand: var(--color-nezumi-minato);
  --color-on-brand: var(--color-nezumi-paper);
  --color-brand-bg: var(--color-nezumi-sabi);
  --color-on-brand-bg: var(--color-nezumi-snow);

  --color-secondary: var(--color-nezumi-ume);
  --color-on-secondary: var(--color-nezumi-dark-bg);
  --color-secondary-bg: var(--color-nezumi-dark-secondary-bg);
  --color-accent: var(--color-nezumi-fuji);

  --color-text: var(--color-nezumi-kinu);
  --color-text-muted: var(--color-nezumi-genji);

  --color-surface: var(--color-nezumi-dark-bg);
  --color-surface-raised: var(--color-nezumi-dark-raised);
  --color-surface-raised-subtle: var(--color-nezumi-dark-subtle);
  --color-surface-muted: var(--color-nezumi-dark-muted);

  --color-border: var(--color-nezumi-dark-line);

  --color-success: var(--color-nezumi-fukagawa);
  --color-warning: var(--color-nezumi-cha);
  --color-error: var(--color-nezumi-d-error-dark);
  --color-on-error: var(--color-nezumi-dark-bg);
  --color-info: var(--color-nezumi-minato);

  --color-success-bg: color-mix(in oklch, var(--color-success) 25%, var(--color-surface));
  --color-warning-bg: color-mix(in oklch, var(--color-warning) 25%, var(--color-surface));
  --color-error-bg: color-mix(in oklch, var(--color-error) 25%, var(--color-surface));
  --color-info-bg: color-mix(in oklch, var(--color-info) 25%, var(--color-surface));

  --focus-ring-color: var(--color-text);
  --color-ring: var(--focus-ring-color);

  color-scheme: dark;
}
```

---

## Typografie — Basistokens

`packages/ui/src/styles/tokens/typography.css`

```css
@theme {
  --font-family-sans: var(--font-urbanist, "Urbanist"), system-ui,
    -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-family-accent: var(--font-space-grotesk, "Space Grotesk"),
    var(--font-family-sans);

  --font-sans: var(--font-family-sans);
  --font-accent: var(--font-family-accent);

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

---

## Typografie — Atom-Skalen

`packages/ui/src/styles/components/typography.css` (`@theme`-Abschnitt)

```css
@theme {
  --typography-clamp-large-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);
  --typography-clamp-large-line-height: 0.98;
  --typography-clamp-large-tracking: -0.055em;
  --typography-clamp-large-weight: var(--font-weight-bold);

  --typography-clamp-medium-size: clamp(2rem, 2.4vw + 1rem, 3.25rem);
  --typography-clamp-medium-line-height: 1.05;
  --typography-clamp-medium-tracking: -0.055em;
  --typography-clamp-medium-weight: var(--font-weight-bold);

  --typography-clamp-small-size: clamp(1.5rem, 1.25vw + 1rem, 2.25rem);
  --typography-clamp-small-line-height: 1.12;
  --typography-clamp-small-tracking: -0.055em;
  --typography-clamp-small-weight: var(--font-weight-bold);

  --typography-clamp-text-size: clamp(1rem, 0.45vw + 0.9rem, 1.25rem);
  --typography-clamp-text-line-height: 1.5;
  --typography-clamp-text-tracking: -0.055em;
  --typography-clamp-text-weight: var(--font-weight-bold);

  --typography-title-large-size: 22px;
  --typography-title-large-line-height: 28px;
  --typography-title-large-tracking: 0;
  --typography-title-large-weight: var(--font-weight-bold);

  --typography-title-medium-size: 18px;
  --typography-title-medium-line-height: 24px;
  --typography-title-medium-tracking: 0;
  --typography-title-medium-weight: var(--font-weight-medium);

  --typography-body-medium-size: 16px;
  --typography-body-medium-line-height: 24px;
  --typography-body-medium-tracking: 0.012em;
  --typography-body-medium-weight: var(--font-weight-regular);

  --typography-label-large-size: 14px;
  --typography-label-large-line-height: 20px;
  --typography-label-large-tracking: 0.02em;
  --typography-label-large-weight: var(--font-weight-medium);

  --typography-label-medium-size: 12px;
  --typography-label-medium-line-height: 16px;
  --typography-label-medium-tracking: 0.06em;
  --typography-label-medium-weight: var(--font-weight-bold);

  --typography-accent-large-size: 20px;
  --typography-accent-large-line-height: 28px;
  --typography-accent-large-tracking: -0.01em;
  --typography-accent-large-weight: var(--font-weight-medium);

  --typography-accent-small-size: 13px;
  --typography-accent-small-line-height: 18px;
  --typography-accent-small-tracking: 0.08em;
  --typography-accent-small-weight: var(--font-weight-bold);
}
```

---

## Komponenten-Tokens (`@theme`)

### Button — `components/button.css`

```css
@theme {
  --radius-button: var(--radius-sm);
  --spacing-button-gap: var(--spacing-8);
  --spacing-button-sm: var(--spacing-32);
  --spacing-button-md: var(--spacing-40);
  --spacing-button-lg: var(--spacing-48);
  --spacing-button-xl: var(--spacing-56);
  --spacing-button-icon: var(--spacing-40);
  --spacing-button-sm-x: var(--spacing-16);
  --spacing-button-md-x: var(--spacing-24);
  --spacing-button-lg-x: var(--spacing-32);
  --spacing-button-xl-x: var(--spacing-40);
  --font-weight-button: var(--font-weight-medium);

  --color-button-brand-hover: color-mix(in oklch, var(--color-brand) 88%, var(--color-text));
  --color-button-brand-active: color-mix(in oklch, var(--color-brand) 78%, var(--color-text));
  --color-button-secondary-hover: color-mix(in oklch, var(--color-secondary) 82%, var(--color-text));
  --color-button-secondary-active: color-mix(in oklch, var(--color-secondary) 72%, var(--color-text));
  --color-button-error-hover: color-mix(in oklch, var(--color-error) 85%, var(--color-surface));
  --color-button-error-active: color-mix(in oklch, var(--color-error) 74%, var(--color-surface));
  --color-button-outline-hover: var(--color-surface-raised-subtle);
  --color-button-outline-active: var(--color-surface-muted);
  --color-button-ghost-hover: var(--color-surface-muted);
  --color-button-ghost-active: var(--color-surface-raised-subtle);
  --color-button-elevated-hover: var(--color-surface-raised-subtle);
  --color-button-elevated-active: var(--color-surface-muted);
}
```

### Badge — `components/badge.css`

```css
@theme {
  --color-badge-surface: var(--color-surface-raised);
  --color-badge-text: var(--color-text);
  --color-badge-border: var(--color-border);
  --spacing-badge-padding-x: var(--spacing-16);
  --spacing-badge-padding-y: var(--spacing-4);
  --radius-badge: var(--radius-full);
  --text-badge: 0.75rem;
  --font-weight-badge: var(--font-weight-medium);
  --leading-badge: 1;
  --color-badge-hover-surface: var(--color-surface-muted);
  --color-badge-focus-ring: var(--color-ring);
}
```

### Card — `components/card.css`

```css
@theme {
  --radius-card: var(--radius-lg);
  --shadow-card: var(--shadow-sm);
  --color-card-border: var(--color-border);
  --color-card-surface: var(--color-surface-raised);
  --color-card-text: var(--color-text);
  --spacing-card-header-gap: var(--spacing-8);
  --spacing-card-header-padding: var(--spacing-24);
  --color-card-title-text: var(--color-text);
  --color-card-description-text: var(--color-text-muted);
  --spacing-card-content-padding: var(--spacing-24);
  --spacing-card-footer-padding: var(--spacing-24);
}
```

### Input — `components/input.css`

```css
@theme {
  --spacing-input-height: var(--spacing-40);
  --spacing-input-padding-x: var(--spacing-16);
  --spacing-input-padding-y: var(--spacing-12);
  --radius-input: var(--radius-md);
  --color-input-border: var(--color-border);
  --color-input-surface: var(--color-surface-raised);
  --color-input-text: var(--color-text);
  --color-input-placeholder: var(--color-text-muted);
  --color-input-ring: var(--color-ring);
}
```

### Textarea — `components/textarea.css`

```css
@theme {
  --spacing-textarea-padding-x: var(--spacing-16);
  --spacing-textarea-padding-y: var(--spacing-12);
  --spacing-textarea-min: var(--spacing-80);
  --radius-textarea: var(--radius-md);
  --color-textarea-border: var(--color-border);
  --color-textarea-surface: var(--color-surface-raised);
  --color-textarea-text: var(--color-text);
  --color-textarea-placeholder: var(--color-text-muted);
  --color-textarea-ring: var(--color-ring);
}
```

### Tooltip — `components/tooltip.css`

```css
@theme {
  --radius-tooltip: var(--radius-md);
  --spacing-tooltip-padding-x: var(--spacing-16);
  --spacing-tooltip-padding-y: var(--spacing-12);
  --shadow-tooltip: var(--shadow-md);
  --color-tooltip-border: var(--color-border);
  --color-tooltip-surface: var(--color-surface-raised);
  --color-tooltip-text: var(--color-text);
}
```

### Toast — `components/toast.css`

```css
@theme {
  --radius-toast: var(--radius-md);
  --spacing-toast-padding: var(--spacing-16);
  --shadow-toast: var(--shadow-md);
  --color-toast-surface: var(--color-surface-raised);
  --color-toast-border: var(--color-border);
  --color-toast-text: var(--color-text);
  --color-toast-title-text: var(--color-text);
  --color-toast-description-text: var(--color-text-muted);
  --color-toast-success-surface: var(--color-success-bg);
  --color-toast-success-border: var(--color-success);
  --color-toast-success-text: var(--color-success);
  --color-toast-warning-surface: var(--color-warning-bg);
  --color-toast-warning-border: var(--color-warning);
  --color-toast-warning-text: var(--color-warning);
  --color-toast-error-surface: var(--color-error-bg);
  --color-toast-error-border: var(--color-error);
  --color-toast-error-text: var(--color-error);
  --color-toast-info-surface: var(--color-info-bg);
  --color-toast-info-border: var(--color-info);
  --color-toast-info-text: var(--color-info);
}
```

### Sonner — `components/sonner.css`

```css
@theme {
  --radius-sonner: var(--radius-md);
  --shadow-sonner: var(--shadow-lg);
  --color-sonner-surface: var(--color-surface-raised);
  --color-sonner-border: var(--color-border);
  --color-sonner-text: var(--color-text);
  --color-sonner-description: var(--color-text-muted);
  --color-sonner-action-bg: var(--color-brand);
  --color-sonner-action-text: var(--color-on-brand);
  --color-sonner-cancel-bg: var(--color-surface-muted);
  --color-sonner-cancel-text: var(--color-text);
  --color-sonner-error-surface: var(--color-error-bg);
  --color-sonner-error-text: var(--color-error);
  --color-sonner-error-border: var(--color-error);
  --color-sonner-success-surface: var(--color-success-bg);
  --color-sonner-success-text: var(--color-success);
  --color-sonner-success-border: var(--color-success);
  --color-sonner-warning-surface: var(--color-warning-bg);
  --color-sonner-warning-text: var(--color-warning);
  --color-sonner-warning-border: var(--color-warning);
  --color-sonner-info-surface: var(--color-info-bg);
  --color-sonner-info-text: var(--color-info);
  --color-sonner-info-border: var(--color-info);
}
```

### Toggle — `components/toggle.css`

```css
@theme {
  --radius-toggle: var(--radius-md);
  --spacing-toggle-sm: var(--spacing-32);
  --spacing-toggle-md: var(--spacing-40);
  --spacing-toggle-lg: var(--spacing-48);
  --spacing-toggle-sm-x: var(--spacing-12);
  --spacing-toggle-md-x: var(--spacing-16);
  --spacing-toggle-lg-x: var(--spacing-24);
  --color-toggle-border: var(--color-border);
  --color-toggle-surface: var(--color-surface-raised);
  --color-toggle-text: var(--color-text);
  --color-toggle-ring: var(--color-ring);
  --color-toggle-hover-surface: var(--color-surface-muted);
  --color-toggle-hover-text: var(--color-text);
  --color-toggle-selected-surface: var(--color-brand);
  --color-toggle-selected-text: var(--color-on-brand);
}
```

### Toggle group — `components/toggle-group.css`

```css
@theme {
  --spacing-toggle-group-gap: var(--spacing-8);
}
```

### Sidebar — `components/sidebar.css`

```css
@theme {
  --color-sidebar-surface: var(--color-surface-raised);
  --color-sidebar-border: var(--color-border);
  --spacing-sidebar-width: var(--spacing-256);
  --spacing-sidebar-collapsed-width: var(--spacing-64);
  --spacing-sidebar-header-padding: var(--spacing-16);
  --spacing-sidebar-content-padding: var(--spacing-16);
  --spacing-sidebar-footer-padding: var(--spacing-16);
  --spacing-sidebar-group-gap: var(--spacing-8);
  --spacing-sidebar-menu-item-gap: var(--spacing-8);
  --spacing-sidebar-menu-item-padding-x: var(--spacing-12);
  --spacing-sidebar-menu-item-padding-y: var(--spacing-8);
  --radius-sidebar-menu-item: var(--radius-md);
  --color-sidebar-menu-item-hover: var(--color-accent);
  --color-sidebar-menu-item-active: var(--color-primary);
  --color-sidebar-menu-item-text: var(--color-text);
  --color-sidebar-menu-item-text-active: var(--color-primary-foreground);
}
```

> **Hinweis:** `editorial-blossom` (Homepage-Lab) — zusätzliche `--editorial-*` und `--duration-editorial-*` siehe `components/editorial-blossom.css` bzw. `tokens/motion.css`.
