/**
 * Container — Zentrierter, breitenbegrenzter Wrapper
 *
 * Prop-basierte Container API, inspiriert von Radix Themes <Container>.
 * Standardmäßig mx-auto mit konfigurierbarer max-width.
 *
 * @example
 *   <Container>
 *     content (max-w-4xl, mx-auto)
 *   </Container>
 *
 *   <Container size="xl" px="24">
 *     breiterer container
 *   </Container>
 *
 *   <Container size={{ initial: "sm", lg: "lg" }}>
 *     responsive max-width
 *   </Container>
 */
import type { CSSProperties } from "react"
import { cn, getSpacingClasses, resolveDimension } from "./utils"
import type { ContainerProps, ResponsiveValue } from "./types"

// ---- Size → max-width ----

const SIZE_MAP: Record<string, string> = {
  sm:    "max-w-md",    //  ~448px
  md:    "max-w-2xl",   //  ~672px
  lg:    "max-w-4xl",   //  ~896px  (Default)
  xl:    "max-w-6xl",   // ~1152px
  "2xl": "max-w-7xl",   // ~1280px
}

function getSizeClass(size?: string): string {
  if (!size) return SIZE_MAP.lg
  return SIZE_MAP[size] ?? SIZE_MAP.lg
}

function getResponsiveSize(size?: ResponsiveValue<string>): string {
  if (!size) return SIZE_MAP.lg
  if (typeof size === "string") return getSizeClass(size)

  const parts: string[] = []
  if (size.initial != null) parts.push(getSizeClass(size.initial))
  if (size.sm      != null) parts.push(`sm:${getSizeClass(size.sm)}`)
  if (size.md      != null) parts.push(`md:${getSizeClass(size.md)}`)
  if (size.lg      != null) parts.push(`lg:${getSizeClass(size.lg)}`)
  if (size.xl      != null) parts.push(`xl:${getSizeClass(size.xl)}`)
  if (size["2xl"]  != null) parts.push(`2xl:${getSizeClass(size["2xl"])}`)
  return parts.filter(Boolean).join(" ")
}

export function Container({
  size,
  centered = true,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  w, h, minW, maxW, minH, maxH,
  as: Component = "div",
  className,
  style,
  ref,
  ...props
}: ContainerProps) {
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
    const { className: cls, style: sty } = resolveDimension(
      prefix as Parameters<typeof resolveDimension>[0],
      val as string | undefined,
    )
    if (cls) dimClasses.push(cls)
    if (sty) Object.assign(inlineStyles, sty)
  }

  return (
    <Component
      ref={ref}
      className={cn(
        "w-full",
        // max-width aus size-Prop (wird von explizitem maxW überschrieben)
        !maxW && getResponsiveSize(size),
        // Automatisch zentrieren (überschreibbar via mx)
        centered && !mx && "mx-auto",
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

Container.displayName = "Container"
