/**
 * Flex — Flexbox Layout-Komponente
 *
 * Prop-basierte Flexbox API, inspiriert von Radix Themes <Flex>.
 * Ersetzt das gap-Pattern für alle Abstandsprobleme.
 * `display` kann auf "inline-flex" gesetzt werden.
 *
 * @example
 *   <Flex gap="16" align="center" justify="between">
 *     <Logo />
 *     <Nav />
 *   </Flex>
 *
 *   <Flex direction="column" gap="8" as="ul">
 *     {items.map(item => <li key={item.id}>{item.label}</li>)}
 *   </Flex>
 *
 *   <Flex direction={{ initial: "column", md: "row" }} gap="16">
 *     responsive layout
 *   </Flex>
 */
import type { CSSProperties } from "react"
import {
  cn,
  getSpacingClasses,
  getResponsiveAlignmentClasses,
  getResponsiveDirection,
  resolveDimension,
} from "./utils"
import type { DisplayValue, FlexProps, FlexWrap, ResponsiveValue } from "./types"

// ---- Wrap ----

const WRAP_MAP: Record<FlexWrap, string> = {
  nowrap:         "flex-nowrap",
  wrap:           "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
}

function getWrapClass(wrap?: ResponsiveValue<FlexWrap>): string {
  if (!wrap) return ""
  if (typeof wrap === "string") return WRAP_MAP[wrap] ?? ""
  const parts: string[] = []
  if (wrap.initial) parts.push(WRAP_MAP[wrap.initial])
  if (wrap.sm)      parts.push(`sm:${WRAP_MAP[wrap.sm]}`)
  if (wrap.md)      parts.push(`md:${WRAP_MAP[wrap.md]}`)
  if (wrap.lg)      parts.push(`lg:${WRAP_MAP[wrap.lg]}`)
  if (wrap.xl)      parts.push(`xl:${WRAP_MAP[wrap.xl]}`)
  if (wrap["2xl"])  parts.push(`2xl:${WRAP_MAP[wrap["2xl"]]}`)
  return parts.filter(Boolean).join(" ")
}

// ---- Display ----

function getFlexDisplayClass(display?: ResponsiveValue<DisplayValue>): string {
  if (!display) return "flex"

  const mapValue = (value: DisplayValue) => {
    if (value === "inline-flex") return "inline-flex"
    return "flex"
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

// ---- Flex shorthand ----

function getFlexClass(flex?: string): string {
  if (!flex) return ""
  const map: Record<string, string> = { "1": "flex-1", auto: "flex-auto", none: "flex-none" }
  return map[flex] ?? `[flex:${flex}]`
}

function getBasisClass(basis?: string): string {
  if (!basis) return ""
  const map: Record<string, string> = { auto: "basis-auto", full: "basis-full" }
  return map[basis] ?? `[flex-basis:${basis}]`
}

export function Flex({
  direction = "row",
  wrap,
  gap = "16",
  align = "stretch",
  justify = "start",
  display,
  flex,
  basis,
  grow,
  shrink,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  w, h, minW, maxW, minH, maxH,
  as: Component = "div",
  className,
  style,
  ref,
  ...props
}: FlexProps) {
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
        // Display: flex (default) oder inline-flex
        getFlexDisplayClass(display),
        // Direction
        getResponsiveDirection(direction),
        // Wrap
        getWrapClass(wrap),
        // Alignment
        getResponsiveAlignmentClasses(justify, align),
        // Gap
        getSpacingClasses("gap", gap),
        // Flex properties
        getFlexClass(flex),
        getBasisClass(basis),
        grow   === "1" ? "grow"   : grow === "0"   ? "grow-0"   : "",
        shrink === "1" ? "shrink" : shrink === "0" ? "shrink-0" : "",
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

Flex.displayName = "Flex"
