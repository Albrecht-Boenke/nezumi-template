# Root tsconfig Decision

## Aufgabenstellung

Scope C prueft das offene Review-Finding: "Root-`tsconfig.json` oder dokumentierte bewusste Alternative fehlt." Ziel ist nicht, blind eine Root-`tsconfig.json` einzufuehren, sondern anhand lokaler Vendor- und Projektdokumentation zu entscheiden, ob der aktuelle Monorepo-Zustand eine belastbare Alternative darstellt.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/typescript/INDEX.md`
- `docs/typescript/062-handbook-project-config-tsconfig.json.mdx`
- `docs/typescript/061-handbook-project-config-project-references.mdx`
- `docs/typescript/295-tsconfig-sections-top-level.mdx`
- `docs/turbo/INDEX.md`
- `docs/turbo/42-guides-tools-typescript.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Spiegel klaeren die Frage ausreichend.

## Abgeleiteter SOLL-Zustand

- TypeScript behandelt das Verzeichnis mit einer `tsconfig.json` als Root eines TypeScript-Projekts. In einem Monorepo duerfen daher Apps und Packages eigene TypeScript-Projekte sein.
- Turborepo behandelt Workspaces als Package-/Task-Graph. Fuer geteilte TypeScript-Defaults empfiehlt die lokale Turborepo-Doku ein internes Config-Package mit per `extends` konsumierten Varianten; sie verlangt keinen Root-`tsconfig.json` als Monorepo-Default.
- Eine Root-`tsconfig.json` waere nur dann sinnvoll, wenn Root-TypeScript-Dateien oder Root-Tools eine eigene Projektkonfiguration brauchen. Selbst dann sollte bevorzugt geprueft werden, ob diese Dateien in ein eigenes Package oder Tooling-Verzeichnis verschoben werden koennen, damit Turbo-Caches nicht durch Root-Aenderungen unnoetig invalidiert werden.
- Next-App-`tsconfig.json` Dateien bleiben aktuell explizit pro App. Sie enthalten App-spezifische Includes, `.next`-Typen, das Next-TypeScript-Plugin und `noEmit`.
- Das UI-Package braucht eine eigene TypeScript-Build-Konfiguration, weil es Declaration-Ausgaben fuer die granularen Package-Exports erzeugt und nicht wie eine Next-App nur typprueft.
- Eine gemeinsame Base-Konfiguration sollte erst eingefuehrt werden, wenn die Duplikation der App-Configs praktisch wartungsrelevant wird oder mehrere Packages dieselben Compiler-Baselines teilen muessen. Dann ist gemaess Turborepo eher ein internes Config-Package wie `packages/typescript-config` mit `base.json`, `nextjs.json` und `react-library.json` passend als ein Root-`tsconfig.json`.

## Analysierte Dateien

- `apps/homepage/tsconfig.json`
- `apps/members/tsconfig.json`
- `apps/operations/tsconfig.json`
- `apps/playground/tsconfig.json`
- `packages/ui/tsconfig.json`
- `packages/ui/package.json`
- `turbo.json`
- `package.json`
- `CLAUDE.md`
- `review/REVIEW_DOCS_CONFIGS.md`

## Findings nach Schweregrad

### Keine offenen Findings fuer Root-tsconfig

Das Finding "Root-`tsconfig.json` oder dokumentierte bewusste Alternative fehlt" ist mit diesem Dokument geschlossen. Der aktuelle Zustand ist absichtlich package-lokal:

- Apps: `tsc --noEmit` laeuft je App ueber das lokale `tsconfig.json`.
- UI-Package: `tsconfig.json` aktiviert `declaration` und `declarationMap` fuer die gebauten Export-Typen.
- Root: `package.json` delegiert `typecheck` an Turbo; `turbo.json` fuehrt `typecheck` mit Package-Abhaengigkeiten aus.

## Konkrete Empfehlungen

- Keine Root-`tsconfig.json` einfuehren, solange im Workspace-Root keine TypeScript-Dateien existieren, die selbst kompiliert oder typgeprueft werden muessen.
- Next-App-Configs vorerst explizit pro App lassen, weil die Apps eigene `.next`-Typen und App-lokale Include-Grenzen besitzen.
- `packages/ui/tsconfig.json` als eigenstaendige Build-Konfiguration beibehalten.
- Bei wachsender TS-Config-Duplikation ein internes `packages/typescript-config` Package pruefen, nicht zuerst eine Root-`tsconfig.json`.

## Offene Fragen oder Restrisiken

- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx` beschreibt als Idealzustand bereits `packages/typescript-config`; dieses Package existiert aktuell nicht. Das ist kein Root-tsconfig-Blocker, sollte aber bei weiterer Config-Harmonisierung separat entschieden werden.
- Wenn kuenftig Root-TypeScript-Skripte entstehen, muss diese Entscheidung neu bewertet werden.

## Vorgeschlagene naechste Schritte

- Das Review-Dokument auf "Root-tsconfig-Alternative dokumentiert" setzen.
- Spaeter separat entscheiden, ob `packages/typescript-config` als gemeinsames Config-Package eingefuehrt werden soll.
