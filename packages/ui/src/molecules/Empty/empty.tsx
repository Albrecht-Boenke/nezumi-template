import * as React from "react"
import { cn } from "../../lib/utils"

function Empty({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="empty"
      className={cn(
        "flex flex-col items-center justify-center gap-12 rounded-lg border border-dashed border-border bg-surface px-24 py-48 text-center",
        className,
      )}
      {...props}
    />
  )
}

function EmptyIcon({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={cn("flex h-48 w-48 items-center justify-center rounded-full bg-surface-muted text-text-muted", className)} {...props} />
}

function EmptyTitle({ className, ref, ...props }: React.ComponentProps<"h3">) {
  return <h3 ref={ref} className={cn("text-text font-semibold", className)} {...props} />
}

function EmptyDescription({ className, ref, ...props }: React.ComponentProps<"p">) {
  return <p ref={ref} className={cn("text-[0.875rem] text-text-muted", className)} {...props} />
}

function EmptyContent({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={cn("flex items-center gap-8", className)} {...props} />
}

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyContent }
