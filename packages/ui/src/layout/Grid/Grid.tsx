import type { CSSProperties } from "react"
import {
  cn,
  getDimensionClassesAndStyles,
  getLayoutSpacingClasses,
  getResponsiveAlignmentClasses,
  getResponsiveDisplayClass,
  getSpacingClasses,
} from "../utils"
import type {
  GridAutoFlow,
  GridProps,
  ResponsiveValue,
} from "../types"

type Breakpoint = "initial" | "sm" | "md" | "lg" | "xl" | "2xl"
type TrackCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type TemplateValue = number | string
type GridStyle = CSSProperties & Record<`--nz-grid-${string}`, string>

const COLUMN_CLASSES: Record<Breakpoint, Record<TrackCount, string>> = {
  initial: {
    1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3",
    4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6",
    7: "grid-cols-7", 8: "grid-cols-8", 9: "grid-cols-9",
    10: "grid-cols-10", 11: "grid-cols-11", 12: "grid-cols-12",
  },
  sm: {
    1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3",
    4: "sm:grid-cols-4", 5: "sm:grid-cols-5", 6: "sm:grid-cols-6",
    7: "sm:grid-cols-7", 8: "sm:grid-cols-8", 9: "sm:grid-cols-9",
    10: "sm:grid-cols-10", 11: "sm:grid-cols-11", 12: "sm:grid-cols-12",
  },
  md: {
    1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3",
    4: "md:grid-cols-4", 5: "md:grid-cols-5", 6: "md:grid-cols-6",
    7: "md:grid-cols-7", 8: "md:grid-cols-8", 9: "md:grid-cols-9",
    10: "md:grid-cols-10", 11: "md:grid-cols-11", 12: "md:grid-cols-12",
  },
  lg: {
    1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3",
    4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6",
    7: "lg:grid-cols-7", 8: "lg:grid-cols-8", 9: "lg:grid-cols-9",
    10: "lg:grid-cols-10", 11: "lg:grid-cols-11", 12: "lg:grid-cols-12",
  },
  xl: {
    1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3",
    4: "xl:grid-cols-4", 5: "xl:grid-cols-5", 6: "xl:grid-cols-6",
    7: "xl:grid-cols-7", 8: "xl:grid-cols-8", 9: "xl:grid-cols-9",
    10: "xl:grid-cols-10", 11: "xl:grid-cols-11", 12: "xl:grid-cols-12",
  },
  "2xl": {
    1: "2xl:grid-cols-1", 2: "2xl:grid-cols-2", 3: "2xl:grid-cols-3",
    4: "2xl:grid-cols-4", 5: "2xl:grid-cols-5", 6: "2xl:grid-cols-6",
    7: "2xl:grid-cols-7", 8: "2xl:grid-cols-8", 9: "2xl:grid-cols-9",
    10: "2xl:grid-cols-10", 11: "2xl:grid-cols-11", 12: "2xl:grid-cols-12",
  },
}

const ROW_CLASSES: Record<Breakpoint, Record<TrackCount, string>> = {
  initial: {
    1: "grid-rows-1", 2: "grid-rows-2", 3: "grid-rows-3",
    4: "grid-rows-4", 5: "grid-rows-5", 6: "grid-rows-6",
    7: "grid-rows-7", 8: "grid-rows-8", 9: "grid-rows-9",
    10: "grid-rows-10", 11: "grid-rows-11", 12: "grid-rows-12",
  },
  sm: {
    1: "sm:grid-rows-1", 2: "sm:grid-rows-2", 3: "sm:grid-rows-3",
    4: "sm:grid-rows-4", 5: "sm:grid-rows-5", 6: "sm:grid-rows-6",
    7: "sm:grid-rows-7", 8: "sm:grid-rows-8", 9: "sm:grid-rows-9",
    10: "sm:grid-rows-10", 11: "sm:grid-rows-11", 12: "sm:grid-rows-12",
  },
  md: {
    1: "md:grid-rows-1", 2: "md:grid-rows-2", 3: "md:grid-rows-3",
    4: "md:grid-rows-4", 5: "md:grid-rows-5", 6: "md:grid-rows-6",
    7: "md:grid-rows-7", 8: "md:grid-rows-8", 9: "md:grid-rows-9",
    10: "md:grid-rows-10", 11: "md:grid-rows-11", 12: "md:grid-rows-12",
  },
  lg: {
    1: "lg:grid-rows-1", 2: "lg:grid-rows-2", 3: "lg:grid-rows-3",
    4: "lg:grid-rows-4", 5: "lg:grid-rows-5", 6: "lg:grid-rows-6",
    7: "lg:grid-rows-7", 8: "lg:grid-rows-8", 9: "lg:grid-rows-9",
    10: "lg:grid-rows-10", 11: "lg:grid-rows-11", 12: "lg:grid-rows-12",
  },
  xl: {
    1: "xl:grid-rows-1", 2: "xl:grid-rows-2", 3: "xl:grid-rows-3",
    4: "xl:grid-rows-4", 5: "xl:grid-rows-5", 6: "xl:grid-rows-6",
    7: "xl:grid-rows-7", 8: "xl:grid-rows-8", 9: "xl:grid-rows-9",
    10: "xl:grid-rows-10", 11: "xl:grid-rows-11", 12: "xl:grid-rows-12",
  },
  "2xl": {
    1: "2xl:grid-rows-1", 2: "2xl:grid-rows-2", 3: "2xl:grid-rows-3",
    4: "2xl:grid-rows-4", 5: "2xl:grid-rows-5", 6: "2xl:grid-rows-6",
    7: "2xl:grid-rows-7", 8: "2xl:grid-rows-8", 9: "2xl:grid-rows-9",
    10: "2xl:grid-rows-10", 11: "2xl:grid-rows-11", 12: "2xl:grid-rows-12",
  },
}

