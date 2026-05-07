import {
  cn,
  getDimensionClassesAndStyles,
  getLayoutSpacingClasses,
  getResponsiveDisplayClass,
} from "../utils"
import type { ContainerProps, ResponsiveValue } from "../types"

const CONTAINER_SIZE_CLASSES = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
} as const

const DEFAULT_CONTAINER_PX = {
  initial: "16",
  md: "24",
} as const

type ContainerSize = keyof typeof CONTAINER_SIZE_CLASSES

function getSizeClass(size: ContainerSize): string {
  return CONTAINER_SIZE_CLASSES[size]
}

function getResponsiveSizeClass(
  size: ResponsiveValue<ContainerSize> | undefined,
): string {
  if (!size) return CONTAINER_SIZE_CLASSES.lg
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

export function Container({
  size,
  centered = true,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  display,
  w, h, minW, maxW, minH, maxH,
  as: Component = "div",
  className,
  style,
  ref,
  ...props
}: ContainerProps) {
  const dimensions = getDimensionClassesAndStyles({
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
  })
  const resolvedPx = px ?? (p ? undefined : DEFAULT_CONTAINER_PX)

  return (
    <Component
      ref={ref}
      className={cn(
        "w-full",
        getResponsiveDisplayClass(display),
        !maxW && getResponsiveSizeClass(size),
        centered && !mx && "mx-auto",
        getLayoutSpacingClasses({
          p, px: resolvedPx, py, pt, pr, pb, pl,
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

Container.displayName = "Container"
