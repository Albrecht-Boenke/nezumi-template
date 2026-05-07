# Operations App Roadmap / Checklist

## Aufgabenstellung

Dieses Dokument beschreibt, wie `apps/operations` als eigenstaendige interne Next.js-App-Router-Anwendung im Nezumi-Monorepo eingerichtet werden sollte. Ziel ist eine Operations-Konsole fuer interne Workflows mit hoher Dichte, klarer Zugriffskontrolle, auditierbaren Aktionen und sauberer Trennung von App-Code und geteilter UI.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/002-01-app-01-getting-started-02-project-structure.mdx`
- `docs/nextjs/005-01-app-01-getting-started-05-server-and-client-components.mdx`
- `docs/nextjs/022-01-app-02-guides-authentication.mdx`
- `docs/nextjs/027-01-app-02-guides-content-security-policy.mdx`
- `docs/nextjs/030-01-app-02-guides-data-security.mdx`
- `docs/nextjs/034-01-app-02-guides-environment-variables.mdx`
- `docs/nextjs/035-01-app-02-guides-forms.mdx`
- `docs/nextjs/061-01-app-02-guides-production-checklist.mdx`
- `docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx`
- `docs/turbo/INDEX.md`
- `docs/turbo/14-crafting-your-repository-configuring-tasks.mdx`
- `docs/turbo/17-crafting-your-repository-developing-applications.mdx`
- `docs/turbo/23-crafting-your-repository-using-environment-variables.mdx`
- `docs/typescript/INDEX.md`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/monorepo.mdx`
- `docs/shadcn-ui/overview/components-json.mdx`
- `docs/shadcn-ui/components/radix/data-table.mdx`
- `docs/shadcn-ui/components/radix/dialog.mdx`
- `docs/shadcn-ui/components/radix/alert-dialog.mdx`
- `docs/shadcn-ui/components/radix/sidebar.mdx`
- `docs/shadcn-ui/components/radix/table.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`
- `docs/nezumi-ui/017-nezumi-ui-forms-inputs.mdx`
- `docs/nezumi-ui/018-nezumi-ui-composition.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Projekt- und Vendor-Spiegel klaeren die Aufgabe ausreichend.

## Abgeleiteter Soll-Zustand

`apps/operations` soll eine interne, deploybare Next.js-16-App fuer wiederholte, datenintensive Arbeitsablaeufe sein. Im Unterschied zur `homepage` ist hier nicht Marketing-Praesentation, sondern schnelle Scanbarkeit, robuste Fehlerzustaende, klare Aktionen, Berechtigungspruefung und Nachvollziehbarkeit massgeblich.

Server Components bleiben Standard fuer Datenzugriff und initiale Views. Client Components werden fuer Tabelleninteraktion, Filter, Dialoge, Tastaturinteraktion und optimistische Bedienung gezielt isoliert. Kritische Mutationen muessen serverseitig validiert, autorisiert und auditierbar gemacht werden.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/playground/package.json`
- `apps/playground/next.config.ts`
- `apps/playground/app/globals.css`
- `packages/ui/package.json`
- `packages/ui/components.json`
- `packages/ui/src/components/button.tsx`
- `packages/ui/src/layout/index.ts`
- `packages/ui/src/lib/utils.ts`

## Empfohlener Zielbaum

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

- [ ] `package.json` mit `name: "operations"`, `private: true`, Scripts `dev`, `build`, `start`, `typecheck` und Dependencies analog `apps/playground` anlegen.
- [ ] Festen Entwicklungsport setzen, z. B. `next dev --turbopack -p 3002`.
- [ ] `next.config.ts` mit `transpilePackages: ["@nezumi/ui"]` anlegen.
- [ ] `postcss.config.mjs` mit `@tailwindcss/postcss` anlegen.
- [ ] `app/globals.css` mit Tailwind-v4-Import, explizitem `@source` fuer UI-Paket, `@source "../"` fuer nur diese App (nicht `../../` ueber `apps/`), und `@nezumi/ui`-Tokenimport anlegen.
- [ ] `app/layout.tsx` als Server Component halten; interne Shell, Navigation und globale Error-Recovery sauber trennen.
- [ ] `loading.tsx`, `error.tsx` und `global-error.tsx` frueh anlegen, weil interne Tools bei Daten-/Backendfehlern kontrolliert degradieren muessen.
- [ ] Request-time APIs und dynamisches Rendering bewusst einsetzen; teure Datenzugriffe parallelisieren und Streaming/Suspense fuer langsame Bereiche nutzen.
- [ ] Kritische Mutationen in Server Actions/Route Handlern serverseitig validieren, autorisieren, rate-limiten und fuer Audit vorbereiten.
- [ ] RBAC/Least-Privilege-Modell definieren: Rollen, Scopes, serverseitige Permission Checks pro Query und Mutation.
- [ ] Audit-Trail fuer operative Mutationen planen: Actor, Target, Before/After, Request-ID, Timestamp und Reason.
- [ ] Risky Actions ueber explizite Bestaetigung, `AlertDialog`-Pattern und optional Vier-Augen-Freigabe absichern.
- [ ] Tabellen, Filter und Bulk-Actions als App-Kompositionen starten; erst nach Wiederverwendung nach `packages/ui` extrahieren.
- [ ] DataTable-first Workflows planen: serverseitige Pagination, Sorting, Filtering; TanStack/shadcn-DataTable nur fuer UI-Interaktion, nicht als Datenquelle.
- [ ] Dichte, funktionale UI bevorzugen: klare Navigation, Tabellen-/Listen-Sichten, Toolbar/Command-Bar, Status- und Fehlerzustaende statt Marketing-Hero.
- [ ] `components.json` fuer shadcn-CLI-Nutzung anlegen und mit `packages/ui/components.json` synchron halten.
- [ ] Keine Imports aus `homepage`, `members` oder `playground`; geteilte Elemente ueber `packages/*`.
- [ ] CSP, Frame-Ancestors und Security Headers fuer interne Konsole pruefen.
- [ ] Observability einplanen: strukturierte Logs, Action-Metriken, Fehlergrenzen pro Route und spaeter `instrumentation.ts`.
- [ ] Teststrategie definieren: DAL-Authorization-Tests, Server-Action-Validation-Tests, App-Smoke-Tests und Accessibility-Checks fuer Dialoge/Tabellen/Formulare.
- [ ] Production-Gates definieren: `pnpm --filter @nezumi/ui build`, `pnpm --filter operations typecheck`, `pnpm --filter operations build`.

## Findings nach Schweregrad

### High

- `apps/operations` ist aktuell kein ausfuehrbares Workspace-Paket. Ohne `package.json`, App Router und Scripts kann Turbo keine Operations-spezifischen Tasks ausfuehren.

### Medium

- Fuer interne Operations-Funktionen fehlt ein explizites Sicherheitsmodell. Next.js-Produktionsdoku fordert serverseitige Auth-/Authorization-Pruefung bei Server Actions und Datenzugriffen; das ist bei internen Admin-Aktionen besonders kritisch.
- Die aktuelle UI-Package bietet noch keine Data-Table-, Dialog-, Sidebar- oder Form-Komponenten als oeffentliche Exports. Operations sollte daher lokale Kompositionen starten und erst stabile Wiederverwendung in `@nezumi/ui` ueberfuehren.
- `turbo.json` enthaelt aktuell nur `build`, `dev` und `typecheck`. Fuer eine Operations-Konsole sollten spaeter `lint`, `test` und Env-Hashing explizit ergaenzt werden, sobald Implementierung und Env Vars existieren.

### Low

- shadcn-CLI-Workflows benoetigen ein korrektes `components.json` je Workspace. Ohne diese Konfiguration steigt das Risiko, dass generierte Komponenten in falschen Pfaden oder mit falschen Aliasen landen.

## Konkrete Empfehlungen

- Operations nicht wie eine Landing Page gestalten, sondern als ruhige, dichte Arbeitsoberflaeche mit vorhersehbarer Navigation, Tabellen, Filtern und klaren Aktionen.
- Sicherheits- und Audit-Anforderungen vor der ersten Mutation festlegen.
- App-lokale Kompositionen bewusst von `@nezumi/ui` trennen: UI primitives/shared components in `packages/ui`, fachliche Operations-Flows in `apps/operations`.

## Offene Fragen / Restrisiken

- Welche Rollen duerfen Operations nutzen, und wie fein granular sind Berechtigungen?
- Welche Aktionen sind auditpflichtig oder brauchen Mehrfachbestaetigung?
- Welche Datenquellen, Rate Limits und Observability-Anforderungen gelten fuer interne Workflows?
- Wo werden Audit-Events gespeichert, und welche Retention-/Export-Anforderungen gelten?

## Vorgeschlagene naechste Schritte

1. `apps/operations` technisch scaffolden.
2. Sicherheits-/Audit-Konzept fuer interne Aktionen dokumentieren.
3. Fehlende UI-Leaves fuer Operations-Bausteine entweder lokal planen oder in `@nezumi/ui` als public exports priorisieren.
4. Erste Shell mit Error-/Loading-Zustaenden und Build-/Typecheck-Gates verifizieren.
