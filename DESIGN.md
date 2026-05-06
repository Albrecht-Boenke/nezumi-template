# Design System: Nezumi Editorial & Trusted Operations

## 1. Overview
This file is the visual SSOT for agents. It describes the **target state**, not the current audit state.

### Product Modes
| Mode | Scope | Visual behavior |
| :--- | :---- | :-------------- |
| Brand Mode | Homepage, campaigns, long-form public pages | Editorial, asymmetrical, image-led, fluid display type, cinematic overlays |
| Service Mode | Members, Operations | Structured, calm, token-driven, fixed type scale, tonal Paper surfaces |

### Non-Negotiable Rules
- UI copy: **German**
- Code/docs/tokens: **English**
- App page grammar: **`AppShell -> PageLayout -> Section`**
- Route header primitive: **`PageHeader`**
- Default generic surface: **`Paper`**
- `Card` only for explicit object/collection semantics
- Semantic tokens only in app code; no raw hex and no Tailwind default palette
- Product breakpoints: **`md` = 768px**, **`lg` = 1024px** only
- Grid system: **4 / 8 / 12**
- Homepage editorial exceptions stay route-local

### Layout Rules
- No `Container`
- No `Stack` / `HStack` / `VStack`
- No shared `BentoGrid`
- No dynamic `col-span-*` interpolation
- In apps, visible text is rendered via `Typography`

---

## 2. Colors

### Implementation (Nezumi-Template repo)

| Layer File | Role |
| :----------- | :--- |
| `packages/ui/src/styles/tokens/colors.css` | **Primitives** in Tailwind `@theme`: `--color-nezumi-*`. Each value is **OKLCH** with the SSOT hex as input: `oklch(from #rrggbb l c h)`. Tailwind generates utilities such as `bg-nezumi-sabi` (use in apps only when justified; prefer semantic utilities). |
| `packages/ui/src/styles/semantic/colors.css` | **Semantic** colors in `@theme`: `--color-brand`, `--color-text`, … as `var(--color-nezumi-*)`. Status backgrounds use `color-mix(in oklch, …)` per rules below. |
| `packages/ui/src/styles/design-tokens.css` | **`.dark`** block: semantic overrides (same `--color-*` names). **`html.dark`** in `@layer base` sets `color-scheme: dark` only. Base `body`, `:focus-visible`, scrollbar use semantic tokens. |
| `packages/ui/src/styles/components/button.css` | **Component** color tokens (e.g. `--color-button-brand-hover`) as `color-mix(in oklch, …)` on top of semantic primitives. |
| Apps | Import `@nezumi/ui/design-tokens.css` from `app/globals.css`. App **TSX** uses semantic Tailwind classes only (`bg-surface`, `text-text`, `border-border`, …) — no raw hex, no default Tailwind palette. |

**Reference hex** in the tables below is the **authoring / SSOT sRGB** for each primitive. The **stored token value** in code is always the OKLCH form above.

### Primitive palette

| Slug (human reference) | CSS token (`@theme`) | SSOT hex (input to `oklch(from …)`) |
| :----------------------- | :------------------- | :---------------------------------- |
| sabi | `--color-nezumi-sabi` | `#47585c` |
| minato | `--color-nezumi-minato` | `#80989b` |
| ume | `--color-nezumi-ume` | `#c099a0` |
| sakura | `--color-nezumi-sakura` | `#e9dfe5` |
| fuji | `--color-nezumi-fuji` | `#a6a5c4` |
| kinu | `--color-nezumi-kinu` | `#dddcd6` |
| genji | `--color-nezumi-genji` | `#888084` |
| koi | `--color-nezumi-koi` | `#4f455c` |
| bg | `--color-nezumi-bg` | `#f5f4f1` |
| akatsuki | `--color-nezumi-akatsuki` | `#d3cfd9` |
| fukagawa | `--color-nezumi-fukagawa` | `#97a791` |
| fukagawa-deep | `--color-nezumi-fukagawa-deep` | `#4d6e47` |
| cha | `--color-nezumi-cha` | `#a99e93` |
| budo | `--color-nezumi-budo` | `#705b67` |
| chigusa | `--color-nezumi-chigusa` | `#bed3ca` |
| paper | `--color-nezumi-paper` | `#faf9f5` |
| line | `--color-nezumi-line` | `#d4d3cf` |
| snow | `--color-nezumi-snow` | `#ffffff` |
| dark-bg | `--color-nezumi-dark-bg` | `#121014` |
| dark-raised | `--color-nezumi-dark-raised` | `#1a181c` |
| dark-subtle | `--color-nezumi-dark-subtle` | `#242226` |
| dark-muted | `--color-nezumi-dark-muted` | `#2a272b` |
| dark-line | `--color-nezumi-dark-line` | `#3a383c` |
| dark-secondary-bg | `--color-nezumi-dark-secondary-bg` | `#4a3d42` |
| d-destructive | `--color-nezumi-d-destructive` | `#9c5246` |
| d-error-dark | `--color-nezumi-d-error-dark` | `#e07a6b` |

