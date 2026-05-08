import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/typography'

/**
 * Input — DESIGN.md §5.
 *  - height: 56px
 *  - radius: 16px (var(--shape-radius-input))
 *  - horizontal padding: 16px
 *  - typography: body-large
 *  - border: 1px solid var(--color-border); hover: var(--color-text); error: var(--color-error)
 *  - caret: brand by default, error in invalid state
 */

export interface NezumiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode
  description?: ReactNode
  errorText?: ReactNode
  invalid?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export const NezumiInput = forwardRef<HTMLInputElement, NezumiInputProps>(
  function NezumiInput(
    {
      label,
      description,
      errorText,
      invalid = false,
      leadingIcon,
      trailingIcon,
      className,
      id,
      disabled,
      ...rest
    },
    ref,
  ) {
    const reactId = useId()
    const inputId = id ?? reactId
    const descId = description ? `${inputId}-desc` : undefined
    const errId = errorText ? `${inputId}-err` : undefined
    const isError = invalid || Boolean(errorText)

    return (
      <div className="flex flex-col gap-8">
        <label htmlFor={inputId}>
          <Typography variant="label-large" as="span">
            {label}
          </Typography>
        </label>

        <div
          className={cn(
            'flex items-center h-56 px-16 gap-12 bg-surface rounded-xl border',
            'transition-colors duration-200 ease-out',
            isError
              ? 'border-error caret-[var(--color-error)]'
              : 'border-border hover:border-[var(--color-input-hover-border)] caret-[var(--color-brand)]',
            disabled && 'bg-surface-muted opacity-60 pointer-events-none',
          )}
        >
          {leadingIcon && (
            <span className="text-text-muted shrink-0" aria-hidden>
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={isError || undefined}
            aria-describedby={cn(descId, errId) || undefined}
            className={cn(
              'flex-1 bg-transparent outline-none border-0 typography-body-large text-text',
              'placeholder:text-text-muted',
              className,
            )}
            {...rest}
          />
          {trailingIcon && (
            <span className="text-text-muted shrink-0" aria-hidden>
              {trailingIcon}
            </span>
          )}
        </div>

        {description && !errorText && (
          <Typography id={descId} variant="body-small" tone="muted">
            {description}
          </Typography>
        )}
        {errorText && (
          <Typography id={errId} variant="body-small" tone="error" role="alert">
            {errorText}
          </Typography>
        )}
      </div>
    )
  },
)
