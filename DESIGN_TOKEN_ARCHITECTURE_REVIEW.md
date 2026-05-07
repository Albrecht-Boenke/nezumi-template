# DESIGN.md Token Architecture Review

## Aufgabenstellung

Untersucht wurde `DESIGN.md` als Target-App-Tokenquelle fuer das Projekt. Ziel war:

- Architektur, Token-System und Nutzung gegen lokale Projekt- und Vendor-Dokumentation pruefen.
- "Mist" in `DESIGN.md` von sinnvollen Token-Kandidaten trennen.
- Eine konkrete, priorisierte Checkliste erstellen, wie die sinnvollsten Tokens uebernommen werden koennen.
- Subagents zur Parallelisierung nutzen.

Es wurden keine Produktcode-Aenderungen vorgenommen. Die Analyse empfiehlt zunaechst gezielte Architekturkorrekturen; direkte Token-Implementierung ohne diese Korrekturen wuerde voraussichtlich Drift vergroessern.

## Gelesene lokale Dokumentation

- `AGENTS.md`
- `DESIGN.md`
- `docs/tailwind-css/INDEX.md`
- `docs/tailwind-css/172-theme.mdx`
- `docs/shadcn-ui/INDEX.md`
- `docs/shadcn-ui/overview/theming.mdx`
- `docs/shadcn-ui/overview/tailwind-v4.mdx`
- `docs/shadcn-ui/overview/monorepo.mdx`
- `docs/nezumi-ui/INDEX.md`
- `docs/nezumi-ui/002-nezumi-ui-architecture-overview.mdx`
- `docs/nezumi-ui/004-nezumi-ui-public-api.mdx`
- `docs/nezumi-ui/005-nezumi-ui-foundation.mdx`
- `docs/nezumi-ui/010-nezumi-ui-design-tokens-tailwind-v4.mdx`
- `docs/nezumi-ui/013-nezumi-ui-customization-theming.mdx`
- `docs/nezumi-ui/015-nezumi-ui-styling.mdx`

Subagents haben zusaetzlich relevante Ausschnitte aus `docs/tailwind-css/047-colors.mdx`, `002-adding-custom-styles.mdx`, `052-dark-mode.mdx`, `053-detecting-classes-in-source-files.mdx`, `084-functions-and-directives.mdx`, `docs/shadcn-ui/overview/components-json.mdx`, `docs/nezumi-ui/001`, `011` gelesen.

## Gelesene externe Quellen

Keine. Die lokale Vendor- und Projektdokumentation war fuer diese Review-Frage ausreichend. Die lokalen Indizes referenzieren `FRAMEWORK_VERSION_REFERENCES.md`; diese Datei war im Checkout nicht auffindbar.

## Abgeleiteter SOLL-Zustand

Der SOLL-Zustand ist ein CSS-first Tailwind-v4-System mit drei klaren Token-Layern:

1. Primitive Tokens in `packages/ui/src/styles/tokens/*`.
   Beispiel: `--color-nezumi-*` als `@theme`-Tokens, gespeist aus den Hexwerten in `DESIGN.md`.
2. Semantic Tokens in `packages/ui/src/styles/semantic/*`.
   Beispiel: `--color-brand`, `--color-text`, `--color-surface`, `--color-border`, Status- und Focus-Tokens.
3. Component Tokens in `packages/ui/src/styles/components/*`.
   Beispiel: `--button-radius`, `--card-padding`, `--input-radius`; diese referenzieren semantische oder primitive Tokens bewusst und konsistent.

Tailwind-v4-Tokens gehoeren in `@theme`, wenn daraus Utilities entstehen sollen. App-Code soll semantische Utilities verwenden, etwa `bg-surface`, `text-text`, `border-border`, `bg-success-bg`. Primitive Farben wie `bg-nezumi-sabi` bleiben Ausnahmefaelle. Es soll keine parallelen TypeScript-Tokenobjekte als zweite Source of Truth geben.

shadcn-Kompatibilitaet verlangt entweder die Standard-Semantik (`background`, `foreground`, `primary`, `muted`, `card`, `popover`, `input`, `ring`) als Alias-Layer oder eine explizit dokumentierte Fork-Entscheidung. Ohne diese Entscheidung bleibt der `components.json`-Kontrakt unklar.

