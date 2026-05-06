# Members App Roadmap / Checklist

## Aufgabenstellung

Dieses Dokument beschreibt, wie `apps/members` als eigenstaendige Next.js-App-Router-Anwendung im Nezumi-Monorepo eingerichtet werden sollte. Ziel ist ein geschuetzter Mitgliederbereich bzw. Customer Portal mit klarer Trennung von App-Code, geteilter UI und spaeterer Auth-/Datenzugriffsschicht.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `docs/nextjs/INDEX.md`
- `docs/nextjs/002-01-app-01-getting-started-02-project-structure.mdx`
- `docs/nextjs/005-01-app-01-getting-started-05-server-and-client-components.mdx`
- `docs/nextjs/022-01-app-02-guides-authentication.mdx`
- `docs/nextjs/030-01-app-02-guides-data-security.mdx`
- `docs/nextjs/035-01-app-02-guides-forms.mdx`
- `docs/nextjs/061-01-app-02-guides-production-checklist.mdx`
- `docs/nextjs/074-01-app-02-guides-testing-index.mdx`
- `docs/nextjs/077-01-app-02-guides-testing-vitest.mdx`
- `docs/nextjs/091-01-app-03-api-reference-01-directives-use-server.mdx`
- `docs/nextjs/223-01-app-03-api-reference-05-config-01-next-config-js-transpilepackages.mdx`
- `docs/turbo/INDEX.md`
- `docs/turbo/17-crafting-your-repository-developing-applications.mdx`
- `docs/typescript/INDEX.md`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/053-detecting-classes-in-source-files.mdx`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/monorepo.mdx`
- `docs/shadcn-ui/overview/components-json.mdx`
- `docs/shadcn-ui/forms/next.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx`
- `docs/nezumi-ui/011-nezumi-ui-monorepo-architecture.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`
- `docs/nezumi-ui/017-nezumi-ui-forms-inputs.mdx`
- `docs/nezumi-ui/018-nezumi-ui-composition.mdx`
- `docs/nezumi-ui/020-nezumi-ui-repository-file-tree.mdx`

## Gelesene externe Quellen

Keine. Die lokalen Projekt- und Vendor-Spiegel klaeren die Aufgabe ausreichend.

## Abgeleiteter Soll-Zustand

`apps/members` soll eine deploybare, geschuetzte Next.js-16-App fuer angemeldete Nutzer werden. Die App konsumiert `@nezumi/ui` ueber oeffentliche Subpath-Exports, laesst Business-/Auth-Entscheidungen lokal oder in dedizierten Shared-Paketen, und importiert nicht aus anderen Apps.

Server Components bleiben Standard fuer datengetriebene Seiten. Client Components werden auf interaktive Inseln wie Form Controls, Tabs, Menues oder optimistische UI begrenzt. Zugriffsschutz darf nicht nur ueber Layout-UI erfolgen; Server Actions und serverseitige Datenzugriffe muessen Autorisierung selbst pruefen.

## Analysierte Dateien

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `apps/playground/package.json`
- `apps/playground/next.config.ts`
- `apps/playground/app/globals.css`
- `packages/ui/package.json`
- `packages/ui/components.json`
- `packages/ui/src/components/button.tsx`
- `packages/ui/src/layout/index.ts`
- `packages/ui/src/lib/utils.ts`

## Empfohlener Zielbaum

```text
apps/members/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── (account)/
├── components/
│   ├── account-nav.tsx
│   └── member-shell.tsx
├── lib/
│   ├── auth/
│   ├── data/
│   ├── server/
│   └── validation/
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Setup-Checklist

- [ ] `package.json` mit `name: "members"`, `private: true`, Scripts `dev`, `build`, `start`, `typecheck` und Dependencies analog `apps/playground` anlegen.
- [ ] Festen Entwicklungsport setzen, z. B. `next dev --turbopack -p 3001`.
- [ ] `next.config.ts` mit `transpilePackages: ["@nezumi/ui"]` anlegen.
- [ ] `postcss.config.mjs` mit `@tailwindcss/postcss` anlegen.
- [ ] `app/globals.css` mit Tailwind-v4-Import, `@source` fuer `packages/ui/src`, optional `packages/ui/dist`, `@source "../**/*.{ts,tsx,mdx,css}"` fuer nur diese App (nicht `../../**/*` ueber `apps/`), und `@nezumi/ui`-Tokenimport anlegen.
- [ ] `tsconfig.json` mit `strict`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, Next-Plugin und lokalem Alias nur fuer App-Code anlegen.
- [ ] `app/layout.tsx` als Server Component behalten und nur shell-weite, nicht-sensitive UI dort platzieren.
- [ ] Geschuetzte Route Groups wie `app/(account)/...` nutzen; nicht-routable Hilfsdateien in `_components`, `_lib` oder App-Root-`components/` colocaten.
- [ ] `loading.tsx`, `error.tsx` und leere/fehlende Zustandsoberflaechen frueh vorsehen, da Members-Flows stark datenabhaengig sind.
- [ ] Server Actions und Datenzugriffe mit eigener Auth-/Authorization-Pruefung planen; nicht auf Proxy, Layout oder Client-State allein verlassen.
- [ ] `lib/data/*` als server-only Data Access Layer planen; keine rohen User-, Membership-, Billing- oder Entitlement-Records an Client Components weiterreichen.
- [ ] Explizite DTOs fuer Client-Grenzen definieren; nur minimale, freigegebene Felder serialisieren.
- [ ] Formulare mit Server Actions oder einem bewusst gewaehlten Form-Stack aufbauen; Validierung serverseitig absichern.
- [ ] Forms mit `useActionState`, serverseitiger Validierung und Field-/FieldGroup-Pattern planen; Fehlerzustand ueber `aria-invalid` und `data-invalid` ausdruecken.
- [ ] Member-Domaenenbereiche schneiden: Account/Profile, Membership/Plan, Billing/Documents, Support/Requests, Notifications/Preferences, Consent/Privacy.
- [ ] `components.json` fuer shadcn-CLI-Nutzung anlegen und mit `packages/ui/components.json` bei `style`, `iconLibrary`, `baseColor` synchron halten.
- [ ] Keine Imports aus `homepage`, `operations` oder `playground`; geteilte UI/Logik ueber `packages/*`.
- [ ] Teststrategie festlegen: Unit-/Component-Tests fuer Validierung und synchrone UI; E2E fuer Login-Gate, Dashboard, Profilmutation und sensitive Dokumentzugriffe.
- [ ] Member-spezifische Env Vars in Turbo-Hashing und Deployment-Umgebung beruecksichtigen; Secrets nie mit `NEXT_PUBLIC_` exponieren.
- [ ] Production-Gates definieren: `pnpm --filter @nezumi/ui build`, `pnpm --filter members typecheck`, `pnpm --filter members build`.

## Findings nach Schweregrad

### High

- `apps/members` ist aktuell nur ein Zielordner ohne App-Manifest und ohne Next-Struktur. Dadurch ist es kein ausfuehrbares Workspace-Paket und wird von Turbo nicht als App mit eigenen Tasks behandelt.

### Medium

- Fuer einen geschuetzten Mitgliederbereich fehlt ein explizites Auth-/Authorization-Zielbild. Next.js-Produktionsdoku fordert, Autorisierung in Server Actions und serverseitigen Zugriffen zu pruefen; Layout- oder Proxy-Schutz allein reicht als Enterprise-Standard nicht.
- Es gibt noch keine Member-spezifische Data Access Layer und keine DTO-Kontrakte. Fuer ein Portal mit personenbezogenen Daten ist das vor Feature-Implementierung ein Architektur-Blocker.
- Die UI-Package exportiert aktuell nur wenige oeffentliche Leaves (`button`, `layout`, `lib/utils`, CSS). Members-spezifische UI darf deshalb nicht direkt aus internen Atomic-Ordnern importieren, sondern braucht entweder lokale Kompositionen oder neue oeffentliche UI-Exports.

### Low

- Ein `components.json` ist fuer Runtime nicht erforderlich, aber fuer shadcn-CLI-Workflows im Monorepo empfohlen/erforderlich. Ohne diese Datei werden spaetere CLI-Adds wahrscheinlich falsche Zielpfade oder Aliase erzeugen.

## Konkrete Empfehlungen

- Members zuerst als Shell mit Auth-Grenzen, Loading/Error States und sauberer Datenzugriffskonvention anlegen; erst danach fachliche Screens ausbauen.
- Strikte App-Isolation beibehalten: alles Wiederverwendbare entweder nach `packages/ui` oder in ein spaeteres Domain-Package, nicht zwischen Apps kopieren.
- Client Components auf Bedienoberflaechen begrenzen; Seiten, Layouts und Datenladen bleiben Server-first.

## Offene Fragen / Restrisiken

- Welcher Auth-Anbieter und welches Session-Modell sollen verwendet werden?
- Welche Datenquelle ist verbindlich, und gibt es Row-Level- oder rollenbasierte Autorisierung?
- Braucht `members` eigene Domain/Subdomain, eigene Env-Variablen und eigene Observability-Signale?
- Welche Compliance-Anforderungen gelten fuer PII, Billing-Dokumente, Export und Loeschung?

## Vorgeschlagene naechste Schritte

1. `apps/members` technisch scaffolden.
2. Auth-/Authorization-Entscheidung dokumentieren, bevor geschuetzte Datenfluesse implementiert werden.
3. DAL-/DTO-Kontrakte fuer die ersten Member-Flows festlegen.
4. Erste Build-/Typecheck-Pipeline mit `pnpm --filter members build` absichern.
