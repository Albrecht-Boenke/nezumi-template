# Offline Vendor-Dokumentation (nur Markdown / MDX)

Stand: 2026-05-06 (_Snapshot-Datum; gegenüber den jeweiligen Produktions-Webseiten möglicherweise veraltet — bei Unsicherheit Online-URLs in `AGENTS.md` konsultieren_).

Diese Verzeichnisse enthalten **ausschließlich** `.md` / `.mdx` Vendor-Dateien (plus bei **Turborepo** `llms.txt` und `sitemap-official.md`). **Keine** Git-Repositories. Pfade sind gegenüber dem Upstream **abgeflacht**; die Einstiege stehen in **`INDEX.md`** pro Bereich sowie in **`docs/README.md`**.

| Ordner | Inhalt | Ursprung (Upstream) |
|--------|--------|---------------------|
| `react/` | react.dev Snapshot | [reactjs/react.dev](https://github.com/reactjs/react.dev) → ~~`src/content`~~ liegt jetzt **direkt** unter `react/` |
| `nextjs/` | Next.js Handbook | [vercel/next.js](https://github.com/vercel/next.js) → `docs` (Struktur unverändert, nur Index) |
| `tailwind-css/` | tailwindcss.com Doku-Seiten | [tailwindlabs/tailwindcss.com](https://github.com/tailwindlabs/tailwindcss.com) → ~~`src/docs`~~ liegt jetzt **direkt** unter `tailwind-css/` |
| `shadcn-ui/` | shadcn/ui v4 Docs | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) → ~~`apps/v4/content/docs`~~ liegt jetzt direkt unter `shadcn-ui/`; **`(root)` → `overview`** |
| `typescript/` | Handbook + TSConfig-Texte | [microsoft/TypeScript-Website](https://github.com/microsoft/TypeScript-Website) → `handbook/` (= `documentation/copy/en`), `tsconfig/` (= `tsconfig-reference/copy/en`) |
| `turbo/` | turbo.build Handbook & Blog … | [vercel/turborepo](https://github.com/vercel/turborepo) → `handbook/` (= `apps/docs/content/docs`), sowie `blog/`, `openapi/`, … (= `apps/docs/content/*`), [llms.txt](https://turbo.build/docs/llms.txt), [sitemap (Markdown)](https://turbo.build/sitemap.md) → lokal **`sitemap-official.md`** |
| `cn/` | clsx & tailwind-merge Artikel | [lukeed/clsx](https://github.com/lukeed/clsx), [dcastil/tailwind-merge](https://github.com/dcastil/tailwind-merge) |

## Geltende Quelle („Source of Truth“)

- Für **dieses Produkt und dieses Repo** (Nezumi UI, Paketgrenzen, Tokens, Imports) gilt ausschließlich **`docs/nezumi-ui/`**, nicht ein Vendor-Spiegel.
- Vendor-Spiegel dienen zum **Nachschlagen** von Framework-APIs und Best Practices **offline**. Widerspricht der Mirror der Nezumi-Doku, gilt **Nezumi**.

## Retrieval-Hinweise (Agent-freundlich)

- Einzelne Vendor-Dateien können sehr große **Monolith-MDX** sein (upstream bedingt). Wo Aufteilen nicht ohne Weiteres möglich ist: **über `INDEX.md` und Dateinamen-/IDE-Suche** gezielt die passende Datei laden.
- **MDX** kann JSX/Imports enthalten; einige Viewer rendern sie nicht wie reines Markdown – die Bereichs-**`INDEX.md`** bleiben bevorzugter Einstieg.
- Navigation: Projektüberblick **`docs/README.md`**, Bereich **`*/INDEX.md`**, strukturelle Referenz **`DOCS_STRUCTURE_CHECKLIST.md`** (Repo-Root).
- **Aktualisieren**: Upstream wieder minimal auschecken/kopieren und dieselbe Pfadflattening wiederholen (`DOCS_STRUCTURE_CHECKLIST.md`; Retrieval-Kriterien: `OFFLINE_AGENT_RETRIEVAL_CHECKLIST.md`).
- **CN** meint **`cn()`** (clsx + tailwind-merge), nicht zwangsläufig CVA.
- Projektinterne Dateien unter `docs/nezumi-ui/` bleiben eigenständig.

## Struktur (offline Checkliste §2 — Abgleich)

- **§2.1:** Keine veralteten Pfadschalen (`src/content`, `apps/v4/…`) mehr unter den Vendor-Spiegeln.
- **§2.2:** `docs/nezumi-ui/` (Projekt) klar gegenüber `docs/<vendor>/` (Mirror); Konfliktregeln siehe Abschnitt „Geltende Quelle“ oben.
- **§2.3:** Ordner ohne Sonderzeichen im Namen dort, wo Umbenennung ohne Contentbruch ging (shadcn: `overview/` statt `(root)/`).
- **§2.4:** Dateinamen folgen dem Upstream (Utility-Slugs, Handbuchordner); keine parallelen „Zweit“-Kopien pro Thema angelegt.