### Semantic palette

Light defaults live in `semantic/colors.css`; dark values are overridden in `.dark` in `design-tokens.css`. The **Implementation** columns match the actual `var(--color-nezumi-*)` wiring. **Approx. hex** is the same as before for design review (equals the referenced primitive’s SSOT hex).

| Token | Light (code) | Dark (code) | Approx. hex (light → dark) | Use |
| :---- | :----------- | :---------- | :------------------------- | :-- |
| `--color-brand` | `var(--color-nezumi-sabi)` | `var(--color-nezumi-minato)` | `#47585c` → `#80989b` | Primary action, navigation emphasis, brand anchor |
| `--color-on-brand` | `var(--color-nezumi-paper)` | `var(--color-nezumi-paper)` | `#faf9f5` → `#faf9f5` | Text/icon on brand |
| `--color-brand-bg` | `var(--color-nezumi-minato)` | `var(--color-nezumi-sabi)` | `#80989b` → `#47585c` | Secondary brand panels |
| `--color-on-brand-bg` | `var(--color-nezumi-koi)` | `var(--color-nezumi-snow)` | `#4f455c` → `#ffffff` | Text/icon on brand background |
| `--color-secondary` | `var(--color-nezumi-ume)` | `var(--color-nezumi-ume)` | `#c099a0` → `#c099a0` | Warm secondary action/accent |
| `--color-secondary-bg` | `var(--color-nezumi-sakura)` | `var(--color-nezumi-dark-secondary-bg)` | `#e9dfe5` → `#4a3d42` | Warm muted surfaces |
| `--color-accent` | `var(--color-nezumi-fuji)` | `var(--color-nezumi-fuji)` | `#a6a5c4` → `#a6a5c4` | Small editorial/chart accents |
| `--color-text` | `var(--color-nezumi-koi)` | `var(--color-nezumi-kinu)` | `#4f455c` → `#dddcd6` | Primary text |
| `--color-text-muted` | `var(--color-nezumi-genji)` | `var(--color-nezumi-genji)` | `#888084` → `#888084` | Metadata, helper text |
| `--color-surface` | `var(--color-nezumi-bg)` | `var(--color-nezumi-dark-bg)` | `#f5f4f1` → `#121014` | Page background |
| `--color-surface-raised` | `var(--color-nezumi-snow)` | `var(--color-nezumi-dark-raised)` | `#ffffff` → `#1a181c` | Default lifted surface |
| `--color-surface-raised-subtle` | `var(--color-nezumi-akatsuki)` | `var(--color-nezumi-dark-subtle)` | `#d3cfd9` → `#242226` | Soft section separation |
| `--color-surface-muted` | `var(--color-nezumi-kinu)` | `var(--color-nezumi-dark-muted)` | `#dddcd6` → `#2a272b` | Muted rails/grouped regions |
| `--color-border` | `var(--color-nezumi-line)` | `var(--color-nezumi-dark-line)` | `#d4d3cf` → `#3a383c` | Hairline border only |
| `--color-success` | `var(--color-nezumi-fukagawa-deep)` | `var(--color-nezumi-fukagawa)` | `#4d6e47` → `#97a791` | Positive status |
| `--color-warning` | `var(--color-nezumi-cha)` | `var(--color-nezumi-cha)` | `#a99e93` → `#a99e93` | Warning status |
| `--color-error` | `var(--color-nezumi-d-destructive)` | `var(--color-nezumi-d-error-dark)` | `#9c5246` → `#e07a6b` | Error/destructive status |
| `--color-on-error` | `var(--color-nezumi-snow)` | `var(--color-nezumi-dark-bg)` | `#ffffff` → `#121014` | Text/icon on solid error/destructive fills (contrast-safe vs `--color-error` in both modes) |
| `--color-info` | `var(--color-nezumi-minato)` | `var(--color-nezumi-minato)` | `#80989b` → `#80989b` | Informational status |

