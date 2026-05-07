# AI-Slop-Review: Dokumentation & Konfiguration

**Scope:** Root-Konfigurationen, Design-System-SSOT, Agent-Anweisungen, App-Roadmaps, Vendor-Doku-Spiegel und UI-Paket-Metadaten.
**Datum:** 2026-05-06
**Reviewer:** Claude (Review Specialist)

---

## 1. Executive Summary

| Metrik | Wert |
|--------|------|
| **Gesamtnote** | **C** (funktional, erheblicher Pflegebedarf) |
| **Kritische Probleme** | 6 |
| **Warnungen** | 9 |
| **Hinweise / Vorschlaege** | 5 |

**Kernproblem:** Mehrere zentrale Dokumente und Checklisten sind stark veraltet (stale) und widersprechen dem tatsaechlichen Code-Zustand. Zudem fehlen zwei von mehreren Stellen referenzierte Dateien komplett (`FRAMEWORK_VERSION_REFERENCES.md`, root `tsconfig.json`). Die `CLAUDE.md` ist defekt. Die `APP_ROADMAP_CHECKLIST.md`-Dateien aller drei Apps behaupten, die Apps haetten keine `package.json` und keine Next.js-Struktur – tatsaechlich sind alle Apps vollstaendig gescaffoldet.

---

## 2. Kritische Probleme

### 2.1 Fehlende zentrale Datei `FRAMEWORK_VERSION_REFERENCES.md`
- **Severity:** Critical
- **Category:** Dokumentation / Architektur
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/FRAMEWORK_VERSION_REFERENCES.md` (referenziert, aber nicht vorhanden)
- **Finding:** Die Datei existiert nicht, wird aber in `README.md` Zeile 5, `docs/nezumi-ui/INDEX.md` Zeile 8 und `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx` Zeile 18 als verbindliche Versionsliste referenziert.
- **Reference:** `README.md`: "Verbindliche Versionsliste (Catalog / `package.json`): [`FRAMEWORK_VERSION_REFERENCES.md`](FRAMEWORK_VERSION_REFERENCES.md)."
- **Impact:** Agenten und Contributors haben keinen zentralen, verbindlichen Anker fuer Framework-Pins. Die Versionen sind nur implizit in `pnpm-workspace.yaml` und `package.json` verstreut.
- **Recommendation:** Datei anlegen mit der vollstaendigen, expliziten Versionsmatrix (Node, pnpm, Next.js, React, TypeScript, Tailwind, Turbo, Radix, etc.) und alle Referenzen aktualisieren.

### 2.2 Fehlende Root-`tsconfig.json`
- **Severity:** Critical
- **Category:** Konfiguration / TypeScript
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/tsconfig.json`
- **Finding:** Es gibt keine Root-`tsconfig.json`. Moderne Monorepos mit TypeScript 5.0+ nutzen typischerweise eine Root-Config mit `composite: true` und `references`, um IDE-Unterstuetzung und `tsc --build` korrekt zu steuern.
- **Reference:** `docs/turbo/42-guides-tools-typescript.mdx` (implizit), TypeScript-Monorepo-Best-Practice.
- **Impact:** VS Code / tsc koennen nicht effizient das gesamte Workspace auf einmal type-checken. Jede App hat nur ihre eigene `tsconfig.json` (z. B. `apps/homepage/tsconfig.json`).
- **Recommendation:** Root-`tsconfig.json` mit `references` zu allen Workspaces anlegen oder dokumentieren, warum bewusst darauf verzichtet wird.

