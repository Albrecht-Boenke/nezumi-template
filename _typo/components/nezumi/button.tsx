import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button — DESIGN.md §5.
 *  - radius: 4px (var(--shape-radius-button))
 *  - min effective touch target: 44px (var(--touch-target-min))
 *  - focus: token-driven (`:focus-visible` ring inherited from base)
 *  - no pill buttons (no rounded-full)
 *
 * Hover/active colors come from Layer-3 tokens (--color-button-*-hover/active),
 * defined as `color-mix()` on top of semantic primitives.
 */

export type NezumiButtonVariant =
  | 'default'
  | 'tonal'
  | 'outline'
  | 'ghost'
  | 'elevated'
  | 'destructive'
  | 'link'

export type NezumiButtonSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl'

const VARIANT_CLASS: Record<NezumiButtonVariant, string> = {
  default:
    'bg-brand text-on-brand hover:bg-[var(--color-button-brand-hover)] active:bg-[var(--color-button-brand-active)] shadow-sm',
  tonal:
    'bg-secondary text-on-secondary hover:bg-[var(--color-button-secondary-hover)]',
  outline:
    'bg-transparent text-text border border-border hover:bg-surface-raised-subtle',
  ghost:
    'bg-transparent text-brand hover:bg-[var(--color-button-ghost-hover)]',
  elevated:
    'bg-surface-raised text-brand shadow-sm hover:shadow-md',
  destructive:
    'bg-error text-on-error hover:bg-[var(--color-button-destructive-hover)] shadow-sm',
  link: 'bg-transparent text-brand underline underline-offset-4 hover:text-[var(--color-button-brand-hover)] px-0',
}

const SIZE_CLASS: Record<NezumiButtonSize, string> = {
  xs: 'h-24 px-12 typography-label-medium',
  sm: 'h-32 px-16 typography-label-large',
  default: 'h-40 px-24 typography-label-large',
  lg: 'h-48 px-32 typography-label-large',
  xl: 'h-56 px-40 typography-label-large',
}

export interface NezumiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NezumiButtonVariant
  size?: NezumiButtonSize
  /** Render as a full-width block button. */
  block?: boolean
}

export const NezumiButton = forwardRef<HTMLButtonElement, NezumiButtonProps>(
  function NezumiButton(
    {
      variant = 'default',
      size = 'default',
      block = false,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          // base — radius 4px (button), motion via tokens, min touch target on the
          // smaller sizes is achieved through padding-driven hit area.
          'inline-flex items-center justify-center gap-8 rounded-sm whitespace-nowrap select-none',
          'transition-colors duration-200 ease-out',
          'disabled:opacity-50 disabled:pointer-events-none',
          // ensure 44px minimum effective touch surface on small visual sizes
          (size === 'xs' || size === 'sm') &&
            'relative before:absolute before:inset-0 before:-my-12 before:content-[""]',
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          block && 'w-full',
          className,
        )}
        {...rest}
      />
    )
  },
)
