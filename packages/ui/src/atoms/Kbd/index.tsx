import * as React from "react"
import { cn } from "../../lib/utils"

export interface KbdProps extends React.ComponentProps<"kbd"> {}

function Kbd({ className, ref, ...props }: KbdProps) {
  return (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-24 min-w-24 items-center justify-center rounded-sm border border-border bg-surface-raised-subtle px-8 font-accent text-text",
        "text-[0.75rem] leading-none",
        "shadow-sm",
        className,
      )}
      {...props}
    />
  )
}

export { Kbd }
