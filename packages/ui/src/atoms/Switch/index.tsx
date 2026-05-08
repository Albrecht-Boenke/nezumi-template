"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "../../lib/utils"

function Switch({ className, ref, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        "peer inline-flex h-24 w-40 shrink-0 cursor-pointer items-center rounded-full border border-border bg-surface-muted",
        "transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=checked]:bg-brand data-[state=checked]:border-brand",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-16 w-16 translate-x-1 rounded-full bg-surface-raised shadow-sm",
          "transition-transform duration-normal ease-out",
          "data-[state=checked]:translate-x-[1.0625rem] data-[state=checked]:bg-on-brand",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
