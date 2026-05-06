---
title: Turborepo (offline Dokumentations-Index)
description: handbook/ plus Blog, OpenAPI, semantische Sitemap und Routenliste llms.txt.
source: Offline-Mirror vercel/turborepo apps/docs/content
last_updated_note: Manifest-Datum siehe ../vendor-framework-docs.md
---

# Turborepo / turbo.build (offline Snapshot)

**Wann diese Sektion lesen?**

- **Monorepo-Tasks**, `turbo.json`, Caching und Remote Cache.
- **CLI-Referenz**, Guides (CI, Frameworks, Tools).
- **Themenüberblick** ohne einzelnes Ziel (`sitemap-official.md` für semantische Navigation).

**MDX-Hinweis:** `handbook/`, `blog/` u. a. sind `.mdx`; strukturelle Navigation zusätzlich in `sitemap-official.md` (Markdown ohne JSX).

Inhalt aus [vercel/turborepo – `apps/docs/content`](https://github.com/vercel/turborepo/tree/main/apps/docs/content), hier aufgeteilt in flache Top-Level-Ordner.

| Ordner / Datei | Bedeutung |
|----------------|-----------|
| [handbook/](handbook/) | Hauptdoku (früher `content/docs`) – Einstieg [handbook/index.mdx](./handbook/index.mdx) |
| [blog/](blog/) | Release- und Produkt-Blog |
| [external-blog/](external-blog/) | Externe Cross-Posts |
| [openapi/](openapi/) | OpenAPI-Dokumentation |
| [extra/](extra/) | Zusatzseiten (Terms, Governance) |
| [llms.txt](llms.txt) | Kurzliste der Doku-Routen für LLMs ([turbo.build/docs/llms.txt](https://turbo.build/docs/llms.txt)) |
| [sitemap-official.md](sitemap-official.md) | Ausführliche **semantic sitemap** (Hierarchie, Typen, Summaries); offline-Spiegel von [turbo.build/sitemap.md](https://turbo.build/sitemap.md) |
| [SOURCE-site-README.md](SOURCE-site-README.md) | Kurznotiz aus dem Upstream Docs-Package |

## Einstieg (Handbuch)

| Thema | Datei |
|-------|-------|
| Introduction | [handbook/index.mdx](./handbook/index.mdx) |
| Getting Started | [handbook/getting-started/index.mdx](./handbook/getting-started/index.mdx) |
| Core Concepts | [handbook/core-concepts/index.mdx](./handbook/core-concepts/index.mdx) |
| Crafting your repo | [handbook/crafting-your-repository/index.mdx](./handbook/crafting-your-repository/index.mdx) |
| CLI Reference Überblick | [handbook/reference/index.mdx](./handbook/reference/index.mdx) |
| Guides Überblick | [handbook/guides/index.mdx](./handbook/guides/index.mdx) |

## Original / Indizes

- Website: [turbo.build/docs](https://turbo.build/docs)
- Live-Sitemap (gleicher Inhalt wie `sitemap-official.md`): [turbo.build/sitemap.md](https://turbo.build/sitemap.md)

Hinweis: In `sitemap-official.md` stehen **URLs mit Präfix `/docs/…`** wie auf turbo.build — deine lokalen Kapitel findest du unter [`handbook/`](handbook/) (z. B. Routen-Unterteil passt oft zu Unterordnern wie `getting-started/`).