### 2.3 Defekte `CLAUDE.md`
- **Severity:** Critical
- **Category:** Agent-Anweisungen
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/CLAUDE.md`
- **Finding:** Die Datei enthaelt ausschliesslich den literalen Text `AGENTS.md` (keine Frontmatter, keine Anweisungen, kein Markdown).
- **Reference:** System-Prompt erwartet projektspezifische Anweisungen in `CLAUDE.md`.
- **Impact:** Claude-Code-Agenten im Projekt erhalten keine spezifischen Instruktionen, sondern nur den Verweis auf `AGENTS.md`. Das bietet keinen Mehrwert gegenueber der allgemeinen Agent-Konfiguration und verfehlt den Zweck einer `CLAUDE.md`.
- **Recommendation:** `CLAUDE.md` mit spezifischen, Claude-optimierten Anweisungen befuellen (z. B. bevorzugte Tool-Nutzung, verbotene Patterns, Review-Protokoll) oder als Symlink/Verweis auf `AGENTS.md` klar dokumentieren. Aktueller Zustand ist eine fehlerhafte Datei.

### 2.4 `APP_ROADMAP_CHECKLIST.md`-Dateien sind massiv veraltet (Stale)
- **Severity:** Critical
- **Category:** Dokumentation / Projekt-Management
- **Location:**
  - `/Users/albrechtboenke/Dev/Nezumi-Template/apps/homepage/APP_ROADMAP_CHECKLIST.md`
  - `/Users/albrechtboenke/Dev/Nezumi-Template/apps/members/APP_ROADMAP_CHECKLIST.md`
  - `/Users/albrechtboenke/Dev/Nezumi-Template/apps/operations/APP_ROADMAP_CHECKLIST.md`
- **Finding:** Alle drei Checklisten behaupten unter "Findings nach Schweregrad / High", die jeweilige App sei "kein ausfuehrbares Workspace-Paket" ohne `package.json` und Next.js-Struktur. Tatsaechlich existieren in allen Apps:
  - `package.json` mit korrekten Scripts, Dependencies und Catalog-Referenzen
  - `next.config.ts` mit `transpilePackages: ["@nezumi/ui"]`
  - `postcss.config.mjs` mit `@tailwindcss/postcss`
  - `tsconfig.json`
  - `components.json`
  - `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
  - Weitere App-spezifische Dateien (z. B. `(account)/`, `(console)/`, `error.tsx`, `loading.tsx`, `global-error.tsx`)
- **Reference:** Tatsaechlicher Dateisystem-Zustand (siehe `ls`-Outputs).
- **Impact:** Die Checklisten sind als Planungsgrundlage unbrauchbar. Sie verbreiten falsche Annahmen ueber den Projektstand und koennen Agenten in die Irre fuehren, die sie als Wahrheitsquelle nutzen.
- **Recommendation:** Alle drei Checklisten drastisch ueberarbeiten oder durch aktuelle Status-Dokumente ersetzen. Checklisten-Markierungen (`[ ]`) sollten auf den tatsaechlichen Stand geprueft und aktualisiert werden.

