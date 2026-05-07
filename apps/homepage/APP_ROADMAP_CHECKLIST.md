# Homepage App Roadmap / Checklist

## Aufgabenstellung

Dieses Dokument beschreibt den aktuellen IST-/SOLL-Stand von `apps/homepage`.
Ziel ist eine eigenstaendige, oeffentliche Next.js-App-Router-Anwendung fuer
Marketing, Landing Pages und oeffentliche Inhalte im Nezumi-Monorepo.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/002-01-app-01-getting-started-02-project-structure.mdx`
- `docs/nextjs/003-01-app-01-getting-started-03-layouts-and-pages.mdx`
- `docs/nextjs/010-01-app-01-getting-started-10-error-handling.mdx`
- `docs/nextjs/011-01-app-01-getting-started-11-css.mdx`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/tailwind-css/184-upgrade-guide.mdx`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/components-json.mdx`
- `docs/shadcn-ui/overview/tailwind-v4.mdx`
- `docs/turbo/INDEX.md`
- `docs/typescript/INDEX.md`
- `docs/typescript/062-handbook-project-config-tsconfig.json.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Projekt- und Vendor-Spiegel klaeren die Aufgabe ausreichend.

## Abgeleiteter Soll-Zustand

`apps/homepage` soll als eigenstaendiges Workspace-Paket lauffaehig sein:
`package.json`, Next-Konfiguration, TypeScript-Konfiguration, Tailwind-v4/PostCSS,
App-Router-Dateien und shadcn-CLI-Konfiguration muessen lokal in der App liegen.
Die App importiert `@nezumi/ui` ueber oeffentliche Subpath-Exports und laesst
Tailwind die App selbst sowie `packages/ui/src` ueber explizite `@source`-Pfade
scannen. Oeffentliche Metadaten, `robots`, `sitemap` und Open-Graph-Bild gehoeren
zur ersten ausfuehrbaren Marketing-Basis.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/homepage/package.json`
- `apps/homepage/next.config.ts`
- `apps/homepage/postcss.config.mjs`
- `apps/homepage/tsconfig.json`
- `apps/homepage/components.json`
- `apps/homepage/app/globals.css`
- `apps/homepage/app/layout.tsx`
- `apps/homepage/app/page.tsx`
- `apps/homepage/app/robots.ts`
- `apps/homepage/app/sitemap.ts`
- `apps/homepage/app/opengraph-image.tsx`
- `apps/homepage/components/marketing-specific-compositions.tsx`
- `packages/ui/package.json`

## Aktueller Zielbaum

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

- [x] `package.json` mit `name: "homepage"`, `private: true`, Scripts `dev`, `build`, `lint`, `start`, `typecheck` und Dependencies `@nezumi/ui`, `next`, `react`, `react-dom` vorhanden.
- [x] Fester Entwicklungsport ist gesetzt: `next dev --turbopack -p 3000`.
- [x] `next.config.ts` setzt `transpilePackages: ["@nezumi/ui"]`.
- [x] `postcss.config.mjs` nutzt `@tailwindcss/postcss`.
- [x] `app/globals.css` importiert Tailwind v4, scannt `../../../packages/ui/src` und nur diese App via `@source "../"`, und importiert `@nezumi/ui/design-tokens.css`.
- [x] `tsconfig.json` ist als striktes Next-/TypeScript-Projekt mit `moduleResolution: "bundler"` und Next-Plugin vorhanden.
- [x] `components.json` ist fuer shadcn-CLI-Nutzung vorhanden; Tailwind-v4-`config` ist leer, `style`, `baseColor`, `cssVariables` und `iconLibrary` sind gesetzt.
- [x] `app/layout.tsx` importiert globales CSS einmal, setzt `lang="de"` und exportiert `Metadata`.
- [x] `app/page.tsx` ist als statische Marketing-Startseite vorhanden und nutzt einen oeffentlichen UI-Export: `@nezumi/ui/components/button`.
- [x] SEO-Dateien fuer die oeffentliche App sind vorhanden: `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`.
- [x] App-spezifische Marketing-Kompositionen liegen lokal unter `apps/homepage/components/`.
- [ ] Finalen Content, Informationsarchitektur und echte Marketing-Kompositionen definieren; aktuell ist die Seite bewusst ein Platzhalter.
- [ ] Domain-/Locale-/SEO-Details fuer Produktionsbetrieb finalisieren, insbesondere `NEXT_PUBLIC_SITE_URL`.
- [ ] Build- und Typecheck-Gates nach relevanten Aenderungen laufen lassen: `pnpm --filter @nezumi/ui build`, `pnpm --filter homepage typecheck`, `pnpm --filter homepage build`.

## Findings nach Schweregrad

### High

Keine gesicherten High-Findings im aktuellen Scope. Manifest, Scripts,
App-Router-Struktur und Konfiguration existieren.

### Medium

- Die Startseite ist technisch lauffaehig, aber fachlich noch ein Platzhalter.
  Risiko: Eine deploybare App kann produktionsnah wirken, obwohl Content,
  Navigation, Analytics und SEO-Details noch nicht final sind.
- Es gibt in diesem Scope keinen aktuellen Nachweis, dass `homepage` nach den
  letzten parallelen Aenderungen erfolgreich typecheckt und baut. Das ist kein
  Code-Finding, aber ein Release-Gate.

### Low

- `components.json` ist fuer Runtime nicht erforderlich, bleibt aber fuer
  shadcn-CLI-Workflows korrekt vorbereitet.

## Konkrete Empfehlungen

- Das technische Setup der Homepage nicht wiederholen; die naechsten Schritte sollten Content,
  Navigation, Metadaten und Verifikation betreffen.
- App-spezifische Marketing-Kompositionen lokal halten; wiederverwendbare
  Primitive oder Layout-Bausteine erst nach echter Wiederverwendung in
  `packages/ui` heben.
- Weiter nur oeffentliche UI-Imports verwenden, z. B.
  `@nezumi/ui/components/button`, `@nezumi/ui/layout` oder
  `@nezumi/ui/lib/utils`.

## Offene Fragen / Restrisiken

- Welche finale Domain, Locale-Strategie und SEO-Anforderungen gelten fuer
  `homepage`?
- Soll `homepage` statisch aus Code/MDX starten oder einen Content-Workflow
  bekommen?
- Welche Analytics-, Web-Vitals- und CSP-Anforderungen gelten fuer die
  oeffentliche App?

## Vorgeschlagene naechste Schritte

1. Content- und Navigationsstruktur konkretisieren.
2. `NEXT_PUBLIC_SITE_URL` fuer die Zielumgebung festlegen.
3. Typecheck und Build im Turbo-/Workspace-Kontext verifizieren.
