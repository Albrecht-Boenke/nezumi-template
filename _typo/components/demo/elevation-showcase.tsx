import { Paper } from '@/components/nezumi/paper'
import { Typography } from '@/components/typography'
import { cn } from '@/lib/utils'

const SHADOWS: { token: string; cls: string }[] = [
  { token: '--elevation-shadow-sm', cls: 'shadow-sm' },
  { token: '--elevation-shadow-md', cls: 'shadow-md' },
  { token: '--elevation-shadow-lg', cls: 'shadow-lg' },
  { token: '--elevation-shadow-xl', cls: 'shadow-xl' },
  { token: '--elevation-shadow-2xl', cls: 'shadow-2xl' },
]

const RADII: { token: string; cls: string; px: string }[] = [
  { token: '--shape-radius-xs', cls: 'rounded-xs', px: '2px' },
  { token: '--shape-radius-sm (button/badge)', cls: 'rounded-sm', px: '4px' },
  { token: '--shape-radius-md (card/popover)', cls: 'rounded-md', px: '8px' },
  { token: '--shape-radius-lg (paper/dialog)', cls: 'rounded-lg', px: '12px' },
  { token: '--shape-radius-xl (input/modal)', cls: 'rounded-xl', px: '16px' },
  { token: '--shape-radius-2xl', cls: 'rounded-2xl', px: '24px' },
  { token: '--shape-radius-full (chip/avatar)', cls: 'rounded-full', px: '9999px' },
]

export function ElevationShowcase() {
  return (
    <div className="flex flex-col gap-32">
      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Shape · Radius scale
        </Typography>
        <Typography variant="title-medium">
          Hierarchie kommt zuerst aus Surface-Stufen, dann aus Shadows
        </Typography>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-12 mt-8">
          {RADII.map((r) => (
            <div
              key={r.token}
              className={cn(
                'h-80 bg-surface-raised border border-border flex items-end p-12',
                r.cls,
              )}
            >
              <Typography
                variant="label-medium"
                as="span"
                className="font-mono"
              >
                {r.px}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>

      <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
        <Typography variant="label-small" tone="muted">
          Elevation · Shadow scale
        </Typography>
        <Typography variant="title-medium">
          Ruhige Paper-Oberflächen, niemals glossy
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-24 mt-8">
          {SHADOWS.map((s) => (
            <div
              key={s.token}
              className={cn(
                'bg-surface-raised border border-border rounded-md p-16 h-96 flex flex-col justify-end',
                s.cls,
              )}
            >
              <Typography
                variant="label-medium"
                as="span"
                className="font-mono"
              >
                {s.token.replace('--elevation-shadow-', 'shadow-')}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  )
}
