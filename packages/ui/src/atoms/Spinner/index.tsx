import * as React from "react"
import { cn } from "../../lib/utils"

export interface SpinnerProps extends React.ComponentProps<"span"> {
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "h-12 w-12 border",
  md: "h-16 w-16 border-2",
  lg: "h-24 w-24 border-2",
} as const

function Spinner({ className, size = "md", ref, ...props }: SpinnerProps) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn(
        "inline-block animate-spin rounded-full border-border border-t-brand",
        sizeMap[size],
        className,
      )}
      {...props}
    />
  )
}

export { Spinner }
