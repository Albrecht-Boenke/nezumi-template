# Dead Code Cleanup Report

## Aufgabenstellung

Alle Apps und das gemeinsame UI-Package sollten nach der Landing-Page-Reduktion frei von Dead Code, stale Review-Artefakten und offensichtlichem AI-Slop sein. App-spezifische Einstellungen, `components.json`-Aliase und Build-Konfigurationen sollten erhalten bleiben.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/typescript/INDEX.md`
- `docs/typescript/062-handbook-project-config-tsconfig.json.mdx`
- `docs/turbo/INDEX.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/002-01-app-01-getting-started-02-project-structure.mdx`
- `docs/nextjs/011-01-app-01-getting-started-11-css.mdx`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/monorepo.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Vendor-Dokumentationssets waren fuer diese Cleanup-Entscheidungen ausreichend.

## Abgeleiteter SOLL-Zustand

- Next.js Apps behalten nur die minimalen App-Router-Quellen und ihre App-Konfiguration.
- Tailwind CSS bleibt CSS-first konfiguriert; nur tatsaechlich verwendete Component-Token-Sheets werden importiert.
- shadcn/ui-Monorepo-Aliase in `components.json` bleiben als Tooling-Konfiguration erhalten, auch wenn kein Barrel-Import existiert.
- `@nezumi/ui` exponiert nur die in `package.json` definierten granularen Source-Leaf-Entrypoints.
- Interne Placeholder-Barrels, doppelte Implementierungen und stale Review-/Report-Artefakte gehoeren nicht in den produktiven Source-Tree.

## Analysierte Dateien

- `packages/ui/package.json`
- `packages/ui/tsconfig.json`
- `packages/ui/components.json`
- `packages/ui/src/components/*`
- `packages/ui/src/atoms/*`
- `packages/ui/src/layout/*`
- `packages/ui/src/lib/*`
- `packages/ui/src/styles/design-tokens.css`
- `packages/ui/src/styles/components/*`
- `apps/*/components.json`
- `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- Root- und `review/`-Markdown-Artefakte

## Findings nach Schweregrad

### Hoch

Keine verbleibenden High-Severity-Findings nach Cleanup und Verifikation.

### Mittel

- Entfernt: doppelte, nicht referenzierte Layout-Implementierungen unter `packages/ui/src/layout/{Box,Container,Flex,Grid,Section}/`.
  Risiko vorher: parallele Implementierungen konnten auseinanderlaufen, obwohl der public `@nezumi/ui/layout` Entrypoint nur die top-level Layout-Dateien baut.
- Entfernt: unexported `packages/ui/src/atoms/Card/card.tsx` plus Card/Input-Component-Token-Sheets.
  Risiko vorher: Tailwind-Token und Komponenten wirkten produktiv, waren aber nicht ueber `package.json` erreichbar.

### Niedrig

- Entfernt: leere Placeholder-Barrels in `atoms`, `components`, `lib`, `molecules`, `organisms` und `templates`.
- Entfernt: stale Review- und Entscheidungsdokumente im Root und unter `review/`.
- Aktualisiert: Nezumi-UI-Dokumentation, damit sie keine geloeschten Placeholder-Direktories oder Component-Tokens mehr als aktuellen Zustand beschreibt.
- Bereinigt: ignorierte `.DS_Store`-Dateien aus dem lokalen Arbeitsbaum.

## Konkrete Empfehlungen

- Neue UI-Komponenten erst dann mit Component-Tokens anlegen, wenn ein public Leaf-Entrypoint in `src/components/<name>.tsx` existiert und in `package.json#exports` auf die Source-Datei zeigt.
- Keine neuen packageweiten Barrels fuer `@nezumi/ui/components` oder `@nezumi/ui/lib` einfuehren; die dokumentierte API bleibt granular.
- Review-Artefakte kuenftig in einem klaren Report-Namen ablegen und veraltete Zwischenberichte nach Abschluss entfernen.

## Offene Fragen oder Restrisiken

- Die Architektur-Dokumentation beschreibt weiterhin `src/atoms/` als interne Implementierungsschicht. Das ist aktuell korrekt, aber weitere Atomic-Design-Stufen sollten erst wieder als echte Ordner angelegt werden, wenn sie produktive Dateien enthalten.
- Ignorierte Build-Artefakte wie `.next` und `.turbo` bleiben lokal vorhanden, werden aber nicht versioniert.

## Verifikation

- `pnpm typecheck` erfolgreich
- `pnpm lint` erfolgreich
- `pnpm test` erfolgreich
- `pnpm build` erfolgreich