const CUSTOM_COLUMN_CLASSES: Record<Breakpoint, string> = {
  initial: "grid-cols-[var(--nz-grid-cols)]",
  sm: "sm:grid-cols-[var(--nz-grid-cols-sm)]",
  md: "md:grid-cols-[var(--nz-grid-cols-md)]",
  lg: "lg:grid-cols-[var(--nz-grid-cols-lg)]",
  xl: "xl:grid-cols-[var(--nz-grid-cols-xl)]",
  "2xl": "2xl:grid-cols-[var(--nz-grid-cols-2xl)]",
}

const CUSTOM_ROW_CLASSES: Record<Breakpoint, string> = {
  initial: "grid-rows-[var(--nz-grid-rows)]",
  sm: "sm:grid-rows-[var(--nz-grid-rows-sm)]",
  md: "md:grid-rows-[var(--nz-grid-rows-md)]",
  lg: "lg:grid-rows-[var(--nz-grid-rows-lg)]",
  xl: "xl:grid-rows-[var(--nz-grid-rows-xl)]",
  "2xl": "2xl:grid-rows-[var(--nz-grid-rows-2xl)]",
}

const AUTOFLOW_CLASSES: Record<GridAutoFlow, string> = {
  row: "grid-flow-row",
  column: "grid-flow-col",
  dense: "grid-flow-dense",
  "row-dense": "grid-flow-row-dense",
  "column-dense": "grid-flow-col-dense",
}

function isTrackCount(value: number): value is TrackCount {
  return Number.isInteger(value) && value >= 1 && value <= 12
}

function customVariableName(kind: "cols" | "rows", breakpoint: Breakpoint) {
  return breakpoint === "initial"
    ? (`--nz-grid-${kind}` as const)
    : (`--nz-grid-${kind}-${breakpoint}` as const)
}

function resolveTemplateValue(
  value: TemplateValue,
  breakpoint: Breakpoint,
  kind: "cols" | "rows",
): { className: string; style: GridStyle } {
  const numericValue = typeof value === "string" && /^\d+$/.test(value)
    ? Number.parseInt(value, 10)
    : value

  if (typeof numericValue === "number" && isTrackCount(numericValue)) {
    return {
      className: kind === "cols"
        ? COLUMN_CLASSES[breakpoint][numericValue]
        : ROW_CLASSES[breakpoint][numericValue],
      style: {} as GridStyle,
    }
  }

  const variableName = customVariableName(kind, breakpoint)
  const template = typeof numericValue === "number"
    ? `repeat(${numericValue}, minmax(0, 1fr))`
    : value

  return {
    className: kind === "cols"
      ? CUSTOM_COLUMN_CLASSES[breakpoint]
      : CUSTOM_ROW_CLASSES[breakpoint],
    style: { [variableName]: template } as GridStyle,
  }
}

function resolveResponsiveTemplate(
  value: ResponsiveValue<TemplateValue> | undefined,
  kind: "cols" | "rows",
): { className: string; style: GridStyle } {
  if (value == null) return { className: "", style: {} as GridStyle }
  if (typeof value === "number" || typeof value === "string") {
    return resolveTemplateValue(value, "initial", kind)
  }

  const classNames: string[] = []
  const style = {} as GridStyle

  for (const breakpoint of ["initial", "sm", "md", "lg", "xl", "2xl"] as const) {
    const breakpointValue = value[breakpoint]
    if (breakpointValue == null) continue

    const resolved = resolveTemplateValue(breakpointValue, breakpoint, kind)
    classNames.push(resolved.className)
    Object.assign(style, resolved.style)
  }

  return { className: classNames.join(" "), style }
}

export function Grid({
  cols,
  rows,
  gap = "16",
  columnGap,
  rowGap,
  align = "stretch",
  justify = "start",
  autoFlow,
  display,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  w, h, minW, maxW, minH, maxH,
  as: Component = "div",
  className,
  style,
  ref,
  ...props
}: GridProps) {
  const dimensions = getDimensionClassesAndStyles({
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
  })
  const resolvedColumns = resolveResponsiveTemplate(cols, "cols")
  const resolvedRows = resolveResponsiveTemplate(rows, "rows")

  return (
    <Component
      ref={ref}
      className={cn(
        display ? getResponsiveDisplayClass(display) : "grid",
        resolvedColumns.className,
        resolvedRows.className,
        !columnGap && !rowGap && getSpacingClasses("gap", gap),
        columnGap && getSpacingClasses("gap-x", columnGap),
        rowGap && getSpacingClasses("gap-y", rowGap),
        columnGap && !rowGap && getSpacingClasses("gap-y", gap),
        !columnGap && rowGap && getSpacingClasses("gap-x", gap),
        getResponsiveAlignmentClasses(justify, align),
        autoFlow && AUTOFLOW_CLASSES[autoFlow],
        getLayoutSpacingClasses({
          p, px, py, pt, pr, pb, pl,
          m, mx, my, mt, mr, mb, ml,
        }),
        dimensions.className,
        className,
      )}
      style={{
        ...dimensions.style,
        ...resolvedColumns.style,
        ...resolvedRows.style,
        ...style,
      }}
      {...props}
    />
  )
}

Grid.displayName = "Grid"
