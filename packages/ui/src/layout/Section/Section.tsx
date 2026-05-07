import {
  cn,
  getDimensionClassesAndStyles,
  getLayoutSpacingClasses,
  getResponsiveDisplayClass,
} from "../utils"
import type { ResponsiveValue, SectionProps } from "../types"

const SECTION_SIZE_CLASSES = {
  sm: "py-32",
  md: "py-48",
  lg: "py-64",
  xl: "py-96",
} as const

type SectionSize = keyof typeof SECTION_SIZE_CLASSES

function getSizeClass(size: SectionSize): string {
  return SECTION_SIZE_CLASSES[size]
}

function getResponsiveSectionSizeClass(
  size: ResponsiveValue<SectionSize> | undefined,
): string {
  if (!size) return SECTION_SIZE_CLASSES.lg
  if (typeof size === "string") return getSizeClass(size)

  return [
    size.initial ? getSizeClass(size.initial) : "",
    size.sm ? `sm:${getSizeClass(size.sm)}` : "",
    size.md ? `md:${getSizeClass(size.md)}` : "",
    size.lg ? `lg:${getSizeClass(size.lg)}` : "",
    size.xl ? `xl:${getSizeClass(size.xl)}` : "",
    size["2xl"] ? `2xl:${getSizeClass(size["2xl"])}` : "",
  ].filter(Boolean).join(" ")
}

export function Section({
  size,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  display,
  w, h, minW, maxW, minH, maxH,
  as: Component = "section",
  className,
  style,
  ref,
  ...props
}: SectionProps) {
  const dimensions = getDimensionClassesAndStyles({
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
  })

  return (
    <Component
      ref={ref}
      className={cn(
        getResponsiveDisplayClass(display),
        !py && !p && getResponsiveSectionSizeClass(size),
        getLayoutSpacingClasses({
          p, px, py, pt, pr, pb, pl,
          m, mx, my, mt, mr, mb, ml,
        }),
        dimensions.className,
        className,
      )}
      style={{ ...dimensions.style, ...style }}
      {...props}
    />
  )
}

Section.displayName = "Section"
