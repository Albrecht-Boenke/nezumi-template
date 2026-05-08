import { forwardRef, type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Typography
 * ----------
 * A single font component that consumes the typography tokens from
 * DESIGN.md §3 (`display-*`, `headline-*`, `title-*`, `body-*`, `label-*`).
 *
 * Why this component exists:
 * - DESIGN.md forbids raw `<h1>…<h6>`, `<p>`, `<span>` in app-level UI.
 * - Tokens are exposed only as CSS classes (`.typography-*`) — picking
 *   the right one for every node is brittle. This component does it for you.
 * - Each variant has a sensible default semantic tag (`h1`, `p`, `span`, …)
 *   that can be overridden via `as` for accessibility (e.g. visually a
 *   `display-large` rendered as an `<h2>` inside a sub-section).
 *
 * Layer alignment (per the tokens doc):
 *   primitives  →  --font-weight-*, font-family, sizes/clamps in CSS
 *   semantic    →  --color-text, --color-text-muted (via `tone`)
 *   component   →  this React component (Layer 3 surface for typography)
 */

export type TypographyVariant =
  // Brand Mode — fluid scale
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-fluid'
  | 'body-fluid'
  // Service Mode — fixed scale
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small'

export type TypographyTone =
  | 'default'
  | 'muted'
  | 'brand'
  | 'on-brand'
  | 'on-brand-bg'
  | 'on-error'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

const VARIANT_CLASS: Record<TypographyVariant, string> = {
  'display-large': 'typography-display-large',
  'display-medium': 'typography-display-medium',
  'display-small': 'typography-display-small',
  'headline-large': 'typography-headline-large',
  'headline-medium': 'typography-headline-medium',
  'headline-small': 'typography-headline-small',
  'title-fluid': 'typography-title-fluid',
  'body-fluid': 'typography-body-fluid',
  'title-large': 'typography-title-large',
  'title-medium': 'typography-title-medium',
  'title-small': 'typography-title-small',
  'body-large': 'typography-body-large',
  'body-medium': 'typography-body-medium',
  'body-small': 'typography-body-small',
  'label-large': 'typography-label-large',
  'label-medium': 'typography-label-medium',
  'label-small': 'typography-label-small',
}

/** Sensible default element per variant. Override with `as`. */
const VARIANT_DEFAULT_TAG: Record<TypographyVariant, ElementType> = {
  'display-large': 'h1',
  'display-medium': 'h1',
  'display-small': 'h2',
  'headline-large': 'h2',
  'headline-medium': 'h3',
  'headline-small': 'h4',
  'title-fluid': 'h3',
  'body-fluid': 'p',
  'title-large': 'h1',
  'title-medium': 'h2',
  'title-small': 'h3',
  'body-large': 'p',
  'body-medium': 'p',
  'body-small': 'p',
  'label-large': 'span',
  'label-medium': 'span',
  'label-small': 'span',
}

const TONE_CLASS: Record<TypographyTone, string> = {
  default: 'text-text',
  muted: 'text-text-muted',
  brand: 'text-brand',
  'on-brand': 'text-on-brand',
  'on-brand-bg': 'text-on-brand-bg',
  'on-error': 'text-on-error',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
}

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant
  tone?: TypographyTone
  /** Override the default semantic element for this variant. */
  as?: ElementType
  /** Adds `text-balance` — recommended for headings/titles. */
  balance?: boolean
  /** Adds `text-pretty` — recommended for body copy. */
  pretty?: boolean
  /** Truncate to a single line with ellipsis. */
  truncate?: boolean
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    {
      variant,
      tone = 'default',
      as,
      balance,
      pretty,
      truncate,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const Component = (as ?? VARIANT_DEFAULT_TAG[variant]) as ElementType

    return (
      <Component
        ref={ref}
        className={cn(
          VARIANT_CLASS[variant],
          TONE_CLASS[tone],
          balance && 'text-balance',
          pretty && 'text-pretty',
          truncate && 'truncate',
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    )
  },
)
