# Members App Roadmap / Checklist

## Aufgabenstellung

Dieses Dokument beschreibt den aktuellen IST-/SOLL-Stand von `apps/members`.
Ziel ist ein geschuetzter Mitgliederbereich bzw. Customer Portal mit klarer
Trennung von App-Code, geteilter UI und spaeterer Auth-/Datenzugriffsschicht.

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

`apps/members` soll als eigenstaendiges Workspace-Paket lauffaehig sein und als
Server-first Next.js-App geschuetzte Nutzeroberflaechen vorbereiten. Setup,
App-Router-Dateien, Tailwind-v4/PostCSS, TypeScript und shadcn-CLI-Konfiguration
liegen lokal in der App. Zugriffsschutz darf spaeter nicht nur ueber Layout-UI
oder Client-State erfolgen; Server Actions und serverseitige Datenzugriffe
muessen Autorisierung selbst pruefen. Client-Grenzen sollen nur freigegebene DTOs
erhalten.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/members/package.json`
- `apps/members/next.config.ts`
- `apps/members/postcss.config.mjs`
- `apps/members/tsconfig.json`
- `apps/members/components.json`
- `apps/members/app/globals.css`
- `apps/members/app/layout.tsx`
- `apps/members/app/loading.tsx`
- `apps/members/app/error.tsx`
- `apps/members/app/(account)/layout.tsx`
- `apps/members/app/(account)/page.tsx`
- `apps/members/components/account-nav.tsx`
- `apps/members/components/member-shell.tsx`
- `apps/members/lib/auth/.gitkeep`
- `apps/members/lib/data/.gitkeep`
- `apps/members/lib/server/.gitkeep`
- `apps/members/lib/validation/.gitkeep`
- `packages/ui/package.json`

## Aktueller Zielbaum

```text
apps/members/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── (account)/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── account-nav.tsx
│   └── member-shell.tsx
├── lib/
│   ├── auth/
│   ├── data/
│   ├── server/
│   └── validation/
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Setup-Checklist

- [x] `package.json` mit `name: "members"`, `private: true`, Scripts `dev`, `build`, `lint`, `start`, `typecheck` und Dependencies vorhanden.
- [x] Fester Entwicklungsport ist gesetzt: `next dev --turbopack -p 3001`.
- [x] `next.config.ts` setzt `transpilePackages: ["@nezumi/ui"]`.
- [x] `postcss.config.mjs` nutzt `@tailwindcss/postcss`.
- [x] `app/globals.css` importiert Tailwind v4, scannt `../../../packages/ui/src` und nur diese App via `@source "../"`, und importiert `@nezumi/ui/design-tokens.css`.
- [x] `tsconfig.json` ist als striktes Next-/TypeScript-Projekt mit `moduleResolution: "bundler"` und Next-Plugin vorhanden.
- [x] `components.json` ist fuer shadcn-CLI-Nutzung vorhanden; Tailwind-v4-`config` ist leer, `style`, `baseColor`, `cssVariables` und `iconLibrary` sind gesetzt.
- [x] Root Layout, Loading- und Error-UI sind vorhanden.
- [x] Account Route Group `app/(account)` ist vorhanden.
- [x] Lokale Shell-Komponenten `member-shell.tsx` und `account-nav.tsx` sind vorhanden.
- [x] Platzhalterordner fuer `lib/auth`, `lib/data`, `lib/server` und `lib/validation` sind vorhanden.
- [ ] Auth-Anbieter, Session-Modell und serverseitige Authorization-Regeln festlegen.
- [ ] Data Access Layer und DTO-Kontrakte implementieren; aktuell existieren nur Platzhalterordner.
- [ ] Form-/Validation-Pattern konkretisieren und serverseitig absichern.
- [ ] Teststrategie fuer Login-Gate, Dashboard, Profilmutation und sensitive Datenzugriffe definieren.
- [ ] Build- und Typecheck-Gates nach relevanten Aenderungen laufen lassen: `pnpm --filter @nezumi/ui build`, `pnpm --filter members typecheck`, `pnpm --filter members build`.

## Findings nach Schweregrad

### High

Keine gesicherten High-Findings im aktuellen Scope. Manifest, Scripts,
App-Router-Struktur und Konfiguration existieren.

### Medium

- Auth-/Authorization ist noch nicht implementiert. Risiko: Der aktuelle
  Mitgliederbereich ist eine Shell und darf nicht als geschuetzter Datenbereich
  bewertet werden.
- DAL-/DTO-Kontrakte sind noch nicht implementiert. Risiko: Spaetere Features
  koennten personenbezogene Daten zu breit an Client Components serialisieren,
  wenn diese Grenze nicht vor den ersten Datenfluesse festgelegt wird.
- Es gibt in diesem Scope keinen aktuellen Nachweis, dass `members` nach den
  letzten parallelen Aenderungen erfolgreich typecheckt und baut.

### Low

- `components.json` ist fuer Runtime nicht erforderlich, bleibt aber fuer
  shadcn-CLI-Workflows korrekt vorbereitet.

## Konkrete Empfehlungen

- Das technische Setup von Members nicht wiederholen; die naechste Arbeit sollte Auth, DAL/DTOs,
  Validierung und Verifikation betreffen.
- Client Components auf interaktive Inseln begrenzen; Seiten, Layouts und
  Datenladen bleiben Server-first.
- Keine Imports aus `homepage`, `operations` oder `playground`; geteilte UI oder
  Logik gehoert in `packages/*`.

## Offene Fragen / Restrisiken

- Welcher Auth-Anbieter und welches Session-Modell sollen verwendet werden?
- Welche Datenquelle ist verbindlich, und gibt es Row-Level- oder rollenbasierte
  Autorisierung?
- Braucht `members` eigene Domain/Subdomain, eigene Env-Variablen und eigene
  Observability-Signale?
- Welche Compliance-Anforderungen gelten fuer PII, Billing-Dokumente, Export und
  Loeschung?

## Vorgeschlagene naechste Schritte

1. Auth-/Authorization-Entscheidung dokumentieren.
2. DAL-/DTO-Kontrakte fuer die ersten Member-Flows festlegen.
3. Typecheck und Build im Turbo-/Workspace-Kontext verifizieren.
