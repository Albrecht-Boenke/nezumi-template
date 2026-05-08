import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/typography'

/**
 * Page composition primitives (DESIGN.md §5).
 *   AppShell -> PageLayout -> Section
 *   Route header primitive: PageHeader
 *
 * No Container, Stack, HStack, VStack — layout uses static spans on a 4/8/12 grid.
 */

/* ------------------------------------------------------------ AppShell */
export const AppShell = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function AppShell({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('min-h-dvh bg-surface text-text', className)}
        {...rest}
      />
    )
  },
)

/* ----------------------------------------------------------- PageLayout */
export interface PageLayoutProps extends HTMLAttributes<HTMLElement> {
  /** Top padding budget (matches header chrome). */
  topPadding?: 'mobile' | 'tablet' | 'desktop'
}

export const PageLayout = forwardRef<HTMLElement, PageLayoutProps>(
  function PageLayout({ topPadding = 'desktop', className, ...rest }, ref) {
    const top =
      topPadding === 'mobile'
        ? 'pt-80'
        : topPadding === 'tablet'
          ? 'pt-96'
          : 'pt-80 md:pt-96 lg:pt-128'
    return (
      <main
        ref={ref}
        className={cn(
          'mx-auto w-full max-w-[1280px] px-16 md:px-32 lg:px-48 pb-96',
          top,
          className,
        )}
        {...rest}
      />
    )
  },
)

/* ----------------------------------------------------------- PageHeader */
export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  function PageHeader(
    { eyebrow, title, description, actions, className, ...rest },
    ref,
  ) {
    return (
      <header
        ref={ref}
        className={cn(
          'flex flex-col md:flex-row md:items-end md:justify-between gap-24 pb-32 border-b border-border',
          className,
        )}
        {...rest}
      >
        <div className="flex flex-col gap-8">
          {eyebrow && (
            <Typography variant="label-small" tone="muted">
              {eyebrow}
            </Typography>
          )}
          <Typography variant="title-large" balance>
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body-medium"
              tone="muted"
              pretty
              className="max-w-[768px]"
            >
              {description}
            </Typography>
          )}
        </div>
        {actions && <div className="flex items-center gap-12">{actions}</div>}
      </header>
    )
  },
)

/* -------------------------------------------------------------- Section */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: ReactNode
  title?: ReactNode
  description?: ReactNode
  /** Visual rhythm between sections. */
  spacing?: 'default' | 'expressive'
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { eyebrow, title, description, spacing = 'default', className, children, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      className={cn(
        'flex flex-col gap-32',
        spacing === 'default' ? 'mt-48 md:mt-80 lg:mt-96' : 'mt-48 md:mt-64 lg:mt-80',
        className,
      )}
      {...rest}
    >
      {(eyebrow || title || description) && (
        <div className="flex flex-col gap-8">
          {eyebrow && (
            <Typography variant="label-small" tone="muted">
              {eyebrow}
            </Typography>
          )}
          {title && (
            <Typography variant="title-large" balance>
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant="body-medium"
              tone="muted"
              pretty
              className="max-w-[768px]"
            >
              {description}
            </Typography>
          )}
        </div>
      )}
      {children}
    </section>
  )
})
