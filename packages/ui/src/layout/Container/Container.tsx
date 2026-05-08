import {
  cn,
  getDimensionClassesAndStyles,
  getLayoutSpacingClasses,
  getResponsiveDisplayClass,
  responsiveClass,
} from "../utils"
import type { ContainerProps, ResponsiveValue } from "../types"

const CONTAINER_SIZE_CLASSES = {
  sm:   "max-w-sm",
  md:   "max-w-md",
  lg:   "max-w-lg",
  xl:   "max-w-xl",
  "2xl": "max-w-2xl",
} as const

const DEFAULT_CONTAINER_PX = {
  initial: "16",
  md:      "24",
} as const

type ContainerSize = keyof typeof CONTAINER_SIZE_CLASSES

function getResponsiveSizeClass(
  size: ResponsiveValue<ContainerSize> | undefined,
): string {
  if (size == null) return CONTAINER_SIZE_CLASSES.lg
  return responsiveClass(size, v => CONTAINER_SIZE_CLASSES[v])
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
  const dimensions = getDimensionClassesAndStyles({ w, h, minW, maxW, minH, maxH })
  // Default-Padding nur dann, wenn weder `p` noch `px` explizit gesetzt ist.
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
