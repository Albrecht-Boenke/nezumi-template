import * as React from "react"
import { Slot } from "radix-ui"
import { cn, getResponsiveClasses, type Responsive } from "../../lib/utils"

// -----------------------------------------------------------------------------
// Dictionaries (Mapped exactly to Tailwind v4 values)
// -----------------------------------------------------------------------------


const displayMap = {
  none: "hidden",
  grid: "grid",
  "inline-grid": "inline-grid",
} as const

const columnsMap = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
  "3": "grid-cols-3",
  "4": "grid-cols-4",
  "5": "grid-cols-5",
  "6": "grid-cols-6",
  "7": "grid-cols-7",
  "8": "grid-cols-8",
  "9": "grid-cols-9",
  "10": "grid-cols-10",
  "11": "grid-cols-11",
  "12": "grid-cols-12",
} as const

const rowsMap = {
  "1": "grid-rows-1",
  "2": "grid-rows-2",
  "3": "grid-rows-3",
  "4": "grid-rows-4",
  "5": "grid-rows-5",
  "6": "grid-rows-6",
} as const

const gapMap = {
  "0": "gap-0",
  "1": "gap-4",   // 0.25rem
  "2": "gap-8",   // 0.5rem
  "3": "gap-12",  // 0.75rem
  "4": "gap-16",  // 1rem
  "5": "gap-24",  // 1.5rem
  "6": "gap-32",  // 2rem
  "7": "gap-40",  // 2.5rem
  "8": "gap-48",  // 3rem
  "9": "gap-64",  // 4rem
} as const

const flowMap = {
  row: "grid-flow-row",
  col: "grid-flow-col",
  dense: "grid-flow-dense",
  "row-dense": "grid-flow-row-dense",
  "col-dense": "grid-flow-col-dense",
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

// -----------------------------------------------------------------------------
// Component Props
// -----------------------------------------------------------------------------

export interface GridProps extends Omit<React.ComponentProps<"div">, "display"> {
  asChild?: boolean
  display?: Responsive<keyof typeof displayMap>
  columns?: Responsive<keyof typeof columnsMap>
  rows?: Responsive<keyof typeof rowsMap>
  gap?: Responsive<keyof typeof gapMap>
  gapX?: Responsive<keyof typeof gapMap>
  gapY?: Responsive<keyof typeof gapMap>
  flow?: Responsive<keyof typeof flowMap>
  align?: Responsive<keyof typeof alignMap>
  justify?: Responsive<keyof typeof justifyMap>
}

/**
 * Grid component for flexible grid layouts.
 * Drop-in replacement for Radix Themes Grid with Tailwind v4 natively.
 */
function Grid({
  className,
  asChild = false,
  display = "grid",
  columns,
  rows,
  gap,
  gapX,
  gapY,
  flow,
  align,
  justify,
  ref,
  ...props
}: GridProps) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      ref={ref}
      className={cn(
        getResponsiveClasses(display, displayMap),
        getResponsiveClasses(columns, columnsMap),
        getResponsiveClasses(rows, rowsMap),
        getResponsiveClasses(gap, gapMap),
        // Fallback for gapX / gapY overriding standard gap
        gapX && getResponsiveClasses(gapX, gapMap).replace(/gap-/g, "gap-x-"),
        gapY && getResponsiveClasses(gapY, gapMap).replace(/gap-/g, "gap-y-"),
        getResponsiveClasses(flow, flowMap),
        getResponsiveClasses(align, alignMap),
        getResponsiveClasses(justify, justifyMap),
        className
      )}
      {...props}
    />
  )
}

export { Grid }
