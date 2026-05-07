# Apps Review — aktueller Restbestand

**Stand:** 2026-05-07

Abgearbeitete und widerlegte Findings wurden entfernt. Details zur Validierung stehen in [`../AI_SLOP_REVIEW_VALIDATION.md`](../AI_SLOP_REVIEW_VALIDATION.md).

## Erledigt

- `apps/homepage/app/opengraph-image.tsx` nutzt keine Tailwind-Default-Blauwerte mehr.
- `apps/members`, `apps/operations` und `apps/playground` definieren `metadataBase`.
- Operations-Daten werden semantisch als `<table>` gerendert.
- Die statische CommandBar ist nicht mehr als `role="search"` deklariert.
- Deutsche Umlaute in Operations-Copy wurden korrigiert.
- `OperationsShell` rendert den Inhaltsbereich unter einem `<main>`-Landmark.
- Platzhalter-Toolbar-Buttons sind disabled.
- Redundantes `antialiased` wurde aus Members/Operations-Layouts entfernt.
- App-`tsconfig.json` Targets stehen auf `ES2022`.

## Noch offen

- Gemeinsamer App-Layout- und Error-State-Standard fehlt noch. `operations` ist weiter vollständiger als `homepage`, `members` und `playground`.
- `homepage` verwendet noch eine Marketing-Placeholder-Komposition.
- App-Config-Dateien sind weiterhin weitgehend dupliziert; Shared Config ist Architekturarbeit.
- `NEXT_PUBLIC_*_URL`-Fallbacks nutzen lokale URLs. Für Production sollte CI eine echte URL erzwingen oder Vercel-URL-Logik dokumentiert werden.
