import {
  Typography,
  type TypographyTone,
  type TypographyVariant,
} from "@packages/ui/components/typography"
import type { ReactNode } from "react"

const brandVariants: TypographyVariant[] = [
  "display-large",
  "display-medium",
  "display-small",
  "headline-large",
  "headline-medium",
  "headline-small",
  "title-fluid",
  "body-fluid",
]

const serviceVariants: TypographyVariant[] = [
  "title-large",
  "title-medium",
  "title-small",
  "body-large",
  "body-medium",
  "body-small",
  "label-large",
  "label-medium",
  "label-small",
]

const tones: TypographyTone[] = [
  "default",
  "muted",
  "brand",
  "success",
  "warning",
  "error",
  "info",
]

const sample = "Sicherheit beginnt mit der richtigen Hierarchie."

function VariantRow({ variant }: { variant: TypographyVariant }) {
  return (
    <div className="grid grid-cols-1 gap-12 border-b border-border py-16 last:border-b-0 md:grid-cols-[180px_1fr] md:gap-32">
      <Typography variant="label-medium" tone="muted" className="font-mono">
        {variant}
      </Typography>
      <Typography variant={variant} balance>
        {sample}
      </Typography>
    </div>
  )
}

function TokenCard({
  label,
  title,
  children,
  inverted = false,
}: {
  label: string
  title: string
  children: ReactNode
  inverted?: boolean
}) {
  return (
    <section
      className={
        inverted
          ? "rounded-lg bg-brand p-24 text-on-brand"
          : "rounded-lg border border-border bg-surface-raised p-24"
      }
    >
      <div className="flex flex-col gap-12">
        <Typography variant="label-small" tone={inverted ? "on-brand" : "muted"}>
          {label}
        </Typography>
        <Typography variant="title-medium" tone={inverted ? "on-brand" : "default"}>
          {title}
        </Typography>
        <Typography
          variant="body-medium"
          tone={inverted ? "on-brand" : "muted"}
          pretty
        >
          {children}
        </Typography>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface px-24 py-48 text-text md:px-48 md:py-64">
      <div className="mx-auto flex max-w-7xl flex-col gap-48">
        <section className="grid gap-32 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div className="flex flex-col gap-24">
            <Typography variant="label-small" tone="muted">
              Nezumi Typography
            </Typography>
            <Typography variant="display-large" balance>
              Design Tokens mit klarer Text-Hierarchie.
            </Typography>
          </div>
          <Typography variant="body-fluid" tone="muted" pretty>
            Die Demo nutzt den Typography-Atom aus <code>packages/ui</code>,
            ThemeProvider aus <code>packages/ui/providers</code> und die
            DESIGN.md-Typografie-Tokens aus der zentralen UI-CSS-Schicht.
          </Typography>
        </section>

        <section className="grid gap-16 md:grid-cols-3">
          <TokenCard label="Layer 1" title="Primitive">
            Urbanist, erlaubte Font-Gewichte und Rohwerte werden in
            <code>styles/tokens/typography.css</code> definiert.
          </TokenCard>
          <TokenCard label="Layer 2" title="Semantic">
            Farben und Dark Mode bleiben semantisch: <code>text</code>,
            <code>text-muted</code>, <code>brand</code> und Status-Tones.
          </TokenCard>
          <TokenCard label="Layer 3" title="Component" inverted>
            Die Klassen <code>typography-*</code> leben beim Atom und sind die
            sichtbare Component-Oberfläche für App-Text.
          </TokenCard>
        </section>

        <section className="rounded-lg border border-border bg-surface-raised p-24">
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-8">
              <Typography variant="label-small" tone="muted">
                Brand Mode
              </Typography>
              <Typography variant="headline-medium" balance>
                Fluid scale fuer Homepage und Public Content
              </Typography>
            </div>
            <div>
              {brandVariants.map((variant) => (
                <VariantRow key={variant} variant={variant} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface-raised p-24">
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-8">
              <Typography variant="label-small" tone="muted">
                Service Mode
              </Typography>
              <Typography variant="headline-medium" balance>
                Fixed scale fuer strukturierte Produktoberflaechen
              </Typography>
            </div>
            <div>
              {serviceVariants.map((variant) => (
                <VariantRow key={variant} variant={variant} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface-raised p-24">
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-8">
              <Typography variant="label-small" tone="muted">
                Tones
              </Typography>
              <Typography variant="headline-medium" balance>
                Textfarbe bleibt semantisch
              </Typography>
            </div>
            <div className="grid gap-16 md:grid-cols-3">
              {tones.map((tone) => (
                <Typography key={tone} variant="body-large" tone={tone}>
                  tone={tone}
                </Typography>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
