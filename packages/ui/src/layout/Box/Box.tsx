import * as React from "react"
import { Slot } from "radix-ui"
import { cn, getResponsiveClasses, type Responsive } from "../../lib/utils"

const displayMap = {
  none: "hidden",
  inline: "inline",
  "inline-block": "inline-block",
  block: "block",
} as const

export interface BoxProps extends Omit<React.ComponentProps<"div">, "display"> {
  asChild?: boolean
  display?: Responsive<keyof typeof displayMap>
}

/**
 * Box component.
 * Replaces standard divs when dynamic responsive display behavior or polymorphism (asChild) is needed.
 * Strictly adheres to shadcn layout philosophy (no margin/padding props - use className instead).
 */
function Box({
  className,
  asChild = false,
  display,
  ref,
  ...props
}: BoxProps) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      ref={ref}
      className={cn(getResponsiveClasses(display, displayMap), className)}
      {...props}
    />
  )
}

export { Box }
