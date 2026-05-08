"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "../../lib/utils"

function Command({ className, ref, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      ref={ref}
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-surface-raised text-text",
        className,
      )}
      {...props}
    />
  )
}

function CommandInput({ className, ref, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center border-b border-border px-12" data-slot="command-input-wrapper">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="mr-8 h-16 w-16 shrink-0 text-text-muted" aria-hidden="true">
        <circle cx="7" cy="7" r="5" />
        <path d="M11 11l3 3" />
      </svg>
      <CommandPrimitive.Input
        ref={ref}
        data-slot="command-input"
        className={cn(
          "flex h-40 w-full bg-transparent py-12 text-[0.875rem] text-text placeholder:text-text-muted",
          "outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ref, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List ref={ref} data-slot="command-list" className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...props} />
}

function CommandEmpty({ ref, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty ref={ref} data-slot="command-empty" className="py-24 text-center text-[0.875rem] text-text-muted" {...props} />
}

function CommandGroup({ className, ref, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-4 text-text",
        "[&_[cmdk-group-heading]]:px-8 [&_[cmdk-group-heading]]:py-8 [&_[cmdk-group-heading]]:text-[0.75rem] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-text-muted",
        className,
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ref, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator ref={ref} data-slot="command-separator" className={cn("-mx-4 h-[1px] bg-border", className)} {...props} />
}

function CommandItem({ className, ref, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-8 rounded-sm px-8 py-8 text-[0.875rem] outline-none",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "data-[selected=true]:bg-surface-muted data-[selected=true]:text-text",
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="command-shortcut" className={cn("ml-auto text-[0.75rem] tracking-widest text-text-muted", className)} {...props} />
}

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator }
