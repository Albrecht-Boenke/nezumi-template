/**
 * @packages/ui — Button Atom
 *
 * Primitiver Button mit CVA-Varianten.
 * Kein Business-Logic, reines UI.
 *
 * React 19.2.5 / react-dom 19.2.5: ref wird direkt als prop übergeben.
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-button-gap",
    "rounded-button font-button",
    "transition-colors duration-normal",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:opacity-50",
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
        primary: [
          "bg-brand text-on-brand",
          "hover:bg-button-brand-hover",
          "active:bg-button-brand-active",
        ],
        tonal: [
          "bg-secondary text-on-secondary",
          "hover:bg-button-secondary-hover",
          "active:bg-button-secondary-active",
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
          "border border-border bg-transparent text-text",
          "hover:bg-button-outline-hover hover:border-brand",
          "active:bg-button-outline-active",
        ],
        ghost: [
          "bg-transparent text-brand",
          "hover:bg-button-ghost-hover",
          "active:bg-button-ghost-active",
        ],
        elevated: [
          "bg-surface-raised text-brand shadow-sm",
          "hover:bg-button-elevated-hover hover:shadow-md",
          "active:bg-button-elevated-active",
        ],
        link: [
          "bg-transparent text-brand underline-offset-4",
          "hover:underline",
        ],
      },
      size: {
        sm:   "h-button-sm px-button-sm-x text-xs",
        md:   "h-button-md px-button-md-x text-sm",
        lg:   "h-button-lg px-button-lg-x text-base",
        xl:   "h-button-xl px-button-xl-x text-lg",
        icon: "h-button-icon w-button-icon p-0 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
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
  asChild = false,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...(!asChild ? { type } : {})}
      {...buttonProps}
    />
  )
}

export { Button, buttonVariants }
