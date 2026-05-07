import type React from "react"
import { cn } from "@/lib/utils"
import { JSX } from "react"

// ---------------------------------------------------------------------------
// Lookup maps
// ---------------------------------------------------------------------------

const paddingMap: Record<number, string> = {
  0: "p-0",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
  8: "p-8",
  10: "p-10",
  12: "p-12",
}

const radiusMap: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
}

const variantMap: Record<string, string> = {
  /** Uses --card / --card-foreground tokens — the default content surface */
  card: "bg-card text-card-foreground",
  /** Uses --muted / --muted-foreground tokens — subdued, secondary surface */
  muted: "bg-muted text-muted-foreground",
  /** Uses --accent / --accent-foreground tokens — highlighted surface */
  accent: "bg-accent text-accent-foreground",
  /** Transparent — inherits parent background */
  ghost: "bg-transparent",
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BoxProps = {
  children: React.ReactNode
  className?: string
  /** Semantic HTML element to render. Defaults to "div". */
  as?: keyof JSX.IntrinsicElements
  /** Uniform padding using the Tailwind spacing scale. */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  /** Border radius. Defaults to "md". */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full"
  /** Color surface variant using design tokens. Defaults to "muted". */
  variant?: "card" | "muted" | "accent" | "ghost"
  /** ARIA role for accessibility. */
  role?: React.AriaRole
  /** ARIA label for accessibility when the element has no visible text label. */
  "aria-label"?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Box is a single-element semantic layout primitive.
 *
 * It wraps any content in a consistently padded, themed surface using design
 * tokens rather than hardcoded colors, making it dark-mode aware by default.
 * Use the `as` prop to give it semantic meaning (article, aside, section…)
 * and `variant` to choose the appropriate design-token color surface.
 */
export const Box = ({
  children,
  className,
  as: Component = "div",
  padding = 4,
  radius = "md",
  variant = "muted",
  role,
  "aria-label": ariaLabel,
}: BoxProps) => {
  return (
    <Component
      role={role}
      aria-label={ariaLabel}
      className={cn(
        paddingMap[padding],
        radiusMap[radius],
        variantMap[variant],
        className,
      )}
    >
      {children}
    </Component>
  )
}
