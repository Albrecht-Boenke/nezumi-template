/**
 * @nezumi/ui/layout — Class-Name Utilities
 *
 * Responsive Tailwind-Klassen-Generierung für das Spacing-System.
 * Alle Funktionen sind pure und haben keine Side Effects.
 */
import type { CSSProperties } from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SpacingValue } from "./spacing"
import type {
  AlignItems,
  BaseLayoutProps,
  DisplayValue,
  JustifyContent,
  ResponsiveValue,
} from "./types"

const BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"] as const
type ResponsiveObject<T> = Exclude<ResponsiveValue<T>, T>

function responsiveClass<T>(
  value: ResponsiveValue<T> | undefined,
  mapValue: (value: T) => string,
): string {
  if (!value) return ""
  if (typeof value !== "object") return mapValue(value)

  const responsiveValue = value as ResponsiveObject<T>
  const parts: string[] = []
  if (responsiveValue.initial != null) {
    parts.push(mapValue(responsiveValue.initial))
  }

  for (const breakpoint of BREAKPOINTS) {
    const breakpointValue = responsiveValue[breakpoint]
    if (breakpointValue != null) {
      parts.push(`${breakpoint}:${mapValue(breakpointValue)}`)
    }
  }

  return parts.filter(Boolean).join(" ")
}

// ---- cn ----

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ---- Display ----

const DISPLAY_MAP: Record<DisplayValue, string> = {
  "block":        "block",
  "inline-block": "inline-block",
  "inline":       "inline",
  "none":         "hidden",
  "flex":         "flex",
  "inline-flex":  "inline-flex",
  "grid":         "grid",
  "inline-grid":  "inline-grid",
}

export function getDisplayClass(value?: DisplayValue): string {
  if (!value) return ""
  return DISPLAY_MAP[value] ?? ""
}

export function getResponsiveDisplayClass(
  value?: ResponsiveValue<DisplayValue>,
): string {
  return responsiveClass(value, getDisplayClass)
}

// ---- Alignment ----

const JUSTIFY_MAP: Record<string, string> = {
  start:   "justify-start",
  center:  "justify-center",
  end:     "justify-end",
  between: "justify-between",
  around:  "justify-around",
  evenly:  "justify-evenly",
}

const ALIGN_MAP: Record<string, string> = {
  start:    "items-start",
  center:   "items-center",
  end:      "items-end",
  stretch:  "items-stretch",
  baseline: "items-baseline",
}

export function getAlignmentClasses(justify?: string, align?: string): string {
  return cn(
    justify ? JUSTIFY_MAP[justify] : "",
    align   ? ALIGN_MAP[align]     : "",
  )
}

export function getResponsiveAlignmentClasses(
  justify?: ResponsiveValue<JustifyContent>,
  align?: ResponsiveValue<AlignItems>,
): string {
  return cn(
    responsiveClass(justify, value => JUSTIFY_MAP[value] ?? ""),
    responsiveClass(align, value => ALIGN_MAP[value] ?? ""),
  )
}

// ---- Flex Direction ----

const DIRECTION_MAP: Record<string, string> = {
  "row":            "flex-row",
  "column":         "flex-col",
  "row-reverse":    "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
}

export function getDirectionClass(direction?: string): string {
  if (!direction) return ""
  return DIRECTION_MAP[direction] ?? ""
}

export function getResponsiveDirection(dir?: ResponsiveValue<string>): string {
  if (!dir) return ""
  if (typeof dir === "string") return getDirectionClass(dir)
  const parts: string[] = []
  if (dir.initial) parts.push(getDirectionClass(dir.initial))
  for (const breakpoint of BREAKPOINTS) {
    const breakpointValue = dir[breakpoint]
    if (breakpointValue) {
      parts.push(`${breakpoint}:${getDirectionClass(breakpointValue)}`)
    }
  }
  return parts.filter(Boolean).join(" ")
}

// ---- Spacing ----

type SpacingProperty =
  | "gap" | "gap-x" | "gap-y"
  | "p"  | "px" | "py" | "pt" | "pr" | "pb" | "pl"
  | "m"  | "mx" | "my" | "mt" | "mr" | "mb" | "ml"

type MarginValue = SpacingValue | "auto"

/**
 * Einzelnen Spacing-Wert -> Tailwind-Klasse.
 * Unterstützt "auto" für margin-Props.
 */
