import type React from "react"
import { cn } from "@/lib/utils"
import { JSX } from "react"

// ---------------------------------------------------------------------------
// Lookup maps
// ---------------------------------------------------------------------------

const maxWidthMap: Record<string, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
  prose: "max-w-prose",
}

const paddingMap: Record<string, string> = {
  none: "px-0",
  sm: "px-4",
  md: "px-6 md:px-8",
  lg: "px-8 md:px-12",
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContainerProps = {
  children: React.ReactNode
  className?: string
  /** Maximum width constraint. Defaults to "xl". */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "prose"
  /** Horizontal padding. Defaults to "md". */
  padding?: "none" | "sm" | "md" | "lg"
  /** Center the container horizontally. Defaults to true. */
  centered?: boolean
  /** Semantic HTML element to render. Defaults to "div". */
  as?: keyof JSX.IntrinsicElements
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Container constrains content to a maximum width with consistent padding.
 *
 * It provides responsive horizontal padding and optional centering. Use it
 * to wrap page-level content and ensure consistent margins across breakpoints.
 */
export const Container = ({
  children,
  className,
  maxWidth = "xl",
  padding = "md",
  centered = true,
  as: Component = "div",
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        maxWidthMap[maxWidth],
        paddingMap[padding],
        centered && "mx-auto",
        className,
      )}
    >
      {children}
    </Component>
  )
}
