# App Cleanup Report

## Aufgabenstellung

Alle Apps unter `apps/` wurden auf minimale Landing Pages reduziert. App-spezifische Shells, Platzhalter-Routen, lokale Komponenten und leere Scaffold-Ordner wurden entfernt. Die App-Einstellungen und Build-Konfigurationen bleiben erhalten.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/003-01-app-01-getting-started-03-layouts-and-pages.mdx`
- `docs/nextjs/011-01-app-01-getting-started-11-css.mdx`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/tailwind-css/084-functions-and-directives.mdx`
- `docs/tailwind-css/172-theme.mdx`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/tailwind-v4.mdx`
- `docs/shadcn-ui/overview/theming.mdx`
- `docs/shadcn-ui/overview/monorepo.mdx`
- `docs/react/INDEX.md`
- `docs/typescript/INDEX.md`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Vendor- und Projektdokumente klaerten die Aufgabe ausreichend.

## Abgeleiteter SOLL-Zustand

- Jede Next.js-App behält ihre Workspace-Einstellungen: `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `next-env.d.ts` und vorhandene `components.json`.
- Jede App nutzt App Router mit genau einer Root Landing Page unter `app/page.tsx` und einem Root Layout unter `app/layout.tsx`.
- `app/globals.css` bleibt die Tailwind-v4-Einstiegsdatei und importiert `tailwindcss`, die Dark-Mode-Variante, explizite `@source`-Pfade für `packages/ui/src` und die jeweilige App sowie `@nezumi/ui/design-tokens.css`.
- shadcn/ui bleibt Tailwind-v4-konform: leeres `tailwind.config` in `components.json`, CSS variables aktiv, semantische Token-Klassen statt roher Farben.
- Tailwind-Klassen bleiben statisch auffindbar, ohne dynamische Klassennamen.

## Analysierte Dateien

- `apps/homepage/app/globals.css`
- `apps/homepage/app/layout.tsx`
- `apps/homepage/app/page.tsx`
- `apps/homepage/components.json`
- `apps/homepage/next.config.ts`
- `apps/homepage/postcss.config.mjs`
- `apps/members/app/globals.css`
- `apps/members/app/layout.tsx`
- `apps/members/app/page.tsx`
- `apps/members/components.json`
- `apps/members/next.config.ts`
- `apps/members/postcss.config.mjs`
- `apps/operations/app/globals.css`
- `apps/operations/app/layout.tsx`
- `apps/operations/app/page.tsx`
- `apps/operations/components.json`
- `apps/operations/next.config.ts`
- `apps/operations/postcss.config.mjs`
- `apps/playground/app/globals.css`
- `apps/playground/app/layout.tsx`
- `apps/playground/app/page.tsx`
- `apps/playground/next.config.ts`
- `apps/playground/postcss.config.mjs`
- `packages/ui/src/styles/design-tokens.css`
- `packages/ui/src/styles/global.css`
- `packages/ui/package.json`

## Findings nach Schweregrad

### High

Keine gesicherten High-Findings nach der Bereinigung.

### Medium

- Vor der Bereinigung verwiesen stale `.next/types/validator.ts` Dateien noch auf entfernte Route-Groups in `members` und `operations`. Risiko: `tsc --noEmit` konnte nach dem Löschen der Routen fehlschlagen. Korrektur: stale `.next` Build-Artefakte entfernt und Typecheck neu ausgeführt.

### Low

- `homepage` behält `robots.ts`, `sitemap.ts` und `opengraph-image.tsx`. Das sind App-Router-Metadatenrouten und keine zusätzliche UI; sie bleiben als App-Einstellungen der öffentlichen App erhalten.

## Konkrete Empfehlungen

- Die aktuelle minimale Struktur beibehalten, bis echte Produktanforderungen pro App definiert sind.
- Neue App-spezifische UI erst wieder unter der jeweiligen App anlegen, wenn sie fachlich gebraucht wird.
- Wiederverwendbare Primitive weiterhin aus `packages/ui` beziehen oder dort erst nach echter Wiederverwendung ergänzen.
- Die Tailwind-v4-Konfiguration nicht auf `tailwind.config.*` zurückdrehen; die lokale Dokumentation und `components.json` erwarten CSS-first Konfiguration.

## Offene Fragen oder Restrisiken

- `homepage` hat weiterhin öffentliche SEO-Routen; falls "minimal" absolut nur `layout.tsx`, `page.tsx` und `globals.css` bedeuten soll, müssten auch diese Metadatenrouten entfernt werden.
- `playground` hat kein `components.json`; es wurde kein neues shadcn-Setup erzeugt, weil keine vorhandene App-Einstellung ergänzt werden sollte.

## Verifikation

- `pnpm typecheck`: erfolgreich nach Entfernen stale `.next` Artefakte.
- `pnpm lint`: erfolgreich.
- `pnpm build`: erfolgreich; Next.js Build zeigt für `members`, `operations` und `playground` nur `/` und `/_not-found`; `homepage` zusätzlich die vorhandenen Metadatenrouten.

## Vorgeschlagene nächste Schritte

- Bei Bedarf eine engere Definition von "minimal" für `homepage` treffen, falls SEO-Metadatenrouten ebenfalls entfernt werden sollen.
