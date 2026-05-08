/**
 * @packages/ui/layout — Class-Name Utilities
 *
 * Responsive Tailwind-Klassen-Generierung für die Layout-Primitives.
 * Alle Helfer sind pure und teilen sich denselben `responsiveClass`-Generator,
 * damit sich Breakpoint-Logik nicht über die einzelnen Komponenten verteilt.
 */
import type { CSSProperties } from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SpacingValue } from "./spacing"
import type {
  AlignItems,
  BaseLayoutProps,
  DisplayValue,
  FlexDirection,
  JustifyContent,
  ResponsiveValue,
} from "./types"

const BREAKPOINTS = ["md", "lg"] as const
type ResponsiveObject<T> = Exclude<ResponsiveValue<T>, T>

/**
 * Generischer Responsive-Class-Generator.
 *
 * Akzeptiert einen einzelnen Wert (initial-Breakpoint) oder ein Breakpoint-Objekt
 * `{ initial?, md?, lg? }` und einen Mapper, der den
 * unprefixten Tailwind-Utility-Namen für einen Wert liefert.
 * Falsy-Mapper-Werte werden stillschweigend verworfen.
 */
export function responsiveClass<T>(
  value: ResponsiveValue<T> | undefined,
  mapValue: (value: T) => string,
): string {
  if (value == null) return ""
  if (typeof value !== "object") {
    return mapValue(value as T) || ""
  }

  const responsive = value as ResponsiveObject<T>
  const parts: string[] = []
  if (responsive.initial != null) {
    const cls = mapValue(responsive.initial)
    if (cls) parts.push(cls)
  }
  for (const breakpoint of BREAKPOINTS) {
    const breakpointValue = responsive[breakpoint]
    if (breakpointValue == null) continue
    const cls = mapValue(breakpointValue)
    if (cls) parts.push(`${breakpoint}:${cls}`)
  }
  return parts.join(" ")
}

// ---- cn ----

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ---- Display ----

const DISPLAY_MAP: Record<DisplayValue, string> = {
  block:          "block",
  "inline-block": "inline-block",
  inline:         "inline",
  none:           "hidden",
  flex:           "flex",
  "inline-flex":  "inline-flex",
  grid:           "grid",
  "inline-grid":  "inline-grid",
}

export function getResponsiveDisplayClass(
  value?: ResponsiveValue<DisplayValue>,
): string {
  return responsiveClass(value, v => DISPLAY_MAP[v] ?? "")
}

// ---- Alignment ----

const JUSTIFY_MAP: Record<JustifyContent, string> = {
  start:   "justify-start",
  center:  "justify-center",
  end:     "justify-end",
  between: "justify-between",
  around:  "justify-around",
  evenly:  "justify-evenly",
}

const ALIGN_MAP: Record<AlignItems, string> = {
  start:    "items-start",
  center:   "items-center",
  end:      "items-end",
  stretch:  "items-stretch",
  baseline: "items-baseline",
}

export function getResponsiveAlignmentClasses(
  justify?: ResponsiveValue<JustifyContent>,
  align?: ResponsiveValue<AlignItems>,
): string {
  return cn(
    responsiveClass(justify, v => JUSTIFY_MAP[v] ?? ""),
    responsiveClass(align, v => ALIGN_MAP[v] ?? ""),
  )
}

// ---- Flex Direction ----

const DIRECTION_MAP: Record<FlexDirection, string> = {
  row:              "flex-row",
  column:           "flex-col",
  "row-reverse":    "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
}

export function getResponsiveDirection(
  value?: ResponsiveValue<FlexDirection>,
): string {
  return responsiveClass(value, v => DIRECTION_MAP[v] ?? "")
}

// ---- Spacing ----

type SpacingProperty =
  | "gap" | "gap-x" | "gap-y"
  | "p"  | "px" | "py" | "pt" | "pr" | "pb" | "pl"
  | "m"  | "mx" | "my" | "mt" | "mr" | "mb" | "ml"

type MarginValue = SpacingValue | "auto"

