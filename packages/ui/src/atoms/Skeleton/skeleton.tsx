import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkeletonProps extends React.ComponentProps<"div"> {}

function Skeleton({ className, ref, ...props }: SkeletonProps) {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-surface-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