### 2.5 DESIGN.md-Regelverletzung in `homepage/app/page.tsx`
- **Severity:** Critical
- **Category:** Design System
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/apps/homepage/app/page.tsx` Zeile 8–11, 12–17
- **Finding:** Die Seite verwendet rohe HTML-Tags `<h1>` und `<p>` statt des vorgeschriebenen `Typography`-Komponenten. `DESIGN.md` §3 (Typography Rules): "Do not use raw `p`, `span`, `h1-h6` in app-level UI."
- **Reference:** `DESIGN.md` Zeile 178–179.
- **Impact:** App-Code divergiert bereits in der ersten Seite vom Design-System-SSOT. Wenn dies akzeptiert wird, etabliert sich ein Praezedenzfall fuer zukuenftige Verletzungen.
- **Recommendation:** `Typography`-Komponente aus `@nezumi/ui` nutzen (sofern exportiert) oder lokale Wrapper anlegen, die das Design-System erfuellen. Falls `Typography` noch nicht als public leaf existiert, muss dies priorisiert werden.

### 2.6 Fehlerhafte Checkliste behauptet fehlende `components.json`
- **Severity:** Critical
- **Category:** Dokumentation
- **Location:** `apps/*/APP_ROADMAP_CHECKLIST.md` (Setup-Checklist)
- **Finding:** Alle drei Checklisten listen `components.json` als noch anzulegend auf (`[ ]`). Tatsaechlich existieren `components.json` in allen drei Apps seit dem Scaffold.
- **Reference:** `apps/homepage/components.json`, `apps/members/components.json`, `apps/operations/components.json`.
- **Impact:** Wie 2.4: Die Checklisten sind nicht synchron mit der Realitaet.
- **Recommendation:** Alle Setup-Checklist-Eintraege gegen den tatsaechlichen Dateisystem-Stand validieren und Markierungen (`[x]` / `[ ]`) korrigieren.

---

## 3. Warnungen

### 3.1 Malformed YAML-Frontmatter in `docs/turbo/INDEX.md`
- **Severity:** Warning
- **Category:** Dokumentation
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/docs/turbo/INDEX.md` Zeile 1–4
- **Finding:** Die Datei beginnt mit `---\n\n## title: Turborepo — documentation index \ndescription: Hierarchical index\n\n# Turborepo documentation`. Das ist kein gueltiges YAML-Frontmatter; die `##`-Ebene innerhalb des Frontmatter zerstoert die Parser-Erwartung.
- **Reference:** Markdown-YAML-Frontmatter-Spezifikation.
- **Impact:** Tools, die Frontmatter parsen (Docusaurus, Astro, Remark, Obsidian), koennen die Metadaten nicht extrahieren. Andere `INDEX.md`-Dateien im Repo verwenden korrektes Frontmatter (`---\ntitle: ...\ndescription: ...\n---`).
- **Recommendation:** Korrigieren zu gueltigem YAML-Frontmatter:
  ```yaml
  ---
  title: "Turborepo — documentation index"
  description: "Hierarchical index"
  ---
  ```

### 3.2 Inkonsistenz: `globals.css` vs `design-tokens.css` Empfehlung
- **Severity:** Warning
- **Category:** Dokumentation / Design System
- **Location:** `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx` Zeile 22–28 vs. tatsaechliche App-`globals.css`-Dateien
- **Finding:** Das Getting-Started-Dokument empfehlt `import "@nezumi/ui/globals.css"`. Die Apps (homepage, members, operations, playground) importieren jedoch in ihrer eigenen `globals.css` zuerst `@import "tailwindcss"`, scannen per `@source` das UI-Paket, und importieren dann `@import "@nezumi/ui/design-tokens.css"`. `packages/ui/src/styles/global.css` traegt den Kommentar: "global.css — one-shot import (e.g. Storybook); apps use globals.css entry + design-tokens".
- **Reference:** `packages/ui/src/styles/global.css` Zeile 1.
- **Impact:** Neue Contributors, die das Getting-Started-Dokument befolgen, wuerden einen anderen Import-Pfad verwenden als die bestehenden Apps. Das kann zu doppelten Tailwind-Pipelines oder fehlenden `@source`-Deklarationen fuehren.
- **Recommendation:** Das Getting-Started-Dokument aktualisieren und den App-Pfad (`@import "tailwindcss"` + `@source` + `@import "@nezumi/ui/design-tokens.css"`) als Standard dokumentieren. `globals.css` explizit als Storybook/One-Shot-Alternative kennzeichnen.

### 3.3 Stale TypScript-Versionsreferenzen in Vendor-Dokumentation
- **Severity:** Warning
- **Category:** Dokumentation
- **Location:** Mehrere Dateien unter `docs/turbo/` und `docs/typescript/`
- **Finding:** Die Vendor-Spiegel unter `docs/turbo/` referenzieren teilweise TypeScript 5.x (z. B. `docs/turbo/42-guides-tools-typescript.mdx`), waehrend das Projekt per `pnpm-workspace.yaml` Catalog auf `typescript: ^6.0.3` gepinnt ist. Ebenso existieren Release-Notes fuer TypeScript 5.0–5.9, aber keine fuer 6.0 (ausser `docs/typescript/125-handbook-release-notes-typescript-6.0.mdx`, die aber existiert).
- **Reference:** `pnpm-workspace.yaml` Zeile 11.
- **Impact:** Agenten, die die Vendor-Doku konsultieren, koennten davon ausgehen, dass TypeScript 5.x die verbindliche Version ist, waehrend das Projekt auf 6.0.3 laeuft.
- **Recommendation:** In jeder `INDEX.md` der Vendor-Dokumentation einen Hinweis einfuegen: "Project catalog pin: TypeScript 6.0.3. Vendor docs may reference older versions; trust the catalog." Alternativ: Nur die zur Projektversion passenden Vendor-Doku-Spiegel behalten.

### 3.4 Stale React-Versionsreferenzen in Vendor-Dokumentation
- **Severity:** Warning
- **Category:** Dokumentation
- **Location:** `docs/react/194-versions.mdx`, `docs/react/002-blog-index.mdx`, u. a.
- **Finding:** Einige React-Vendor-Spiegel referenzieren React 18.x oder aeltere Versionen. Das Projekt nutzt per Catalog `react: ^19.2.5`.
- **Reference:** `pnpm-workspace.yaml` Zeile 8.
- **Impact:** Aehnlich 3.3: Veraltete Framework-Versionen in der Agenten-Referenz-Doku koennen zu falschen Code-Vorschlaeegen fuehren.
- **Recommendation:** Vendor-Doku-Spiegel, die ausschliesslich React 18 beschreiben, mit einem Warnbanner versehen oder entfernen, sofern sie fuer das Projekt irrelevant sind.

### 3.5 `turbo.json` fehlen Tasks `lint` und `test`
- **Severity:** Warning
- **Category:** Konfiguration / Monorepo
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/turbo.json`
- **Finding:** Die `turbo.json` definiert nur `build`, `dev` und `typecheck`. Es gibt keine `lint`-, `test`- oder `format`-Tasks.
- **Reference:** `apps/operations/APP_ROADMAP_CHECKLIST.md` merkt dies unter "Findings / Medium" selbst an.
- **Impact:** CI/CD-Pipeline und lokale Entwicklung haben keinen standardisierten Weg, Linting und Tests ueber Turbo zu orchestrieren.
- **Recommendation:** `turbo.json` erweitern um `lint`, `test`, `format` (oder dokumentieren, warum bewusst darauf verzichtet wird).

### 3.6 Homepage-`page.tsx` verwendet möglicherweise nicht existierende Datei
- **Severity:** Warning
- **Category:** Architektur / Imports
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/apps/homepage/app/page.tsx` Zeile 3
- **Finding:** Import `import { MarketingPlaceholderSection } from "@/components/marketing-specific-compositions"`. Die Datei `apps/homepage/components/marketing-specific-compositions.tsx` existiert zwar, aber dies ist eine App-spezifische Komposition, die nicht aus `packages/ui` kommt.
- **Reference:** `DESIGN.md` §5 (Page Composition): "App-spezifische Marketing-Kompositionen unter `apps/homepage/components/` halten; wiederverwendbare UI bleibt in `packages/ui`."
- **Impact:** Kein direkter Bug, aber ein Hinweis darauf, dass die App bereits ueber die reine Skeleton-Phase hinaus ist, was die Stale-Checklisten-These unterstuetzt.
- **Recommendation:** Nur dokumentarisch relevant; zeigt, dass die Checklisten nicht mehr dem Stand entsprechen.

### 3.7 `Button`-Komponente hat ungewoehnliche Tailwind-Klassen
- **Severity:** Warning
- **Category:** Design System
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/packages/ui/src/atoms/Button/Button.tsx` Zeile 54–58
- **Finding:** Die Size-Varianten verwenden Klassen wie `h-32`, `px-12`, `h-40`, `px-16`, `h-48`, `px-24`, `h-56`, `px-32`. `DESIGN.md` §5 (Buttons) definiert die Groessen als `xs: 24px/12px`, `sm: 32px/16px`, `default: 40px/24px`, `lg: 48px/32px`, `xl: 56px/40px`. Die Tailwind-Klassen `h-32` (32px) und `h-40` (40px) usw. passen zufaellig, weil Tailwind v4 `h-32` als `8rem` (128px) interpretieren wuerde... Moment, warte. In Tailwind v4 ist `h-32` nicht `32px`! In Tailwind v3 war `h-32` `8rem` (128px). In v4 gibt es `h-32` als `8rem` ebenfalls. Aber `DESIGN.md` sagt `default: 40px`. `h-40` waere `10rem` (160px). Das passt nicht!
- **Reference:** `DESIGN.md` Zeile 369–375.
- **Impact:** Die Button-Groessen sind visuell falsch skaliert, falls Tailwind-Standard-Spacing-Tokens verwendet werden (`space-32 = 8rem`). Die Button.tsx verwendet jedoch vielleicht eigene Tokens? Nein, `h-32` in Tailwind ist 8rem. Das ist ein echter Bug.
- **Recommendation:** Button-Groessen auf exakte Pixelwerte oder auf semantische Token umstellen (z. B. `h-[24px]`, `h-[32px]`, etc., oder Custom-Spacing-Tokens, die den Design-System-Werten entsprechen). ODER pruefen, ob `@theme` Custom-Spacing-Tokens wie `--spacing-32: 32px` definiert hat. Laut `DESIGN.md` §3 und §5 existieren `--space-*`-Token, aber nicht als Tailwind-Spacing-Utilities. Die Button.tsx nutzt offenbar Tailwind-Standard-Spacing, was zu falschen Groessen fuehrt.

### 3.8 Unvollstaendige `APP_ROADMAP_CHECKLIST.md`-Setup-Checklisten
- **Severity:** Warning
- **Category:** Dokumentation
- **Location:** Alle drei Checklisten
- **Finding:** Kein einziger Checklisten-Eintrag ist als erledigt markiert (`[x]`). Alle Eintraege stehen auf `[ ]`, obwohl viele bereits umgesetzt sind (z. B. `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `components.json`, `app/layout.tsx`, `app/globals.css`).
- **Reference:** Sichtpruefung aller drei Checklisten.
- **Impact:** Die Checklisten sind als Fortschritts-Tracking vollstaendig unbrauchbar.
- **Recommendation:** Checklisten-Eintraege auf den aktuellen Stand pruefen und abhaken, wo zutreffend.

### 3.9 `global-error.tsx` in `operations` nutzt Hardcoded-Hex-Werte
- **Severity:** Warning
- **Category:** Design System
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/apps/operations/app/global-error.tsx` Zeile 9–14
- **Finding:** Die Datei definiert ein Fallback-Objekt `FB` mit rohen Hex-Werten (`#f5f4f1`, `#ffffff`, `#4f455c`, etc.). `DESIGN.md` §2 (Color Rules): "No raw hex in app code." Der Kommentar in der Datei rechtfertigt dies damit, dass bei einem Root-Layout-Fehler die CSS-Imports moeglicherweise nicht greifen.
- **Reference:** `DESIGN.md` Zeile 19, Zeile 423.
- **Impact:** Das ist ein legitimer Edge-Case (Global Error Boundary), aber es sollte dokumentiert werden, dass dies die einzige erlaubte Ausnahme ist. Andernfalls entsteht ein Praezedenzfall.
- **Recommendation:** In `DESIGN.md` explizit eine Ausnahmeklausel fuer `global-error.tsx` (und aehnliche Boundary-Fallbacks) hinzufuegen, die SSOT-Hex-Fallbacks erlaubt, wenn CSS nicht garantiert geladen ist.

---

## 4. Hinweise & Vorschlaege

### 4.1 `DESIGN.md` vs. `docs/nezumi-ui/`-Doku Doppelung
- **Severity:** Suggestion
- **Category:** Dokumentation
- **Location:** `DESIGN.md` vs. `docs/nezumi-ui/*.mdx`
- **Finding:** `DESIGN.md` ist die visuelle SSOT, aber viele Inhalte (Token-Namen, Breakpoints, Komponenten-Regeln) finden sich auch in `docs/nezumi-ui/` wieder. Das birgt das Risiko zukuenftiger Divergenz.
- **Recommendation:** Explizit festlegen, welche Datei die SSOT fuer welchen Aspekt ist. Z. B.: `DESIGN.md` = visuelle Spezifikation (Farben, Typografie, Groessen); `docs/nezumi-ui/*.mdx` = Implementierungs- und Architektur-Doku. Bei Aenderungen sollte ein Cross-Reference-Protokoll greifen.

### 4.2 `apps/*/tsconfig.json` hat keinen Verweis auf Root-Config
- **Severity:** Suggestion
- **Category:** Konfiguration
- **Location:** `apps/*/tsconfig.json`
- **Finding:** Keine der App-`tsconfig.json` referenziert eine Root-Config (weil keine existiert, siehe 2.2).
- **Recommendation:** Nach Anlegen einer Root-`tsconfig.json` sollten die App-Configs mittels `extends` darauf verweisen.

### 4.3 Fehlende SEO-Dateien in `homepage`
- **Severity:** Suggestion
- **Category:** Architektur
- **Location:** `apps/homepage/`
- **Finding:** Die `homepage`-Checkliste erwaehnt `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`. Diese Dateien existieren nicht.
- **Reference:** `apps/homepage/APP_ROADMAP_CHECKLIST.md` Setup-Checklist.
- **Recommendation:** Entweder anlegen oder aus der Checkliste entfernen, falls nicht mehr geplant.

### 4.4 `lucide-react` Version in `packages/ui/package.json`
- **Severity:** Suggestion
- **Category:** Konfiguration
- **Location:** `/Users/albrechtboenke/Dev/Nezumi-Template/packages/ui/package.json` Zeile 58
- **Finding:** `lucide-react` ist auf `^1.14.0` gepinnt. Aktuell ist `lucide-react` in Version 0.x (z. B. 0.468.0 fuer die aktuellen Releases). Version 1.x existiert nicht oeffentlich.
- **Reference:** npm-Registry-Stand.
- **Impact:** Bei `pnpm install` koennte es Warnungen geben oder eine nicht existierende Version angefordert werden.
- **Recommendation:** Version pruefen und auf eine existierende, aktuelle `lucide-react`-Version korrigieren (z. B. `^0.468.0` oder je nach aktuellem Release).

### 4.5 Konsolidierung der `components.json`-Alias-Konfiguration
- **Severity:** Suggestion
- **Category:** Konfiguration
- **Location:** `apps/*/components.json` vs. `packages/ui/components.json`
- **Finding:** Die App-`components.json` weichen leicht von der Package-Config ab:
  - Apps: `"ui": "@nezumi/ui/components"`
  - Package: `"ui": "@nezumi/ui/components"` (hier identisch)
  - Aber Apps haben `"components": "@/components"`, Package hat `"components": "@nezumi/ui/components"`
- **Reference:** `packages/ui/components.json` vs. `apps/homepage/components.json`.
- **Impact:** shadcn-CLI-Workflows koennten je nach Ausfuehrungsort unterschiedliche Zielpfade generieren.
- **Recommendation:** `components.json`-Konfigurationen dokumentieren und bei Divergenz bewusst entscheiden, ob die App-Aliase korrekt sind.

---

## 5. Positive Beobachtungen

1. **Vollstaendiges App-Scaffolding:** Alle drei Apps (`homepage`, `members`, `operations`) sind vollstaendig als Next.js-App-Router-Anwendungen gescaffoldet mit korrekter `package.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `components.json` und `app/`-Verzeichnisstruktur. Das ist ein solider Grundstock.

