# Zielbild: `homepage`, `members`, `operations` als vollwertige Apps

Dieses Dokument fasst die **maßgeblichen Repo-Quellen** zusammen und beschreibt, wie die drei Ordner unter `apps/` als eigenständige Next.js-Apps im Monorepo aussehen sollten — analog zur bisherigen Referenz-App `apps/web`, die **entfallen** kann, sobald die neuen Apps dieselbe Rolle übernehmen.

---

## 1. Quellen (Reihenfolge beim Lesen)

| Priorität | Pfad | Inhalt |
|-----------|------|--------|
| Einstieg | [`AGENTS.md`](../../AGENTS.md) | Verbindliche **Tool-Versionen**, Index zur Online-Verifikation, Verweis auf lokale Docs unter `docs/`. |
| Projekt (Nezumi) | [`docs/nezumi-ui/README.md`](../../docs/nezumi-ui/README.md) | UI-Paket-Struktur, **Import-Contract** (`@nezumi/ui/...`), keine Root-Barrel-Exports. |
| Monorepo-Grenzen | [`docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`](../../docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx) | Erlaubte Import-Richtungen, Next/React-Defaults in diesem Repo. |
| Zielbaum (Vendor + Nezumi) | [`nezumi-ui-target-file-tree.md`](../../nezumi-ui-target-file-tree.md) | Turborepo/shadcn/Next/Tailwind: **Dateibäume**, `transpilePackages`, `@source`, `components.json`. |

**Hinweis:** Vendor-Spiegel liegen unter `docs/*/INDEX.md` (z. B. Turborepo, Next.js App Router, Tailwind v4, shadcn Monorepo). Für Architektur **dieses** Repos gewinnen `docs/nezumi-ui/` und der Code unter `packages/` gegenüber blindem Framework-Raten.

---

## 2. Verbindliche Versionen (aus `AGENTS.md` / Catalog)

Diese Pins gelten für **alle** Apps im Workspace (`pnpm-workspace.yaml` **Catalog** + Lockfile):

| Paket / Runtime | Semver im Repo | Typisch gelöst |
|-------------------|----------------|----------------|
| `react` / `react-dom` | `^19.2.5` | 19.2.5 |
| `typescript` | `^6.0.3` | 6.0.3 |
| `next` | `^16.2.4` | 16.2.4 |
| `tailwindcss` & `@tailwindcss/postcss` | je `^4.2.4` | 4.2.4 |
| **pnpm** | `10.33.3` (`packageManager`) | exakt |
| **Node.js** | `^24.0.0` (`engines`) | 24.x |

