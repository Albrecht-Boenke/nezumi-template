import { Paper } from '@/components/nezumi/paper'
import { Typography } from '@/components/typography'
import { cn } from '@/lib/utils'

/**
 * ColorShowcase — visualises Layer 1 (primitives) and Layer 2 (semantic).
 *
 * Important rule from DESIGN.md §2:
 *   "App TSX uses semantic Tailwind classes only — no raw hex,
 *    no Tailwind default palette."
 *
 * Notice every swatch uses semantic utilities like `bg-brand`, `bg-surface`, etc.
 * Primitive previews use the namespaced `bg-nezumi-*` utilities — allowed only
 * here for documentation purposes.
 */

const PRIMITIVES: { token: string; cls: string; hex: string }[] = [
  { token: 'sabi', cls: 'bg-nezumi-sabi', hex: '#47585c' },
  { token: 'minato', cls: 'bg-nezumi-minato', hex: '#80989b' },
  { token: 'ume', cls: 'bg-nezumi-ume', hex: '#c099a0' },
  { token: 'sakura', cls: 'bg-nezumi-sakura', hex: '#e9dfe5' },
  { token: 'fuji', cls: 'bg-nezumi-fuji', hex: '#a6a5c4' },
  { token: 'kinu', cls: 'bg-nezumi-kinu', hex: '#dddcd6' },
  { token: 'genji', cls: 'bg-nezumi-genji', hex: '#888084' },
  { token: 'koi', cls: 'bg-nezumi-koi', hex: '#4f455c' },
  { token: 'akatsuki', cls: 'bg-nezumi-akatsuki', hex: '#d3cfd9' },
  { token: 'fukagawa', cls: 'bg-nezumi-fukagawa', hex: '#97a791' },
  { token: 'fukagawa-deep', cls: 'bg-nezumi-fukagawa-deep', hex: '#4d6e47' },
  { token: 'cha', cls: 'bg-nezumi-cha', hex: '#a99e93' },
  { token: 'budo', cls: 'bg-nezumi-budo', hex: '#705b67' },
  { token: 'chigusa', cls: 'bg-nezumi-chigusa', hex: '#bed3ca' },
  { token: 'paper', cls: 'bg-nezumi-paper', hex: '#faf9f5' },
  { token: 'line', cls: 'bg-nezumi-line', hex: '#d4d3cf' },
]

const SEMANTIC_FG: { token: string; cls: string; on: string }[] = [
  { token: '--color-brand', cls: 'bg-brand', on: 'text-on-brand' },
  { token: '--color-brand-bg', cls: 'bg-brand-bg', on: 'text-on-brand-bg' },
  { token: '--color-secondary', cls: 'bg-secondary', on: 'text-on-secondary' },
  { token: '--color-secondary-bg', cls: 'bg-secondary-bg', on: 'text-text' },
  { token: '--color-accent', cls: 'bg-accent', on: 'text-text' },
]

const SEMANTIC_SURFACE: { token: string; cls: string }[] = [
  { token: '--color-surface', cls: 'bg-surface' },
  { token: '--color-surface-raised', cls: 'bg-surface-raised' },
  { token: '--color-surface-raised-subtle', cls: 'bg-surface-raised-subtle' },
  { token: '--color-surface-muted', cls: 'bg-surface-muted' },
]

const STATUS: { token: string; bg: string; fg: string; label: string }[] = [
  {
    token: '--color-success',
    bg: 'bg-success-bg',
    fg: 'text-success',
    label: 'Aktiv',
  },
  {
    token: '--color-warning',
    bg: 'bg-warning-bg',
    fg: 'text-warning',
    label: 'Wartung',
  },
  {
    token: '--color-error',
    bg: 'bg-error-bg',
    fg: 'text-error',
    label: 'Fehler',
  },
  {
    token: '--color-info',
    bg: 'bg-info-bg',
    fg: 'text-info',
    label: 'Hinweis',
  },
]

function Swatch({
  className,
  label,
  sub,
  bordered = false,
}: {
  className: string
  label: string
  sub?: string
  bordered?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 p-16 rounded-md min-h-80 justify-end',
        className,
        bordered && 'border border-border',
      )}
    >
      <Typography variant="label-medium" as="span" className="font-mono">
        {label}
      </Typography>
      {sub && (
        <Typography variant="body-small" tone="muted" className="font-mono">
          {sub}
        </Typography>
      )}
    </div>
  )
}

export function ColorShowcase() {
  return (
    <div className="flex flex-col gap-32">
      {/* Layer 1: primitives */}
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Layer 1 · Primitives
        </Typography>
        <Typography variant="title-medium">
          Nezumi Farbpalette · OKLCH von SSOT-Hex
        </Typography>
        <Typography variant="body-medium" tone="muted" pretty>
          Rohwerte ohne semantische Bedeutung. Komponenten greifen niemals
          direkt auf diese Tokens zu.
        </Typography>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-12 mt-8">
          {PRIMITIVES.map((p) => (
            <Swatch
              key={p.token}
              className={p.cls}
              label={p.token}
              sub={p.hex}
              bordered={p.token === 'paper' || p.token === 'line'}
            />
          ))}
        </div>
      </Paper>

      {/* Layer 2: semantic — foreground + on-* pairs */}
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Layer 2 · Semantic · Brand & Accent
        </Typography>
        <Typography variant="title-medium">
          Zweck-gebundene Aliase mit korrekten On-Color-Paaren
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mt-8">
          {SEMANTIC_FG.map((s) => (
            <div
              key={s.token}
              className={cn(
                'rounded-md p-16 min-h-96 flex flex-col justify-between gap-8',
                s.cls,
              )}
            >
              <Typography variant="label-small" as="span" className={s.on}>
                Aa Beispiel
              </Typography>
              <Typography
                variant="body-small"
                as="span"
                className={cn(s.on, 'font-mono opacity-80')}
              >
                {s.token}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>

      {/* Layer 2: semantic — surfaces */}
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Layer 2 · Semantic · Surfaces
        </Typography>
        <Typography variant="title-medium">
          Tonale Hierarchie vor Borders
        </Typography>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-8">
          {SEMANTIC_SURFACE.map((s) => (
            <Swatch
              key={s.token}
              className={cn(s.cls, 'border border-border text-text')}
              label={s.token}
            />
          ))}
        </div>
      </Paper>

      {/* Status mixes */}
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Layer 2 · Status Mixes (color-mix)
        </Typography>
        <Typography variant="title-medium">
          12 % im Light Mode, 25 % im Dark Mode
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-8">
          {STATUS.map((s) => (
            <div
              key={s.token}
              className={cn(
                'flex items-center justify-between rounded-md p-16 border border-border/60',
                s.bg,
              )}
            >
              <Typography
                variant="label-large"
                as="span"
                className={s.fg}
              >
                {s.label}
              </Typography>
              <Typography
                variant="body-small"
                as="span"
                className={cn(s.fg, 'font-mono opacity-80')}
              >
                {s.token}-bg
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  )
}
