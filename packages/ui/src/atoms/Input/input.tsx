import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {}

function Input({ className, ref, type, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-input-height w-full rounded-input border border-input-border bg-input-surface px-input-padding-x py-input-padding-y text-input-text",
        "placeholder:text-input-placeholder",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-input-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
