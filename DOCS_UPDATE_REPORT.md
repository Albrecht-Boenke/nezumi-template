# Documentation Update Report

**Stand:** 2026-05-07

## Aufgabenstellung

Die Dokumentationen, Review-Dokumente und Checklisten im Repo sollten auf Aktualitaet geprueft und bei Bedarf aktualisiert werden. Ausgangspunkt waren vier offene Findings: fehlende `FRAMEWORK_VERSION_REFERENCES.md`, fehlende Root-`tsconfig.json`-Alternative, stale App-Roadmaps und zu wenig prominente Catalog-Pins in Vendor-INDEX-Dateien.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/README.md`
- `docs/react/INDEX.md`
- `docs/nextjs/INDEX.md`
- `docs/typescript/INDEX.md`
- `docs/typescript/062-handbook-project-config-tsconfig.json.mdx`
- `docs/typescript/061-handbook-project-config-project-references.mdx`
- `docs/typescript/196-tsconfig-options-extends.mdx`
- `docs/typescript/295-tsconfig-sections-top-level.mdx`
- `docs/tailwind-css/INDEX.md`
- `docs/shadcn-ui/INDEX.md`
- `docs/turbo/INDEX.md`
- `docs/turbo/42-guides-tools-typescript.mdx`
- `docs/cn/INDEX.md`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `review/REVIEW_DOCS_CONFIGS.md`
- App-Roadmaps unter `apps/*/APP_ROADMAP_CHECKLIST.md`

## Gelesene externe Quellen

- npm Registry via `npm view`: `next`, `react`, `react-dom`, `tailwindcss`, `typescript`, `turbo`, `shadcn`, `clsx`, `tailwind-merge`
- npm package pages: [next](https://www.npmjs.com/package/next), [react](https://www.npmjs.com/package/react), [react-dom](https://www.npmjs.com/package/react-dom), [tailwindcss](https://www.npmjs.com/package/tailwindcss), [typescript](https://www.npmjs.com/package/typescript)

## Abgeleiteter SOLL-Zustand

- Die verbindliche Repo-Versionierung steht zentral in `FRAMEWORK_VERSION_REFERENCES.md`; Vendor-Mirrors bleiben Referenztexte und beweisen nicht die installierte Version.
- Framework-Pins in `pnpm-workspace.yaml`, `pnpm-lock.yaml`, README und projektbezogener Nezumi-Doku muessen synchron sein.
- Vendor-INDEX-Dateien muessen die lokalen Catalog-Pins vor der eigentlichen Navigation sichtbar machen.
- TypeScript bleibt aktuell workspace-lokal konfiguriert; ein Root-`tsconfig.json` wird nicht eingefuehrt, solange der Root kein eigenes TypeScript-Projekt ist.
- App-Roadmaps muessen den tatsaechlichen Scaffold-Zustand widerspiegeln und duerfen erledigte Setup-Aufgaben nicht weiter als Blocker fuehren.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `packages/ui/package.json`
- `turbo.json`
- `apps/homepage/**`
- `apps/members/**`
- `apps/operations/**`
- `docs/**/INDEX.md`
- `docs/nezumi-ui/*.mdx`
- `README.md`
- `CLAUDE.md`
- `review/REVIEW_DOCS_CONFIGS.md`

## Findings nach Schweregrad

### High

Keine offenen High-Findings im bearbeiteten Docs-&-Config-Scope.

### Medium

- `FRAMEWORK_VERSION_REFERENCES.md` fehlte trotz bestehender Referenzen. Behoben durch neue Root-SSOT-Datei.
- Die Root-`tsconfig.json`-Alternative war nicht dokumentiert. Behoben durch `ROOT_TSCONFIG_DECISION.md`.
- App-Roadmaps waren stale und beschrieben bereits vorhandene Workspace-Apps teilweise noch als nicht scaffolded. Behoben durch Synchronisierung der drei Roadmaps.
- Vendor-INDEX-Dateien nannten die Projekt-Pins nicht ausreichend prominent. Behoben durch `Project pins (read first)` Abschnitte.

### Low

- `CLAUDE.md` war nur ein knapper Dateiname statt ein klarer Verweis. Behoben durch expliziten Hinweis auf `AGENTS.md`.
- `review/REVIEW_DOCS_CONFIGS.md` fuehrte erledigte Punkte noch als offen. Behoben.

## Konkrete Empfehlungen

- Bei jedem Framework- oder Catalog-Bump `FRAMEWORK_VERSION_REFERENCES.md`, `pnpm-workspace.yaml`, Lockfile und die betroffenen Projekt-Dokus gemeinsam aktualisieren.
- Bei wachsender TypeScript-Config-Duplikation nicht zuerst einen Root-`tsconfig.json`, sondern ein internes `packages/typescript-config` Package pruefen.
- App-Roadmaps kuenftig als lebende IST-/SOLL-Dokumente behandeln: erledigte Setup-Punkte markieren, offene Punkte fachlich konkret halten.

## Offene Fragen oder Restrisiken

- `ignoreDeprecations: "6.0"` bleibt im UI-Package bewusst gesetzt, bis das TS6/tsup-DTS-`baseUrl`-Thema vor TypeScript 7 migriert ist.
- Die App-Roadmaps enthalten weiterhin fachliche Restrisiken: Content/SEO fuer `homepage`, Auth/DAL/DTOs fuer `members`, RBAC/Audit/Datenlogik fuer `operations`.
- Die Vendor-Mirror-Inhalte selbst wurden nicht komplett neu gespiegelt; aktualisiert wurden die lokalen Pins, Index-Hinweise und projektbezogenen Referenzen.

## Vorgeschlagene naechste Schritte

1. Typecheck/Build nach den Framework-Patch-Bumps ausfuehren.
2. Bei der naechsten echten Feature-Arbeit die jeweilige App-Roadmap als Eingangsdokument nutzen.
3. Vor TypeScript 7 die dokumentierte DTS-/`baseUrl`-Migration im UI-Package planen.
