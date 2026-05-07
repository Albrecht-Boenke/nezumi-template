import type React from "react"
import { cn } from "@/lib/utils"
import { JSX } from "react"

// ---------------------------------------------------------------------------
// Lookup maps — all class strings are static so Tailwind v4's scanner picks
// them up correctly without needing safelists.
// ---------------------------------------------------------------------------

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
}

const smColsMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  7: "sm:grid-cols-7",
  8: "sm:grid-cols-8",
  9: "sm:grid-cols-9",
  10: "sm:grid-cols-10",
  11: "sm:grid-cols-11",
  12: "sm:grid-cols-12",
}

const mdColsMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  7: "md:grid-cols-7",
  8: "md:grid-cols-8",
  9: "md:grid-cols-9",
  10: "md:grid-cols-10",
  11: "md:grid-cols-11",
  12: "md:grid-cols-12",
}

const lgColsMap: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
  8: "lg:grid-cols-8",
  9: "lg:grid-cols-9",
  10: "lg:grid-cols-10",
  11: "lg:grid-cols-11",
  12: "lg:grid-cols-12",
}

const xlColsMap: Record<number, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
  7: "xl:grid-cols-7",
  8: "xl:grid-cols-8",
  9: "xl:grid-cols-9",
  10: "xl:grid-cols-10",
  11: "xl:grid-cols-11",
  12: "xl:grid-cols-12",
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

const rowGapMap: Record<number, string> = {
  0: "gap-y-0",
  1: "gap-y-1",
  2: "gap-y-2",
  3: "gap-y-3",
  4: "gap-y-4",
  5: "gap-y-5",
  6: "gap-y-6",
  8: "gap-y-8",
  10: "gap-y-10",
  12: "gap-y-12",
  16: "gap-y-16",
}

const colGapMap: Record<number, string> = {
  0: "gap-x-0",
  1: "gap-x-1",
  2: "gap-x-2",
  3: "gap-x-3",
  4: "gap-x-4",
  5: "gap-x-5",
  6: "gap-x-6",
  8: "gap-x-8",
  10: "gap-x-10",
  12: "gap-x-12",
  16: "gap-x-16",
}

const rowsMap: Record<number, string> = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
}

const flowMap: Record<string, string> = {
  row: "grid-flow-row",
  col: "grid-flow-col",
  dense: "grid-flow-dense",
  "row-dense": "grid-flow-row-dense",
  "col-dense": "grid-flow-col-dense",
}

const autoRowsMap: Record<string, string> = {
  auto: "auto-rows-auto",
  min: "auto-rows-min",
  max: "auto-rows-max",
  fr: "auto-rows-fr",
}

const autoColsMap: Record<string, string> = {
  auto: "auto-cols-auto",
  min: "auto-cols-min",
  max: "auto-cols-max",
  fr: "auto-cols-fr",
}

// justify-content — aligns the entire column track group within the container
const justifyMap: Record<string, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

// justify-items — aligns individual cells within their column tracks
const justifyItemsMap: Record<string, string> = {
  start: "justify-items-start",
  end: "justify-items-end",
  center: "justify-items-center",
  stretch: "justify-items-stretch",
}

const itemsMap: Record<string, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

export type GridProps = {
  children: React.ReactNode
  className?: string
  /** Base column count (mobile-first) */
  cols?: ColCount
  /** Column count at ≥640px (sm breakpoint) */
  smCols?: ColCount
  /** Column count at ≥768px (md breakpoint) */
  mdCols?: ColCount
  /** Column count at ≥1024px (lg breakpoint) */
  lgCols?: ColCount
  /** Column count at ≥1280px (xl breakpoint) */
  xlCols?: ColCount
  gap?: GapSize
  rowGap?: GapSize
  colGap?: GapSize
  flow?: "row" | "col" | "dense" | "row-dense" | "col-dense"
  rows?: 1 | 2 | 3 | 4 | 5 | 6
  autoRows?: "auto" | "min" | "max" | "fr"
  autoCols?: "auto" | "min" | "max" | "fr"
  /** justify-content: aligns column tracks within the container */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  /** justify-items: aligns individual cells within their column track */
  justifyItems?: "start" | "end" | "center" | "stretch"
  items?: "start" | "end" | "center" | "baseline" | "stretch"
  as?: keyof JSX.IntrinsicElements
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Grid = ({
  children,
  className,
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  xlCols,
  gap = 4,
  rowGap,
  colGap,
  flow,
  rows,
  autoRows,
  autoCols,
  justify,
  justifyItems,
  items,
  as: Component = "div",
}: GridProps) => {
  const gridClasses = cn(
    "grid",
    colsMap[cols],
    smCols !== undefined && smColsMap[smCols],
    mdCols !== undefined && mdColsMap[mdCols],
    lgCols !== undefined && lgColsMap[lgCols],
    xlCols !== undefined && xlColsMap[xlCols],
    gapMap[gap],
    rowGap !== undefined && rowGapMap[rowGap],
    colGap !== undefined && colGapMap[colGap],
    flow !== undefined && flowMap[flow],
    rows !== undefined && rowsMap[rows],
    autoRows !== undefined && autoRowsMap[autoRows],
    autoCols !== undefined && autoColsMap[autoCols],
    justify !== undefined && justifyMap[justify],
    justifyItems !== undefined && justifyItemsMap[justifyItems],
    items !== undefined && itemsMap[items],
    className,
  )

  return <Component className={gridClasses}>{children}</Component>
}
