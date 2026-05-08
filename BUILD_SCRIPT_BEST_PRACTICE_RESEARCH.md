# Build Script Best-Practice Research

## Aufgabenstellung

Pruefen, ob `build: "tsc --noEmit"` fuer `packages/ui` eine Best Practice ist, nachdem `turbo build` damit ein erfolgreiches Paket-Task-Ergebnis meldet, aber keine Build-Artefakte erzeugt.

## Gelesene lokale Dokumentation

- `AGENTS.md`: Documentation-First-Regel und Reihenfolge der lokalen Dokumentation.
- `docs/typescript/INDEX.md`: Navigationsroot fuer TypeScript-Dokumentation.
- `docs/typescript/229-tsconfig-options-noemit.mdx`: `noEmit` erzeugt keine Compiler-Ausgaben und dient als Type-Check, wenn ein anderes Tool transpiliert.
- `docs/typescript/173-tsconfig-options-declaration.mdx`: `declaration` erzeugt `.d.ts`-Dateien fuer die externe API.
- `docs/typescript/184-tsconfig-options-emitdeclarationonly.mdx`: `emitDeclarationOnly` erzeugt nur `.d.ts`, wenn JS von einem anderen Tool kommt.
- `docs/typescript/056-handbook-modules-reference-guides-choosing-compiler-options.mdx`: fuer Bundler-Projekte ist `noEmit` oder `emitDeclarationOnly` passend; fuer Libraries werden `declaration`, `rootDir` und `outDir` empfohlen.
- `docs/turbo/INDEX.md`: Navigationsroot fuer Turborepo.
- `docs/turbo/08-core-concepts-internal-packages.mdx`: unterscheidet Just-in-Time, Compiled und Publishable Packages.
- `docs/turbo/04-getting-started-add-to-existing-repository.mdx`: empfiehlt `build` und `check-types` zu trennen.
- `docs/turbo/16-crafting-your-repository-creating-an-internal-package.mdx`: Compiled Package nutzt `build: "tsc"`, `outDir`, `rootDir` und `turbo.json` outputs wie `dist/**`.
- `docs/nextjs/INDEX.md`: Navigationsroot fuer Next.js.
- `docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx`: Next.js transpiliert lokale Monorepo-Packages via `transpilePackages`.
- `docs/nezumi-ui/INDEX.md`: Navigationsroot fuer Projekt-UI-Doku.
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`: `@packages/ui` ist source-first und soll keinen package-local build script im Root-Workflow exposen.
- `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`: Apps kompilieren das UI-Paket im App-Build; lokale Package-Checks nutzen `tsc --noEmit`.
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`: package exports zeigen direkt auf TypeScript-Source-Dateien.
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`: bestaetigt source-first Export-Pattern.

## Gelesene externe Quellen

- Turborepo, Internal Packages: https://turborepo.dev/docs/core-concepts/internal-packages
- Turborepo, Add to an existing repository: https://turborepo.dev/docs/getting-started/add-to-existing-repository
- Turborepo, Creating an Internal Package: https://turborepo.dev/docs/crafting-your-repository/creating-an-internal-package
- Turborepo, TypeScript guide: https://turborepo.dev/docs/guides/tools/typescript
- TypeScript, `noEmit`: https://www.typescriptlang.org/tsconfig/noEmit.html
- TypeScript, `declaration`: https://www.typescriptlang.org/tsconfig/declaration.html
- TypeScript, `emitDeclarationOnly`: https://www.typescriptlang.org/tsconfig/emitDeclarationOnly.html
- TypeScript, Choosing Compiler Options: https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html
- Next.js, `transpilePackages`: https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages

## Abgeleiteter Soll-Zustand

Es gibt zwei saubere Best-Practice-Modelle. Das Repository sollte eines davon explizit waehlen und nicht vermischen.

Modell A: Source-first / Just-in-Time Package

- `packages/ui` exportiert TypeScript-Source direkt aus `src`.
- Next.js Apps setzen `transpilePackages: ["@packages/ui"]`.
- Das UI-Paket hat keinen `build`-Script, weil es selbst keine JS- oder Typ-Artefakte erzeugt.
- TypeScript-Pruefung laeuft ueber `typecheck` oder Turborepo-konform ueber `check-types` mit `tsc --noEmit`.
- `turbo build` baut die Apps; `@packages/ui` wird dabei durch Next.js als Dependency transpiliert.

Modell B: Compiled Package

- `packages/ui` hat `build: "tsc"` oder ein dediziertes Build-Tool.
- `tsconfig.json` setzt mindestens `rootDir`, `outDir` und fuer Libraries sinnvollerweise `declaration`.
- Package-Exports zeigen fuer Runtime-Code auf `dist/*.js` und fuer Types auf `.d.ts` oder bewusst auf Source, wenn das Paket intern bleibt und die Toolchain das traegt.
- `turbo.json` enthaelt `dist/**` in den `outputs`, damit Turbo den Package-Build cachen kann.
- `turbo build` baut zuerst das UI-Paket und danach die abhaengigen Apps.

`tsc --noEmit` ist nach TypeScript- und Turborepo-Doku korrekt fuer Type-Checking. Als `build`-Script ist es nur dann vertretbar, wenn das Team `build` bewusst als "validate buildability" definiert. Das ist in diesem Repo nicht der dokumentierte Sinn von `build`, und es ist fuer `turbo build` semantisch irrefuehrend.

## Analysierte Dateien

- `packages/ui/package.json`
- `packages/ui/tsconfig.json`
- `turbo.json`
- `package.json`
- `pnpm-workspace.yaml`
- `apps/homepage/next.config.ts`
- `apps/members/next.config.ts`
- `apps/operations/next.config.ts`
- `apps/playground/next.config.ts`
- `apps/*/package.json`
- `apps/*/app/globals.css`

## Findings nach Schweregrad

### P2: `build: "tsc --noEmit"` ist fuer `packages/ui` kein sauberer Package-Build

Gesicherter Befund: `packages/ui/package.json` definiert derzeit `build: "tsc --noEmit"` und `typecheck: "tsc --noEmit"` nebeneinander. Damit ist `build` funktional identisch zu `typecheck`, erzeugt aber keine JS-, `.d.ts`-, Source-Map- oder sonstige Build-Artefakte.

Risiko: `turbo build` meldet `@packages/ui:build` als erfolgreich, obwohl kein Package gebaut wurde. Das kann in CI, Caching und Review zu einer falschen Sicherheitsannahme fuehren.

Auswirkung: Das Paket ist typechecked, aber nicht "built" im Sinne von Turborepo Compiled Packages. Es gibt auch kein cachebares Package-Output.

Empfohlene Korrektur: Entweder `build` aus `packages/ui` entfernen und `typecheck` beziehungsweise `check-types` fuer `tsc --noEmit` nutzen, oder das Paket konsequent in ein Compiled Package umbauen.

### P2: Aktueller Code widerspricht der lokalen Nezumi-UI-Dokumentation

Gesicherter Befund: Die lokale Doku beschreibt `@packages/ui` als source-first Package ohne package-local build script im Root-Workflow. Sie sagt ausserdem, dass konsumierende Apps die Source-Dateien durch ihren Next.js-Build transpilieren.

Risiko: Neue Mitwirkende und Agenten bekommen widerspruechliche Signale: Doku sagt source-first ohne Build, `package.json` sagt build existiert.

Auswirkung: Kuenftige Aenderungen koennen in Richtung "Build ist erledigt" gehen, obwohl die eigentliche Source-first-Architektur unveraendert bleibt.

Empfohlene Korrektur: Doku und Code wieder synchronisieren. Fuer den aktuellen Architekturstand ist die geringste Korrektur: `build` im UI-Paket entfernen und `turbo typecheck --filter="./packages/*"` oder ein neues `check-types`-Task als Type-Check verwenden.

### P3: `turbo.json` ist nicht fuer Package-Build-Artefakte konfiguriert

Gesicherter Befund: `turbo.json` listet fuer `build` nur `.next/**` und `!.next/cache/**` als Outputs. Es gibt kein `dist/**`.

Risiko: Selbst wenn `packages/ui` spaeter echte Outputs erzeugt, wuerde Turbo diese derzeit nicht als Build-Output cachen.

Auswirkung: Ein spaeterer Wechsel auf `build: "tsc"` waere unvollstaendig, solange `tsconfig.json`, `exports` und `turbo.json` nicht gemeinsam angepasst werden.

Empfohlene Korrektur: Nur bei Wechsel auf Compiled Package `dist/**` in `turbo.json` ergaenzen und `packages/ui/tsconfig.json` sowie `exports` entsprechend umbauen.

## Konkrete Empfehlungen

Empfehlung fuer dieses Repository: zum dokumentierten Source-first-Modell zurueckkehren.

- `packages/ui`: `build: "tsc --noEmit"` entfernen.
- `packages/ui`: `typecheck: "tsc --noEmit"` behalten.
- Optional fuer bessere Turborepo-Konvention: zusaetzlich oder statt `typecheck` ein `check-types: "tsc --noEmit"` einfuehren und in `turbo.json` ein `check-types`-Task definieren.
- `turbo build` sollte dann App-Builds ausfuehren; dabei wird `@packages/ui` ueber `transpilePackages` in den Apps kompiliert.
- Wenn die harte Anforderung lautet, dass `turbo build --filter="./packages/*"` ein Package wirklich baut, dann sollte `packages/ui` zu einem Compiled Package migriert werden. Dann braucht es `build: "tsc"`, `outDir`, `rootDir`, `declaration`, angepasste `exports` und `dist/**` in `turbo.json`.

Kurzentscheidung:

- Source-first behalten: kein Package-`build`, `tsc --noEmit` nur als Type-Check.
- Echten Package-Build wollen: `tsc --noEmit` ist falsch; stattdessen `tsc` mit Output-Konfiguration.

## Offene Fragen oder Restrisiken

- Soll `@packages/ui` langfristig publishable oder nur monorepo-intern bleiben? Fuer publishable waeren `exports`, `.d.ts`, CSS-Distribution und eventuell Bundling deutlich strenger zu designen.
- Soll `turbo build` im Root alle Apps bauen oder gezielt auch Packages mit echten Outputs? Die Antwort entscheidet zwischen Source-first und Compiled Package.
- Eine Umbenennung von `typecheck` zu `check-types` waere naeher an Turborepo-Doku, ist aber eine repo-weite Konventionentscheidung.

## Vorgeschlagene naechste Schritte

1. Sofortkorrektur: `build: "tsc --noEmit"` aus `packages/ui/package.json` entfernen und `typecheck` behalten.
2. Optional danach: `check-types` als Turborepo-konformes Task-Pattern einfuehren.
3. Nur bei Bedarf: separate Migration zu einem echten compiled UI package planen.
