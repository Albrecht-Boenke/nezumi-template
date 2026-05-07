import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn, getResponsiveClasses, type Responsive } from "../../lib/utils"

const sizeMap = {
  "1": "py-16",
  "2": "py-32",
  "3": "py-64", // default
  "4": "py-96",
} as const

const displayMap = {
  none: "hidden",
  block: "block",
} as const

export interface SectionProps extends Omit<React.ComponentProps<"section">, "display"> {
  asChild?: boolean
  size?: Responsive<keyof typeof sizeMap>
  display?: Responsive<keyof typeof displayMap>
}

/**
 * Section component.
 * Provides consistent vertical rhythm presets via the size prop.
 */
function Section({
  className,
  asChild = false,
  size = "3",
  display,
  ref,
  ...props
}: SectionProps) {
  const Comp = asChild ? Slot : "section"

  return (
    <Comp
      ref={ref}
      className={cn(
        getResponsiveClasses(display, displayMap),
        getResponsiveClasses(size, sizeMap),
        className
      )}
      {...props}
    />
  )
}

export { Section }
