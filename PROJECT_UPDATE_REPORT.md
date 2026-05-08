# Project Update Report

## Aufgabenstellung

Das Monorepo wurde auf den internen Package-Scope `@packages/ui` umgestellt. Der gemeldete Turbo-Aufruf `pnpm build --filter @packages/ui` soll funktionieren. Root-Scripts sollen nur noch die angeforderten Install-, Build- und Dev-Flows abbilden. Alle Next.js Apps sollen `logging.browserToTerminal: true` erhalten, und die Apps sollen mit `next-browser` auf Dev-Server-, Error- und Debugging-Funktionalitaet geprueft werden.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/020-01-app-02-guides-ai-agents.mdx`
- `docs/nextjs/200-01-app-03-api-reference-05-config-01-next-config-js-logging.mdx`
- `docs/turbo/INDEX.md`
- `docs/turbo/09-core-concepts-package-and-task-graph.mdx`
- `docs/turbo/14-crafting-your-repository-configuring-tasks.mdx`
- `docs/turbo/19-crafting-your-repository-running-tasks.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`

## Gelesene externe Quellen

- Official Next.js blog: [Next.js 16.2: AI Improvements](https://nextjs.org/blog/next-16-2-ai#dev-server-lock-file)
- npm registry lookup: `@vercel/next-browser` latest version `0.7.1`

## Abgeleiteter SOLL-Zustand

- Turbo-Filter muessen echte Workspace-Package-Namen treffen. Das UI-Package muss daher als `@packages/ui` in `packages/ui/package.json` deklariert sein.
- `@packages/ui` bleibt source-first; ein Package-`build` ist eine TypeScript-no-emit-Validierung, kein Bundler-Output.
- Next.js Apps muessen `transpilePackages: ["@packages/ui"]` behalten, weil die Apps die UI-Quellen direkt kompilieren.
- `logging.browserToTerminal: true` ist laut Next.js 16.2 fuer Dev-Debugging gueltig und leitet Browser-Logs in das Terminal weiter.
- Root-Scripts sollen die expliziten App-Builds, Package-Builds und App-Dev-Server starten. Ein Root-`install`-Lifecycle-Script wurde bewusst nicht angelegt, weil `pnpm install` bereits der Package-Manager-Befehl ist und ein gleichnamiges Script rekursives Install-Verhalten riskieren wuerde.
- `next-browser` muss eine laufende App inspizieren koennen: `errors`, `logs`, `browser-logs`, `tree` und Screenshots muessen pro App verwertbare Ausgabe liefern.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `turbo.json`
- `packages/ui/package.json`
- `apps/homepage/package.json`
- `apps/members/package.json`
- `apps/operations/package.json`
- `apps/playground/package.json`
- `apps/homepage/next.config.ts`
- `apps/members/next.config.ts`
- `apps/operations/next.config.ts`
- `apps/playground/next.config.ts`
- App CSS/TSX-Importstellen unter `apps/*/app/`
- shadcn Alias-Dateien `apps/*/components.json`
- aktive Projekt-Dokumentation unter `README.md`, `FRAMEWORK_VERSION_REFERENCES.md`, `docs/nezumi-ui/`

## Findings nach Schweregrad

### Hoch

- Resolved: Der Package-Filter `@packages/ui` konnte nicht aufgeloest werden, weil das UI-Package anders benannt war. Korrektur: `packages/ui/package.json:2` deklariert nun `@packages/ui`; App-Dependencies, CSS-Imports, TSX-Imports, shadcn Aliases und Docs wurden auf diesen Scope umgestellt.

### Mittel

- Resolved: Der gefilterte Build haette nach der Scope-Umstellung ohne UI-`build`-Script keine belastbare Validierung ausgefuehrt. Korrektur: `packages/ui/package.json:10` bis `packages/ui/package.json:16` enthaelt nun `build: tsc --noEmit`; `turbo.json:8` bis `turbo.json:10` definiert fuer diesen Package-Build keine Artefakt-Outputs.
- Resolved: Die Root-Scripts waren breiter als die gewuenschten Build-/Dev-Flows. Korrektur: `package.json:9` bis `package.json:20` enthaelt nur noch `build`, konkrete `build:*` App-/Package-Scripts und konkrete `dev:*` App-Scripts.
- Resolved: Browser-zu-Terminal-Logging war in den App-Konfigurationen nicht aktiviert. Korrektur: alle `apps/*/next.config.ts` Dateien enthalten `logging.browserToTerminal: true` und behalten `transpilePackages: ["@packages/ui"]`; Beispiel `apps/homepage/next.config.ts:3` bis `apps/homepage/next.config.ts:12`.

### Niedrig

- Hinweis: `next-browser` startete im ersten Headed-Versuch keinen Daemon-Socket. Headless mit `NEXT_BROWSER_HEADLESS=1` startete stabil. Die App-Diagnosen wurden deshalb headless ausgefuehrt.
- Hinweis: Beim ersten Homepage-Dev-Aufruf meldete Next/Turbopack, dass ein vorheriger interner Filesystem-Cache-Fehler den Cache geloescht hatte. Der Seitenaufruf, Error-Check und die spaeteren Builds waren erfolgreich.

## Konkrete Empfehlungen

- Fuer UI-Package-Validierung `pnpm build --filter @packages/ui` oder `pnpm build:packages` verwenden.
- Fuer App-Produktion-Builds die Root-Scripts `pnpm build:homepage`, `pnpm build:members`, `pnpm build:operations` und `pnpm build:playground` verwenden.
- Fuer App-Dev-Debugging die Root-Scripts `pnpm dev:homepage`, `pnpm dev:members`, `pnpm dev:operations` und `pnpm dev:playground` verwenden.
- Fuer Agent-Diagnose mit `next-browser` in dieser Umgebung `NEXT_BROWSER_HEADLESS=1` setzen.

## Verifikation

- `pnpm install`: erfolgreich; Root-`next` wurde als `catalog:` Dev-Dependency aufgeloest.
- `pnpm build --filter @packages/ui`: erfolgreich; Turbo fuehrte `@packages/ui:build` mit `tsc --noEmit` aus.
- `pnpm build:homepage`: erfolgreich.
- `pnpm build:members`: erfolgreich.
- `pnpm build:operations`: erfolgreich.
- `pnpm build:playground`: erfolgreich.
- `pnpm build:packages`: erfolgreich, Turbo-Cache-Hit nach dem ersten UI-Build.
- `pnpm build`: erfolgreich; Turbo fuehrte alle 5 Package/App-Builds aus.
- `next-browser --version`: `0.7.1`.
- `next-browser` Dev-Diagnose:
  - Homepage `http://localhost:3000`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.
  - Members `http://localhost:3001`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.
  - Operations `http://localhost:3002`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.
  - Playground `http://localhost:3003`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.

## Offene Fragen oder Restrisiken

- `next-browser` funktioniert in dieser lokalen Umgebung headless stabil; der Headed-Daemon-Start sollte separat untersucht werden, falls sichtbare Browserfenster fuer den Workflow zwingend sind.
- Die bisherigen Root-Analyseberichte wurden per Scope-Rewrite aktualisiert. Inhaltliche historische Aussagen wurden nicht neu bewertet.

## Vorgeschlagene naechste Schritte

- Bei Bedarf ein kleines npm Script fuer `NEXT_BROWSER_HEADLESS=1 next-browser ...` ergaenzen, damit Agent-Diagnosen reproduzierbar denselben Modus verwenden.
- Optional die aelteren Root-Analyseberichte archivieren oder als historisch markieren, damit sie nicht mit aktueller Projekt-Dokumentation verwechselt werden.
