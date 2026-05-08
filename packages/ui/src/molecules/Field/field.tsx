import * as React from "react"
import { cn } from "../../lib/utils"

function Field({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="field" className={cn("flex flex-col gap-8", className)} {...props} />
}

function FieldLabel({ className, ref, ...props }: React.ComponentProps<"label">) {
  return <label ref={ref} data-slot="field-label" className={cn("text-[0.875rem] font-medium text-text", className)} {...props} />
}

function FieldDescription({ className, ref, ...props }: React.ComponentProps<"p">) {
  return <p ref={ref} data-slot="field-description" className={cn("text-[0.75rem] text-text-muted", className)} {...props} />
}

function FieldError({ className, ref, ...props }: React.ComponentProps<"p">) {
  return <p ref={ref} role="alert" data-slot="field-error" className={cn("text-[0.75rem] text-error", className)} {...props} />
}

function FieldGroup({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="field-group" className={cn("flex flex-col gap-16", className)} {...props} />
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup }
