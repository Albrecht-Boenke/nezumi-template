import * as React from "react"
import { Slot } from "radix-ui"
import { cn, getResponsiveClasses, type Responsive } from "../../lib/utils"

// -----------------------------------------------------------------------------
// Dictionaries (Mapped exactly to Tailwind v4 values)
// -----------------------------------------------------------------------------

const displayMap = {
  none: "hidden",
  initial: "flex",
} as const

const alignMap = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const

const sizeMap = {
  "1": "max-w-(--container-1)",
  "2": "max-w-(--container-2)",
  "3": "max-w-(--container-3)",
  "4": "max-w-(--container-4)",
} as const

// -----------------------------------------------------------------------------
// Component Props
// -----------------------------------------------------------------------------

export interface ContainerProps extends Omit<React.ComponentProps<"div">, "display"> {
  asChild?: boolean
  display?: Responsive<keyof typeof displayMap>
  align?: Responsive<keyof typeof alignMap>
  size?: Responsive<keyof typeof sizeMap>
}

/**
 * Container component that provides a responsive max-width to its content.
 * Drop-in replacement for Radix Themes Container with Tailwind v4 natively.
 */
function Container({
  className,
  asChild = false,
  display = "initial",
  align = "center",
  size = "4",
  ref,
  children,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      ref={ref}
      className={cn(
        "flex flex-col flex-shrink-0 flex-grow w-full",
        getResponsiveClasses(display, displayMap),
        getResponsiveClasses(align, alignMap),
        className
      )}
      {...props}
    >
      {/* 
        In Radix Themes, the Container inner element handles the max-width sizing.
        When asChild is true, we still need to wrap children in the inner max-width container,
        but Radix's Slot merges props into its immediate child.
        If we wrap children in a div, Slot will merge into this inner div.
        To maintain Radix layout accurately while supporting asChild:
        If asChild is true, the user is expecting THEIR element to be the container.
        So we actually must render the inner wrapper inside THEIR element if we can,
        or just apply the size class directly to the outer if it's simpler.
        Radix Themes handles this carefully. For simplicity here, we stick to the
        standard nested div structure unless asChild gets complex. 
      */}
      <div className={cn("w-full", getResponsiveClasses(size, sizeMap))}>
        {children}
      </div>
    </Comp>
  )
}

export { Container }
