import { Toaster as SonnerToaster, toast } from "sonner"
import { cn } from "../../lib/utils"

export interface ToasterProps extends React.ComponentProps<typeof SonnerToaster> {}

function Toaster({ className, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-sonner-surface group-[.toaster]:text-sonner-text group-[.toaster]:border-sonner-border group-[.toaster]:shadow-sonner group-[.toaster]:rounded-sonner",
          description: "group-[.toast]:text-sonner-description",
          actionButton:
            "group-[.toast]:bg-sonner-action-bg group-[.toast]:text-sonner-action-text",
          cancelButton:
            "group-[.toast]:bg-sonner-cancel-bg group-[.toast]:text-sonner-cancel-text",
          error:
            "group-[.toaster]:bg-sonner-error-surface group-[.toaster]:text-sonner-error-text group-[.toaster]:border-sonner-error-border",
          success:
            "group-[.toaster]:bg-sonner-success-surface group-[.toaster]:text-sonner-success-text group-[.toaster]:border-sonner-success-border",
          warning:
            "group-[.toaster]:bg-sonner-warning-surface group-[.toaster]:text-sonner-warning-text group-[.toaster]:border-sonner-warning-border",
          info:
            "group-[.toaster]:bg-sonner-info-surface group-[.toaster]:text-sonner-info-text group-[.toaster]:border-sonner-info-border",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