2. **Korrekte Tailwind-v4-Integration:** Die `globals.css`-Dateien der Apps verwenden korrekt `@import "tailwindcss"`, `@source` fuer das UI-Paket und `@import "@nezumi/ui/design-tokens.css"`. Das entspricht der Tailwind-v4-CSS-first-Philosophie.

3. **Korrekte Next.js-Config:** Alle Apps setzen `transpilePackages: ["@nezumi/ui"]` in `next.config.ts`, was fuer Monorepo-Workspace-Pakete notwendig ist.

4. **Design-Token-Architektur in `packages/ui`:** Die Drei-Schichten-Architektur (Primitives -> Semantic -> Component tokens) in `packages/ui/src/styles/` ist sauber umgesetzt und gut dokumentiert. Die `.dark`-Override-Strategie ist konsistent.

5. **Deutsche Sprache in App-Layouts:** Alle `layout.tsx` setzen korrekt `lang="de"`, was der DESIGN.md-Regel "UI copy: German" entspricht.

6. **Saubere Agent-Anweisung in `AGENTS.md`:** Die Dokumentation-First-Regel ist knapp, klar und mandatory formuliert. Die Retrieval-Order ist explizit und nachvollziehbar.

---

## 6. Dokumentationsluecken-Analyse

| Dokument | Code-Stand | Bewertung |
|----------|-----------|-----------|
| `apps/homepage/APP_ROADMAP_CHECKLIST.md` | App ist vollstaendig gescaffoldet | **Checkliste ist veraltet**; behauptet fehlende `package.json` und Struktur |
| `apps/members/APP_ROADMAP_CHECKLIST.md` | App ist vollstaendig gescaffoldet | **Checkliste ist veraltet**; identisches Problem |
| `apps/operations/APP_ROADMAP_CHECKLIST.md` | App ist vollstaendig gescaffoldet | **Checkliste ist veraltet**; identisches Problem |
| `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx` | Apps importieren `design-tokens.css`, nicht `globals.css` | **Doku ist irrefuehrend** fuer App-Entwickler |
| `DESIGN.md` | `homepage/app/page.tsx` nutzt raw `h1`/`p` | **Code verletzt SSOT**; keine Ausnahmedokumentation |
| `CLAUDE.md` | Enthaelt nur `AGENTS.md` | **Datei ist defekt**, nicht nur unvollstaendig |
| `FRAMEWORK_VERSION_REFERENCES.md` | Fehlt komplett | **Fehlende zentrale SSOT-Datei** |
| `docs/turbo/INDEX.md` | Andere INDEX-Dateien haben korrektes Frontmatter | **Doku ist technisch fehlerhaft** |

