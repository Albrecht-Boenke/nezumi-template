import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Flex } from "../../layout"
import { cn } from "../../lib/utils"

const alertVariants = cva(
  [
    "relative w-full rounded-lg border",
    "[&>svg]:absolute [&>svg]:left-16 [&>svg]:top-12 [&>svg]:h-16 [&>svg]:w-16",
    "[&>svg~*]:pl-24",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface-raised border-border text-text",
        info: "bg-info-bg border-info/30 text-info",
        success: "bg-success-bg border-success/30 text-success",
        warning: "bg-warning-bg border-warning/30 text-warning",
        destructive: "bg-error-bg border-error/30 text-error",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ref, ...props }: AlertProps) {
  return (
    <Flex
      as="div"
      ref={ref}
      role="alert"
      data-slot="alert"
      direction="column"
      gap="4"
      px="16"
      py="12"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ref, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      ref={ref}
      data-slot="alert-title"
      className={cn("typography-title-medium text-text", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn("typography-body-medium text-text", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
