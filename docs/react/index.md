---
title: React (offline Dokumentations-Index)
description: Einstieg für den lokalen react.dev-Spiegel; relative Links zur Learn- und Referenzstruktur.
source: Offline-Mirror nach reactjs/react.dev (Upstream `src/content`, hier flach)
last_updated_note: Manifest-Datum siehe ../vendor-framework-docs.md
---

# React (offline Snapshot)

**Wann diese Sektion lesen?**

- Du brauchst **API- oder Hooks-Referenz** zu `react` / `react-dom` oder begleitenden Tools.
- Du arbeitest an **Tutorial-/Learn-Inhalten** des offiziellen Lehrplans.
- Du suchst **Fehler- oder Warnmeldungen** aus dem gleichnamigen Doku-Korpus.

**Nezumi-Template (dieses Repo):** Gebunden im pnpm Catalog u. a. **`react` 19.2.5**, **`react-dom` 19.2.5**, **`typescript` 6.0.3**, **`tailwindcss` / `@tailwindcss/postcss` 4.2.4**, **`next` 16.2.4**, **pnpm** 10.33.3, **Node** 24.x (`^24.0.0`). Übersicht: [`FRAMEWORK_VERSION_REFERENCES.md`](../../FRAMEWORK_VERSION_REFERENCES.md). Texte unterhalb dieses INDEX bleiben **react.dev**-Mirror — „React 19“ dort ist upstream-sprachlich, nicht immer auf 19.2.5 umgestellt.

**MDX-Hinweis:** Viele Unterseiten sind `.md`/`.mdx` aus der Website; JSX in Dateien kann in reinen Markdown-Viewern gestört dargestellt werden—Inhalt gilt dennoch als authoritative Mirror-Text.

Quelle der Dateien: [reactjs/react.dev](https://github.com/reactjs/react.dev) (`src/content` → hier flach unter `react/`).

## Einstieg

| Seite | Datei |
|-------|-------|
| Start / Home | [index.md](./index.md) |
| Versionshinweise Übersicht | [versions.md](./versions.md) |
| Original-Website | [react.dev](https://react.dev) |

## Hauptbereiche

| Bereich | Einstieg / Ordner |
|---------|-------------------|
| Learn | [learn/index.md](./learn/index.md) |
| Referenz – Übersichten | Unterordner unter [reference/](reference/) siehe Tabellen unten |
| Blog | [blog/](blog/) |
| Community | [community/](community/) |
| Fehler-/Warnungstexte | [errors/](errors/) · [warnings/](warnings/) |

## Reference – direkte Einstiege

| Thema | Datei |
|-------|-------|
| `react` Paket | [reference/react/index.md](./reference/react/index.md) |
| `react-dom` | [reference/react-dom/index.md](./reference/react-dom/index.md) |
| ESLint Hooks Plugin | [reference/eslint-plugin-react-hooks/index.md](./reference/eslint-plugin-react-hooks/index.md) |
| Regeln | [reference/rules/index.md](./reference/rules/index.md) |

## Learn – Unterbereich Compiler

| Thema | Datei |
|-------|-------|
| React Compiler | [learn/react-compiler/index.md](./learn/react-compiler/index.md) |

---

_Tipp: Über `reference/` gibt es zusätzliche Unterordner wie `react-dom/client`, `rsc/` usw. – dort jeweils `index.md`-Dateien._
