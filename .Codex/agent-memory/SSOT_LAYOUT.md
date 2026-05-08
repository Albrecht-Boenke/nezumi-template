# SSOT — Layout (Nezumi-Template)

**Hands-on / How-to für die Layout-Primitives, App-Shells und Enterprise-Layout-Strategien**

> Stand: Mai 2026 · Tailwind 4.2.x · Next.js 16.2.x · React 19.2.x · TypeScript 6.0.x
>
> Diese Datei ist die **Single Source of Truth** für alle Layout-Entscheidungen im Repo.
> Sie ergänzt [`DESIGN.md`](./DESIGN.md) (visuelle SSOT) und [`DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md`](./DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md) (Token-Hands-on).

---

## Inhalt

1. [TL;DR — die 8 Layout-Regeln](#tldr--die-8-layout-regeln)
2. [Architektur — wo lebt was](#architektur--wo-lebt-was)
3. [Review der Layout-Primitives](#review-der-layout-primitives)
4. [Spacing-Grammatik — wann nimmt man welchen Wert](#spacing-grammatik--wann-nimmt-man-welchen-wert)
5. [Responsive-Strategie](#responsive-strategie)
6. [App-Shells: Marketing, Members, Admin](#app-shells-marketing-members-admin)
7. [Hierarchie-Patterns](#hierarchie-patterns)
8. [Advanced Layout-Effekte](#advanced-layout-effekte)
9. [Edge Cases & Troubleshooting](#edge-cases--troubleshooting)
10. [Anti-Patterns](#anti-patterns)
11. [Reviewer-Checkliste](#reviewer-checkliste)

---

## TL;DR — die 8 Layout-Regeln

| # | Regel | Begründung |
|---|-------|-----------|
| 1 | **Komposition statt Konfiguration.** `Section > Container > Grid/Flex > Card` ist die Standard-Pyramide. | Jede Ebene hat genau eine Verantwortung — vertikaler Rhythmus, horizontale Begrenzung, interne Anordnung, Inhalts-Slot. |
| 2 | **Spacing kommt aus der pixelbenannten Skala.** Nur Werte aus `SPACING_SCALE` (`0, 1, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128`). | Drift ist sonst sofort zurück. Keine Arbitrary Values. |
| 3 | **Margin ist die Ausnahme, gap ist die Regel.** Innerhalb eines Layouts wird mit `gap`/`spacing` gearbeitet, nicht mit `mb`/`mt` der Kinder. | Margin-Collapsing und „letztes Element hat zu viel Abstand"-Bugs verschwinden. |
| 4 | **`Container` für Lesbarkeitsbreite, `Section` für vertikalen Rhythmus.** Niemals `max-w` direkt auf Section. | Eine Section kann mehrere Container halten (z. B. ein vollbreites Hintergrund-Layer + ein zentriertes Inhaltsband). |
| 5 | **Grid für 2D, Flex für 1D, Stack für vertikale Listen.** | Die Wahl der Primitive wird Designintention. |
| 6 | **`as`-Prop ist kein Detail, sondern Semantik.** `<Section as="article">`, `<Stack as="ul">`. | A11y, SEO, sinnvolles Markup. |
| 7 | **Responsive Mobile-First mit `{ initial, md, lg }`.** Keine `sm`/`xl`/`2xl`-Breakpoints. | Im Token-System sind nur `md` (768px) und `lg` (1024px) gepinnt — Designentscheidungen werden auf zwei Anker konzentriert. |
| 8 | **Shells (Marketing/Members/Admin) sind komponierte Layouts, keine separaten Frameworks.** | Eine Sidebar-App und eine Marketing-Seite teilen `Section`, `Container`, `Grid` — sie unterscheiden sich nur in der äußeren Hülle. |

---

## Architektur — wo lebt was

```text
packages/ui/src/
├── layout/                              ← Layout-Primitives (SSOT)
│   ├── Box/Box.tsx
│   ├── Flex/Flex.tsx
│   ├── Grid/Grid.tsx
│   ├── Container/Container.tsx
│   ├── Section/Section.tsx
│   ├── Stack/Stack.tsx
│   ├── types.ts                         ← BaseLayoutProps, ResponsiveValue, …
│   ├── spacing.ts                       ← SPACING_SCALE Type-Guard
│   ├── utils.ts                         ← responsiveClass, getSpacingClasses, cn
│   └── index.ts                         ← Barrel-Export
├── components/
│   ├── box.tsx, container.tsx, flex.tsx,
│   ├── grid.tsx, section.tsx            ← Re-Export-Shims auf layout/*
│   └── …
├── atoms/                               ← Typography, Button, Input, …
├── molecules/                           ← Card, Dialog, Tabs, Sheet, …
└── organisms/                           ← Sidebar, NavigationMenu, DataTable, …
```

**Import-Pfad:** Apps importieren ausschließlich aus den Subpath-Exports von `@packages/ui`. Beide Pfade funktionieren und zeigen auf dieselbe Implementierung:

```tsx
// Empfohlen — Barrel mit Layout-Idiom
import { Box, Container, Flex, Grid, Section, Stack } from "@packages/ui/layout"

// Auch zulässig — granular, kompatibel mit existierendem Code
import { Container } from "@packages/ui/components/container"
import { Section } from "@packages/ui/components/section"
```

> **SOLL-Pfad-Tabelle**

| Komponente | Implementierung | Subpath-Export |
|------------|-----------------|----------------|
| `Box` | `packages/ui/src/layout/Box/Box.tsx` | `@packages/ui/components/box` · `@packages/ui/layout` |
| `Flex` | `packages/ui/src/layout/Flex/Flex.tsx` | `@packages/ui/components/flex` · `@packages/ui/layout` |
| `Grid` | `packages/ui/src/layout/Grid/Grid.tsx` | `@packages/ui/components/grid` · `@packages/ui/layout` |
| `Container` | `packages/ui/src/layout/Container/Container.tsx` | `@packages/ui/components/container` · `@packages/ui/layout` |
| `Section` | `packages/ui/src/layout/Section/Section.tsx` | `@packages/ui/components/section` · `@packages/ui/layout` |
| `Stack` | `packages/ui/src/layout/Stack/Stack.tsx` | `@packages/ui/layout` |

---

## Review der Layout-Primitives

### `Box` — die polymorphe Wurzel

**Datei:** `packages/ui/src/layout/Box/Box.tsx`

```tsx
<Box as="article" p="24" maxW="2xl" className="bg-surface-raised rounded-lg">…</Box>
```

| Prop | Werte | Default | Notiz |
|------|-------|---------|-------|
| `as` | `ElementType` | `"div"` | A11y-Marker (`article`, `aside`, `header`, `footer`, `main`, `nav`). |
| `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl` | `SpacingValue \| ResponsiveValue` | — | Padding aus der Skala. |
| `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` | `SpacingValue \| "auto" \| ResponsiveValue` | — | `"auto"` setzt `mx-auto` etc. |
| `display` | `"block"\|"inline-block"\|"inline"\|"none"\|"flex"\|"inline-flex"\|"grid"\|"inline-grid"` | — | Override für Display-Mode. |
| `w`, `h`, `minW`, `maxW`, `minH`, `maxH` | Skala-Keyword **oder** beliebiger CSS-Wert | — | Skala → Tailwind-Klasse. Sonst → Inline-Style. |
| `ref` | `Ref<HTMLElement>` | — | React 19.2 nimmt `ref` direkt als Prop. |

**Bewertung:** Saubere polymorphe API. `resolveDimension` ist eleganter als ein hartes Class-Mapping, weil unbekannte CSS-Werte (`"320px"`, `"calc(100vh - 64px)"`) als Inline-Style durchgereicht werden, ohne kaputte `w-100`-Klassen zu erzeugen.

> 💡 **Wann `Box` und nicht `Flex`?**
> Wenn du keine Achse hast, sondern einen typografischen oder dekorativen Container brauchst (z. B. ein zentriertes `<article>` mit Padding und Max-Breite). Ist es eine Liste oder eine Reihe → `Flex`/`Stack`. Ist es ein Raster → `Grid`.

---

### `Flex` — eindimensionale Anordnung

**Datei:** `packages/ui/src/layout/Flex/Flex.tsx`

```tsx
<Flex direction="row" align="center" justify="between" gap="16" wrap="wrap">…</Flex>
```

| Prop | Werte | Default |
|------|-------|---------|
| `direction` | `"row" \| "column" \| "row-reverse" \| "column-reverse"` | `"row"` |
| `wrap` | `"nowrap" \| "wrap" \| "wrap-reverse"` | — |
| `gap` | `SpacingValue` | `"16"` |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | `"stretch"` |
| `justify` | `"start" \| "center" \| "end" \| "between" \| "around" \| "evenly"` | `"start"` |
| `flex` | `"1" \| "auto" \| "initial" \| "none"` **oder** beliebiger CSS-Wert | — |
| `basis` | Skala-Keyword (`"16"`, `"1/2"`, `"full"`) **oder** beliebiger CSS-Wert | — |
| `grow`, `shrink` | `"0" \| "1"` | — |

**Bewertung:** Die Trennung zwischen `flex` (Shorthand) und `grow`/`shrink`/`basis` ist gut. Der `align="stretch"`-Default ist die richtige Wahl, weil er Cards in einer Reihe gleich hoch macht — ein Subtilitätsbug, den viele andere Flex-APIs nicht abfangen.

> 💡 **Idiom: Spacer**
> Statt `<div className="flex-1" />` als Spacer: `<Box flex="1" />`. Beide funktionieren; das polymorphe API hält das Markup einheitlich.

---

### `Grid` — zweidimensionale Anordnung

**Datei:** `packages/ui/src/layout/Grid/Grid.tsx`

```tsx
<Grid cols={{ initial: 1, md: 2, lg: 3 }} gap="24">
  <Card />
  <Card />
  <Card />
</Grid>
```

| Prop | Werte | Default |
|------|-------|---------|
| `cols` | `number` (1–12 → `grid-cols-N`), `string` (CSS-Template wie `"200px 1fr"`), responsive | — |
| `rows` | wie `cols` | — |
| `gap` | `SpacingValue` | `"16"` |
| `columnGap`, `rowGap` | Achsen-Override | — |
| `align`, `justify` | wie bei `Flex` | `align="stretch"`, `justify="start"` |
| `autoFlow` | `"row" \| "column" \| "dense" \| "row-dense" \| "column-dense"` | — |

**Implementierungs-Highlight:** Statische Track-Counts (1–12) werden zu `grid-cols-N` aufgelöst (im Token-System per `@source inline()` safelisted). Beliebige Templates (`"200px 1fr auto"`) gehen den CSS-Custom-Property-Weg über `--nz-grid-cols`/`--nz-grid-cols-md`/`--nz-grid-cols-lg`. Das vermeidet kaputte Arbitrary-Klassen-Permutationen im Bundle.

> 💡 **Klassisches Sidebar-Layout-Grid**
> ```tsx
> <Grid cols={{ initial: "1fr", lg: "240px 1fr" }} gap="24" minH="dvh">
>   <Sidebar />
>   <main>{children}</main>
> </Grid>
> ```

---

### `Container` — horizontale Begrenzung mit Lesbarkeits-Padding

**Datei:** `packages/ui/src/layout/Container/Container.tsx`

| `size` | `max-width` | Use Case |
|--------|-------------|----------|
| `"sm"` | `max-w-md` (~448px) | Centered Forms (Login, Sign-up) |
| `"md"` | `max-w-2xl` (~672px) | Long-Form-Text, Blog-Artikel |
| `"lg"` *(Default)* | `max-w-4xl` (~896px) | Standard-Content-Bereiche |
| `"xl"` | `max-w-6xl` (~1152px) | Marketing-Pages, Feature-Grids |
| `"2xl"` | `max-w-7xl` (~1280px) | Dashboards, Datentabellen |

**Default-Padding:** Container setzt **automatisch** `px={{ initial: "16", md: "24" }}`, sofern weder `p` noch `px` explizit gesetzt ist. `centered` ist standardmäßig `true` (→ `mx-auto`), wird aber unterdrückt, wenn der Aufrufer `mx` selbst setzt.

**Edge Case:** Wenn `maxW` (Custom-Breite) gesetzt ist, wird die `size`-Klasse weggelassen. Das ist Absicht — eigene `maxW`-Werte sollen nicht heimlich von `max-w-4xl` übersteuert werden.

```tsx
// 1. Standard-Marketing-Container
<Container size="xl">…</Container>

// 2. Schmale Login-Box
<Container size="sm" py="64">…</Container>

// 3. Dashboard mit voller Breite
<Container size="2xl" px="32">…</Container>

// 4. Eigene Breite — size wird ignoriert
<Container maxW="80rem" px="24">…</Container>
```

---

### `Section` — vertikaler Rhythmus

**Datei:** `packages/ui/src/layout/Section/Section.tsx`

| `size` | `padding-y` | Verwendung |
|--------|-------------|------------|
| `"sm"` | `py-32` | Kompakte Bänder (Footer-CTA, Banner) |
| `"md"` | `py-48` | Sub-Sections in Marketing |
| `"lg"` *(Default)* | `py-64` | Standard-Section auf Marketing/Members |
| `"xl"` | `py-96` | Hero-Sections, große Reveals |

**`as="section"`** ist Default — `<Section as="article">` für Blog-Posts, `<Section as="aside">` für Side-Inhalte.

**Edge Case:** Eigenes `py` oder `p` deaktiviert die `size`-Default-Klasse — wer Padding kontrollieren will, kontrolliert es ganz.

---

### `Stack` — vertikale Anordnung mit Klartext-API

**Datei:** `packages/ui/src/layout/Stack/Stack.tsx`

```tsx
<Stack spacing="24">                ← vertikal, gap-24
  <Heading />
  <Paragraph />
  <Cta />
</Stack>

<Stack direction="horizontal" spacing="16" align="center">
  <Avatar />
  <Name />
</Stack>
```

`Stack` ist ein dünner Wrapper um `Flex` mit:
- `direction: "vertical" | "horizontal"` statt `row/column`,
- `spacing` als Alias für `gap` (Radix-Idiom).

**Wann `Stack`, wann `Flex`?**

| Bedürfnis | Wahl |
|-----------|------|
| „Eine Liste von Elementen vertikal stapeln" | `Stack` |
| „Header mit Logo links, Nav rechts" | `Flex direction="row" justify="between"` |
| „Karten-Grid" | `Grid` |
| „Card-Innenleben (Title über Body über Footer)" | `Stack spacing="…"` |

---

## Spacing-Grammatik — wann nimmt man welchen Wert

Die Skala (`0, 1, 2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128`) ist eine modifizierte 8-pt-Skala. Die folgende Tabelle ist die **Tarif-Auskunft**:

### Innerhalb von Komponenten

| Kontext | Wert | Begründung |
|---------|------|------------|
| Hairline (Border) | `1` | exakt 1px |
| Optische Trennung zwischen Icon und Label | `8` | Kompakt, aber sichtbar |
| Padding eines Buttons (vertikal) | aus Component-Token (`--spacing-button-md`) | nie eigenständig wählen |
| Innenabstand Card-Body | `24` | wirkt großzügig, atmet |
| Form-Field-Abstand zwischen Label und Input | `8` | Label gehört optisch zum Feld |
| Form-Field-Abstand zwischen zwei Feldern | `16`–`24` | je nach Dichte |
| Tabellen-Cell-Padding | `12` (vertikal) / `16` (horizontal) | dichte Übersicht |

### Innerhalb von Layout-Containern

| Kontext | Wert | Begründung |
|---------|------|------------|
| `gap` zwischen Karten in einem Grid | `16`–`24` | ≤16 wirkt eng, ≥32 zerreißt visuelle Gruppen |
| `gap` zwischen Form-Sections | `32`–`40` | Sections sollen optisch trennen |
| `gap` in einer horizontalen Toolbar | `8`–`16` | Werkzeuge gehören zusammen |
| Container-`px` mobil | `16` (Default) | Daumen-Reichweite |
| Container-`px` ab `md` | `24` (Default) | Atemraum |
| `Section py` Standard | `64` (`size="lg"`) | Vertikaler Rhythmus auf Marketing |
| `Section py` Hero | `96` (`size="xl"`) | Eingang braucht Großzügigkeit |
| `Section py` Banner/CTA | `32` (`size="sm"`) | Funktional, nicht episch |

### Zwischen Sections / auf Page-Ebene

| Kontext | Wert | Begründung |
|---------|------|------------|
| Page-Top-Padding ab Header | `--space-page` (= `64`) | Konsistenter Abstand zur App-Chrome |
| Section-zu-Section vertikal | `--space-section` (= `48`) | Wenn nicht via `Section size` geregelt |
| Innerhalb einer Section, zwischen Inhalten | `--space-content` (= `16`) | Mikro-Rhythmus |

> 🎯 **Heuristik bei Unsicherheit:** Im Zweifel den nächstgrößeren Sprung der 8-pt-Linie wählen. UI sieht eher zu kompakt aus als zu offen — und Designer korrigieren großzügiger nach unten.

### Margin vs. Gap — eine klare Regel

```tsx
// ❌ Falsch — Margin auf Kindern: brüchig, last-child-Bug, Margin-Collapsing
<div>
  <Card className="mb-16" />
  <Card className="mb-16" />
  <Card />
</div>

// ✅ Richtig — Gap am Layout-Container
<Stack spacing="16">
  <Card />
  <Card />
  <Card />
</Stack>
```

Margin (`m*`) ist nur für **Sonderfälle**: Trennung **zu** einem äußeren Container (`mt-32` direkt an einem Element, das nicht in einem Stack lebt) oder Auto-Spacer (`ml="auto"` in einem Flex-Header).

```tsx
// Klassischer Header-Spacer
<Flex align="center" gap="16">
  <Logo />
  <Nav />
  <Box ml="auto" />
  <UserMenu />
</Flex>
```

---

## Responsive-Strategie

Im Token-System sind **nur zwei** Breakpoints aktiv: `md` (768px) und `lg` (1024px). Alle Defaults werden mobil-zuerst gewählt; größere Viewports überschreiben.

```tsx
<Grid cols={{ initial: 1, md: 2, lg: 4 }} gap={{ initial: "16", md: "24" }}>
  …
</Grid>
```

| Breakpoint | Anwendung |
|------------|-----------|
| `initial` | Mobile / Default |
| `md` (≥768px) | Tablet |
| `lg` (≥1024px) | Desktop |

**Drei Patterns für responsives Verhalten:**

1. **Spaltenzahl wechseln** — `cols={{ initial: 1, md: 2, lg: 3 }}`.
2. **Gap dichter packen mobil** — `gap={{ initial: "16", md: "24" }}`.
3. **Sichtbarkeit togglen** — `<Box display={{ initial: "none", lg: "block" }} />`.

> ⚠️ **Was nicht geht:** `xl`/`2xl` als Breakpoint. Die sind aus dem Theme entfernt (siehe `tokens/breakpoints.css`). Wer mehr Stufen braucht, fügt sie zentral hinzu — niemals via Arbitrary `[@media…]`.

---

## App-Shells: Marketing, Members, Admin

Eine **Shell** ist die äußere Hülle einer App: Header, optionale Sidebar, Page-Outlet, optionaler Footer. Im Nezumi-Template gibt es drei kanonische Shells:

| Shell | Verwendung | Charakteristik |
|-------|------------|----------------|
| **Marketing** | `apps/homepage` | Top-Header + viele `Section`s + Footer |
| **Members** | `apps/members` | Top-Header + zentrierter Content (Auth, Profile) |
| **Admin / Operations** | `apps/operations` | Sidebar links + Content rechts + minimaler Header |

Alle drei nutzen **dieselben Primitives**. Sie unterscheiden sich nur in der Komposition.

### 1. Marketing-Shell

**Pattern:** Header (sticky, transparent → solid beim Scroll) → Hero-Section → Feature-Sections → CTA-Section → Footer.

**SOLL-Datei:** `apps/homepage/app/layout.tsx` (Root) + `apps/homepage/components/MarketingShell.tsx`.

```tsx
// apps/homepage/components/MarketingShell.tsx
import type { ReactNode } from "react"
import Link from "next/link"
import { Box, Container, Flex, Section, Stack } from "@packages/ui/layout"
import { Typography } from "@packages/ui/components/typography"

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" minH="dvh" className="flex-col bg-surface text-text">
      <MarketingHeader />
      <Box as="main" flex="1">
        {children}
      </Box>
      <MarketingFooter />
    </Box>
  )
}

function MarketingHeader() {
  return (
    <Box
      as="header"
      className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur"
    >
      <Container size="xl">
        <Flex as="nav" align="center" justify="between" py="16">
          <Link href="/"><Typography variant="title-medium">Nezumi</Typography></Link>
          <Flex as="ul" gap="24" align="center" className="list-none">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/docs">Docs</Link></li>
          </Flex>
          <Flex gap="8">
            <Link href="/login">Login</Link>
            <Link href="/signup" className="bg-brand text-on-brand rounded-md px-16 py-8">
              Sign up
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

function MarketingFooter() {
  return (
    <Box as="footer" className="border-t border-border bg-surface-raised">
      <Container size="xl">
        <Stack spacing="32" py="48">
          <Flex justify="between" wrap="wrap" gap="32">
            <Box>
              <Typography variant="title-medium">Nezumi</Typography>
              <Typography variant="body-medium" tone="muted">
                Calm, intentional UI.
              </Typography>
            </Box>
            <Flex gap="48" wrap="wrap">
              <FooterCol title="Product" links={["Features", "Pricing", "Changelog"]} />
              <FooterCol title="Company" links={["About", "Blog", "Contact"]} />
              <FooterCol title="Legal"   links={["Privacy", "Terms", "Imprint"]} />
            </Flex>
          </Flex>
          <Box className="border-t border-border" />
          <Flex justify="between">
            <Typography variant="label-medium" tone="muted">© 2026 Nezumi</Typography>
            <Typography variant="label-medium" tone="muted">Made in Berlin</Typography>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}
```

**Page-Beispiel** (im Outlet `children`):

```tsx
// apps/homepage/app/page.tsx
import { Container, Grid, Section, Stack } from "@packages/ui/layout"
import { Typography } from "@packages/ui/components/typography"

export default function Home() {
  return (
    <>
      <Section size="xl">
        <Container size="xl">
          <Stack spacing="24" maxW="48rem">
            <Typography variant="clamp-large" tone="default">
              Calm interfaces for serious products
            </Typography>
            <Typography variant="body-medium" tone="muted">
              Nezumi is a design system for teams that ship daily.
            </Typography>
          </Stack>
        </Container>
      </Section>

      <Section size="lg">
        <Container size="xl">
          <Grid cols={{ initial: 1, md: 2, lg: 3 }} gap="24">
            <FeatureCard … />
            <FeatureCard … />
            <FeatureCard … />
          </Grid>
        </Container>
      </Section>
    </>
  )
}
```

**Was hier gut ist:**
- Header ist `sticky top-0 z-40` — bleibt beim Scroll oben. `bg-surface/80 backdrop-blur` gibt das übliche „Frosted-Glass"-Verhalten.
- Footer ist eine eigene `Section`-Logik *innerhalb* eines Boxes, weil die Trennung „Inhalt vs. App-Chrome" ist — kein vertikaler Rhythmus zur Page.
- Page-Inhalt nutzt `Section size="xl"` für den Hero und `size="lg"` für Folge-Sections — der Sprung im `py` schafft Hierarchie.

### 2. Members-Shell (Auth, Profile, Account)

Schmaler, zentriert. Kein Sidebar-Bedarf.

```tsx
// apps/members/components/MembersShell.tsx
export function MembersShell({ children }: { children: ReactNode }) {
  return (
    <Box minH="dvh" display="flex" className="flex-col bg-surface text-text">
      <MembersHeader />
      <Box as="main" flex="1">
        <Container size="md" py="64">
          {children}
        </Container>
      </Box>
    </Box>
  )
}
```

```tsx
// Login-Page als Beispiel
<Stack spacing="32" maxW="28rem" mx="auto">
  <Stack spacing="8">
    <Typography variant="title-large">Welcome back</Typography>
    <Typography variant="body-medium" tone="muted">Log in to continue.</Typography>
  </Stack>
  <Stack spacing="16" as="form">
    <FormField label="Email" />
    <FormField label="Password" type="password" />
    <Button type="submit">Sign in</Button>
  </Stack>
</Stack>
```

**Wichtig:** `Container size="md"` (`max-w-2xl`) hält die Lesbarkeitsbreite auf ~672px. Innen liegt ein **zweiter** schmalerer Stack mit `maxW="28rem"` — das doppelte Eingrenzen ist gewollt: der Container bestimmt das visuelle „Lesbarkeits-Band", der innere Stack die Form-Breite.

### 3. Admin / Operations-Shell (Sidebar-Layout)

Sidebar links, Content rechts, optional Top-Bar mit Breadcrumb und User-Menu. Das **klassische CSS-Grid-Layout**.

**SOLL-Komponente:** `packages/ui/src/organisms/Sidebar/index.tsx` (existiert).

```tsx
// apps/operations/components/AdminShell.tsx
"use client"

import type { ReactNode } from "react"
import { Box, Flex, Grid } from "@packages/ui/layout"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@packages/ui/organisms/sidebar"

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AdminGrid>{children}</AdminGrid>
    </SidebarProvider>
  )
}

function AdminGrid({ children }: { children: ReactNode }) {
  const { open } = useSidebar()
  return (
    <Grid
      cols={{
        initial: "1fr",
        lg: open ? "240px 1fr" : "64px 1fr",
      }}
      minH="dvh"
      className="bg-surface text-text"
    >
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem href="/operations">Overview</SidebarMenuItem>
            <SidebarMenuItem href="/operations/users">Users</SidebarMenuItem>
            <SidebarMenuItem href="/operations/billing">Billing</SidebarMenuItem>
            <SidebarMenuItem href="/operations/audit">Audit Log</SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <UserMenu />
        </SidebarFooter>
      </Sidebar>

      <Flex direction="column" minH="dvh">
        <AdminTopBar />
        <Box as="main" flex="1" p={{ initial: "16", md: "24" }}>
          {children}
        </Box>
      </Flex>
    </Grid>
  )
}

function AdminTopBar() {
  return (
    <Box
      as="header"
      className="sticky top-0 z-30 border-b border-border bg-surface-raised"
    >
      <Flex align="center" justify="between" px={{ initial: "16", md: "24" }} py="12">
        <Breadcrumb />
        <Flex gap="8" align="center">
          <SearchButton />
          <NotificationsButton />
        </Flex>
      </Flex>
    </Box>
  )
}
```

**Patterns in dieser Shell:**

- **Grid-Template wechselt zwischen Open/Collapsed.** `"240px 1fr"` ↔ `"64px 1fr"`. Die Übergänge regeln Tailwind-Transitions auf der Sidebar selbst.
- **Mobile fällt auf Single-Column.** Die Sidebar wird zur Drawer-Komponente (`Sheet`). `cols={{ initial: "1fr", lg: "…" }}` reicht — alles unter `lg` zeigt nur den Content; ein Toggle im TopBar öffnet die Sidebar als `Sheet`.
- **Page-Padding kommt **nicht** vom Container.** Admin-Inhalte wollen meistens die volle Breite (Tabellen, Charts). Stattdessen `p` direkt am `<main>`.
- **Sticky TopBar** mit `z-30` — niedriger als ein Modal (`z-50`), aber höher als Page-Inhalt.

> **Verschachtelung beachten:** Die Sidebar-Provider muss **außerhalb** des Layouts liegen, sonst verliert der Toggle die Animation beim Wechsel zwischen Pages. Im Next-App-Router gehört der Provider in das `apps/operations/app/layout.tsx`, nicht in `page.tsx`.

---

## Hierarchie-Patterns

Hierarchie entsteht aus drei Mitteln: **Spacing-Sprünge**, **Typografie-Sprünge** und **Surface-Wechsel**. Layout entscheidet die ersten beiden.

### Spacing-Sprung als Hierarchie-Signal

```tsx
<Section size="xl">      {/* Hero — py-96 */}
  <Container size="xl">
    <Stack spacing="32">…</Stack>
  </Container>
</Section>

<Section size="md">      {/* Sub-Section — py-48, signalisiert Untergruppe */}
  …
</Section>

<Section size="sm">      {/* CTA-Banner — py-32, kompakt */}
  …
</Section>
```

Faustregel: **Mindestens ein Skalen-Sprung zwischen Hierarchie-Ebenen**. Wenn Hero `py-96` hat, soll die Folge-Section nicht `py-80` haben — der Unterschied verpufft. Eher `py-48` oder `py-64`.

### Asymmetrische Grids für visuelle Hierarchie

Alles 4-spaltig wirkt monoton. Variiere:

```tsx
<Grid cols={{ initial: 1, md: 12 }} gap="24">
  <Box className="md:col-span-7"><FeaturedCard /></Box>
  <Box className="md:col-span-5"><SecondaryCard /></Box>
  <Box className="md:col-span-4"><SmallCard /></Box>
  <Box className="md:col-span-4"><SmallCard /></Box>
  <Box className="md:col-span-4"><SmallCard /></Box>
</Grid>
```

Ein 12-Spalten-Grid mit `col-span-7/5/4/4/4` erzeugt Hierarchie ohne explizite Sizes.

### Surface-Stapelung

```tsx
<Section className="bg-surface">          {/* Page-Oberfläche */}
  <Container>
    <Box className="bg-surface-raised border border-border rounded-lg">  {/* Card */}
      <Box className="bg-surface-raised-subtle">                          {/* Inset / Toolbar */}
        …
      </Box>
    </Box>
  </Container>
</Section>
```

Drei Surface-Tokens (`surface`, `surface-raised`, `surface-raised-subtle`) reichen, um drei Hierarchie-Ebenen ohne Schatten zu unterscheiden. **Schatten erst zur vierten Ebene** (Floating-Elemente: Dialog, Popover, Toast).

---

## Advanced Layout-Effekte

### 1. Sticky Subnav unter Sticky Header

```tsx
<Box as="header" className="sticky top-0 z-40 …">…</Box>
<Box as="nav" className="sticky top-64 z-30 …">…</Box>  {/* top = Header-Höhe */}
```

`top-64` (= 4rem) muss zur tatsächlichen Header-Höhe passen. Bei dynamischen Höhen → CSS-Variable:

```css
:root { --header-height: 4rem; }
```

```tsx
<Box style={{ top: "var(--header-height)" }} className="sticky z-30 …">…</Box>
```

### 2. Bleed / Full-Width-Background im Container-Layout

Eine Section soll vollbreite Hintergrundfarbe haben, der Inhalt aber im Container bleiben:

```tsx
<Section size="lg" className="bg-secondary-bg">
  <Container size="xl">…</Container>
</Section>
```

Der Trick ist die Trennung: Section nimmt die Hintergrundfarbe (volle Breite), Container nimmt nur den Inhalt. Niemals `bg` auf den Container — sonst bleibt links/rechts ein heller Streifen.

### 3. Aspect-Ratio-Boxes (Hero-Bilder, Video-Embeds)

```tsx
<Box className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 9" }}>
  <Image src="/hero.jpg" alt="" fill className="object-cover" />
</Box>
```

Alternativ: `<AspectRatio>` aus `packages/ui/src/atoms/AspectRatio/`.

### 4. Parallax / Reveal-on-Scroll mit Framer Motion

Siehe [`DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md` § Motion Tokens](./DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md#motion-tokens-für-framer-motion). Die Layout-Komponenten kombinieren mit `motion.<tag>`-Wrappern:

```tsx
import { motion } from "framer-motion"
import { transitions, revealVariants } from "@packages/ui/lib/motion"

const MotionSection = motion.create(Section)  // polymorph + animierbar

<MotionSection
  size="lg"
  initial="hidden"
  whileInView="shown"
  viewport={{ once: true, margin: "-15%" }}
  variants={revealVariants}
  transition={transitions.reveal()}
>
  …
</MotionSection>
```

> ⚠️ `motion.create(Section)` funktioniert, weil `Section` `ref` als Prop akzeptiert (React 19.2). Mit `forwardRef`-Komponenten hätte man `motion(Section)` direkt — der ältere Weg.

### 5. Asymmetrische „Magazin"-Layouts mit Grid-Areas

```tsx
<Grid
  cols="1fr 1fr 1fr"
  rows="auto auto"
  gap="24"
  style={{
    gridTemplateAreas: `
      "hero hero side"
      "a    b    side"
    `,
  }}
>
  <Box style={{ gridArea: "hero" }}>…</Box>
  <Box style={{ gridArea: "side" }}>…</Box>
  <Box style={{ gridArea: "a" }}>…</Box>
  <Box style={{ gridArea: "b" }}>…</Box>
</Grid>
```

Wenn Grid-Areas wiederholt vorkommen → eigene Komponente (`<MagazineGrid />`).

### 6. Container Queries (CSS-only, ohne JS-Resize)

Tailwind v4 unterstützt `@container` Klassen out-of-the-box:

```tsx
<Box className="@container">
  <Grid cols={1} className="@md:grid-cols-2 @lg:grid-cols-3" gap="24">
    …
  </Grid>
</Box>
```

Das Grid reagiert auf die **Container-Breite**, nicht auf die Viewport-Breite. Pflicht für Sidebar-Cards, die je nach Sidebar-State unterschiedlich layouten müssen.

### 7. Sticky-Footer-Pattern (oder: `min-h="dvh"` korrekt)

Der Klassiker: „Footer soll am Bottom kleben, wenn der Inhalt zu kurz ist."

```tsx
<Box minH="dvh" display="flex" className="flex-col">
  <Header />
  <Box as="main" flex="1">{children}</Box>
  <Footer />
</Box>
```

`dvh` (dynamic viewport height) statt `vh` — wegen mobiler Browser-Toolbars, die `vh` falsch berechnen. `flex="1"` auf `main` schiebt den Footer nach unten.

---

## Edge Cases & Troubleshooting

| Symptom | Ursache | Fix |
|---------|---------|-----|
| `<Container size="xl">` zeigt keine `max-w-*` | Aufrufer hat `maxW` gesetzt — `size` wird ignoriert | Eines von beiden — entweder `size`, oder `maxW`. Doku sagt das explizit. |
| `<Stack>`-Kinder liegen alle aufeinander | `direction="vertical"` ist Default — aber die Kinder haben `position: absolute` von außen | Position raus oder `Stack` durch `Box` ersetzen. |
| Grid-Spalten reagieren nicht auf `cols={{ md: 3 }}` | Tailwind hat den Klassennamen nicht gesehen | Sicherstellen, dass `apps/<app>/app/globals.css` die `@source "../../../packages/ui/src"`-Direktive enthält und der Wert in `1..12` liegt. Werte >12 brauchen ein Custom-Template (`cols="repeat(16, …)"`). |
| `gap` greift nicht im Internet Explorer / alten Safari | Flex-`gap` < Safari 14.1 nicht supported | Wir supporten Safari 14.1+. Falls älter → Margin-Fallback nötig (Projektrahmen). |
| Sticky-Element bleibt nicht oben | Ein Vorfahre hat `overflow: hidden` oder `transform` | Sticky-Position bricht innerhalb von Transformed-Containern. Den ersten Sticky-Vorfahren in den DevTools suchen, dort `overflow` und `transform` entfernen. |
| Scrollbar springt beim Theme-Toggle | `body` hat keine reservierte Scrollbar-Gutter | `html { scrollbar-gutter: stable; }` setzen. |
| `dark:`-Klassen wirken nicht | `@custom-variant dark (&:where(.dark, .dark *));` fehlt in `globals.css` | Ergänzen — siehe `DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md`. |
| Mobile-Sidebar überdeckt Content statt zu pushen | Sidebar ist als `Sheet`/Drawer rendered, aber kein Backdrop | `Sheet` mit `<SheetOverlay />` verwenden. |
| `<Section>` rendert mit doppeltem Padding | Aufrufer hat zusätzlich `py="48"` gesetzt — `size` wird in dem Fall **deaktiviert** | Das ist Absicht. Wer Padding kontrolliert, kontrolliert es ganz. |
| Inhalt schießt aus dem Container | `Container size="xl"` reicht nicht für die Breite des Inhalts (z. B. `<table>` mit fixer Spaltenbreite) | Innen `<Box className="overflow-x-auto">` oder Container auf `2xl` heben. |
| Hydration-Mismatch im Sidebar-Open-State | `defaultOpen` weicht vom localStorage-Wert ab | `defaultOpen` als initialState im Provider, dann `useEffect` für Hydration → siehe Sidebar-Provider-Code. |
| Container-Padding wirkt mobil zu groß | Default ist `px={{ initial: "16", md: "24" }}` | Override: `<Container px={{ initial: "12", md: "24" }}>` — aber meist ist die Skala richtig. |
| Grid-Template `"200px 1fr"` greift nicht ab `md` | Custom-Templates landen in `--nz-grid-cols-md` etc. — das Template muss als Wert übergeben werden | `cols={{ initial: "1fr", md: "200px 1fr" }}` — die Komponente legt die Variable korrekt an. |

---

## Anti-Patterns

| ❌ Anti-Pattern | ✅ Stattdessen |
|----------------|----------------|
| `<div className="px-[17px] py-[33px]">` | Skala-Wert `px="16" py="32"` |
| `<Box style={{ padding: "1.5rem" }}>` | `<Box p="24">` |
| `<Card className="mb-4">` als Listen-Pattern | `<Stack spacing="16"><Card />…</Stack>` |
| `<Container className="max-w-3xl">` | `<Container size="md">` (oder `maxW="48rem"` wenn nicht-Skala-Wert) |
| `<Section className="py-20 max-w-4xl mx-auto">` | `<Section size="lg"><Container>…</Container></Section>` |
| Sidebar als CSS-`position: fixed` mit hardcodierter Breite | `<Grid cols={{ lg: "240px 1fr" }}>` — flowt im Document-Flow |
| Margin-Hacks gegen Section-Padding (`-mt-32` etc.) | Section-`size` korrekt wählen oder eigenes `py` setzen |
| Mehrere Container mit unterschiedlichen `size`-Werten in einer Section | Eine Section, ein Container. Wenn nötig zwei Sections. |
| `<div className="md:flex lg:grid">` Display-Wechsel | Eine Komponente pro Layout: `<Flex>` oder `<Grid>`, evtl. mit `display`-Override |
| `<Box style={{ display: "grid", gridTemplateColumns: "..." }}>` | `<Grid cols="...">` — gleiche Power, lesbar |
| Tausend `mt-2 mt-4 mt-8` durch JSX | `gap`/`spacing` am Layout-Container |
| Layout-Logik in Page-Komponenten dupliziert | Shell-Komponente in `apps/<app>/components/` |

---

## Reviewer-Checkliste

Vor dem Merge eines Layout-PRs:

- [ ] Spacing-Werte aus der Skala (`16`, `24`, `32`, …) — keine Arbitrary Values.
- [ ] Margin nur als Spacer (`ml="auto"`) oder zwischen Top-Level-Elementen — keine `mb` auf Listenkindern.
- [ ] `gap` auf Layout-Containern, nicht `mt`/`mb` auf Kindern.
- [ ] `Container size="…"` statt `max-w-*`-Klassen.
- [ ] `Section size="…"` statt `py-*`, außer es gibt eine Begründung.
- [ ] Responsive nur via `{ initial, md, lg }` — keine `xl`/`2xl`/`sm`.
- [ ] Polymorphes `as` korrekt gesetzt (`as="article"`, `as="aside"`, `as="nav"`, `as="ul"` etc.).
- [ ] Keine Layout-Effekte direkt in Pages — Shells leben in `apps/<app>/components/`.
- [ ] Sticky-Elemente haben `z-index` aus der Stapelung (Modal 50 > Sidebar 40 > TopBar 30 > Subnav 20).
- [ ] `min-h="dvh"` statt `min-h="100vh"` für vollhöhe Container.
- [ ] Bleed-Backgrounds auf der `Section`, Inhaltsband im inneren `Container` — nicht umgekehrt.
- [ ] Bei Grid-Templates mit Custom-Strings: Werte responsive korrekt verteilt (`{ initial: "1fr", lg: "240px 1fr" }`).
- [ ] Keine Hardcoded-Breiten in Pixel — Spacing-Skala oder `rem` via `maxW`.

Wenn alle Punkte ✅, ist der Layout-Anteil ready to merge.

---

## Anhang: Komponenten-Quick-Reference

| Komponente | Default-Tag | Default-Props | Hauptanwendung |
|------------|-------------|---------------|----------------|
| `Box` | `div` | — | Generischer Container, polymorpher Wrapper |
| `Flex` | `div` | `direction="row"`, `gap="16"`, `align="stretch"`, `justify="start"` | 1D-Layout (Header, Toolbar, Item-Reihe) |
| `Grid` | `div` | `gap="16"`, `align="stretch"`, `justify="start"` | 2D-Layout (Card-Grid, Dashboard) |
| `Container` | `div` | `size="lg"`, `centered=true`, `px={{ initial: "16", md: "24" }}` | Lesbarkeitsbreite |
| `Section` | `section` | `size="lg"` (`py-64`) | Vertikaler Rhythmus |
| `Stack` | `div` | `direction="vertical"`, `gap="16"` (von Flex geerbt) | Vertikale Listen, Card-Innenleben |

---

> **Verwandte SSOTs:**
> - Visuelle Tokens: [`DESIGN.md`](./DESIGN.md)
> - Token-Hands-on: [`DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md`](./DESIGN_TOKENS_TAILWIND_V4_ARTICLE.md)
> - Agenten-Konventionen: [`AGENTS.md`](./AGENTS.md) · [`CLAUDE.md`](./CLAUDE.md)
