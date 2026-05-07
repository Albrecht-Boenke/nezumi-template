# Layout Components Review (Nezumi UI)

**Status:** Erweitertes Review
**Datum:** 07.05.2026
**Umfang:** Flex, Container, Grid, Box, Section

## 1. Executive Summary

Alle Layout-Atoms wurden erfolgreich auf den **React 19** Standard (direktes `ref` Prop-Passing) und das **Tailwind v4** CSS-First Token-Modell migriert. Die Komponenten nutzen konsequent das `Slot`-Pattern für maximale Komponierbarkeit.

Während die technische Umsetzung der Layout-Logik (Responsive-Mapping, Token-Konsum) hervorragend ist, gibt es punktuelle Abweichungen zwischen der technischen Dokumentation (`docs/**`) und dem tatsächlichen Code sowie Inkonsistenzen bei der Typisierung.

---

## 2. Komponenten-Audits

### Flex (`Flex.tsx`)
*   **Status:** Funktional korrekt, aber mangelhafte Typisierung.
*   **Findings:**
    *   Nutzt `React.HTMLAttributes<any>`, was die Typsicherheit untergräbt.
    *   Mapping der Radix-Steps (1-9) auf Pixel-Utilities (z.B. `gap-40`) ist technisch korrekt, da der Token in `spacing.css` existiert, aber in der Doku (`010-nezumi-ui-design-tokens-tailwind-v4.mdx`) fehlt.
*   **Empfehlung:** Typen auf `React.ComponentProps<"div">` umstellen.

### Container (`Container.tsx`)
*   **Status:** Sehr gute Umsetzung des Radix Themes Layout-Modells.
*   **Findings:**
    *   Saubere Nutzung von CSS-Variablen für Max-Width: `max-w-(--container-size)`.
    *   **Architektur-Detail:** Die Komponente nutzt ein verschachteltes `div` für das Max-Width Sizing. Dies ist notwendig, da das äußere Element oft Flex-Verhalten für die Zentrierung benötigt. 
    *   **Typing:** Nutzt korrekt `Omit<React.ComponentProps<"div">, "display">`.
*   **Empfehlung:** Keine unmittelbaren Änderungen nötig.

### Grid (`Grid.tsx`)
*   **Status:** Technisch solide, aber "brittle" Logik beim Gap-Override.
*   **Findings:**
    *   **Gap-Hack:** Zeilen 123-124 nutzen `.replace(/gap-/g, "gap-x-")`. Dies ist zwar funktional, aber fehleranfällig gegenüber Änderungen in der Tailwind-Klassennamen-Struktur.
    *   **Vollständigkeit:** Unterstützt 1-12 Columns und 1-6 Rows, was den Standard-Layout-Bedarf abdeckt.
*   **Empfehlung:** Das String-Replacement durch ein explizites Mapping für `gapX` und `gapY` ersetzen oder eine sicherere Utility-Funktion in `lib/utils.ts` einführen.

### Box (`Box.tsx`)
*   **Status:** Perfektes Atomic-Primitive.
*   **Findings:**
    *   Minimalistisch, unterstützt Polymorphismus via `asChild`.
    *   Hält sich strikt an die "No Margin/Padding Props"-Regel von Nezumi UI.
*   **Empfehlung:** Keine Änderungen nötig.

### Section (`Section.tsx`)
*   **Status:** Guter "Vertical Rhythm" Helfer.
*   **Findings:**
    *   Mappt `size` auf `py-*` Utilities. 
    *   Standardwert `size="3"` (64px) sorgt für konsistente Abstände zwischen Inhaltsblöcken.
*   **Empfehlung:** Dokumentation der Section-Größen in den Design-Tokens ergänzen.

---

## 3. Systemübergreifende Findings

### 3.1 Dokumentations-Diskrepanz
Die Datei `010-nezumi-ui-design-tokens-tailwind-v4.mdx` ist unvollständig im Vergleich zur `packages/ui/src/styles/tokens/spacing.css`.
*   **Code:** Definiert `--spacing-40`, `--spacing-56` etc.
*   **Doku:** Stoppt bei der Auflistung oft früher oder überspringt Zwischenschritte.
*   **Aktion:** Dokumentation mit den tatsächlichen CSS-Werten synchronisieren.

### 3.2 React 19 Best Practices
Alle Komponenten setzen den neuen Standard um:
*   Kein `forwardRef` mehr nötig.
*   `ref` wird als reguläres Prop in der Signatur entgegengenommen: `function Component({ ref, ...props })`.
*   Dies reduziert Boilerplate und verbessert die Lesbarkeit.

---

## 4. Priorisierte To-Do Liste

1.  [ ] **Flex Typing:** `any` durch `React.ComponentProps<"div">` ersetzen.
2.  [ ] **Grid Utility:** Den `.replace()` Hack entfernen und sauberes Mapping implementieren.
3.  [ ] **Doc Sync:** `010-nezumi-ui-design-tokens-tailwind-v4.mdx` um die fehlenden Spacing- und Container-Tokens erweitern.
4.  [ ] **Export:** Prüfen, ob die Layout-Atoms in `packages/ui/src/atoms/index.ts` exportiert werden sollen (aktuell nur `Button`).

---
*Dieser Bericht wurde unter Einbeziehung der Radix Themes Spezifikationen und einer Verifizierung gegen die Tailwind v4 Engine erstellt.*
