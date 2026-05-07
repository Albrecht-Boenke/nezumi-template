import {
  cn,
  getDimensionClassesAndStyles,
  getLayoutSpacingClasses,
  getResponsiveDisplayClass,
} from "../utils"
import type { BoxProps } from "../types"

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

Box.displayName = "Box"