const MARGIN_AUTO_MAP: Partial<Record<SpacingProperty, string>> = {
  m:  "m-auto",  mx: "mx-auto", my: "my-auto",
  mt: "mt-auto", mr: "mr-auto", mb: "mb-auto", ml: "ml-auto",
}

function singleSpacingClass(
  property: SpacingProperty,
  value: MarginValue,
): string {
  if (value === "auto") return MARGIN_AUTO_MAP[property] ?? ""
  return `${property}-${value}`
}

/**
 * Responsive Spacing-Wert -> Tailwind-Klassen-String.
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
  return responsiveClass(value, v => singleSpacingClass(property, v))
}

type LayoutSpacingProps = Pick<
  BaseLayoutProps,
  | "p" | "px" | "py" | "pt" | "pr" | "pb" | "pl"
  | "m" | "mx" | "my" | "mt" | "mr" | "mb" | "ml"
>

export function getLayoutSpacingClasses(props: LayoutSpacingProps): string {
  return cn(
    getSpacingClasses("p",  props.p),
    getSpacingClasses("px", props.px),
    getSpacingClasses("py", props.py),
    getSpacingClasses("pt", props.pt),
    getSpacingClasses("pr", props.pr),
    getSpacingClasses("pb", props.pb),
    getSpacingClasses("pl", props.pl),
    getSpacingClasses("m",  props.m),
    getSpacingClasses("mx", props.mx),
    getSpacingClasses("my", props.my),
    getSpacingClasses("mt", props.mt),
    getSpacingClasses("mr", props.mr),
    getSpacingClasses("mb", props.mb),
    getSpacingClasses("ml", props.ml),
  )
}

// ---- Dimensionen ----

const DIMENSION_KEYWORDS = new Set([
  // spacing scale (vgl. tokens/spacing.css)
  "0", "1", "2", "4", "8", "12", "16", "24", "32", "40", "48", "56", "64",
  "80", "96", "112", "128",
  // sizing keywords
  "auto", "full", "screen", "svh", "dvh",
])

type DimensionPrefix = "w" | "h" | "min-w" | "max-w" | "min-h" | "max-h"

const DIMENSION_STYLE_KEY: Record<DimensionPrefix, keyof CSSProperties> = {
  w:       "width",
  h:       "height",
  "min-w": "minWidth",
  "max-w": "maxWidth",
  "min-h": "minHeight",
  "max-h": "maxHeight",
}

/**
 * Liefert eine Tailwind-Klasse, wenn der Wert ein bekanntes Spacing- oder
 * Sizing-Keyword ist (z.B. `"64"`, `"full"`, `"svh"`); ansonsten einen
 * Inline-Style mit dem CSS-Property als Schluessel (z.B. `width: "320px"`).
 * Tokens, die weder zur Skala noch zu den Keywords gehoeren, werden bewusst
 * als Inline-Style ausgegeben — so vermeiden wir gebrochene Klassen wie
 * `w-100`, die im Theme nicht definiert sind.
 */
export function resolveDimension(
  prefix: DimensionPrefix,
  value?: string,
): { className?: string; style?: CSSProperties } {
  if (!value) return {}
  if (DIMENSION_KEYWORDS.has(value)) {
    return { className: `${prefix}-${value}` }
  }
  return { style: { [DIMENSION_STYLE_KEY[prefix]]: value } }
}

type DimensionProps = Pick<
  BaseLayoutProps,
  "w" | "h" | "minW" | "maxW" | "minH" | "maxH"
>

export function getDimensionClassesAndStyles(
  props: DimensionProps,
): { className: string; style: CSSProperties } {
  const style: CSSProperties = {}
  const classNames: string[] = []

  const entries: ReadonlyArray<readonly [DimensionPrefix, string | undefined]> = [
    ["w",     props.w],
    ["h",     props.h],
    ["min-w", props.minW],
    ["max-w", props.maxW],
    ["min-h", props.minH],
    ["max-h", props.maxH],
  ]

  for (const [prefix, value] of entries) {
    const resolved = resolveDimension(prefix, value)
    if (resolved.className) classNames.push(resolved.className)
    if (resolved.style) Object.assign(style, resolved.style)
  }

  return { className: classNames.join(" "), style }
}