**Tailwind (semantic):** `bg-brand`, `text-on-brand`, `bg-surface`, `text-text`, `text-text-muted`, `text-on-error`, `border-border`, `bg-success-bg`, `text-success`, etc.

### Status background mixes

Implemented in `@theme` (light) and recomputed in `.dark` with higher percentages:

| Token | Light (`semantic/colors.css`) | Dark (`.dark`) |
| :---- | :-------------------------- | :------------- |
| `--color-success-bg` | `color-mix(in oklch, var(--color-success) 12%, var(--color-surface))` | `25%` |
| `--color-warning-bg` | `color-mix(in oklch, var(--color-warning) 15%, var(--color-surface))` | `25%` |
| `--color-error-bg` | `color-mix(in oklch, var(--color-error) 12%, var(--color-surface))` | `25%` |
| `--color-info-bg` | `color-mix(in oklch, var(--color-info) 12%, var(--color-surface))` | `25%` |

### Focus tokens

Defined in `semantic/colors.css` (same keys in dark unless overridden):

- `--focus-ring-width`: `1px`
- `--focus-ring-offset`: `2px`
- `--focus-ring-color`: `var(--color-text)` (updated under `.dark` via `--color-text`)
- `--color-ring`: `var(--focus-ring-color)`

### Color Rules
- Light mode is the canonical reference surface
- Dark mode is first-class; do not simply invert layouts
- Use tonal separation before borders
- Use accent sparingly
- No pure black for primary UI text

---

## 3. Typography

### Font Family
- `--font-family`: `'Urbanist', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Allowed Weights
| Token | Value |
| :---- | :---- |
| `--font-weight-light` | `300` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-bold` | `700` |

### Fluid Scale: Brand Mode
| Token | Size | Line height | Tracking | Weight | Use |
| :---- | :--- | :---------- | :------- | :----- | :-- |
| `display-large` | `clamp(2.5rem, 5vw + 1.25rem, 5rem)` | `1.1` | `-0.04em` | `500` | Homepage hero |
| `display-medium` | `clamp(2rem, 3.5vw + 1.125rem, 3.5rem)` | `1.1` | `-0.02em` | `500` | Marketing hero/subhero |
| `display-small` | `clamp(1.75rem, 2.5vw + 1rem, 2.5rem)` | `1.15` | `-0.01em` | `500` | Editorial callouts |
| `headline-large` | `clamp(1.75rem, 3vw + 1rem, 3rem)` | `1.2` | `0` | `700` | Public section titles |
| `headline-medium` | `clamp(1.5rem, 2vw + 1rem, 2.25rem)` | `1.2` | `0` | `700` | Public sub-sections |
| `headline-small` | `clamp(1.375rem, 4.5vw + 0.875rem, 2rem)` | `1.2` | `0` | `700` | Smaller promo headers |
| `title-fluid` | `clamp(1.25rem, 1.2vw + 0.95rem, 1.75rem)` | `1.3` | `0.01em` | `500` | FAQs, legal intros |
| `body-fluid` | `clamp(1rem, 0.6vw + 0.85rem, 1.25rem)` | `1.5` | `0.02em` | `400` | Long-form public copy |

### Fixed Scale: Service Mode
| Token | Size | Line height | Tracking | Weight | Use |
| :---- | :--- | :---------- | :------- | :----- | :-- |
| `title-large` | `22px` | `28px` | `0` | `500` | Route title |
| `title-medium` | `16px` | `24px` | `0.01em` | `500` | Section/card title |
| `title-small` | `14px` | `20px` | `0.007em` | `500` | Small structured heading |
| `body-large` | `16px` | `24px` | `0.03em` | `400` | Forms, reading, main UI copy |
| `body-medium` | `14px` | `20px` | `0.018em` | `400` | Table cells, secondary UI copy |
| `body-small` | `12px` | `16px` | `0.025em` | `400` | Metadata |
| `label-large` | `14px` | `20px` | `0.007em` | `500` | Buttons, tabs |
| `label-medium` | `12px` | `16px` | `0.04em` | `500` | Compact controls |
| `label-small` | `11px` | `16px` | `0.06em` | `700` | Overlines, legal/meta labels |

