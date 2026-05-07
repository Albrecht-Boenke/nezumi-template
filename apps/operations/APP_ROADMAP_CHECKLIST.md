# Operations App Roadmap / Checklist

## Aufgabenstellung

Dieses Dokument beschreibt den aktuellen IST-/SOLL-Stand von `apps/operations`.
Ziel ist eine interne Operations-Konsole fuer wiederholte, datenintensive
Arbeitsablaeufe mit hoher Scanbarkeit, Zugriffskontrolle, auditierbaren Aktionen
und klarer Trennung von App-Code und geteilter UI.

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

`apps/operations` soll als eigenstaendiges Workspace-Paket lauffaehig sein und
als Server-first Next.js-App eine dichte interne Arbeitsoberflaeche bereitstellen.
Setup, App-Router-Dateien, Tailwind-v4/PostCSS, TypeScript und shadcn-CLI-
Konfiguration liegen lokal in der App. Kritische Mutationen muessen spaeter
serverseitig validiert, autorisiert und auditierbar gemacht werden; Tabellen,
Filter und Shell-Kompositionen starten lokal und werden erst nach echter
Wiederverwendung in `packages/ui` gehoben.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/operations/package.json`
- `apps/operations/next.config.ts`
- `apps/operations/postcss.config.mjs`
- `apps/operations/tsconfig.json`
- `apps/operations/components.json`
- `apps/operations/app/globals.css`
- `apps/operations/app/layout.tsx`
- `apps/operations/app/page.tsx`
- `apps/operations/app/loading.tsx`
- `apps/operations/app/error.tsx`
- `apps/operations/app/global-error.tsx`
- `apps/operations/app/(console)/layout.tsx`
- `apps/operations/app/(console)/console/page.tsx`
- `apps/operations/components/operations-shell.tsx`
- `apps/operations/components/command-bar.tsx`
- `apps/operations/components/data-view-toolbar.tsx`
- `apps/operations/lib/audit/.gitkeep`
- `apps/operations/lib/auth/.gitkeep`
- `apps/operations/lib/data/.gitkeep`
- `apps/operations/lib/server/.gitkeep`
- `packages/ui/package.json`

## Aktueller Zielbaum

```text
apps/operations/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   └── (console)/
│       ├── layout.tsx
│       └── console/
│           └── page.tsx
├── components/
│   ├── operations-shell.tsx
│   ├── command-bar.tsx
│   └── data-view-toolbar.tsx
├── lib/
│   ├── audit/
│   ├── auth/
│   ├── data/
│   └── server/
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Setup-Checklist

- [x] `package.json` mit `name: "operations"`, `private: true`, Scripts `dev`, `build`, `lint`, `start`, `typecheck` und Dependencies vorhanden.
- [x] Fester Entwicklungsport ist gesetzt: `next dev --turbopack -p 3002`.
- [x] `next.config.ts` setzt `transpilePackages: ["@nezumi/ui"]`.
- [x] `postcss.config.mjs` nutzt `@tailwindcss/postcss`.
- [x] `app/globals.css` importiert Tailwind v4, scannt `../../../packages/ui/src` und nur diese App via `@source "../"`, und importiert `@nezumi/ui/design-tokens.css`.
- [x] `tsconfig.json` ist als striktes Next-/TypeScript-Projekt mit `moduleResolution: "bundler"` und Next-Plugin vorhanden.
- [x] `components.json` ist fuer shadcn-CLI-Nutzung vorhanden; Tailwind-v4-`config` ist leer, `style`, `baseColor`, `cssVariables` und `iconLibrary` sind gesetzt.
- [x] Root Layout, Redirect von `/` nach `/console`, Loading-, Error- und Global-Error-UI sind vorhanden.
- [x] Console Route Group `app/(console)/console` ist vorhanden.
- [x] Lokale Operations-Kompositionen `operations-shell.tsx`, `command-bar.tsx` und `data-view-toolbar.tsx` sind vorhanden.
- [x] Platzhalterordner fuer `lib/audit`, `lib/auth`, `lib/data` und `lib/server` sind vorhanden.
- [ ] RBAC-/Least-Privilege-Modell fuer interne Nutzung festlegen.
- [ ] Serverseitige Authorization, Validation und Audit-Trail fuer Mutationen implementieren; aktuell existieren nur Shell und Platzhalterdaten.
- [ ] Data-Table-Workflows mit serverseitiger Pagination, Sorting und Filtering konkretisieren.
- [ ] Security Headers/CSP, Observability und Env-Hashing pruefen, sobald echte Env Vars und Datenzugriffe existieren.
- [ ] Build- und Typecheck-Gates nach relevanten Aenderungen laufen lassen: `pnpm --filter @nezumi/ui build`, `pnpm --filter operations typecheck`, `pnpm --filter operations build`.

## Findings nach Schweregrad

### High

Keine gesicherten High-Findings im aktuellen Scope. Manifest, Scripts,
App-Router-Struktur und Konfiguration existieren.

### Medium

- Sicherheits- und Auditmodell sind noch nicht implementiert. Risiko: Die App
  darf aktuell nur als technische Shell mit Platzhalterdaten verstanden werden,
  nicht als produktionsfaehige Admin-Konsole.
- Echte Datenzugriffe, serverseitige Tabellenlogik und Mutationen fehlen noch.
  Risiko: UI-Platzhalter koennen Arbeitsablaeufe andeuten, die fachlich noch
  nicht abgesichert sind.
- Es gibt in diesem Scope keinen aktuellen Nachweis, dass `operations` nach den
  letzten parallelen Aenderungen erfolgreich typecheckt und baut.

### Low

- `components.json` ist fuer Runtime nicht erforderlich, bleibt aber fuer
  shadcn-CLI-Workflows korrekt vorbereitet.

## Konkrete Empfehlungen

- Das technische Setup von Operations nicht wiederholen; die naechste Arbeit sollte RBAC, Audit,
  DAL, Daten-Tabellenlogik und Verifikation betreffen.
- App-lokale Kompositionen bewusst von `@nezumi/ui` trennen: UI
  primitives/shared components in `packages/ui`, fachliche Operations-Flows in
  `apps/operations`.
- Interne UI weiter dicht und funktional halten: Navigation, Tabellen, Filter,
  klare Aktionen und Fehlerzustaende statt Marketing-Komposition.

## Offene Fragen / Restrisiken

- Welche Rollen duerfen Operations nutzen, und wie fein granular sind
  Berechtigungen?
- Welche Aktionen sind auditpflichtig oder brauchen Mehrfachbestaetigung?
- Welche Datenquellen, Rate Limits und Observability-Anforderungen gelten fuer
  interne Workflows?
- Wo werden Audit-Events gespeichert, und welche Retention-/Export-Anforderungen
  gelten?

## Vorgeschlagene naechste Schritte

1. Sicherheits-/Audit-Konzept fuer interne Aktionen dokumentieren.
2. DAL- und Tabellenkontrakte fuer die ersten Operations-Flows festlegen.
3. Typecheck und Build im Turbo-/Workspace-Kontext verifizieren.
