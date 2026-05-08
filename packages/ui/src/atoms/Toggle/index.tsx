import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-toggle border border-toggle-border bg-toggle-surface text-toggle-text",
    "hover:bg-toggle-hover-surface hover:text-toggle-hover-text",
    "data-[state=on]:bg-toggle-selected-surface data-[state=on]:text-toggle-selected-text data-[state=on]:border-transparent",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-toggle-ring",
  ],
  {
    variants: {
      size: {
        sm: "h-toggle-sm px-toggle-sm-x text-sm",
        md: "h-toggle-md px-toggle-md-x text-sm",
        lg: "h-toggle-lg px-toggle-lg-x text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface ToggleProps
  extends React.ComponentProps<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

function Toggle({ className, size, ref, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
