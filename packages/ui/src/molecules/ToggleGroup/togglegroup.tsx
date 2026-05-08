import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cn } from "../../lib/utils"
import { toggleVariants } from "../../atoms/Toggle/toggle"
import { type VariantProps } from "class-variance-authority"

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  className?: string
}

function ToggleGroup({ className, ref, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-toggle-group-gap",
        className
      )}
      {...props}
    />
  )
}

type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>

function ToggleGroupItem({ className, size = "md", ref, ...props }: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleVariants({ size }), className)}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
export type { ToggleGroupProps, ToggleGroupItemProps }
