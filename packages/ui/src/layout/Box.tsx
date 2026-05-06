/**
 * Box — Generischer Layout-Wrapper
 *
 * Das fundamentalste Layout-Primitiv. Inspiriert von Radix Themes <Box>,
 * re-implementiert auf Tailwind v4. Kein eigenes Display-Verhalten —
 * verhält sich wie ein <div>.
 *
 * @example
 *   <Box p="16" m="8">content</Box>
 *   <Box as="article" px="24" py="32">article content</Box>
 *   <Box display="flex" gap="16">flex container via Box</Box>
 */
import type { CSSProperties } from "react"
import {
  cn,
  getResponsiveDisplayClass,
  getSpacingClasses,
  resolveDimension,
} from "./utils"
import type { BoxProps } from "./types"

export function Box({
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  display,
  w, h, minW, maxW, minH, maxH,
  as: Component = "div",
  className,
  style,
  ref,
  ...props
}: BoxProps) {
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
        getResponsiveDisplayClass(display),
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
        ...dimClasses,
        className,
      )}
      style={{ ...inlineStyles, ...style }}
      {...props}
    />
  )
}

Box.displayName = "Box"