### Typography Rules
- Use `Typography` in app code
- Lowercase display is allowed on homepage only
- Product UI uses sentence case
- Do not import raw typography utility internals
- Do not use raw `p`, `span`, `h1-h6` in app-level UI

---

## 4. Elevation

### Shape Scale
| Token | Value |
| :---- | :---- |
| `--shape-radius-none` | `0` |
| `--shape-radius-xs` | `2px` |
| `--shape-radius-sm` | `4px` |
| `--shape-radius-md` | `8px` |
| `--shape-radius-lg` | `12px` |
| `--shape-radius-xl` | `16px` |
| `--shape-radius-2xl` | `24px` |
| `--shape-radius-full` | `9999px` |

### Semantic Radius
| Token | Value |
| :---- | :---- |
| `--shape-radius-button` | `4px` |
| `--shape-radius-input` | `16px` |
| `--shape-radius-card` | `8px` |
| `--shape-radius-chip` | `9999px` |
| `--shape-radius-avatar` | `9999px` |
| `--shape-radius-badge` | `4px` |
| `--shape-radius-dialog` | `12px` |
| `--shape-radius-modal` | `16px` |
| `--shape-radius-popover` | `8px` |

### Shadow Tokens
| Token | Value |
| :---- | :---- |
| `--elevation-shadow-none` | `none` |
| `--elevation-shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.05)` |
| `--elevation-shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `--elevation-shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `--elevation-shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `--elevation-shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |

### Semantic Shadows
- Card: `sm`
- Card hover: `md`
- Button: `sm`
- Dropdown: `lg`
- Modal: `xl`
- Toast: `lg`
- Tooltip: `md`

### Scrims
- `--elevation-scrim-light`: `rgba(0 0 0 / 0.3)`
- `--elevation-scrim-medium`: `rgba(0 0 0 / 0.5)`
- `--elevation-scrim-heavy`: `rgba(0 0 0 / 0.7)`
- `--elevation-scrim-backdrop`: `rgba(0 0 0 / 0.4)`

### Elevation Rules
- Hierarchy comes from surface steps first, shadows second
- Routine `Paper` and `Card` surfaces should not look glossy
- Borders are hairlines, not the main structure
- Full rounding is allowed for chips/avatars only

---

## 5. Components

### Layout System
| Token | Value |
| :---- | :---- |
| `--layout-breakpoint-tablet` | `768px` |
| `--layout-breakpoint-desktop` | `1024px` |
| `--layout-content-max-width` | `768px` |
| `--layout-content-max-width-default` | `1024px` |
| `--layout-grid-container-max-width` | `1280px` |
| `--layout-container-legal` | `1280px` |
| `--layout-page-gutter-inline` | `clamp(16px, 5vw, 48px)` |
| `--layout-section-gap` | `clamp(48px, 8vw, 96px)` |
| `--layout-section-spacing-expressive` | `clamp(48px, 6vw, 80px)` |
| `--layout-page-padding-top-mobile` | `80px` |
| `--layout-page-padding-top-tablet` | `96px` |
| `--layout-page-padding-top-desktop` | `128px` |

### Grid System
| Token | Mobile | Tablet | Desktop |
| :---- | :----- | :----- | :------ |
| Columns | `4` | `8` | `12` |
| Gap | `16px` | `24px` | `32px` |

### Header / Navigation Chrome
| Token | Value |
| :---- | :---- |
| `--layout-header-height-mobile` | `56px` |
| `--layout-header-height-mobile-md` | `70px` |
| `--layout-header-height-desktop` | `64px` |
| `--layout-header-height-desktop-lg` | `86px` |
| `--layout-mobile-nav-height` | `64px` |
| `--layout-hamburger-button` | `46px` |
| `--layout-hamburger-button-sm` | `44px` |
| `--touch-target-min` | `44px` |

### Spacing Scale
| Token | Value |
| :---- | :---- |
| `--space-0` | `0` |
| `--space-1` | `1px` |
| `--space-2` | `2px` |
| `--space-4` | `4px` |
| `--space-8` | `8px` |
| `--space-12` | `12px` |
| `--space-16` | `16px` |
| `--space-24` | `24px` |
| `--space-32` | `32px` |
| `--space-40` | `40px` |
| `--space-48` | `48px` |
| `--space-56` | `56px` |
| `--space-64` | `64px` |
| `--space-80` | `80px` |
| `--space-96` | `96px` |
| `--space-112` | `112px` |
| `--space-128` | `128px` |

