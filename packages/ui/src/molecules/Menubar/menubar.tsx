"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { cn } from "../../lib/utils"

const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const itemBase =
  "relative flex cursor-default select-none items-center gap-8 rounded-sm px-8 py-8 text-[0.875rem] outline-none " +
  "focus:bg-surface-muted focus:text-text data-[disabled]:pointer-events-none data-[disabled]:opacity-50"

function Menubar({ className, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      data-slot="menubar"
      className={cn("flex h-40 items-center gap-4 rounded-md border border-border bg-surface-raised p-4", className)}
      {...props}
    />
  )
}

function MenubarTrigger({ className, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-12 py-4 text-[0.875rem] font-medium text-text outline-none",
        "focus:bg-surface-muted data-[state=open]:bg-surface-muted",
        className,
      )}
      {...props}
    />
  )
}

function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn("z-50 min-w-[12rem] overflow-hidden rounded-md border border-border bg-surface-raised p-4 text-text shadow-md", className)}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarSubTrigger({ className, inset, children, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(itemBase, "data-[state=open]:bg-surface-muted", inset && "pl-32", className)}
      {...props}
    >
      {children}
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto h-12 w-12">
        <polyline points="4 2 8 6 4 10" />
      </svg>
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({ className, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return <MenubarPrimitive.SubContent ref={ref} className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface-raised p-4 text-text shadow-md", className)} {...props} />
}

function MenubarItem({ className, inset, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean }) {
  return <MenubarPrimitive.Item ref={ref} className={cn(itemBase, inset && "pl-32", className)} {...props} />
}

function MenubarCheckboxItem({ className, children, checked, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem ref={ref} className={cn(itemBase, "pl-32", className)} checked={checked} {...props}>
      <span className="absolute left-8 flex h-16 w-16 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-12 w-12">
            <polyline points="3 8 6.5 11.5 13 5" />
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({ className, children, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem ref={ref} className={cn(itemBase, "pl-32", className)} {...props}>
      <span className="absolute left-8 flex h-16 w-16 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <span className="h-8 w-8 rounded-full bg-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({ className, inset, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return <MenubarPrimitive.Label ref={ref} className={cn("px-8 py-8 text-[0.875rem] font-medium text-text-muted", inset && "pl-32", className)} {...props} />
}

function MenubarSeparator({ className, ref, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator ref={ref} className={cn("-mx-4 my-4 h-[1px] bg-border", className)} {...props} />
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("ml-auto text-[0.75rem] tracking-widest text-text-muted", className)} {...props} />
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
