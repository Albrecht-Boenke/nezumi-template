# Farb-Tokens: IST-Inventar und Migrations-Checkliste

**Stand:** Semantik + Primitives + Apps + UI-Komponenten sind auf **[`DESIGN.md`](./DESIGN.md) §2** umgestellt (eine Naming-Convention). Offen: Scrims/Elevation-Namen, ggf. weitere Doku-Snippets, manuelle visuelle QA.

**Zweck:** Keine Altlasten übersehen. App-Code: semantische Tailwind-Utilities (`bg-surface`, `text-text`, `bg-brand`, …). Primitives: nur `tokens/colors.css` als **`@theme`** mit `--color-nezumi-*` (**OKLCH** via `oklch(from #… l c h)`; Hex aus [`DESIGN.md`](./DESIGN.md) §2).

---

## Referenzen

| Dokument / Ort | Rolle |
|----------------|--------|
| [`DESIGN.md`](./DESIGN.md) §2 | SSOT Farben |
| [`docs/nezumi-ui/005-nezumi-ui-foundation.mdx`](docs/nezumi-ui/005-nezumi-ui-foundation.mdx) | Aktuelle Dateistruktur |
| [`docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx`](docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx) | 3-Layer-Konzept + Hinweis DESIGN |

---

## SOLL: Wo die Farben liegen (Ist-Zustand)

| Schicht | Datei | Inhalt |
|---------|--------|--------|
| **Primitives** | `packages/ui/src/styles/tokens/colors.css` | `@theme { --color-nezumi-*: oklch(from #… l c h); }` (Hex aus DESIGN §2) |
| **Semantic** | `packages/ui/src/styles/semantic/colors.css` | `@theme` — alle `--color-*` aus DESIGN §2 inkl. Status-Mixes (light), Focus, Ring |
| **Dark** | `packages/ui/src/styles/design-tokens.css` | `.dark { … }` — Dark-Spalte + 25%-Mix Status-BGs + Button-Hover-Mixes |
| **Component** | `components/button.css` | `--color-button-*` (Hover/Active aus `color-mix`) |
| | `components/card.css` | `--card-*` → `--color-surface-raised`, `--color-border`, `shadow-none` |
| **Base** | `design-tokens.css` | `body`: surface/text; Fokus 1px/2px; Scrollbar |

---

## IST-Inventar — Abnahme

### A. `packages/ui/src/styles`

- [x] **`tokens/colors.css`** — Nezumi-Primitives als **`@theme`** `--color-nezumi-*`, OKLCH via `oklch(from #… l c h)`.
- [x] **`semantic/colors.css`** — nur DESIGN-`--color-*` + Fokus-Tokens.
- [x] **`design-tokens.css`** — `.dark` + Base ohne `foreground`/`action-*`.
- [x] **`components/card.css`** / **`button.css`** — an Semantik angepasst.
- [ ] **`tokens/shadows.css`** — ggf. DESIGN-Scrims (`--elevation-scrim-*`) ergänzen.
- [ ] **`components/input.css`** — Farben/Hover/Error aus DESIGN § Inputs (folgt).

### B. `packages/ui` React / Tests

- [x] **`Button.tsx` / `Button.test.tsx`** — `bg-brand`, `text-on-brand`, `border-border`, Link `text-brand`.
- [x] **`Card`** — `text-text`, `text-text-muted`, Card-Token-Hintergrund.

### C. Apps

- [x] **`apps/playground`**, **`homepage`**, **`members`**, **`operations`** — `globals.css` importiert `design-tokens.css`; Klassen `text-text`, `bg-surface`, keine `neutral-*`/`foreground`.

### D. Dokumentation

- [x] **`005`**, **`002`**, **`001`**, **`007`**, **`008`**, **`010`** (Hinweis DESIGN) — auf aktuelle Semantik angepasst.
- [ ] **`013`, `015`, `018`, …`** — bei Bedarf restliche Beispiele prüfen (`grep color-neutral`, `foreground`).
- [ ] **`shadcn-button-deepdive.html`** — optional Nezumi-Vokabular.

### F. Merge-Checks (bei größeren PRs wiederholen)

- [ ] Suche: `foreground`, `action-primary`, `color-neutral`, `bg-neutral`, `bg-card`, `bg-muted` in `packages/ui` + `apps` (`.tsx|.ts|.css`).
- [ ] Suche: belanglose Hex in App-Komponenten (nicht in `DESIGN.md` / `tokens/colors.css`).

---

## Abnahme visuell

- [ ] Playground + eine App: Light/Dark, Button-Varianten, Fokus-Ring, Konsole-Status-Badges.

---

*Bei neuen Apps: nur `globals.css`-Entry + `@import "@nezumi/ui/design-tokens.css"`, keine zweite Farbquelle.*
