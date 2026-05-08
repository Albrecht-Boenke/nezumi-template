import * as React from "react"
import { cn } from "../../lib/utils"

export interface NativeSelectProps extends React.ComponentProps<"select"> {}

function NativeSelect({ className, children, ref, ...props }: NativeSelectProps) {
  return (
    <div className="relative inline-flex w-full">
      <select
        ref={ref}
        data-slot="native-select"
        className={cn(
          "h-40 w-full appearance-none rounded-md border border-border bg-surface-raised pl-16 pr-32 text-text",
          "text-[0.875rem] leading-none",
          "transition-colors duration-fast",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-12 top-1/2 h-12 w-12 -translate-y-1/2 text-text-muted"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="3 4.5 6 7.5 9 4.5" />
      </svg>
    </div>
  )
}

export { NativeSelect }
