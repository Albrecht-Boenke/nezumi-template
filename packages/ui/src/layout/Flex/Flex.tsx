import type { CSSProperties } from "react"
import {
  cn,
  getDimensionClassesAndStyles,
  getLayoutSpacingClasses,
  getResponsiveAlignmentClasses,
  getResponsiveDirection,
  getResponsiveDisplayClass,
  getSpacingClasses,
} from "../utils"
import type { FlexProps, FlexWrap, ResponsiveValue } from "../types"

const WRAP_CLASSES: Record<FlexWrap, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
}

const FLEX_CLASSES = {
  "1": "flex-1",
  auto: "flex-auto",
  initial: "flex-initial",
  none: "flex-none",
} as const

const BASIS_CLASSES = {
  "0": "basis-0",
  "1": "basis-1",
  "2": "basis-2",
  "4": "basis-4",
  "8": "basis-8",
  "12": "basis-12",
  "16": "basis-16",
  "24": "basis-24",
  "32": "basis-32",
  "40": "basis-40",
  "48": "basis-48",
  "56": "basis-56",
  "64": "basis-64",
  "96": "basis-96",
  "1/2": "basis-1/2",
  "1/3": "basis-1/3",
  "2/3": "basis-2/3",
  "1/4": "basis-1/4",
  "3/4": "basis-3/4",
  auto: "basis-auto",
  full: "basis-full",
} as const

function getResponsiveWrapClass(wrap?: ResponsiveValue<FlexWrap>): string {
  if (!wrap) return ""
  if (typeof wrap === "string") return WRAP_CLASSES[wrap]

  return [
    wrap.initial ? WRAP_CLASSES[wrap.initial] : "",
    wrap.sm ? `sm:${WRAP_CLASSES[wrap.sm]}` : "",
    wrap.md ? `md:${WRAP_CLASSES[wrap.md]}` : "",
    wrap.lg ? `lg:${WRAP_CLASSES[wrap.lg]}` : "",
    wrap.xl ? `xl:${WRAP_CLASSES[wrap.xl]}` : "",
    wrap["2xl"] ? `2xl:${WRAP_CLASSES[wrap["2xl"]]}` : "",
  ].filter(Boolean).join(" ")
}

function resolveFlexValue(value: string | undefined): {
  className: string
  style: CSSProperties
} {
  if (!value) return { className: "", style: {} }
  if (value in FLEX_CLASSES) {
    return {
      className: FLEX_CLASSES[value as keyof typeof FLEX_CLASSES],
      style: {},
    }
  }

  return { className: "", style: { flex: value } }
}

function resolveBasisValue(value: string | undefined): {
  className: string
  style: CSSProperties
} {
  if (!value) return { className: "", style: {} }
  if (value in BASIS_CLASSES) {
    return {
      className: BASIS_CLASSES[value as keyof typeof BASIS_CLASSES],
      style: {},
    }
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
  const dimensions = getDimensionClassesAndStyles({
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
  })
  const resolvedFlex = resolveFlexValue(flex)
  const resolvedBasis = resolveBasisValue(basis)

  return (
    <Component
      ref={ref}
      className={cn(
        display ? getResponsiveDisplayClass(display) : "flex",
        getResponsiveDirection(direction),
        getResponsiveWrapClass(wrap),
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
