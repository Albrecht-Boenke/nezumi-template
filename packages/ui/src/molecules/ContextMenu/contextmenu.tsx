"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { cn } from "../../lib/utils"

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const itemBase =
  "relative flex cursor-default select-none items-center gap-8 rounded-sm px-8 py-8 text-[0.875rem] outline-none " +
  "focus:bg-surface-muted focus:text-text data-[disabled]:pointer-events-none data-[disabled]:opacity-50"

function ContextMenuSubTrigger({ className, inset, children, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(itemBase, "data-[state=open]:bg-surface-muted", inset && "pl-32", className)}
      {...props}
    >
      {children}
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto h-12 w-12">
        <polyline points="4 2 8 6 4 10" />
      </svg>
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({ className, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised p-4 text-text shadow-md", className)}
      {...props}
    />
  )
}

function ContextMenuContent({ className, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised p-4 text-text shadow-md", className)}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({ className, inset, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & { inset?: boolean }) {
  return <ContextMenuPrimitive.Item ref={ref} className={cn(itemBase, inset && "pl-32", className)} {...props} />
}

function ContextMenuCheckboxItem({ className, children, checked, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem ref={ref} className={cn(itemBase, "pl-32", className)} checked={checked} {...props}>
      <span className="absolute left-8 flex h-16 w-16 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-12 w-12">
            <polyline points="3 8 6.5 11.5 13 5" />
          </svg>
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({ className, children, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem ref={ref} className={cn(itemBase, "pl-32", className)} {...props}>
      <span className="absolute left-8 flex h-16 w-16 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <span className="h-8 w-8 rounded-full bg-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({ className, inset, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & { inset?: boolean }) {
  return <ContextMenuPrimitive.Label ref={ref} className={cn("px-8 py-8 text-[0.875rem] font-medium text-text-muted", inset && "pl-32", className)} {...props} />
}

function ContextMenuSeparator({ className, ref, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-4 my-4 h-[1px] bg-border", className)} {...props} />
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("ml-auto text-[0.75rem] tracking-widest text-text-muted", className)} {...props} />
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