function singleSpacingClass(
  property: SpacingProperty,
  value: MarginValue,
): string {
  if (value === "auto") {
    const autoMap: Partial<Record<SpacingProperty, string>> = {
      m: "m-auto", mx: "mx-auto", my: "my-auto",
      mt: "mt-auto", mr: "mr-auto", mb: "mb-auto", ml: "ml-auto",
    }
    return autoMap[property] ?? ""
  }

  // Native scale: "16" maps directly to utility class suffix "16"
  // e.g. p-16, m-32, gap-8
  return `${property}-${value}`
}

/**
 * Responsive Spacing Value -> Tailwind-Klassen-String.
 *
 * @example
 *   getSpacingClasses("p",  "16")                       -> "p-16"
 *   getSpacingClasses("px", { initial: "8", md: "16" }) -> "px-8 md:px-16"
 *   getSpacingClasses("mx", "auto")                     -> "mx-auto"
 */
export function getSpacingClasses(
  property: SpacingProperty,
  value?: ResponsiveValue<MarginValue>,
): string {
  if (!value) return ""

  if (typeof value === "string") {
    return singleSpacingClass(property, value)
  }

  const parts: string[] = []
  if (value.initial != null) parts.push(singleSpacingClass(property, value.initial))
  if (value.sm != null)      parts.push(`sm:${singleSpacingClass(property, value.sm)}`)
  if (value.md != null)      parts.push(`md:${singleSpacingClass(property, value.md)}`)
  if (value.lg != null)      parts.push(`lg:${singleSpacingClass(property, value.lg)}`)
  if (value.xl != null)      parts.push(`xl:${singleSpacingClass(property, value.xl)}`)
  if (value["2xl"] != null)  parts.push(`2xl:${singleSpacingClass(property, value["2xl"])}`)

  return parts.filter(Boolean).join(" ")
}

type LayoutSpacingProps = Pick<
  BaseLayoutProps,
  | "p" | "px" | "py" | "pt" | "pr" | "pb" | "pl"
  | "m" | "mx" | "my" | "mt" | "mr" | "mb" | "ml"
>

export function getLayoutSpacingClasses({
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
}: LayoutSpacingProps): string {
  return cn(
    getSpacingClasses("p",  p),
    getSpacingClasses("px", px),
    getSpacingClasses("py", py),
    getSpacingClasses("pt", pt),
    getSpacingClasses("pr", pr),
    getSpacingClasses("pb", pb),
    getSpacingClasses("pl", pl),
    getSpacingClasses("m",  m),
    getSpacingClasses("mx", mx),
    getSpacingClasses("my", my),
    getSpacingClasses("mt", mt),
    getSpacingClasses("mr", mr),
    getSpacingClasses("mb", mb),
    getSpacingClasses("ml", ml),
  )
}

// ---- Dimension Helpers ----

const W_H_KEYWORDS = ["auto", "full", "screen", "svh", "dvh"] as const
type WH = string

/**
 * Gibt Tailwind width/height Klassen oder inline styles zurueck.
 * Keywords -> `w-auto`, `w-full` etc.
 * Alles andere -> inline style.
 */
export function resolveDimension(
  prefix: "w" | "h" | "min-w" | "max-w" | "min-h" | "max-h",
  value?: WH,
): { className?: string; style?: Record<string, string> } {
  if (!value) return {}

  if ((W_H_KEYWORDS as readonly string[]).includes(value)) {
    return { className: `${prefix}-${value}` }
  }

  // Numerische Tailwind-Klassen (z.B. "64" -> w-64)
  if (/^\d+$/.test(value)) {
    return { className: `${prefix}-${value}` }
  }

  // Beliebiger CSS-Wert -> inline style
  const styleKey = prefix
    .replace("min-w", "minWidth")
    .replace("max-w", "maxWidth")
    .replace("min-h", "minHeight")
    .replace("max-h", "maxHeight")
    .replace(/^w$/, "width")
    .replace(/^h$/, "height")
  return { style: { [styleKey]: value } }
}

type DimensionProps = Pick<
  BaseLayoutProps,
  "w" | "h" | "minW" | "maxW" | "minH" | "maxH"
>

export function getDimensionClassesAndStyles({
  w,
  h,
  minW,
  maxW,
  minH,
  maxH,
}: DimensionProps): { className: string; style: CSSProperties } {
  const style: CSSProperties = {}
  const classNames: string[] = []

  for (const [prefix, value] of [
    ["w", w],
    ["h", h],
    ["min-w", minW],
    ["max-w", maxW],
    ["min-h", minH],
    ["max-h", maxH],
  ] as const) {
    const resolved = resolveDimension(prefix, value)
    if (resolved.className) classNames.push(resolved.className)
    if (resolved.style) Object.assign(style, resolved.style)
  }

  return { className: classNames.join(" "), style }
}
