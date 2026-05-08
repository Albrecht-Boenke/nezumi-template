import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Card — DESIGN.md §5.
 * Use ONLY for discrete objects, options, previews, or repeated card collections.
 * For generic surfaces, prefer <Paper>.
 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { elevated = false, interactive = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface-raised text-text border border-border rounded-md',
        elevated && 'shadow-sm',
        interactive &&
          'transition-shadow duration-200 ease-out hover:shadow-md focus-within:shadow-md cursor-pointer',
        className,
      )}
      {...rest}
    />
  )
})

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-4 p-24 pb-12', className)}
        {...rest}
      />
    )
  },
)

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...rest }, ref) {
    return <div ref={ref} className={cn('px-24 pb-12', className)} {...rest} />
  },
)

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-end gap-12 p-24 pt-12 border-t border-border',
          className,
        )}
        {...rest}
      />
    )
  },
)
