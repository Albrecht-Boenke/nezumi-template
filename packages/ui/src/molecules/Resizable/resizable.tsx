"use client"

import * as React from "react"
import { Group, Panel, Separator } from "react-resizable-panels"
import { cn } from "../../lib/utils"

function ResizablePanelGroup({ className, ...props }: React.ComponentProps<typeof Group>) {
  return (
    <Group
      data-slot="resizable-panel-group"
      className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
      {...props}
    />
  )
}

const ResizablePanel = Panel

function ResizableHandle({ withHandle, className, ...props }: React.ComponentProps<typeof Separator> & { withHandle?: boolean }) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-border",
        "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-16 w-12 items-center justify-center rounded-sm border border-border bg-surface-raised">
          <svg viewBox="0 0 8 12" fill="currentColor" className="h-12 w-8 text-text-muted" aria-hidden="true">
            <circle cx="2" cy="2" r="1" />
            <circle cx="2" cy="6" r="1" />
            <circle cx="2" cy="10" r="1" />
            <circle cx="6" cy="2" r="1" />
            <circle cx="6" cy="6" r="1" />
            <circle cx="6" cy="10" r="1" />
          </svg>
        </div>
      )}
    </Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
