# Members App Review Report

## Aufgabenstellung

Der `review-specialist` wurde ohne konkreten Ziel-Scope aufgerufen. Der Agent hat gemaess seiner Default-Rolle einen read-only Deep-Dive fuer einen selbst gewaehlten Scope im Nezumi-Monorepo durchgefuehrt. Gewaehlter Scope: `apps/members`.

Der aktive `review-specialist` ist read-only und konnte deshalb selbst kein Repo-Root-Markdown-Dokument erstellen. Dieser Report ueberfuehrt seine Analyse in das durch `AGENTS.md` geforderte Ergebnisformat.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `FRAMEWORK_VERSION_REFERENCES.md`
- `docs/README.md`
- `README.md`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`
- `docs/nezumi-ui/003-nezumi-ui-atomic-design.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`
- `nezumi-ui-target-file-tree.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/001`, `002`, `003`, `005`, `014`, `022`, `077`, `083`, `090`, `119`, `124`, `126`, `143`, `200`, `235`, `418`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/053`, `084`, `172`
- `docs/react/INDEX.md`
- `docs/typescript/INDEX.md`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/monorepo.mdx`

## Gelesene externe Quellen

- W3C WCAG Technique H57 zur korrekten Deklaration der Seitensprache.

## Abgeleiteter SOLL-Zustand

- Eine App, die als geschuetzter Mitgliederbereich beschrieben wird, muss vor produktiver Nutzung explizite Zugriffskontrolle besitzen oder klar als ungeschuetzter Platzhalter gekennzeichnet sein.
- Next.js-generierte Dateien wie `next-env.d.ts` sollen nicht als manuell gepflegte Source-of-Truth-Dateien behandelt werden. Ignorierte `.next`-Artefakte duerfen nicht als stabile Tracked-Dependency in sauberen Checkouts vorausgesetzt werden.
- Die natuerliche Sprache des Dokuments muss mit `html lang` und sichtbarem Inhalt konsistent sein oder abweichende Sprachfragmente muessen separat markiert werden.
- Kommentare zu Framework-Konfiguration muessen mit der lokal dokumentierten Next.js-Version uebereinstimmen.
- Die Members-App soll die Nezumi-UI-Token- und Monorepo-Konventionen respektieren: Tailwind-v4-Source-Pfade, UI-Design-Token als SSOT und `transpilePackages` fuer source-first UI-Pakete.

## Analysierte Dateien

- `apps/members/app/layout.tsx`
- `apps/members/app/page.tsx`
- `apps/members/app/globals.css`
- `apps/members/next.config.ts`
- `apps/members/next-env.d.ts`
- `packages/ui/src/styles/design-tokens.test.ts`
- `packages/ui/src/layout/spacing.test.ts`
- `packages/ui/src/layout/layout-components.test.tsx`
- `packages/ui/src/atoms/Button/Button.test.tsx`

## Findings nach Schweregrad

### Warning: Geschuetzter Bereich ohne sichtbare Zugriffskontrolle

- Datei: `apps/members/app/layout.tsx:13`, `apps/members/app/page.tsx:1`
- Risiko: Security / Architektur
- Beobachtung: Die Metadaten beschreiben die App als `Geschuetzter Kunden- und Mitgliederbereich`. Gleichzeitig ist `apps/members/app/page.tsx` eine normale oeffentliche App-Router-Seite. Unter `apps/members` wurden keine `proxy.ts`, Auth-Routen, Session-Pruefungen oder Data-Access-Layer-Schutzmechanismen gefunden.
- Auswirkung: Wenn spaeter echte Mitglieder- oder Kundendaten unter dieser Annahme ergaenzt werden, kann der Bereich faktisch oeffentlich bleiben.
- Empfehlung: Vor produktivem Inhalt explizite Route- oder Session-Protection einbauen. Alternativ die Beschreibung auf einen ungeschuetzten Platzhalter aendern, bis Auth existiert.

### Warning: Generierte Next-Datei ist tracked und referenziert ignorierte `.next`-Typen

- Datei: `apps/members/next-env.d.ts:3`
- Risiko: Build / Reproduzierbarkeit
- Beobachtung: `next-env.d.ts` ist im Repository vorhanden und importiert `./.next/types/routes.d.ts`, waehrend `.next` typischerweise generiert und ignoriert ist.
- Auswirkung: Saubere Checkouts koennen vor `next dev`, `next build` oder Typegen auf eine nicht vorhandene generierte Datei zeigen. Das erzeugt unnoetige Churn- und Reproduzierbarkeitsrisiken.
- Empfehlung: Generierte `next-env.d.ts`-Dateien untracken und durch Next regenerieren lassen. `.gitignore` sollte fuer generierte Next-Artefakte die verbindliche Quelle bleiben.

### Suggestion: Dokument-Sprache und sichtbarer Inhalt sind inkonsistent

- Datei: `apps/members/app/layout.tsx:19`, `apps/members/app/page.tsx:8`
- Risiko: Accessibility / Content
- Beobachtung: Das Dokument deklariert `lang="de"`, aber der sichtbare Beschreibungstext lautet `Minimal landing page for the members app.`
- Auswirkung: Screenreader, Rechtschreibpruefung und Uebersetzungswerkzeuge koennen falsche Sprachregeln anwenden.
- Empfehlung: Den sichtbaren Text ins Deutsche lokalisieren oder das englische Fragment explizit mit `lang="en"` markieren.

### Suggestion: Kommentar zu `browserToTerminal` ist gegen Next-16-Dokumentation veraltet

- Datei: `apps/members/next.config.ts:6`
- Risiko: Docs / Tooling
- Beobachtung: Der Kommentar nennt `'error'` als Default. Die lokal gelesene Next-16-Dokumentation beschreibt `'warn'` als Default; `true` leitet alle Browser-Logs weiter.
- Auswirkung: Maintainer koennen Dev-Logging falsch einschaetzen und unnoetig laute Terminal-Ausgaben beibehalten.
- Empfehlung: Kommentar aktualisieren und pruefen, ob `'warn'` statt `true` fuer die App angemessener ist.

## Positive Beobachtungen

- `apps/members/app/globals.css:5` nutzt den dokumentierten Tailwind-v4-Monorepo-Source-Pfad `../../../packages/ui/src`.
- `apps/members/app/globals.css:8` importiert `@packages/ui/design-tokens.css` und respektiert damit das UI-Paket als Token-SSOT.
- `apps/members/app/layout.tsx:17` bleibt ein Server Component Root Layout mit korrektem `<html>`- und `<body>`-Geruest.
- `apps/members/next.config.ts:11` setzt `transpilePackages: ["@packages/ui"]` passend zum source-first UI-Paket.

## Konkrete Empfehlungen

1. Entscheidung treffen, ob `apps/members` bereits ein echter geschuetzter Bereich oder nur ein Placeholder ist.
2. Falls geschuetzt: Auth-/Session-Grenze vor echten Inhalten implementieren und Tests fuer geschuetzte Routen ergaenzen.
3. Falls Placeholder: Metadaten und sichtbaren Text so anpassen, dass kein Security-Versprechen entsteht.
4. Generierte Next-Typdateien nicht als Source-Dateien behandeln und Tracking-Strategie fuer `next-env.d.ts` repo-weit klaeren.
5. Den sichtbaren englischen Platzhaltertext lokalisieren oder sprachlich korrekt markieren.
6. `browserToTerminal`-Kommentar an Next 16 anpassen und Logging-Level bewusst waehlen.

## Offene Fragen oder Restrisiken

- Der Subagent hat keine Tests oder Contract-Skripte ausgefuehrt. Die Review ist eine read-only Analyse.
- Es wurden keine `scripts/check-*.mjs` Contract-Skripte im Scope gefunden.
- Dokumentationsluecke: `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx` nennt `packages/typescript-config/base.json`, `nextjs.json` und `react-library.json` als normativ, waehrend `packages/typescript-config/` leer ist und `nezumi-ui-target-file-tree.md` dieses Paket als optional beschreibt.

## Vorgeschlagene naechste Schritte

- Naechster sinnvoller Review-Scope: `packages/ui/src/layout`, weil `apps/members` dessen Token- und Layout-CSS-Vertraege indirekt konsumiert.
