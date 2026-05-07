import type React from "react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Lookup maps
// ---------------------------------------------------------------------------

const spacingMap: Record<string, string> = {
  none: "py-0",
  sm: "py-6 md:py-8",
  md: "py-10 md:py-14",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SectionProps = {
  children: React.ReactNode
  className?: string
  /** Vertical padding size. Defaults to "md". */
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
  /** Section title rendered as h2. */
  title?: string
  /** Section description rendered below the title. */
  description?: string
  /** ARIA label for accessibility when no visible title. */
  "aria-label"?: string
  /** Optional ID for anchor linking. */
  id?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Section is a semantic wrapper for page sections.
 *
 * It renders as a <section> element with consistent vertical spacing and
 * optional title/description. Use it to organize page content into logical
 * groups with proper accessibility structure.
 */
export const Section = ({
  children,
  className,
  spacing = "md",
  title,
  description,
  "aria-label": ariaLabel,
  id,
}: SectionProps) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(spacingMap[spacing], className)}
    >
      {(title || description) && (
        <header className="mb-8">
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  )
}
