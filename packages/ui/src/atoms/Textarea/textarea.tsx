import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {}

function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-textarea-min w-full rounded-textarea border border-textarea-border bg-textarea-surface px-textarea-padding-x py-textarea-padding-y text-textarea-text",
        "placeholder:text-textarea-placeholder",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-textarea-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