Dark Mode soll class-basiert ueber `.dark` laufen. Komponenten sollten keine verstreuten manuellen `dark:*` Farbueberschreibungen benoetigen, wenn semantische Tokens korrekt greifen.

## Analysierte Dateien

- `packages/ui/src/styles/design-tokens.css`
- `packages/ui/src/styles/tokens/colors.css`
- `packages/ui/src/styles/tokens/spacing.css`
- `packages/ui/src/styles/tokens/typography.css`
- `packages/ui/src/styles/tokens/radius.css`
- `packages/ui/src/styles/tokens/shadows.css`
- `packages/ui/src/styles/tokens/motion.css`
- `packages/ui/src/styles/semantic/colors.css`
- `packages/ui/src/styles/semantic/spacing.css`
- `packages/ui/src/styles/components/button.css`
- `packages/ui/src/styles/components/card.css`
- `packages/ui/src/styles/components/input.css`
- `packages/ui/src/atoms/Button/Button.tsx`
- `packages/ui/src/atoms/Card/card.tsx`
- `packages/ui/src/layout/types.ts`
- `packages/ui/src/layout/utils.ts`
- `packages/ui/package.json`
- `packages/ui/components.json`
- `packages/ui/tsup.config.ts`
- `apps/*/app/globals.css`
- relevante App-TSX-Dateien in `apps/homepage`, `apps/members`, `apps/operations`, `apps/playground`

## Findings nach Schweregrad

### Hoch: Spacing-Scale ist architektonisch unklar

Datei: `packages/ui/src/styles/tokens/spacing.css:1-17`

Der Code setzt `--spacing: initial`, definiert aber gleichzeitig einzelne `--spacing-*` Tokens. Die lokale Tailwind-Doku zeigt fuer Custom Themes einen gueltigen Basiswert wie `--spacing: 4px` und nutzt `--*: initial` fuer vollstaendige Custom Themes. Das aktuelle Modell kann funktionieren, wenn alle genutzten Utilities explizit ueber `--spacing-*` abgedeckt sind, ist aber nicht sauber dokumentiert und riskant fuer numerische Utilities wie `p-*`, `gap-*`, `h-*`.

Auswirkung: Layout- und Button-Klassen wie `gap-8`, `h-40`, `px-16` koennen bei Tailwind-Generierung oder spaeteren Erweiterungen inkonsistent werden.

Empfehlung: Spacing-Strategie entscheiden und testen:

- Variante A: Tailwind-Basis `--spacing: 0.25rem` oder `4px` setzen und numerische Utilities bewusst auf dieser Basis nutzen.
- Variante B: rein benannte Scale mit vollstaendig statisch generierten `--spacing-*` Tokens dokumentieren und per CSS-Build pruefen.

### Hoch: App-Dark-Mode-Aktivierung ist unvollstaendig

Dateien:

- `packages/ui/src/styles/design-tokens.css:16-60`
- `apps/*/app/globals.css:1-8`

Dark-Overrides existieren in `.dark`, und Tailwind-`dark:` ist inzwischen class-basiert ueber `@custom-variant dark (&:where(.dark, .dark *))` angebunden. In den untersuchten App-Layouts bleibt aber offen, welche Stelle `.dark` setzt oder einen Theme-Provider einbindet.

Auswirkung: Semantische Dark-Tokens greifen nur, wenn `.dark` tatsaechlich gesetzt wird.

Empfehlung: App-seitig eine Root-Klassenstrategie dokumentieren oder implementieren, z. B. Provider oder serverseitige Root-Klasse.

### Mittel: Component Tokens werden nicht konsequent konsumiert

Dateien:

- `packages/ui/src/styles/components/button.css:2-6`
- `packages/ui/src/atoms/Button/Button.tsx:17-20`
- `packages/ui/src/styles/components/input.css:1-7`

Button-Component-Tokens wie `--button-radius`, `--button-padding-x`, `--button-font-size` existieren, werden in `Button.tsx` aber nicht genutzt. Stattdessen stehen Klassen wie `rounded-md`, `text-sm`, `h-40`, `px-16` direkt in CVA.

