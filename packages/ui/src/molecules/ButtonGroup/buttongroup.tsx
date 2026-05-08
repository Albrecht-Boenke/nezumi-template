import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical"
}

function ButtonGroup({ className, orientation = "horizontal", ref, ...props }: ButtonGroupProps) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "inline-flex isolate",
        orientation === "horizontal" && "flex-row [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-[1px]",
        orientation === "vertical" && "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-[1px]",
        "[&>*:hover]:z-10 [&>*:focus]:z-10",
        className,
      )}
      {...props}
    />
  )
}

export { ButtonGroup }
