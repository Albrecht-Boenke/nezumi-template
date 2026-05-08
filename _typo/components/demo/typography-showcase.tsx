import { Paper } from '@/components/nezumi/paper'
import { Typography, type TypographyVariant } from '@/components/typography'

/**
 * TypographyShowcase
 *
 * Demonstrates the Typography component consuming every token defined in
 * DESIGN.md §3. The component:
 *   1. picks a sensible semantic tag per variant (overridable via `as`)
 *   2. exposes tones that are themselves Layer-2 tokens (text/text-muted/brand/…)
 *   3. removes the need to remember which class maps to which scale
 */

const BRAND_VARIANTS: TypographyVariant[] = [
  'display-large',
  'display-medium',
  'display-small',
  'headline-large',
  'headline-medium',
  'headline-small',
  'title-fluid',
  'body-fluid',
]

const SERVICE_VARIANTS: TypographyVariant[] = [
  'title-large',
  'title-medium',
  'title-small',
  'body-large',
  'body-medium',
  'body-small',
  'label-large',
  'label-medium',
  'label-small',
]

const SAMPLE = 'Sicherheit beginnt mit der richtigen Hierarchie.'

function Row({ variant }: { variant: TypographyVariant }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12 md:gap-32 py-16 border-b border-border last:border-b-0">
      <Typography variant="label-medium" tone="muted" className="font-mono">
        {variant}
      </Typography>
      <Typography variant={variant} balance>
        {SAMPLE}
      </Typography>
    </div>
  )
}

export function TypographyShowcase() {
  return (
    <div className="flex flex-col gap-32">
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Brand Mode · Fluid scale
        </Typography>
        <Typography variant="title-medium">
          Editorial, asymmetrisch, kinematisch
        </Typography>
        <Typography variant="body-medium" tone="muted" pretty>
          Verwendet auf Homepage, Kampagnen und Long-Form Public Pages. Größen
          skalieren via <span className="font-mono">clamp()</span>.
        </Typography>

        <div className="mt-8">
          {BRAND_VARIANTS.map((v) => (
            <Row key={v} variant={v} />
          ))}
        </div>
      </Paper>

      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Service Mode · Fixed scale
        </Typography>
        <Typography variant="title-medium">
          Strukturiert, ruhig, token-gesteuert
        </Typography>
        <Typography variant="body-medium" tone="muted" pretty>
          Eingesetzt in Members und Operations. Pixel-genaue Größen statt
          fluider Skala — verlässliche Datendichte.
        </Typography>

        <div className="mt-8">
          {SERVICE_VARIANTS.map((v) => (
            <Row key={v} variant={v} />
          ))}
        </div>
      </Paper>

      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Tones
        </Typography>
        <Typography variant="title-medium">
          Tones sind ebenfalls Tokens
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 mt-8">
          <Typography variant="body-large" tone="default">
            tone=default
          </Typography>
          <Typography variant="body-large" tone="muted">
            tone=muted
          </Typography>
          <Typography variant="body-large" tone="brand">
            tone=brand
          </Typography>
          <Typography variant="body-large" tone="success">
            tone=success
          </Typography>
          <Typography variant="body-large" tone="warning">
            tone=warning
          </Typography>
          <Typography variant="body-large" tone="error">
            tone=error
          </Typography>
        </div>
      </Paper>
    </div>
  )
}