Auswirkung: Component Layer ist teilweise dekorativ statt steuernd. Aenderungen in `components/button.css` beeinflussen den Button nur begrenzt.

Empfehlung: Component Tokens entweder entfernen, wenn CVA die SSOT sein soll, oder Button/Input/Card konsequent auf `rounded-[--button-radius]`, `px-[--button-padding-x]`, `text-[length:var(--button-font-size)]` bzw. stabile Tailwind-tokenisierte Klassen umstellen.

### Mittel: Public API und shadcn Monorepo-Aliase passen nicht zusammen

Dateien:

- `packages/ui/package.json:16-40`
- `packages/ui/tsup.config.ts:4-8`
- `packages/ui/components.json:13-18`
- `apps/*/components.json`

Die `components.json`-Aliase zeigen auf `@nezumi/ui/components`, aber `package.json` exportiert weder `./components` noch `./components/*`, sondern aktuell nur `./components/button`.

Auswirkung: Granulare Imports wie `@nezumi/ui/components/button` funktionieren fuer Button, aber shadcn-CLI-/Registry-Flows koennen Pfade erzeugen, die nicht exportiert sind.

Empfehlung: Entweder jeden public leaf konsequent in `exports` und `tsup` ergaenzen oder einen bewusst gewaehlten `./components/*`-Exportkontrakt schaffen.

### Mittel: Layout-API widerspricht DESIGN.md-Regeln

Dateien:

- `DESIGN.md:12-32`
- `packages/ui/src/layout/types.ts:20-27`
- `packages/ui/src/layout/index.ts`
- `packages/ui/src/layout/Container.tsx`
- `packages/ui/src/layout/Stack.tsx`

`DESIGN.md` sagt: keine `Container`, keine `Stack`/`HStack`/`VStack`, Produktbreakpoints nur `md` und `lg`. Der Code exportiert `Container` und `Stack`, und `ResponsiveValue` erlaubt `sm`, `xl`, `2xl`.

Auswirkung: App-Code kann gegen die Target-App-Regeln bauen, obwohl die UI-Library diese Regeln eigentlich erzwingen sollte.

Empfehlung: `DESIGN.md` hier nicht als Tokenquelle behandeln, sondern als Governance- und API-Regel. Entscheiden, ob `Container`/`Stack` deprecated werden, und Responsive API auf `initial | md | lg` fuer Service-Mode-Komponenten begrenzen.

### Mittel: Typografie aus DESIGN.md ist noch nicht umgesetzt

Dateien:

- `DESIGN.md:132-174`
- `packages/ui/src/styles/tokens/typography.css:1-29`
- `packages/ui/src/styles/design-tokens.css:84-131`

`DESIGN.md` definiert Urbanist, erlaubte Weights, Brand-Mode Fluid Roles und Service-Mode Fixed Roles. Der Code nutzt generische Tailwind-Skala (`--text-xs` bis `--text-5xl`), Systemfont im Body und globale `h1`-`h6` Styles.

Auswirkung: Die zentrale visuelle Differenzierung zwischen Brand Mode und Service Mode ist noch nicht im Token-System abgebildet.

Empfehlung: Typografie als Role Tokens uebernehmen, aber nicht blind alle Rollen als App-Utilities erzwingen. Zuerst `Typography`-Primitive/API definieren, dann Rollen wie `title-large`, `body-medium`, `label-small` darauf mappen.

### Niedrig: OpenGraph-Image nutzt rohe, nicht-Nezumi Hexwerte

Datei: `apps/homepage/app/opengraph-image.tsx:18-19`

Die OG-Route nutzt `#0f172a`, `#1e3a5f`, `#2563eb`, `#f8fafc`. Das ist vermutlich eine route-lokale Marketing-Ausnahme, aber nicht dokumentiert und nicht aus der Nezumi-Palette.

Auswirkung: Brand Assets koennen visuell vom Token-System driften.

Empfehlung: Entweder als Homepage/OG-Ausnahme dokumentieren oder auf DESIGN.md-Farbwerte zurueckfuehren.

## DESIGN.md: Was uebernehmen, was aussortieren?

### Bereits sinnvoll uebernommen

