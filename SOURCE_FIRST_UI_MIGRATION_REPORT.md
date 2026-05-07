# Source-First UI Migration Report

## Aufgabenstellung

`@nezumi/ui` sollte als internes Monorepo-Package source-first bleiben: `tsup`
entfernen, `package.json#exports` auf Source-Dateien umstellen, Next/Turbo
bewusst passend halten, danach Build- und Dev-Verifikation ausfuehren und die
Nezumi-UI-Dokumentation aktualisieren.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/monorepo.mdx`
- `docs/shadcn-ui/overview/package-imports.mdx`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx`
- `docs/turbo/INDEX.md`
- `docs/turbo/08-core-concepts-internal-packages.mdx`
- `docs/turbo/42-guides-tools-typescript.mdx`
- `docs/turbo/47-reference-configuration.mdx`
- `docs/typescript/INDEX.md`
- `docs/typescript/261-tsconfig-options-resolvepackagejsonexports.mdx`
- `docs/typescript/291-tsconfig-options-verbatimmodulesyntax.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

- shadcn/ui Package Imports: `https://ui.shadcn.com/docs/package-imports`
- shadcn/ui Monorepo: `https://ui.shadcn.com/docs/monorepo`
- Turborepo Internal Packages: `https://turborepo.dev/docs/core-concepts/internal-packages`
- Next.js `transpilePackages`: `https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages`

## Abgeleiteter SOLL-Zustand

- `@nezumi/ui` ist ein privates, internes Just-in-Time Package.
- Public CSS-, Component-, Layout- und Utility-Entrypoints zeigen direkt auf
  `packages/ui/src`.
- Es gibt keinen package-lokalen Bundler-Build, kein `dist/`-Output und keine
  `tsup`-Abhaengigkeit.
- Next.js Apps behalten `transpilePackages: ["@nezumi/ui"]`.
- Turbo cached keine `dist/**`-Outputs und typecheckt ohne vorgeschalteten
  UI-Build.
- shadcn package imports werden package-lokal ueber `#components/*` und
  `#lib/*` geloest.

## Analysierte Dateien

- `packages/ui/package.json`
- `packages/ui/tsconfig.json`
- `packages/ui/components.json`
- `packages/ui/src/components/*`
- `apps/*/next.config.ts`
- `package.json`
- `turbo.json`
- `pnpm-lock.yaml`
- `docs/nezumi-ui/*`
- `README.md`
- `FRAMEWORK_VERSION_REFERENCES.md`
- `DEAD_CODE_CLEANUP_REPORT.md`

## Findings nach Schweregrad

### Hoch

Keine verbleibenden High-Severity-Findings.

### Mittel

- Behoben: `@nezumi/ui` war noch als compiled package dokumentiert und
  konfiguriert. Die Exports zeigten auf `dist/`, obwohl das Package intern
  source-first genutzt werden soll.
- Behoben: Turbo und Root-Scripts enthielten noch UI-Build-Annahmen.

### Niedrig

- Behoben: Nezumi-UI-Dokumente und Reports enthielten stale Hinweise auf
  `tsup`, `dist/`, DTS-Builds oder den alten package-lokalen UI-Build.

## Konkrete Empfehlungen

- Neue public UI-Komponenten als `src/components/<name>.tsx` anlegen und direkt
  in `package.json#exports` auf diese Source-Datei mappen.
- `transpilePackages: ["@nezumi/ui"]` in allen Next.js Apps beibehalten.
- Einen Package-Build nur wieder einfuehren, wenn `@nezumi/ui` publishable
  werden soll.

## Offene Fragen oder Restrisiken

- Dev-Server erzeugt temporaer Next.js `next-env.d.ts`-Aenderungen zwischen
  Build- und Dev-Routes. Diese wurden nach dem Dev-Smoke wieder auf den
  versionierten Zustand zurueckgesetzt.

## Verifikation

- `pnpm install` erfolgreich.
- Source-first invariant script erfolgreich.
- `pnpm turbo typecheck --force` erfolgreich.
- `pnpm --filter @nezumi/ui test -- --run` erfolgreich: 3 Dateien, 10 Tests.
- `pnpm turbo build --force` erfolgreich: alle 4 Next.js Apps gebaut.
- `pnpm dev` erfolgreich gestartet: `@nezumi/ui` watch typecheck meldete 0
  Fehler; Homepage, Members, Operations und Playground lieferten HTTP 200.
- `pnpm turbo lint --force` erfolgreich.
- `git diff --check` erfolgreich.
