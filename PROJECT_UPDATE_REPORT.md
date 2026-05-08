# Project Update Report

## Aufgabenstellung

Das Monorepo wurde auf den internen Package-Scope `@packages/ui` umgestellt. Root-Scripts sollen ausschliesslich konkrete Next.js App-Builds und App-Dev-Server abbilden. Alle Next.js Apps sollen `logging.browserToTerminal: true` erhalten, und die Apps sollen mit `next-browser` auf Dev-Server-, Error- und Debugging-Funktionalitaet geprueft werden. Zusaetzlich wurde geprueft, warum bei einem zweiten Dev-Server-Start nicht sofort die dokumentierte Next.js Lock-File-Meldung sichtbar war.

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
- Die Dev-Scripts duerfen keine festen `-p` Ports erzwingen. Bei festem Port scheitert ein zweiter identischer Start zuerst mit `EADDRINUSE`, bevor die dokumentierte Next.js Lock-File-Meldung sichtbar wird. Ohne festen Port kann Next.js auf einen freien Port ausweichen und danach den vorhandenen `.next/dev/lock` mit PID, URL und Log-Pfad melden.
- `.next/dev/lock` ist ein Next.js Dev-Server-Lock pro App-Projektverzeichnis, z. B. `apps/homepage/.next/dev/lock`. Der `next-browser` Socket ist davon getrennt und liegt global unter `~/.next-browser/default.sock`.
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
- Resolved: Die Dev-Scripts verwendeten feste Ports (`--turbopack -p 3000` bis `3003`). Das verdeckte beim zweiten identischen App-Start die Next.js Lock-File-Diagnose durch den frueheren Betriebssystemfehler `EADDRINUSE`. Korrektur: Root-Dev-Scripts und App-Dev-Scripts verwenden nur noch `next dev`; Turbopack ist in Next.js 16 Standard.
- Resolved: Browser-zu-Terminal-Logging war in den App-Konfigurationen nicht aktiviert. Korrektur: alle `apps/*/next.config.ts` Dateien enthalten `logging.browserToTerminal: true` und behalten `transpilePackages: ["@packages/ui"]`; Beispiel `apps/homepage/next.config.ts:3` bis `apps/homepage/next.config.ts:12`.

### Niedrig

- Hinweis: Der erste `next-browser` Socket-Fehler war kein App-Fehler und auch kein Next.js Dev-Server-Lock. `next-browser` verwendet einen eigenen globalen Daemon-Socket unter `~/.next-browser/default.sock`. Die Next.js Lock-Datei liegt dagegen pro App unter `.next/dev/lock`.
- Hinweis: Beim ersten Homepage-Dev-Aufruf meldete Next/Turbopack, dass ein vorheriger interner Filesystem-Cache-Fehler den Cache geloescht hatte. Der Seitenaufruf, Error-Check und die spaeteren Builds waren erfolgreich.

## Konkrete Empfehlungen

- Fuer App-Produktion-Builds die direkten Next-Kommandos `next build apps/homepage`, `next build apps/members`, `next build apps/operations` und `next build apps/playground` verwenden.
- Fuer App-Dev-Debugging die direkten Next-Kommandos `next dev apps/homepage`, `next dev apps/members`, `next dev apps/operations` und `next dev apps/playground` verwenden. Die konkrete URL aus der Next.js Terminalausgabe verwenden, weil Next.js bei belegtem Port automatisch auf den naechsten freien Port wechseln kann.
- Fuer Agent-Diagnose mit `next-browser` erst einen einzelnen `next-browser open ...` ausfuehren und danach weitere `next-browser` Kommandos sequenziell absetzen. Parallele Erststarts vermeiden.

## Verifikation

- `pnpm install`: erfolgreich; Root-`next` wurde als `catalog:` Dev-Dependency aufgeloest.
- Root-Script-Inventar: erfolgreich; alle Script-Werte sind konkrete `next build apps/*` oder `next dev apps/*` Kommandos, kein Root-`build` und kein `build:packages`.
- App-Dev-Script-Inventar: erfolgreich; alle `apps/*/package.json` Dev-Scripts verwenden nur noch `next dev`.
- `next build apps/homepage`: erfolgreich.
- `next build apps/members`: erfolgreich.
- `next build apps/operations`: erfolgreich.
- `next build apps/playground`: erfolgreich.
- Next.js Lock-File-Probe: erster `pnpm dev:homepage` schrieb `apps/homepage/.next/dev/lock` mit PID, Port und `http://localhost:3000`.
- Zweiter `pnpm dev:homepage` ohne festen Port meldete zuerst den belegten Port und wechselte auf `3001`, danach die erwartete Meldung `Another next dev server is already running` inklusive Local URL, PID, App-Dir und Log-Pfad.
- Gegenprobe mit altem festen Port-Verhalten: ein zweiter Start mit `-p 3000` scheitert vorher mit `EADDRINUSE`; das war die Ursache fuer die fehlende Lock-File-Meldung.
- `next-browser --version`: `0.7.1`.
- Sequenzieller Headless-Start mit `next-browser open http://localhost:3000`: erfolgreich; `~/.next-browser/default.sock` und `default.pid` wurden erzeugt.
- `next-browser errors`: keine `configErrors`, keine `sessionErrors`.
- `next-browser browser-logs`, `next-browser tree` und `next-browser screenshot`: erfolgreich.
- Browser-zu-Terminal-Probe: `[browser] next-browser headed console forwarding probe` erschien im Next-Dev-Server-Terminal.
- `next-browser` Dev-Diagnose:
  - Homepage: `pnpm dev:homepage`, `next-browser project/errors/tree`: Projekt erkannt, keine `errors`, React-Tree lesbar.
  - Members: `pnpm dev:members`, `next-browser project/errors/tree`: Projekt erkannt, keine `errors`, React-Tree lesbar.
  - Operations: `pnpm dev:operations`, `next-browser project/errors/tree`: Projekt erkannt, keine `errors`, React-Tree lesbar.
  - Playground: `pnpm dev:playground`, `next-browser project/errors/tree`: Projekt erkannt, keine `errors`, React-Tree lesbar.

## Offene Fragen oder Restrisiken

- `next-browser` funktioniert sequenziell stabil. Der bekannte Restrisiko-Punkt ist paralleler Cold-Start desselben globalen Daemons.
- Die bisherigen Root-Analyseberichte wurden per Scope-Rewrite aktualisiert. Inhaltliche historische Aussagen wurden nicht neu bewertet.

## Vorgeschlagene naechste Schritte

- Keine parallelen `next-browser` Kommandos gegen einen kalten Daemon starten; erst `next-browser open ...`, danach Diagnosebefehle.
- Optional die aelteren Root-Analyseberichte archivieren oder als historisch markieren, damit sie nicht mit aktueller Projekt-Dokumentation verwechselt werden.