- Farbprimitive `--color-nezumi-*` aus DESIGN.md Abschnitt 2.
- Semantische Farben wie `brand`, `text`, `surface`, `border`, `success`, `warning`, `error`, `info`.
- On-Color-Semantik fuer `secondary` und `error`.
- shadcn-Kompatibilitaetsaliase fuer Background, Foreground, Primary, Secondary, Muted, Card, Popover, Input und Destructive.
- Button-Varianten aus DESIGN.md: `default`, `tonal`, `outline`, `ghost`, `elevated`, `destructive`, `link`; bestehende `primary`/`secondary` bleiben als kompatible Aliase erhalten.
- Status-Background-Mixes.
- Focus-Tokens.
- Motion-Basisskala.
- Shadow-Basisskala, allerdings unter Tailwind-kompatiblen `--shadow-*` Namen statt `--elevation-shadow-*`.

### Sinnvoll als naechste Tokens uebernehmen

- Optionale On-Color-Semantik fuer Status-Flaechen:
  - `--color-on-success`
  - `--color-on-warning`
  - `--color-on-info`
- Service-Mode Typography Role Tokens:
  - `title-large`, `title-medium`, `title-small`
  - `body-large`, `body-medium`, `body-small`
  - `label-large`, `label-medium`, `label-small`
- Component tokens, wenn sie unmittelbar Komponenten treiben:
  - Button radius, heights, padding, font role.
  - Input height, radius, padding, typography.
  - Card radius, border, padding, shadow.
  - Paper surface, padding, gap, variants, sobald `Paper` existiert.
- Control density:
  - compact `36px`
  - comfortable `44px`
  - relaxed `52px`
- Fehlende spacing scale Werte aus DESIGN.md:
  - `80`, `112`, `128`, falls sie in Page/Layout Tokens wirklich genutzt werden.

### Nur route-lokal oder komponentenlokal halten

- Header-/Navigation-Chrome-Werte wie `--layout-header-height-*`, `--layout-mobile-nav-height`, `--layout-hamburger-button`.
- Legal/container Max-Widths, wenn sie nur fuer einzelne Routen gelten.
- Homepage Exception Family: asymmetry, cinematic scrims, image offsets, expressive motion.
- OG-Image-spezifische Komposition, falls bewusst abweichend.

### Aussortieren oder nicht parallel einfuehren

- `--shape-radius-*` als zweite Radius-Namenswelt neben Tailwind `--radius-*`.
  Besser: DESIGN-Werte auf `--radius-*` und Component Tokens mappen.
- `--elevation-shadow-*` als zweite Shadow-Namenswelt neben `--shadow-*`.
  Besser: `--shadow-*` als Primitive behalten und Component Tokens wie `--card-shadow`, `--popover-shadow` nutzen.
- Do/Don't-Regeln als Tokens. Diese gehoeren in Linting, Architekturtests, Review-Regeln oder Dokumentation.
- Layout-Kompositionsregeln wie `AppShell -> PageLayout -> Section` als Token. Das ist Komponenten-/Routing-Architektur, kein Design Token.

## Konkrete Verbesserungs-Checkliste

### Phase 1: Token-Vertrag stabilisieren

- [x] Entscheidung dokumentieren: Nezumi-Semantik plus shadcn-Alias-Layer oder bewusster shadcn-Fork.
- [x] `@custom-variant dark (&:where(.dark, .dark *))` im CSS-Entrypoint ergaenzen.
- [ ] App-Dark-Mode-Strategie festlegen: Provider oder serverseitige Root-Klasse.
- [ ] Spacing-Modell festlegen und mit CSS-Build nachweisen: `--spacing` Basiswert vs. explizite `--spacing-*` Scale.
- [x] `components/card.css` von semantischen `--space-*` Duplikaten befreien.

### Phase 2: Sichere Token-Uebernahme aus DESIGN.md

- [x] `--color-on-secondary` und `--color-on-error` definieren, Light und Dark pruefen.
- [x] shadcn-Alias-Tokens auf Nezumi-Semantik mappen, falls Kompatibilitaet gewuenscht ist.
- [ ] fehlende Spacing-Werte `--spacing-80`, `--spacing-112`, `--spacing-128` nur aufnehmen, wenn Page/Layout-Tokens sie nutzen.
- [ ] Radiuswerte mit DESIGN.md abgleichen: `xs=2px`, `sm=4px`, `md=8px`, `lg=12px`, `xl=16px`, `2xl=24px`; dabei Tailwind `--radius-*` als einzige Primitive-Namenswelt behalten.
- [ ] Shadowwerte unter `--shadow-*` behalten; keine parallelen `--elevation-shadow-*` einfuehren.

