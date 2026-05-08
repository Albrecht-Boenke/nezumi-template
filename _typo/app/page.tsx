import {
  AppShell,
  PageHeader,
  PageLayout,
  Section,
} from '@/components/nezumi/layout'
import { ThemeToggle } from '@/components/nezumi/theme-toggle'
import { NezumiButton } from '@/components/nezumi/button'
import { Typography } from '@/components/typography'
import { Paper } from '@/components/nezumi/paper'
import { Badge } from '@/components/nezumi/badge'
import { ColorShowcase } from '@/components/demo/color-showcase'
import { TypographyShowcase } from '@/components/demo/typography-showcase'
import { ElevationShowcase } from '@/components/demo/elevation-showcase'
import { ComponentShowcase } from '@/components/demo/component-showcase'
import { MotionShowcase } from '@/components/demo/motion-showcase'
import { ArrowRight } from 'lucide-react'

export default function Page() {
  return (
    <AppShell>
      <PageLayout topPadding="desktop">
        <PageHeader
          eyebrow="Nezumi · Design Tokens"
          title="Drei Layer. Eine Quelle der Wahrheit."
          description="Diese Seite implementiert das vollständige Token-Set aus DESIGN.md auf Basis des 3-Layer-Systems aus dem Tokens-Kapitel — Primitives, Semantics und Component-Tokens via Tailwind v4 @theme."
          actions={
            <>
              <Badge tone="info">Tailwind 4.2</Badge>
              <ThemeToggle />
            </>
          }
        />

        {/* Hero / Intro */}
        <Section
          eyebrow="Übersicht"
          title="Komponenten konsumieren ausschließlich semantische Tokens"
          description="Niemals Layer überspringen: Komponenten → Component-Tokens → Semantic-Tokens → Primitives. Dark Mode überschreibt nur Layer 2 — keine Komponente wird angefasst."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <Paper variant="brand-bg" elevation={1} padding="comfortable">
              <Typography variant="label-small" tone="on-brand-bg">
                Layer 1
              </Typography>
              <Typography variant="title-medium" tone="on-brand-bg">
                Primitives
              </Typography>
              <Typography variant="body-medium" tone="on-brand-bg" pretty>
                <span className="font-mono">--color-nezumi-*</span>,{' '}
                <span className="font-mono">--space-*</span>,{' '}
                <span className="font-mono">--shape-radius-*</span>,{' '}
                <span className="font-mono">--duration-*</span>. Rohwerte in
                OKLCH, Pixeln, ms.
              </Typography>
            </Paper>

            <Paper variant="surface-raised-subtle" elevation={1} padding="comfortable">
              <Typography variant="label-small" tone="muted">
                Layer 2
              </Typography>
              <Typography variant="title-medium">Semantic</Typography>
              <Typography variant="body-medium" tone="muted" pretty>
                <span className="font-mono">--color-brand</span>,{' '}
                <span className="font-mono">--color-text</span>,{' '}
                <span className="font-mono">--color-surface</span>. Hier
                überschreibt <span className="font-mono">.dark</span> die
                Werte.
              </Typography>
            </Paper>

            <Paper variant="secondary-bg" elevation={1} padding="comfortable">
              <Typography variant="label-small" tone="muted">
                Layer 3
              </Typography>
              <Typography variant="title-medium">Component</Typography>
              <Typography variant="body-medium" pretty>
                <span className="font-mono">--color-button-brand-hover</span>,{' '}
                <span className="font-mono">--color-input-error-border</span>.
                Variantenspezifisch, via{' '}
                <span className="font-mono">color-mix()</span>.
              </Typography>
            </Paper>
          </div>
        </Section>

        {/* Colors */}
        <Section
          eyebrow="§ 2 · Colors"
          title="OKLCH-basierte Farbpalette mit semantischen Aliasen"
          description="Reference-Hex bleibt SSOT; gespeicherte Token-Werte sind OKLCH (oklch(from #rrggbb l c h))."
        >
          <ColorShowcase />
        </Section>

        {/* Typography */}
        <Section
          eyebrow="§ 3 · Typography"
          title="Eine Komponente. Alle Token-Skalen."
          description="Statt 17 verschiedene CSS-Klassen oder Heading-Tags zu kennen, übernimmt <Typography variant=…> die Auswahl der korrekten Klasse, des Default-Tags und des Tones — und blockt raw <h1>/<p>/<span> in der App-UI."
        >
          <TypographyShowcase />
        </Section>

        {/* Elevation */}
        <Section
          eyebrow="§ 4 · Elevation"
          title="Shape & Shadow"
          description="Hierarchie kommt zuerst aus der Surface-Stufung, dann aus Shadows. Borders sind Hairlines."
        >
          <ElevationShowcase />
        </Section>

        {/* Components */}
        <Section
          eyebrow="§ 5 · Components"
          title="Tokenisierte Primitives in Aktion"
          description="Buttons, Inputs, Cards und Status-Chips — alles aufgebaut auf semantischen Tokens, alle Hover-/Aktiv-Zustände aus Layer-3-Tokens."
        >
          <ComponentShowcase />
        </Section>

        {/* Motion */}
        <Section
          eyebrow="Motion"
          title="Der vergessene Token-Layer"
          description="Tailwind v4 macht aus --duration-* und --ease-* Tokens automatisch Utility-Klassen — keine Magic Numbers in Komponenten."
        >
          <MotionShowcase />
        </Section>

        {/* Footer call-out */}
        <Section spacing="expressive" eyebrow="Resultat" title="Skalierbar, konsistent, theme-fähig">
          <Paper variant="brand-bg" elevation={2} padding="comfortable">
            <Typography variant="title-medium" tone="on-brand-bg">
              Ein Token ändern. Alles aktualisiert sich.
            </Typography>
            <Typography variant="body-large" tone="on-brand-bg" pretty>
              Style Drift wird verhindert, weil Komponenten niemals direkt
              Primitives lesen. Dark Mode ist eine reine Layer-2-Operation —
              kein Re-Build, kein Layout-Umbau.
            </Typography>
            <div className="mt-16">
              <NezumiButton variant="elevated">
                Style-Guide ansehen <ArrowRight className="size-16" />
              </NezumiButton>
            </div>
          </Paper>
        </Section>
      </PageLayout>
    </AppShell>
  )
}
