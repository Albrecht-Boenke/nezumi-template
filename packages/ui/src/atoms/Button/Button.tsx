/**
 * @nezumi/ui — Button Atom
 *
 * Primitiver Button mit CVA-Varianten.
 * Kein Business-Logic, reines UI.
 *
 * React 19: ref wird direkt als prop übergeben.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-8",
    "rounded-md font-medium text-sm",
    "transition-colors duration-normal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-action-primary text-action-primary-fg",
          "hover:bg-action-primary-hover",
          "active:bg-action-primary-active",
        ],
        secondary: [
          "bg-action-secondary text-action-secondary-fg",
          "hover:bg-action-secondary-hover",
        ],
        destructive: [
          "bg-action-destructive text-action-destructive-fg",
          "hover:bg-action-destructive-hover",
        ],
        outline: [
          "border border-border-strong bg-transparent text-foreground",
          "hover:bg-background-subtle hover:border-action-primary",
        ],
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-background-subtle",
        ],
        link: [
          "bg-transparent text-action-primary underline-offset-4",
          "hover:underline",
        ],
      },
      size: {
        sm:   "h-32 px-12 text-xs",
        md:   "h-40 px-16 text-sm",
        lg:   "h-48 px-24 text-base",
        xl:   "h-56 px-32 text-lg",
        icon: "h-40 w-40 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  ref,
  asChild,
  ...buttonProps
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...buttonProps}
    />
  )
}

export { Button, buttonVariants }
