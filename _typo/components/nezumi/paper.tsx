import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Paper — the default generic surface (DESIGN.md §5).
 * Use `Paper` first; reach for `Card` only for explicit object/collection semantics.
 *
 * All visual properties are token-driven; no raw hex, no Tailwind palette.
 */

export type PaperVariant =
  | 'surface'
  | 'surface-muted'
  | 'surface-raised-subtle'
  | 'brand-bg'
  | 'secondary-bg'

export type PaperPadding = 'none' | 'sm' | 'default' | 'comfortable'
export type PaperGap = 'none' | 'default' | 'comfortable'
export type PaperElevation = 0 | 1 | 2

const VARIANT_CLASS: Record<PaperVariant, string> = {
  surface: 'bg-surface text-text',
  'surface-muted': 'bg-surface-muted text-text',
  'surface-raised-subtle': 'bg-surface-raised-subtle text-text',
  'brand-bg': 'bg-brand-bg text-on-brand-bg',
  'secondary-bg': 'bg-secondary-bg text-text',
}

const PADDING_CLASS: Record<PaperPadding, string> = {
  none: 'p-0',
  sm: 'p-12',
  // paper-padding-default: 20px md / 24px lg → use spacing scale
  default: 'p-16 md:p-24',
  // paper-padding-comfortable: 32px md / 40px lg
  comfortable: 'p-24 md:p-32 lg:p-40',
}

const GAP_CLASS: Record<PaperGap, string> = {
  none: 'gap-0',
  default: 'gap-16 md:gap-24',
  comfortable: 'gap-24 md:gap-32',
}

const ELEVATION_CLASS: Record<PaperElevation, string> = {
  0: 'shadow-none',
  1: 'shadow-sm',
  2: 'shadow-md',
}

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PaperVariant
  padding?: PaperPadding
  gap?: PaperGap
  elevation?: PaperElevation
  outlined?: boolean
  /** Stack children vertically with `gap`. Defaults to true. */
  stack?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
  {
    variant = 'surface',
    padding = 'default',
    gap = 'default',
    elevation = 1,
    outlined = false,
    stack = true,
    rounded = 'lg',
    className,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        VARIANT_CLASS[variant],
        PADDING_CLASS[padding],
        stack && 'flex flex-col',
        stack && GAP_CLASS[gap],
        ELEVATION_CLASS[elevation],
        rounded === 'none' && 'rounded-none',
        rounded === 'sm' && 'rounded-sm',
        rounded === 'md' && 'rounded-md',
        rounded === 'lg' && 'rounded-lg',
        rounded === 'xl' && 'rounded-xl',
        outlined && 'border',
        className,
      )}
      {...rest}
    />
  )
})
