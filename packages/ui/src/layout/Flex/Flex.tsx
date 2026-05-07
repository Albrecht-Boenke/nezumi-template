import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn, getResponsiveClasses, type Responsive } from "../../lib/utils"

// -----------------------------------------------------------------------------
// Dictionaries (Mapped exactly to Tailwind v4 values)
// -----------------------------------------------------------------------------

const displayMap = {
  none: "hidden",
  flex: "flex",
  "inline-flex": "inline-flex",
} as const

const directionMap = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
} as const

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
} as const

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const

const wrapMap = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
} as const

const gapMap = {
  "0": "gap-0",
  "1": "gap-4",
  "2": "gap-8",
  "3": "gap-12",
  "4": "gap-16",
  "5": "gap-24",
  "6": "gap-32",
  "7": "gap-40",
  "8": "gap-48",
  "9": "gap-64",
} as const

// -----------------------------------------------------------------------------
// Component Props
// -----------------------------------------------------------------------------

export interface FlexProps extends Omit<React.ComponentProps<"div">, "display" | "direction"> {
  asChild?: boolean
  display?: Responsive<keyof typeof displayMap>
  direction?: Responsive<keyof typeof directionMap>
  align?: Responsive<keyof typeof alignMap>
  justify?: Responsive<keyof typeof justifyMap>
  wrap?: Responsive<keyof typeof wrapMap>
  gap?: Responsive<keyof typeof gapMap>
  gapX?: Responsive<keyof typeof gapMap>
  gapY?: Responsive<keyof typeof gapMap>
}

/**
 * Flex component for flexible box layouts.
 * Drop-in replacement for Radix Themes Flex with Tailwind v4 natively.
 */
function Flex({
  className,
  asChild = false,
  display = "flex",
  direction = "row",
  align,
  justify,
  wrap,
  gap,
  gapX,
  gapY,
  ref,
  ...props
}: FlexProps) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      className={cn(
        getResponsiveClasses(display, displayMap),
        getResponsiveClasses(direction, directionMap),
        getResponsiveClasses(align, alignMap),
        getResponsiveClasses(justify, justifyMap),
        getResponsiveClasses(wrap, wrapMap),
        getResponsiveClasses(gap, gapMap),
        // Fallback for gapX / gapY overriding standard gap
        gapX && getResponsiveClasses(gapX, gapMap).replace(/gap-/g, "gap-x-"),
        gapY && getResponsiveClasses(gapY, gapMap).replace(/gap-/g, "gap-y-"),
        className
      )}
      {...props}
    />
  )
}

export { Flex }
