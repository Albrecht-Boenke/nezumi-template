# Docs & Config Review — aktueller Restbestand

**Stand:** 2026-05-07

Abgearbeitete und widerlegte Findings wurden entfernt. Details zur Validierung stehen in [`../AI_SLOP_REVIEW_VALIDATION.md`](../AI_SLOP_REVIEW_VALIDATION.md).

## Erledigt

- Root-Scripts `lint` und `test` wurden ergänzt.
- `turbo.json` enthält `lint` und `test`.
- ESLint Flat Config mit `eslint-config-next` wurde angelegt.
- App-`tsconfig.json` Targets stehen auf `ES2022`.
- `next-env.d.ts` ist in `.gitignore` aufgenommen.
- `@radix-ui/react-slot` ersetzt den Radix-Monolith im UI-Package.
- `docs/nezumi-ui/001`, `004` und `010` wurden an den aktuellen Import-, Export- und Token-Stand angepasst.

## Noch offen

- `FRAMEWORK_VERSION_REFERENCES.md` wird referenziert, existiert aber nicht.
- Root-`tsconfig.json` oder eine dokumentierte bewusste Alternative fehlt.
- `CLAUDE.md` sollte repariert oder als klarer Verweis auf `AGENTS.md` dokumentiert werden.
- App-Roadmap-Checklisten sind stale und sollten separat synchronisiert oder archiviert werden.
- Vendor-Doku-Spiegel enthalten naturgemäß ältere Framework-Versionen; die Projekt-Catalog-Pins sollten prominenter in den INDEX-Dateien genannt werden.
- `ignoreDeprecations: "6.0"` bleibt bewusst gesetzt, bis das TS6/tsup-DTS-`baseUrl`-Thema vor TypeScript 7 migriert ist.