### Phase 3: Komponenten an Tokens anbinden

- [x] Button-Varianten mit DESIGN.md abgleichen: `default/tonal/outline/ghost/elevated/destructive/link`.
- [x] Button-On-Colors korrigieren: `tonal` nicht `text-text`, `destructive` nicht `text-on-brand`.
- [ ] Button-Component-Tokens tatsaechlich konsumieren oder entfernen.
- [ ] Card-Token-Verwendung pruefen: arbitrary variable utilities bewusst halten oder auf stabilere CSS-/class patterns umstellen.
- [ ] Input-Komponente/Primitive gegen `input.css` Tokens implementieren oder nicht genutzte Tokens entfernen.
- [ ] `Paper` als Default-Surface primitive planen, bevor Paper-Tokens global ausgebaut werden.

### Phase 4: Typografie und App-Grammatik

- [ ] Urbanist-Font-Strategie festlegen: Font import, fallback, CSS variable.
- [ ] Service-Mode Typografie-Rollen als Tokens und `Typography` Varianten einfuehren.
- [ ] Brand-Mode Fluid Typography route-lokal fuer Homepage halten, nicht in Service-Mode-Komponenten leaken.
- [ ] App-Code auf direkte `h1`, `p`, `span` Verwendung pruefen, wenn DESIGN.md wirklich `Typography` erzwingen soll.

### Phase 5: Layout-Governance

- [ ] Entscheiden, ob `Container` und `Stack` deprecated/entfernt werden oder DESIGN.md angepasst wird.
- [ ] `ResponsiveValue` fuer Service-Mode auf `initial | md | lg` begrenzen oder Homepage-Ausnahmen separat modellieren.
- [ ] Dynamisch gebaute Tailwind-Klassen in Layout-Helpers durch statische Maps ersetzen.
- [ ] Grid-System 4/8/12 als statische API oder dokumentierte Utility-Regel festlegen.

### Phase 6: Verifikation und Guardrails

- [ ] CSS-Build pro App pruefen und stichprobenartig generierte Klassen kontrollieren: `p-16`, `h-40`, `bg-surface`, `text-on-error`, shadcn-Aliase.
- [ ] Typecheck fuer `@nezumi/ui` und Apps ausfuehren.
- [ ] Token-Compliance-Scan fuer Raw Hex, Tailwind Default Palette und arbitrary values einfuehren.
- [ ] shadcn `add --dry-run --diff` Workflow gegen Alias-/Export-Kontrakt pruefen.
- [ ] Dokumentation angleichen: `@nezumi/ui/globals.css` vs. `@nezumi/ui/design-tokens.css` als eindeutiger App-Standard.

## Offene Fragen und Restrisiken

- Soll das Projekt shadcn-Standardsemantik voll kompatibel halten, oder ist Nezumi-Semantik ein bewusster Fork?
- Soll `DESIGN.md` fuer Layout-Regeln normative API-Grenze sein? Dann muessen `Container`, `Stack`, `sm`, `xl`, `2xl` aus der Service-Mode-API raus oder deprecated werden.
- Ist Urbanist bereits ueber App-Font-Setup geplant? Im geprueften CSS ist sie noch nicht Body-Default.
- Sollen Homepage- und OG-Ausnahmen explizit route-local dokumentiert werden?
- Der Arbeitsbaum enthielt vor bzw. waehrend der Analyse bereits andere geaenderte Dateien; diese wurden nicht veraendert und nicht bewertet als meine Aenderungen.

## Vorgeschlagene naechste Schritte

1. Phase 1 als kleine Architekturkorrektur umsetzen.
2. Danach die sicheren Farb-Alias- und On-Color-Tokens aus Phase 2 implementieren.
3. Erst danach Button/Input/Card/Paper refactoren, damit Component Tokens nicht nur dekorative CSS-Variablen bleiben.
4. Zum Schluss Typografie/Layout-Governance mit Tests oder statischen Maps absichern.
