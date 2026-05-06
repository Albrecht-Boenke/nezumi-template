---
title: docs/ – Überblick
description: Projektdokumentation versus Vendor-Spiegel; zentraler Offline-Einstieg mit llms.txt.
source: Repo-intern definierte Navigationshilfe für Agents
---

# Dokumentation (Übersicht)

**Wann dieses Dokument öffnen?**

- Orientierung: Wo liegt Nezumi-Doku versus Vendor-Spiegel?
- Du brauchst den **Pfad zur passenden INDEX.md**, bevor du tief gehst.

Dieser Ordner enthält **zwei Arten von Inhalten**:

| Art | Pfad | Zweck |
|-----|------|--------|
| **Projekt (Nezumi)** | [`nezumi-ui/`](./nezumi-ui/README.md) | Architektur, Konventionen und die **maßgebliche** Beschreibung dieses Repos. |
| **Vendor (Offline-Mirror)** | [`react/`](./react/INDEX.md), [`nextjs/`](./nextjs/INDEX.md), [`tailwind-css/`](./tailwind-css/INDEX.md), [`shadcn-ui/`](./shadcn-ui/INDEX.md), [`typescript/`](./typescript/INDEX.md), [`turbo/`](./turbo/INDEX.md), [`cn/`](./cn/INDEX.md) | Zeitpunktbezogene Schnappschüsse zum Nachschlagen ohne Netz – siehe Manifest. |

**Retrieval für Agents:** Zuerst die passende **`INDEX.md`** (oder `nezumi-ui/README.md`) öffnen, dann gezielt verlinkte Dateien – nicht rekursiv alles durchsuchen. Voller Dateibaum liegt absichtlich **nicht** im Standard-Kontext.

Zusätzlich: Projekt-root **`OFFLINE_AGENT_RETRIEVAL_CHECKLIST.md`** (Best-Practice-Leitpfaden) und zentrale Link-Datei **[`llms.txt`](./llms.txt)** (kurze Index-Liste aller Bereiche).

## Nezumi (dieses Repo)

| Inhalt | Link |
|--------|------|
| UI-Library / Monorepo | [nezumi-ui/README.md](./nezumi-ui/README.md) |

## Offline Vendor-Snapshots (offizielle Framework-Doku)

Siehe auch [vendor-framework-docs.md](./vendor-framework-docs.md) für Quellen und Hinweise zum Aktualisieren.

| Bereich | Index | Original |
|---------|-------|----------|
| React | [react/INDEX.md](./react/INDEX.md) | [react.dev](https://react.dev) |
| Next.js | [nextjs/INDEX.md](./nextjs/INDEX.md) | [nextjs.org/docs](https://nextjs.org/docs) |
| Tailwind CSS | [tailwind-css/INDEX.md](./tailwind-css/INDEX.md) | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| shadcn/ui | [shadcn-ui/INDEX.md](./shadcn-ui/INDEX.md) | [ui.shadcn.com/docs](https://ui.shadcn.com/docs) |
| TypeScript | [typescript/INDEX.md](./typescript/INDEX.md) | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| Turborepo | [turbo/INDEX.md](./turbo/INDEX.md) | [turborepo.dev/docs](https://turborepo.dev/docs/) |
| `cn()` (clsx + tailwind-merge) | [cn/INDEX.md](./cn/INDEX.md) | Repos verlinkt im Index |

### Semantische Sitemap (Vendor)

| Bereich | Datei |
|---------|-------|
| Turborepo (Themenbaum + Kurzsummary, entspricht [turbo.build/sitemap.md](https://turbo.build/sitemap.md)) | [turbo/sitemap-official.md](./turbo/sitemap-official.md) |

---

Struktur- und Abgleich-Zielbaum: Projektroot **DOCS_STRUCTURE_CHECKLIST.md**.

Offline **Retrieval** für Agents (Best Practice, ohne Netzwerk): Projektroot **OFFLINE_AGENT_RETRIEVAL_CHECKLIST.md** (Umsetzung geprüft 2026-05-06).

Cursor (**optional**, kein automatisches Einlesen des ganzen Trees): [.cursor/rules/offline-docs-retrieval.mdc](../.cursor/rules/offline-docs-retrieval.mdc).
