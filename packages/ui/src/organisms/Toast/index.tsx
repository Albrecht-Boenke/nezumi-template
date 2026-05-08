import * as React from "react"
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
        <div className="font-semibold text-toast-title-text">{title}</div>
      )}
      {description && (
        <div className="text-toast-description-text">{description}</div>
      )}
      {children}
    </div>
  )
}

export { Toast }
