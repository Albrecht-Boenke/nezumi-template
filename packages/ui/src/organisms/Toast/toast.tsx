import * as React from "react"
import { Typography } from "../../atoms/Typography"
import { cn } from "../../lib/utils"

export type ToastVariant = "default" | "success" | "warning" | "error" | "info"

export interface ToastProps extends React.ComponentProps<"div"> {
  variant?: ToastVariant
  title?: string
  description?: string
}

function Toast({
  ref,
  className,
  variant = "default",
  title,
  description,
  children,
  ...props
}: ToastProps) {
  const variantClasses: Record<ToastVariant, string> = {
    default: "bg-toast-surface border-toast-border text-toast-text",
    success: "bg-toast-success-surface border-toast-success-border text-toast-success-text",
    warning: "bg-toast-warning-surface border-toast-warning-border text-toast-warning-text",
    error: "bg-toast-error-surface border-toast-error-border text-toast-error-text",
    info: "bg-toast-info-surface border-toast-info-border text-toast-info-text",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-toast border p-toast-padding shadow-toast",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {title && (
        <Typography as="div" variant="title-medium">
          {title}
        </Typography>
      )}
      {description && (
        <Typography as="div" variant="body-medium" tone="muted">
          {description}
        </Typography>
      )}
      {children}
    </div>
  )
}

export { Toast }
