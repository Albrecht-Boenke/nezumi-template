# Homepage App Roadmap / Checklist

## Aufgabenstellung

Dieses Dokument ersetzt die bisherige Vorlage `MONOREPO_APPS_ZIELBILD.md` durch eine korrigierte Roadmap fuer `apps/homepage`. Ziel ist eine eigenstaendige, oeffentliche Next.js-App-Router-Anwendung im Nezumi-Monorepo. Die bisherige Referenz-App wurde gemaess Auftrag von `apps/web` nach `apps/playground` umbenannt; `playground` bleibt damit Referenz/Sandbox und wird nicht als entfallende App behandelt.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/002-01-app-01-getting-started-02-project-structure.mdx`
- `docs/nextjs/005-01-app-01-getting-started-05-server-and-client-components.mdx`
- `docs/nextjs/014-01-app-01-getting-started-14-metadata-and-og-images.mdx`
- `docs/nextjs/061-01-app-02-guides-production-checklist.mdx`
- `docs/nextjs/063-01-app-02-guides-public-static-pages.mdx`
- `docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx`
- `docs/turbo/INDEX.md`
- `docs/turbo/14-crafting-your-repository-configuring-tasks.mdx`
- `docs/turbo/17-crafting-your-repository-developing-applications.mdx`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/052-dark-mode.mdx`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/tailwind-css/084-functions-and-directives.mdx`
- `docs/tailwind-css/147-responsive-design.mdx`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/monorepo.mdx`
- `docs/shadcn-ui/overview/components-json.mdx`
- `docs/shadcn-ui/overview/theming.mdx`
- `docs/shadcn-ui/overview/tailwind-v4.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Projekt- und Vendor-Spiegel klaeren die Aufgabe ausreichend.

## Abgeleiteter Soll-Zustand

`apps/homepage` soll eine deploybare Next.js-16-App-Router-App fuer Marketing, Landing Pages und oeffentliche Inhalte sein. Sie nutzt React Server Components als Default, setzt Client Components nur fuer Interaktion ein, importiert `@nezumi/ui` nur ueber oeffentliche Subpath-Exports und laesst Tailwind v4 die App sowie `packages/ui` ueber `@source` scannen.

Die App braucht eine eigene `package.json`, eigene Next-/TypeScript-/PostCSS-Konfiguration, ein `app/`-Verzeichnis, App-spezifische `components/` nur fuer Kompositionen und ein `components.json`, sobald shadcn-CLI-Workflows aus der App heraus genutzt werden. Die shadcn-Vendor-Doku sagt, dass Monorepo-Workspaces fuer CLI-Nutzung jeweils ein korrektes `components.json` brauchen; die allgemeine `components.json`-Doku stellt klar, dass diese Datei nur fuer CLI-basierte Generierung erforderlich ist.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/playground/package.json`
- `apps/playground/next.config.ts`
- `apps/playground/app/globals.css`
- `apps/playground/app/layout.tsx`
- `apps/playground/app/page.tsx`
- `packages/ui/package.json`
- `packages/ui/components.json`

## Empfohlener Zielbaum

```text
apps/homepage/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── opengraph-image.tsx
├── components/
│   └── marketing-specific-compositions.tsx
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Setup-Checklist

- [ ] `package.json` mit `name: "homepage"`, `private: true`, Scripts `dev`, `build`, `start`, `typecheck` und Dependencies `@nezumi/ui`, `next`, `react`, `react-dom` anlegen.
- [ ] Fuer paralleles Entwickeln einen festen Port verwenden, z. B. `next dev --turbopack -p 3000`.
- [ ] `next.config.ts` mit `transpilePackages: ["@nezumi/ui"]` setzen.
- [ ] `postcss.config.mjs` mit `@tailwindcss/postcss` setzen.
- [ ] `app/globals.css` mit `@import "tailwindcss"`, `@source "../../../packages/ui/src/**/*.{ts,tsx}"`, optional `@source "../../../packages/ui/dist/**/*.{js,mjs}"`, `@source "../**/*.{ts,tsx,mdx,css}"` (nur diese App — **nicht** `../../**/*`, sonst wird ganz `apps/` gescannt) und `@import "@nezumi/ui/design-tokens.css"` anlegen.
- [ ] `app/layout.tsx` als Server Component belassen, `Metadata` exportieren, `lang="de"` setzen und globales CSS einmal importieren.
- [ ] `app/page.tsx` als statische/teil-statische Landing Page starten; Request-time APIs wie `cookies`, `headers` oder unnoetige `searchParams` im Root vermeiden.
- [ ] SEO-Dateien fuer oeffentliche App einplanen: `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, App-Icon/Favicon.
- [ ] Dark-Mode-Strategie vor UI-Ausbau festlegen; keine manuellen `dark:`-Farbduplikate als Standard fuer Produkt-UI einfuehren.
- [ ] Styling ueber semantische Nezumi-/Tailwind-v4-Tokens fuehren; raw color utilities wie `text-green-600` nur als bewusst begruendete Ausnahme verwenden.
- [ ] Tailwind-Klassen immer statisch detektierbar halten; keine dynamischen Strings wie `bg-${variant}-600`.
- [ ] App-spezifische Marketing-Kompositionen unter `apps/homepage/components/` halten; wiederverwendbare UI bleibt in `packages/ui`.
- [ ] Nur oeffentliche UI-Imports nutzen: `@nezumi/ui/components/button`, `@nezumi/ui/layout`, `@nezumi/ui/lib/utils`, CSS-Exports.
- [ ] `components.json` an `packages/ui/components.json` angleichen: gleicher `style`, `iconLibrary`, `baseColor`, Tailwind-v4-`config` leer; App-Aliase fuer lokale Kompositionen und `@nezumi/ui` sauber trennen.
- [ ] Production-Gates definieren: `pnpm --filter @nezumi/ui build`, `pnpm --filter homepage typecheck`, `pnpm --filter homepage build`.