### Control Density
| Token | Value |
| :---- | :---- |
| `--component-control-height-compact` | `36px` |
| `--component-control-height-comfortable` | `44px` |
| `--component-control-height-relaxed` | `52px` |

### Page Composition
- Required route wrapper: `PageLayout`
- Required route title block: `PageHeader`
- Required page section primitive: `Section`
- Homepage may use editorial asymmetry
- Members and Operations use the same dashboard grammar

### Paper
| Property | Default |
| :------- | :------ |
| Background | `bg-surface` |
| Text | `text-text` |
| Elevation | `1` |
| Outlined | `false` |
| Padding | `md` |
| Rounded | `lg` (`12px`) |
| Variant | `surface` |

Paper variants:
- `surface`
- `surface-muted`
- `surface-raised-subtle`
- `brand-bg`
- `secondary-bg`

Paper spacing tokens:
- `paper-padding-default`: `20px` at `md`, `24px` at `lg`
- `paper-padding-comfortable`: `32px` at `md`, `40px` at `lg`
- `paper-gap-default`: `16px` at `md`, `20px` at `lg`
- `paper-gap-comfortable`: `24px` at `md`, `32px` at `lg`

### Card
| Property | Default |
| :------- | :------ |
| Background | `bg-surface-raised` |
| Text | `text-text` |
| Border | `1px solid var(--color-border)` |
| Radius | `8px` |
| Elevation | `0` |
| Padding | handled by `CardHeader`, `CardContent`, `CardFooter` |

Card rules:
- Use only for discrete objects, options, previews, or repeated card collections
- `elevated=true` raises to elevation `1`
- `interactive=true` adds hover/focus lift and `md` shadow

### Buttons
Base rules:
- Radius: `4px`
- Minimum effective touch target: `44px`
- Focus: token-driven `focus-ring`
- No pill buttons

Variants:
- `default`: `bg-brand text-on-brand`
- `tonal`: `bg-secondary text-on-secondary`
- `outline`: transparent + `border-border`
- `ghost`: transparent + brand text
- `elevated`: `bg-surface text-brand` + elevation
- `destructive`: `bg-error text-on-error`
- `link`: text-only link styling

Visual size scale:
| Size | Height | Horizontal padding |
| :--- | :----- | :----------------- |
| `xs` | `24px` | `12px` |
| `sm` | `32px` | `16px` |
| `default` | `40px` | `24px` |
| `lg` | `48px` | `32px` |
| `xl` | `56px` | `40px` |

### Inputs
| Property | Value |
| :------- | :---- |
| Height | `56px` |
| Radius | `16px` |
| Horizontal padding | `16px` |
| Typography | `body-large` |
| Background | `bg-surface` |
| Border | `1px solid var(--color-border)` |

Input rules:
- Hover border: `var(--color-text)`
- Error border: `var(--color-error)`
- Caret: brand by default, error in invalid state
- Disabled: muted surface with disabled opacity

### Tables and Dense Data
- Always inside `Paper`
- Use subtle dividers only
- No aggressive zebra striping
- Toolbar stays integrated with table surface
- Dense data uses `body-medium` and `body-small`

### Chips / Badges / Avatars
- Chips and avatars may use `radius-full`
- Major buttons, cards, panels, and forms may not use `radius-full`
- Status chips use semantic background tokens, not saturated fills

### Homepage Exception Family
- Allowed: asymmetry, image offsets, cinematic scrims, large fluid type, richer motion
- Not allowed to leak into Members/Operations shared primitives

---

## 6. Do's and Don'ts

### Do
- Use semantic tokens
- Use `AppShell`, `PageLayout`, `Section`, `PageHeader`
- Use `Paper` first, `Card` second
- Keep Members and Operations calm and systematic
- Keep Homepage expressive but bounded
- Use tonal hierarchy before borders
- Use static grid spans

### Don't
- Don't use raw hex in app code
- Don't use Tailwind default palette colors
- Don't use `Container`, `Stack`, `HStack`, `VStack`
- Don't reintroduce shared `BentoGrid`
- Don't use `sm`, `xl`, `2xl` breakpoints in app code
- Don't use dynamic `col-span-*`
- Don't use pill buttons or pill cards
- Don't use raw `p`, `span`, `h1-h6` in app-level UI
