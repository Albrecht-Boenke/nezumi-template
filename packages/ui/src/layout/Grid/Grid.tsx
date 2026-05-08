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

type Breakpoint = "initial" | "md" | "lg"
type TemplateValue = number | string
type GridStyle = CSSProperties & Record<`--nz-grid-${string}`, string>

const MAX_TRACK_COUNT = 12
const ALL_BREAKPOINTS: readonly Breakpoint[] = [
  "initial", "md", "lg",
] as const

const BREAKPOINT_PREFIX: Record<Breakpoint, string> = {
  initial: "",
  md:      "md:",
  lg:      "lg:",
}

/**
 * Tailwind v4 erkennt nur Klassennamen, die wortwörtlich im Quelltext
 * auftauchen. Statische Spalten/Zeilen (1..12) werden über die
 * `@source inline`-Direktive in `styles/design-tokens.css` safelisted; die
 * Custom-Variablen-Klassen müssen weiterhin als Literale im Quelltext stehen,
 * damit Arbitrary-Values ohne zusätzliche Safelist erkannt werden.
 */
const CUSTOM_COLUMN_CLASSES: Record<Breakpoint, string> = {
  initial: "grid-cols-[var(--nz-grid-cols)]",
  md:      "md:grid-cols-[var(--nz-grid-cols-md)]",
  lg:      "lg:grid-cols-[var(--nz-grid-cols-lg)]",
}

const CUSTOM_ROW_CLASSES: Record<Breakpoint, string> = {
  initial: "grid-rows-[var(--nz-grid-rows)]",
  md:      "md:grid-rows-[var(--nz-grid-rows-md)]",
  lg:      "lg:grid-rows-[var(--nz-grid-rows-lg)]",
}

const AUTOFLOW_CLASSES: Record<GridAutoFlow, string> = {
  row:            "grid-flow-row",
  column:         "grid-flow-col",
  dense:          "grid-flow-dense",
  "row-dense":    "grid-flow-row-dense",
  "column-dense": "grid-flow-col-dense",
}

function isStaticTrackCount(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= MAX_TRACK_COUNT
}

function customVariableName(kind: "cols" | "rows", breakpoint: Breakpoint) {
  return breakpoint === "initial"
    ? (`--nz-grid-${kind}` as const)
    : (`--nz-grid-${kind}-${breakpoint}` as const)
}

function staticTrackClass(
  kind: "cols" | "rows",
  count: number,
  breakpoint: Breakpoint,
): string {
  return `${BREAKPOINT_PREFIX[breakpoint]}grid-${kind}-${count}`
}

function resolveTemplateValue(
  value: TemplateValue,
  breakpoint: Breakpoint,
  kind: "cols" | "rows",
): { className: string; style: GridStyle } {
  const numericValue = typeof value === "string" && /^\d+$/.test(value)
    ? Number.parseInt(value, 10)
    : value

  if (typeof numericValue === "number" && isStaticTrackCount(numericValue)) {
    return {
      className: staticTrackClass(kind, numericValue, breakpoint),
      style: {} as GridStyle,
    }
  }

  const customClasses = kind === "cols" ? CUSTOM_COLUMN_CLASSES : CUSTOM_ROW_CLASSES
  const variableName = customVariableName(kind, breakpoint)
  const template = typeof numericValue === "number"
    ? `repeat(${numericValue}, minmax(0, 1fr))`
    : value

  return {
    className: customClasses[breakpoint],
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

  for (const breakpoint of ALL_BREAKPOINTS) {
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
  const dimensions = getDimensionClassesAndStyles({ w, h, minW, maxW, minH, maxH })
  const resolvedColumns = resolveResponsiveTemplate(cols, "cols")
  const resolvedRows = resolveResponsiveTemplate(rows, "rows")

  // gap-Shorthand:
  //   - gap allein  -> beide Achsen
  //   - columnGap   -> ueberschreibt x; gap fuellt y
  //   - rowGap      -> ueberschreibt y; gap fuellt x
  const useShorthand = !columnGap && !rowGap
  const xGap = columnGap ?? (rowGap ? gap : undefined)
  const yGap = rowGap ?? (columnGap ? gap : undefined)

  return (
    <Component
      ref={ref}
      className={cn(
        display ? getResponsiveDisplayClass(display) : "grid",
        resolvedColumns.className,
        resolvedRows.className,
        useShorthand && getSpacingClasses("gap", gap),
        !useShorthand && getSpacingClasses("gap-x", xGap),
        !useShorthand && getSpacingClasses("gap-y", yGap),
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
