import * as React from "react"
import { cn } from "../../lib/utils"

function InputGroup({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="input-group"
      className={cn(
        "flex h-40 items-center gap-0 rounded-md border border-border bg-surface-raised text-text",
        "focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-surface",
        "[&>input]:border-0 [&>input]:bg-transparent [&>input]:shadow-none [&>input]:focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupAddon({ className, ref, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      ref={ref}
      data-slot="input-group-addon"
      className={cn("inline-flex h-full items-center px-12 text-text-muted text-[0.875rem]", className)}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon }
