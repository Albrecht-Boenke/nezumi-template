import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Status chip / Badge — DESIGN.md §5.
 *  - chips may use radius-full
 *  - status chips use semantic background tokens, not saturated fills
 */

export type StatusTone = 'neutral' | 'success' | 'warning' | 'error' | 'info'

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: 'bg-surface-raised-subtle text-text',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  error: 'bg-error-bg text-error',
  info: 'bg-info-bg text-info',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone
  /** chip = pill (radius-full), badge = rectangular (radius-sm). */
  shape?: 'chip' | 'badge'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', shape = 'chip', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-4 px-12 h-24 typography-label-medium border border-border/60',
        shape === 'chip' ? 'rounded-full' : 'rounded-sm',
        TONE_CLASS[tone],
        className,
      )}
      {...rest}
    />
  )
})
