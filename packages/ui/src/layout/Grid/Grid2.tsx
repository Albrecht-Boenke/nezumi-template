/**
 * Grid — CSS Grid Layout-Komponente
 *
 * Prop-basierte Grid API, inspiriert von Radix Themes <Grid>.
 * Unterstützt responsive Spalten, column/row-gap Trennung
 * und auto-flow Steuerung.
 *
 * @example
 *   <Grid cols={3} gap="24">
 *     <Card /> <Card /> <Card />
 *   </Grid>
 *
 *   <Grid cols={{ initial: 1, md: 2, lg: 3 }} gap="16">
 *     responsive grid
 *   </Grid>
 *
 *   <Grid cols="200px 1fr" columnGap="16" rowGap="32">
 *     custom template
 *   </Grid>
 */
import type { CSSProperties } from "react"
import {
  cn,
  getSpacingClasses,
  getResponsiveAlignmentClasses,
  resolveDimension,
} from "./utils"
import type { DisplayValue, GridAutoFlow, GridProps, ResponsiveValue } from "./types"

// ---- Column / Row Templates ----

const COLS_MAP: Record<number, string> = {
  1: "grid-cols-1",  2:  "grid-cols-2",
  3: "grid-cols-3",  4:  "grid-cols-4",
  5: "grid-cols-5",  6:  "grid-cols-6",
  7: "grid-cols-7",  8:  "grid-cols-8",
  12: "grid-cols-12",
}

const ROWS_MAP: Record<number, string> = {
  1: "grid-rows-1", 2: "grid-rows-2",
  3: "grid-rows-3", 4: "grid-rows-4",
  6: "grid-rows-6",
}

const AUTOFLOW_MAP: Record<GridAutoFlow, string> = {
  row:    "grid-flow-row",
  column: "grid-flow-col",
  dense:  "grid-flow-dense",
}

function resolveColsClass(cols: number | string): string {
  if (typeof cols === "number") {
    return COLS_MAP[cols] ?? `[grid-template-columns:repeat(${cols},minmax(0,1fr))]`
  }
  // Tailwind-Keyword oder beliebiger CSS-Wert
  if (/^\d+$/.test(cols)) return COLS_MAP[parseInt(cols, 10)] ?? `grid-cols-${cols}`
  return `[grid-template-columns:${cols.replace(/\s+/g, "_")}]`
}

function resolveRowsClass(rows: number | string): string {
  if (typeof rows === "number") {
    return ROWS_MAP[rows] ?? `[grid-template-rows:repeat(${rows},minmax(0,1fr))]`
  }
  return `[grid-template-rows:${rows.replace(/\s+/g, "_")}]`
}

function getResponsiveCols(cols?: ResponsiveValue<number | string>): string {
  if (!cols) return ""
  if (typeof cols === "number" || typeof cols === "string") return resolveColsClass(cols)
  const parts: string[] = []
  if (cols.initial != null) parts.push(resolveColsClass(cols.initial))
  if (cols.sm != null)      parts.push(`sm:${resolveColsClass(cols.sm)}`)
  if (cols.md != null)      parts.push(`md:${resolveColsClass(cols.md)}`)
  if (cols.lg != null)      parts.push(`lg:${resolveColsClass(cols.lg)}`)
  if (cols.xl != null)      parts.push(`xl:${resolveColsClass(cols.xl)}`)
  if (cols["2xl"] != null)  parts.push(`2xl:${resolveColsClass(cols["2xl"])}`)
  return parts.filter(Boolean).join(" ")
}

function getResponsiveRows(rows?: ResponsiveValue<number | string>): string {
  if (!rows) return ""
  if (typeof rows === "number" || typeof rows === "string") return resolveRowsClass(rows)
  const parts: string[] = []
  if (rows.initial != null) parts.push(resolveRowsClass(rows.initial))
  if (rows.sm != null)      parts.push(`sm:${resolveRowsClass(rows.sm)}`)
  if (rows.md != null)      parts.push(`md:${resolveRowsClass(rows.md)}`)
  if (rows.lg != null)      parts.push(`lg:${resolveRowsClass(rows.lg)}`)
  if (rows.xl != null)      parts.push(`xl:${resolveRowsClass(rows.xl)}`)
  return parts.filter(Boolean).join(" ")
}

// ---- Display ----

function getGridDisplayClass(display?: ResponsiveValue<DisplayValue>): string {
  if (!display) return "grid"

  const mapValue = (value: DisplayValue) => {
    if (value === "inline-grid") return "inline-grid"
    return "grid"
  }

  if (typeof display === "string") return mapValue(display)

  const parts: string[] = []
  if (display.initial != null) parts.push(mapValue(display.initial))
  if (display.sm != null) parts.push(`sm:${mapValue(display.sm)}`)
  if (display.md != null) parts.push(`md:${mapValue(display.md)}`)
  if (display.lg != null) parts.push(`lg:${mapValue(display.lg)}`)
  if (display.xl != null) parts.push(`xl:${mapValue(display.xl)}`)
  if (display["2xl"] != null) parts.push(`2xl:${mapValue(display["2xl"])}`)
  return parts.filter(Boolean).join(" ")
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
  const inlineStyles: CSSProperties = {}
  const dimClasses: string[] = []

  for (const [prefix, val] of [
    ["w",     w]    as const,
    ["h",     h]    as const,
    ["min-w", minW] as const,
    ["max-w", maxW] as const,
    ["min-h", minH] as const,
    ["max-h", maxH] as const,
  ]) {
    const { className: cls, style: sty } = resolveDimension(prefix as Parameters<typeof resolveDimension>[0], val as string | undefined)
    if (cls) dimClasses.push(cls)
    if (sty) Object.assign(inlineStyles, sty)
  }

  return (
    <Component
      ref={ref}
      className={cn(
        // Display: grid (default) oder inline-grid
        getGridDisplayClass(display),
        // Template
        getResponsiveCols(cols),
        getResponsiveRows(rows),
        // Gap — columnGap/rowGap überschreiben das allgemeine gap
        !columnGap && !rowGap && getSpacingClasses("gap",   gap),
        columnGap                && getSpacingClasses("gap-x", columnGap),
        rowGap                   && getSpacingClasses("gap-y", rowGap),
        // Wenn nur einer gesetzt: anderen mit gap füllen
        columnGap && !rowGap && getSpacingClasses("gap-y", gap),
        !columnGap && rowGap && getSpacingClasses("gap-x", gap),
        // Alignment
        getResponsiveAlignmentClasses(justify, align),
        // Auto flow
        autoFlow && AUTOFLOW_MAP[autoFlow],
        // Padding
        getSpacingClasses("p",  p),
        getSpacingClasses("px", px),
        getSpacingClasses("py", py),
        getSpacingClasses("pt", pt),
        getSpacingClasses("pr", pr),
        getSpacingClasses("pb", pb),
        getSpacingClasses("pl", pl),
        // Margin
        getSpacingClasses("m",  m),
        getSpacingClasses("mx", mx),
        getSpacingClasses("my", my),
        getSpacingClasses("mt", mt),
        getSpacingClasses("mr", mr),
        getSpacingClasses("mb", mb),
        getSpacingClasses("ml", ml),
        // Dimensionen
        ...dimClasses,
        className,
      )}
      style={{ ...inlineStyles, ...style }}
      {...props}
    />
  )
}

Grid.displayName = "Grid"
