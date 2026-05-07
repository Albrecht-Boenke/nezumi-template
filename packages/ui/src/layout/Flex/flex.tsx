import type React from "react"
import { cn } from "@/lib/utils"
import { JSX } from "react"

// ---------------------------------------------------------------------------
// Lookup maps — static class strings for Tailwind v4 scanner compatibility.
// ---------------------------------------------------------------------------

const directionMap: Record<string, string> = {
  row: "flex-row",
  col: "flex-col",
  "row-reverse": "flex-row-reverse",
  "col-reverse": "flex-col-reverse",
}

const mdDirectionMap: Record<string, string> = {
  row: "md:flex-row",
  col: "md:flex-col",
  "row-reverse": "md:flex-row-reverse",
  "col-reverse": "md:flex-col-reverse",
}

const lgDirectionMap: Record<string, string> = {
  row: "lg:flex-row",
  col: "lg:flex-col",
  "row-reverse": "lg:flex-row-reverse",
  "col-reverse": "lg:flex-col-reverse",
}

const wrapMap: Record<string, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
}

const justifyMap: Record<string, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

const itemsMap: Record<string, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
}

const gapMap: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
}

const basisMap: Record<string, string> = {
  auto: "basis-auto",
  "0": "basis-0",
  "1": "basis-1",
  full: "basis-full",
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Direction = "row" | "col" | "row-reverse" | "col-reverse"
type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

export type FlexProps = {
  children: React.ReactNode
  className?: string
  /** Base flex direction (mobile-first) */
  direction?: Direction
  /** Flex direction at ≥768px (md breakpoint) — useful for col→row stacking */
  mdDirection?: Direction
  /** Flex direction at ≥1024px (lg breakpoint) */
  lgDirection?: Direction
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  items?: "start" | "end" | "center" | "baseline" | "stretch"
  gap?: GapSize
  grow?: boolean
  shrink?: boolean
  basis?: "auto" | "0" | "1" | "full"
  as?: keyof JSX.IntrinsicElements
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Flex = ({
  children,
  className,
  direction = "row",
  mdDirection,
  lgDirection,
  wrap = "nowrap",
  justify = "start",
  items = "start",
  gap = 0,
  grow = false,
  shrink = false,
  basis,
  as: Component = "div",
}: FlexProps) => {
  const flexClasses = cn(
    "flex",
    directionMap[direction],
    mdDirection !== undefined && mdDirectionMap[mdDirection],
    lgDirection !== undefined && lgDirectionMap[lgDirection],
    wrapMap[wrap],
    justifyMap[justify],
    itemsMap[items],
    gapMap[gap],
    grow && "grow",
    shrink && "shrink",
    basis !== undefined && basisMap[basis],
    className,
  )

  return <Component className={flexClasses}>{children}</Component>
}
