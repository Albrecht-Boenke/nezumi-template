# Project Update Report

## Aufgabenstellung

Das Monorepo wurde auf den internen Package-Scope `@packages/ui` umgestellt. Root-Scripts sollen ausschliesslich konkrete Next.js App-Builds und App-Dev-Server abbilden. Alle Next.js Apps sollen `logging.browserToTerminal: true` erhalten, und die Apps sollen mit `next-browser` auf Dev-Server-, Error- und Debugging-Funktionalitaet geprueft werden.

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

- Das UI-Package muss als `@packages/ui` in `packages/ui/package.json` deklariert sein.
- `@packages/ui` bleibt source-first; es gibt keinen Root-Build-Pfad fuer das Package, sondern die Next.js Apps kompilieren die exportierten Quellen.
- Next.js Apps muessen `transpilePackages: ["@packages/ui"]` behalten, weil die Apps die UI-Quellen direkt kompilieren.
- `logging.browserToTerminal: true` ist laut Next.js 16.2 fuer Dev-Debugging gueltig und leitet Browser-Logs in das Terminal weiter.
- Root-Scripts sollen nur explizite `next build apps/*` und `next dev apps/*` App-Flows starten. Ein Root-`install`-Lifecycle-Script wurde bewusst nicht angelegt, weil `pnpm install` bereits der Package-Manager-Befehl ist und ein gleichnamiges Script rekursives Install-Verhalten riskieren wuerde.
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

- Resolved: Die Root-Scripts waren breiter als die gewuenschten Build-/Dev-Flows. Korrektur: `package.json:9` bis `package.json:18` enthaelt nur konkrete `build:*` App-Scripts mit `next build apps/*` und konkrete `dev:*` App-Scripts mit `next dev apps/*`.
- Resolved: Browser-zu-Terminal-Logging war in den App-Konfigurationen nicht aktiviert. Korrektur: alle `apps/*/next.config.ts` Dateien enthalten `logging.browserToTerminal: true` und behalten `transpilePackages: ["@packages/ui"]`; Beispiel `apps/homepage/next.config.ts:3` bis `apps/homepage/next.config.ts:12`.

### Niedrig

- Hinweis: Der erste `next-browser` Socket-Fehler war kein App-Fehler. Er entstand durch parallele CLI-Kommandos gegen einen kalt gestarteten `next-browser` Daemon. Der Daemon verwendet einen einzelnen festen Socket unter `~/.next-browser/default.sock`; parallele Erststarts koennen sich gegenseitig Socket/PID-Zustand stoeren. Einzelne, sequenzielle Headed- und Headless-Aufrufe starten den Socket.
- Hinweis: Beim ersten Homepage-Dev-Aufruf meldete Next/Turbopack, dass ein vorheriger interner Filesystem-Cache-Fehler den Cache geloescht hatte. Der Seitenaufruf, Error-Check und die spaeteren Builds waren erfolgreich.

## Konkrete Empfehlungen

- Fuer App-Produktion-Builds die Root-Scripts `pnpm build:homepage`, `pnpm build:members`, `pnpm build:operations` und `pnpm build:playground` verwenden.
- Fuer App-Dev-Debugging die Root-Scripts `pnpm dev:homepage`, `pnpm dev:members`, `pnpm dev:operations` und `pnpm dev:playground` verwenden.
- Fuer Agent-Diagnose mit `next-browser` erst einen einzelnen `next-browser open ...` ausfuehren und danach weitere `next-browser` Kommandos sequenziell absetzen. Parallele Erststarts vermeiden.

## Verifikation

- `pnpm install`: erfolgreich; Root-`next` wurde als `catalog:` Dev-Dependency aufgeloest.
- Root-Script-Inventar: erfolgreich; alle Script-Werte sind konkrete `next build apps/*` oder `next dev apps/*` Kommandos, kein Root-`build` und kein `build:packages`.
- `pnpm build:homepage`: erfolgreich.
- `pnpm build:members`: erfolgreich.
- `pnpm build:operations`: erfolgreich.
- `pnpm build:playground`: erfolgreich.
- `next-browser --version`: `0.7.1`.
- Sequenzieller Headed-Start mit `next-browser open http://localhost:3000`: erfolgreich; `~/.next-browser/default.sock` und `default.pid` wurden erzeugt.
- `next-browser errors`: keine `configErrors`, keine `sessionErrors`.
- `next-browser browser-logs`, `next-browser tree` und `next-browser screenshot`: erfolgreich.
- Browser-zu-Terminal-Probe: `[browser] next-browser headed console forwarding probe` erschien im Next-Dev-Server-Terminal.
- `next-browser` Dev-Diagnose:
  - Homepage `http://localhost:3000`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.
  - Members `http://localhost:3001`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.
  - Operations `http://localhost:3002`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.
  - Playground `http://localhost:3003`: keine `errors`, React-Tree lesbar, Screenshot erstellt, Browser-Log-Probe im Dev-Terminal sichtbar.

## Offene Fragen oder Restrisiken

- `next-browser` funktioniert sequenziell stabil. Der bekannte Restrisiko-Punkt ist paralleler Cold-Start desselben globalen Daemons.
- Die bisherigen Root-Analyseberichte wurden per Scope-Rewrite aktualisiert. Inhaltliche historische Aussagen wurden nicht neu bewertet.

## Vorgeschlagene naechste Schritte

- Keine parallelen `next-browser` Kommandos gegen einen kalten Daemon starten; erst `next-browser open ...`, danach Diagnosebefehle.
- Optional die aelteren Root-Analyseberichte archivieren oder als historisch markieren, damit sie nicht mit aktueller Projekt-Dokumentation verwechselt werden.
