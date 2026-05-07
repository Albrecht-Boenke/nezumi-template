# Docs & Config Review — aktueller Restbestand

**Stand:** 2026-05-07

Abgearbeitete und widerlegte Findings wurden entfernt. Details zur Validierung stehen in [`../AI_SLOP_REVIEW_VALIDATION.md`](../AI_SLOP_REVIEW_VALIDATION.md).

## Erledigt

- `FRAMEWORK_VERSION_REFERENCES.md` wurde als Root-SSOT fuer Catalog-/Lockfile-Versionen ergaenzt.
- Vendor-Doc-INDEX-Dateien nennen die Projekt-Catalog-Pins prominent und unterscheiden Offline-Mirror von installierter Version.
- App-Roadmap-Checklisten wurden mit dem aktuellen App-Scaffold-Stand synchronisiert; erledigte Setup-Punkte sind markiert und verbleibende Risiken app-spezifisch eingegrenzt.
- Root-Scripts `lint` und `test` wurden ergänzt.
- `turbo.json` enthält `lint` und `test`.
- ESLint Flat Config mit `eslint-config-next` wurde angelegt.
- App-`tsconfig.json` Targets stehen auf `ES2022`.
- `next-env.d.ts` ist in `.gitignore` aufgenommen.
- `@radix-ui/react-slot` ersetzt den Radix-Monolith im UI-Package.
- `docs/nezumi-ui/001`, `004` und `010` wurden an den aktuellen Import-, Export- und Token-Stand angepasst.
- Root-`tsconfig.json`-Finding ist geschlossen: Die bewusste Alternative ist in [`../ROOT_TSCONFIG_DECISION.md`](../ROOT_TSCONFIG_DECISION.md) dokumentiert. Next-App-Configs bleiben aktuell explizit pro App; `packages/ui` behaelt eine eigene TS-Build-Konfiguration fuer Declaration-/Export-Ausgaben.
- `CLAUDE.md` ist als klarer Verweis auf `AGENTS.md` repariert.

## Noch offen

- `ignoreDeprecations: "6.0"` bleibt bewusst gesetzt, bis das TS6/tsup-DTS-`baseUrl`-Thema vor TypeScript 7 migriert ist.