Details: [`FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md).

---

## 3. Workspace-Topologie (bereits gegeben)

- [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml): `apps/*` und `packages/*` — jeder Unterordner von `apps/` **mit eigener `package.json`** ist ein pnpm-Workspace-Paket.
- [`turbo.json`](../../turbo.json): Tasks `build` (Outputs u. a. `.next/**`), `dev` (persistent, nicht gecacht), `typecheck` (hängt von `^build` ab). Neue Apps **ohne** eigene Scripts würden an der Root-Pipeline vorbei fallen; jede App sollte mindestens `dev`, `build`, `typecheck` wie die Referenz definieren.

**Grenzregel (Nezumi):** Apps dürfen `@nezumi/ui` und eigene npm-Abhängigkeiten importieren. **Keine** Imports zwischen Apps (`app A → app B`). `@nezumi/ui` importiert **nicht** aus `apps/*`. Siehe [`011-nezumi-ui-monorepo-architecture.mdx`](../../docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx).

---

## 4. Was „eine richtige App“ hier bedeutet (Next.js App Router)

Aus [`nezumi-ui-target-file-tree.md`](../../nezumi-ui-target-file-tree.md) und [`011-nezumi-ui-monorepo-architecture.mdx`](../../docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx): Jede deploybare App ist eine **eigenständige** Next-**App-Router**-Anwendung mit eigenem Paketnamen, eigenem `app/`-Router und denselben technischen Mindestteilen wie die heutige Referenz unter `apps/web/`.

### 4.1 Soll-Dateibaum pro App (orientiert an `apps/web` + shadcn/Turborepo-Doku)

```text
apps/<name>/                    # z. B. homepage | members | operations
├── app/
│   ├── globals.css             # Tailwind v4 + ggf. @source für packages/ui
│   ├── layout.tsx
│   └── page.tsx
├── components/                 # nur app-spezifische Kompositionen (optional)
├── components.json             # laut shadcn-Monorepo-Doku pro Workspace; style/baseColor an packages/ui ausrichten
├── eslint.config.mjs         # wenn ihr ESLint pro App führt
├── next.config.ts
├── package.json
├── postcss.config.mjs          # @tailwindcss/postcss (Tailwind-v4-Doku: .mjs)
└── tsconfig.json
```

### 4.2 Technische Pflichtpunkte

- **`package.json`:** `private: true`; Scripts analog `apps/web` — z. B. `dev`: `next dev --turbopack` (oder mit **`--port`** / `-p` damit drei Apps parallel laufen); `build`, `start`, `typecheck`. Dependencies über **`catalog:`** für `next`, `react`, `react-dom`, `typescript`, Tailwind, `@types/*`.
- **`next.config.ts`:** `transpilePackages: ["@nezumi/ui"]` — siehe Next-Doku `transpilePackages` im Repo-Spiegel unter `docs/nextjs/`.
- **`postcss.config.mjs`:** PostCSS-Plugin `@tailwindcss/postcss`.
- **`app/globals.css`:** `@import "tailwindcss"`; **keine** dynamisch zusammengesetzten Klassenstrings; bei Bedarf **`@source`** auf Pfade unter `packages/ui` (Tailwind „detecting classes“); Import der Design-Tokens wie in `apps/web` über z. B. `@import "@nezumi/ui/design-tokens.css"` — Exportnamen immer an [`packages/ui/package.json`](../../packages/ui/package.json) **`exports`** halten.
- **`app/layout.tsx`:** globales CSS importieren; `lang` auf `<html>` pro App setzen.
- **Konsum von `@nezumi/ui`:** Nur **öffentliche** Subpaths (`@nezumi/ui/components/...`, `@nezumi/ui/layout`, `@nezumi/ui/lib/utils`, CSS-Exports) — siehe [`docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`](../../docs/nezumi-ui/001-nezumi-ui-getting-started.mdx).
- **UI-Paket vor dem Build der Apps:** `turbo.json` lässt `typecheck` von `^build` abhängen; `@nezumi/ui` sollte weiterhin über Root oder Filter gebaut werden (`pnpm --filter @nezumi/ui build`), falls `dist/` benötigt wird.

### 4.3 `components.json`

Die shadcn-Monorepo-Anleitung sieht **`components.json` in jeder** relevanten Workspace (`apps/` und `packages/ui`). Das aktuelle `apps/web` enthält sie noch nicht — beim Aufrüsten der drei Apps sollte sie ergänzt und mit `packages/ui/components.json` abgestimmt werden (v. a. **Tailwind v4**: leeres `tailwind.config` in der JSON, **`tailwind.css`** zeigt auf die gemeinsame Globals-Strecke — Details im Vendor-Dokument `docs/shadcn-ui/overview/monorepo.mdx`).

---

## 5. Die drei Ziel-Apps: Rolle und Namensgebung

| Ordner | Paketname-Vorschlag (`package.json` `#name`) | Inhaltliche Rolle (teamdefiniert) |
|--------|-----------------------------------------------|-------------------------------------|
| `apps/homepage` | z. B. `homepage` oder `@nezumi/homepage` | Öffentliche Marketing-/Landing-Oberfläche |
| `apps/members` | z. B. `members` oder `@nezumi/members` | Mitgliedsbereich / Customer Portal |
| `apps/operations` | z. B. `operations` oder `@nezumi/operations` | Interne Operations-Konsole |

**Konvention:** Einheitliches Schema für `name` (entweder kurz `homepage` **oder** scoped `@nezumi/homepage`) im ganzen Monorepo festlegen; pnpm-Filter und CI-Skripte referenzieren diese Namen (`pnpm --filter homepage dev`).

**Parallel-Dev:** Drei `next dev`-Instanzen **müssen** unterschiedliche Ports nutzen (`next dev -p 3000` / `3001` / `3002` o. Ä.) oder ihr konsolidiert später über ein Root-Tooling (nicht in den genannten Nezumi-Docs vorgeschrieben).

---

## 6. Entfall von `apps/web`

- `apps/web` war die **Referenz-Next-App** (minimaler App Router + Anbindung `@nezumi/ui`).
- Sobald `homepage`, `members` und `operations` dieselbe technische Basis haben, kann `apps/web` **entfernt** werden, sofern keine CI-Doku oder README mehr darauf verweist.
- Prüfen: Root-Scripts, `turbo` implizit über `apps/*`, ggf. **Dokumentationslinks** in `docs/nezumi-ui/` und `nezumi-ui-target-file-tree.md`, die noch `apps/web` als Beispiel nennen — dort auf eine der neuen Apps oder auf ein generisches `apps/<name>/` umstellen.

---

## 7. Kurz-Checkliste für die Umsetzung

1. Pro Ordner `homepage`, `members`, `operations`: vollständige Next-App wie oben; **`package.json`** + Lock (`pnpm install` im Root).
2. **`next.config.ts`** mit `transpilePackages: ["@nezumi/ui"]`.
3. **`globals.css`** mit Tailwind + korrekten **`@source`**-Pfaden zu `packages/ui` (analog `apps/web`).
4. **`components.json`** an `packages/ui` spiegeln (shadcn Monorepo).
5. Root: `pnpm dev` / `pnpm build` / `pnpm typecheck` — alle drei Apps sollten in der Turbo-Pipeline mitlaufen.
6. `apps/web` nur löschen, wenn Referenzen bereinigt sind.

---

*Stand der Auswertung: aus `AGENTS.md`, `docs/README.md`, `docs/nezumi-ui/README.md`, `docs/nezumi-ui/INDEX.md`, `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`, `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`, `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`, `nezumi-ui-target-file-tree.md` und dem Ist-Zustand von `apps/web/` sowie `packages/ui/package.json`.*
