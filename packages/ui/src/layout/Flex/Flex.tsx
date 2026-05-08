import type { CSSProperties } from "react"
import {
  cn,
  getDimensionClassesAndStyles,
  getLayoutSpacingClasses,
  getResponsiveAlignmentClasses,
  getResponsiveDirection,
  getResponsiveDisplayClass,
  getSpacingClasses,
  responsiveClass,
} from "../utils"
import type { FlexProps, FlexWrap } from "../types"

const WRAP_CLASSES: Record<FlexWrap, string> = {
  nowrap:         "flex-nowrap",
  wrap:           "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
}

const FLEX_KEYWORDS = {
  "1":     "flex-1",
  auto:    "flex-auto",
  initial: "flex-initial",
  none:    "flex-none",
} as const

const BASIS_KEYWORDS = new Set<string>([
  // spacing scale
  "0", "1", "2", "4", "8", "12", "16", "24", "32", "40", "48", "56", "64",
  "80", "96", "112", "128",
  // fractions
  "1/2", "1/3", "2/3", "1/4", "3/4",
  // sizing keywords
  "auto", "full",
])

function resolveFlexValue(value: string | undefined): {
  className: string
  style: CSSProperties
} {
  if (!value) return { className: "", style: {} }
  if (value in FLEX_KEYWORDS) {
    return { className: FLEX_KEYWORDS[value as keyof typeof FLEX_KEYWORDS], style: {} }
  }
  return { className: "", style: { flex: value } }
}

function resolveBasisValue(value: string | undefined): {
  className: string
  style: CSSProperties
} {
  if (!value) return { className: "", style: {} }
  if (BASIS_KEYWORDS.has(value)) {
    return { className: `basis-${value}`, style: {} }
  }
  return { className: "", style: { flexBasis: value } }
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
  const dimensions = getDimensionClassesAndStyles({ w, h, minW, maxW, minH, maxH })
  const resolvedFlex = resolveFlexValue(flex)
  const resolvedBasis = resolveBasisValue(basis)

  return (
    <Component
      ref={ref}
      className={cn(
        display ? getResponsiveDisplayClass(display) : "flex",
        getResponsiveDirection(direction),
        responsiveClass(wrap, v => WRAP_CLASSES[v] ?? ""),
        getResponsiveAlignmentClasses(justify, align),
        getSpacingClasses("gap", gap),
        resolvedFlex.className,
        resolvedBasis.className,
        grow === "1" ? "grow" : grow === "0" ? "grow-0" : "",
        shrink === "1" ? "shrink" : shrink === "0" ? "shrink-0" : "",
        getLayoutSpacingClasses({
          p, px, py, pt, pr, pb, pl,
          m, mx, my, mt, mr, mb, ml,
        }),
        dimensions.className,
        className,
      )}
      style={{
        ...dimensions.style,
        ...resolvedFlex.style,
        ...resolvedBasis.style,
        ...style,
      }}
      {...props}
    />
  )
}

Flex.displayName = "Flex"
