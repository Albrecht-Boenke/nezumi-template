'use client'

import { useState } from 'react'
import { Paper } from '@/components/nezumi/paper'
import { NezumiButton } from '@/components/nezumi/button'
import { Typography } from '@/components/typography'
import { cn } from '@/lib/utils'

/**
 * MotionShowcase — Tailwind v4 generates duration- & ease-utilities
 * directly from `--duration-*` / `--ease-*` tokens. Hardcoded timings
 * never appear in app code.
 */

const TIMINGS: { label: string; cls: string; description: string }[] = [
  {
    label: 'fast · 100ms · ease-out',
    cls: 'duration-100 ease-out',
    description: 'Hover-States, Tooltips',
  },
  {
    label: 'normal · 200ms · ease-out',
    cls: 'duration-200 ease-out',
    description: 'Button-Klicks, Dropdowns',
  },
  {
    label: 'slow · 300ms · ease-spring',
    cls: 'duration-300 [transition-timing-function:var(--ease-spring)]',
    description: 'Modals',
  },
  {
    label: 'slower · 500ms · ease-in-out',
    cls: 'duration-500 ease-in-out',
    description: 'Page Transitions',
  },
]

export function MotionShowcase() {
  const [pulse, setPulse] = useState(false)

  return (
    <Paper variant="surface-raised-subtle" elevation={0} padding="comfortable">
      <Typography variant="label-small" tone="muted">
        Motion · Tokens
      </Typography>
      <Typography variant="title-medium">
        Animationen sind Tokens, keine Magic Numbers
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mt-8">
        {TIMINGS.map((t) => (
          <div
            key={t.label}
            className="flex flex-col gap-12 p-16 bg-surface-raised border border-border rounded-md"
          >
            <Typography variant="label-medium" as="span" className="font-mono">
              {t.label}
            </Typography>
            <Typography variant="body-small" tone="muted">
              {t.description}
            </Typography>
            <div
              className={cn(
                'h-32 w-32 rounded-md bg-brand transition-transform',
                t.cls,
                pulse && 'translate-x-32 scale-110',
              )}
              aria-hidden
            />
          </div>
        ))}
      </div>

      <div className="mt-16">
        <NezumiButton variant="outline" onClick={() => setPulse((p) => !p)}>
          {pulse ? 'Zurücksetzen' : 'Animation auslösen'}
        </NezumiButton>
      </div>
    </Paper>
  )
}
