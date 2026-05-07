/**
 * Section — Semantischer Seitenbereich mit vertikalem Padding
 *
 * Rendert immer als <section>-Element (überschreibbar mit `as`).
 * Das `size`-Prop setzt vordefiniertes vertikales Padding —
 * wird von einem expliziten `py`-Prop überschrieben.
 *
 * @example
 *   <Section>
 *     default: py-64
 *   </Section>
 *
 *   <Section size="sm">
 *     kompaktes Layout: py-32
 *   </Section>
 *
 *   <Section size="xl" py="96">
 *     py überschreibt size-Preset
 *   </Section>
 */
import type { CSSProperties } from "react"
import { cn, getSpacingClasses, resolveDimension } from "./utils"
import type { SectionProps, ResponsiveValue } from "./types"

// ---- Size → py-Preset ----

const SECTION_SIZE_MAP: Record<string, string> = {
  sm: "py-32",  // 32px
  md: "py-48",  // 48px
  lg: "py-64",  // 64px (Default)
  xl: "py-96",  // 96px
}


function getSectionSizeClass(size?: string): string {
  if (!size) return SECTION_SIZE_MAP.lg
  return SECTION_SIZE_MAP[size] ?? SECTION_SIZE_MAP.lg
}

function getResponsiveSectionSize(size?: ResponsiveValue<string>): string {
  if (!size) return SECTION_SIZE_MAP.lg
  if (typeof size === "string") return getSectionSizeClass(size)

  const parts: string[] = []
  if (size.initial != null) parts.push(getSectionSizeClass(size.initial))
  if (size.sm      != null) parts.push(`sm:${getSectionSizeClass(size.sm)}`)
  if (size.md      != null) parts.push(`md:${getSectionSizeClass(size.md)}`)
  if (size.lg      != null) parts.push(`lg:${getSectionSizeClass(size.lg)}`)
  if (size.xl      != null) parts.push(`xl:${getSectionSizeClass(size.xl)}`)
  if (size["2xl"]  != null) parts.push(`2xl:${getSectionSizeClass(size["2xl"])}`)
  return parts.filter(Boolean).join(" ")
}

export function Section({
  size,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  w, h, minW, maxW, minH, maxH,
  as: Component = "section",
  className,
  style,
  ref,
  ...props
}: SectionProps) {
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
        // size-Preset — wird von explizitem py überschrieben
        !py && !p && getResponsiveSectionSize(size),
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

Section.displayName = "Section"
