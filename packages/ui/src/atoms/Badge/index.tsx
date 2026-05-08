import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-badge px-badge-padding-x py-badge-padding-y",
    "text-badge font-badge leading-badge",
    "transition-colors duration-normal",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-badge-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-brand text-on-brand",
          "hover:bg-button-brand-hover",
          "active:bg-button-brand-active",
        ],
        secondary: [
          "bg-secondary text-on-secondary",
          "hover:bg-button-secondary-hover",
          "active:bg-button-secondary-active",
        ],
        destructive: [
          "bg-error text-on-error",
          "hover:bg-button-error-hover",
          "active:bg-button-error-active",
        ],
        outline: [
          "border border-badge-border bg-transparent text-badge-text",
          "hover:bg-badge-hover-surface",
          "active:bg-surface-muted",
        ],
        ghost: [
          "bg-transparent text-brand",
          "hover:bg-badge-hover-surface",
          "active:bg-surface-raised-subtle",
        ],
        link: [
          "bg-transparent text-brand underline-offset-4",
          "hover:underline",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({ className, variant, ref, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