## Korrekturen gegenueber der alten Vorlage

- `apps/web` ist nicht mehr der Zielpfad. Die korrigierte Referenz ist `apps/playground`; fuer neue Apps gilt generisch `apps/<name>`.
- `apps/web` soll nicht ersatzlos entfallen, sondern wurde in dieser Arbeitsrunde in `apps/playground` umbenannt.
- `components.json` ist kein Runtime-Muss, aber fuer shadcn-CLI-Workflows im Monorepo ein verbindlicher Vorbereitungspunkt.
- Feste Dev-Ports muessen als App-Script-Konvention aufgenommen werden, statt nur als Hinweis im Fliesstext.
- `homepage` muss zuerst ein echtes Workspace-Paket werden; Content- und UI-Arbeit ist nachgelagert.

## Findings nach Schweregrad

### High

- Die alte Vorlage behandelte `apps/web` als entfallende Referenz-App. Das widerspricht dem aktuellen Auftrag, `apps/web` nach `apps/playground` umzubenennen. Korrektur: `playground` als Sandbox/Referenz behalten und neue Ziel-Apps separat aufbauen.

### Medium

- `apps/homepage` ist derzeit keine echte Workspace-App, solange keine eigene `package.json` existiert. `pnpm-workspace.yaml` nimmt zwar `apps/*` auf, aber Turbo/Pnpm koennen ohne Paketmanifest keine App-Tasks fuer `homepage` ausfuehren.
- `components.json` ist nicht generell zur Laufzeit erforderlich, aber fuer shadcn-CLI-Workflows im Monorepo ein Soll-Bestandteil. Die Vorlage war hier zu absolut; die korrigierte Formulierung ist: erforderlich fuer CLI-gestuetzte Generierung und deshalb vor shadcn-Nutzung anlegen.

### Low

- Die bestehende Referenz importiert `@nezumi/ui/design-tokens.css`; `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx` zeigt alternativ `@nezumi/ui/globals.css`. Fuer Apps sollte bewusst entschieden werden, ob nur Tokens oder der gesamte UI-Global-Entry genutzt wird.
- `apps/playground/app/page.tsx` nutzt als Demo direkte Neutral-Farbklassen und manuelle `dark:`-Overrides. Fuer `homepage` sollte die Roadmap strenger semantische Tokens und Design-System-Varianten vorgeben.

## Konkrete Empfehlungen

- Homepage zuerst als statisch optimierte Marketing-App aufbauen: moeglichst wenig Client-JavaScript, Server Components als Default, metadata-first.
- App-spezifische Inhalte und Kompositionen lokal halten; sobald etwas in `members` oder `operations` wiederverwendet wird, nach `packages/ui` oder ein kuenftiges Shared-Package verschieben.
- Die alte Vorlage nicht mehr als gemeinsames Zielbild verwenden; dieses Dokument ist die korrigierte Homepage-spezifische Roadmap.

## Offene Fragen / Restrisiken

- Welche finalen Domains, Locale-Strategie und SEO-Anforderungen gelten fuer `homepage`?
- Soll `homepage` einen eigenen Content-Workflow bekommen oder statisch aus Code/MDX starten?
- Soll `@nezumi/ui/globals.css` statt `design-tokens.css` App-Standard werden? Das sollte repo-weit einheitlich entschieden werden.
- Welche Analytics-, Web-Vitals- und CSP-Anforderungen gelten fuer die oeffentliche App?

## Vorgeschlagene naechste Schritte

1. `apps/homepage` technisch analog `apps/playground` scaffolden.
2. App-spezifisches `components.json` ergaenzen, bevor shadcn CLI in der App genutzt wird.
3. Build- und Typecheck-Gates im Root/Turbo-Kontext verifizieren.