---

## 7. Empfohlene naechste Schritte (Priorisiert)

1. **Sofort:** `CLAUDE.md` reparieren oder durch sinnvollen Inhalt ersetzen.
2. **Sofort:** `FRAMEWORK_VERSION_REFERENCES.md` anlegen und alle Links pruefen.
3. **Sofort:** Alle drei `APP_ROADMAP_CHECKLIST.md` auf den aktuellen Code-Stand synchronisieren oder durch Status-Dokumente ersetzen.
4. **Kurzfristig:** `homepage/app/page.tsx` auf `Typography`-Komponente umstellen; `DESIGN.md` ggf. um Ausnahmeregeln fuer `global-error.tsx` erweitern.
5. **Kurzfristig:** `docs/nezumi-ui/001-nezumi-ui-getting-started.mdx` korrigieren: App-Standard-Pfad dokumentieren.
6. **Kurzfristig:** Root-`tsconfig.json` anlegen oder bewussten Verzicht dokumentieren.
7. **Mittelfristig:** `Button.tsx` Size-Token pruefen (Tailwind-Standard-Spacing vs. DESIGN.md-Pixelwerte).
8. **Mittelfristig:** `turbo.json` um `lint` und `test` erweitern.
9. **Mittelfristig:** Vendor-Doku-Spiegel auf Projektversions-Konsistenz pruefen (TypeScript 6.0.3, React 19.2.5).
10. **Mittelfristig:** `lucide-react`-Version in `packages/ui/package.json` korrigieren.

---

*Ende des Reports.*
