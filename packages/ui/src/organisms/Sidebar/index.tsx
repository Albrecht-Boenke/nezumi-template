"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  collapsed: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return ctx
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const toggle = React.useCallback(() => setOpen((v) => !v), [])

  const value = React.useMemo(
    () => ({ open, setOpen, toggle, collapsed: !open }),
    [open, toggle]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

export interface SidebarProps extends React.ComponentProps<"aside"> {
  side?: "left" | "right"
}

export function Sidebar({
  className,
  side = "left",
  ref,
  ...props
}: SidebarProps) {
  const { collapsed } = useSidebar()

  return (
    <aside
      ref={ref}
      data-slot="sidebar"
      data-side={side}
      data-collapsed={collapsed}
      className={cn(
        "flex flex-col bg-sidebar-surface border-sidebar-border h-svh shrink-0 transition-all duration-normal",
        side === "left" ? "border-r" : "border-l",
        collapsed
          ? "w-sidebar-collapsed-width"
          : "w-sidebar-width",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Header / Content / Footer                                          */
/* ------------------------------------------------------------------ */

export function SidebarHeader({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={cn("p-sidebar-header-padding", className)}
      {...props}
    />
  )
}

export function SidebarContent({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn(
        "flex-1 overflow-auto p-sidebar-content-padding",
        className
      )}
      {...props}
    />
  )
}

export function SidebarFooter({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-footer"
      className={cn("p-sidebar-footer-padding", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Group / Menu / Item / Button                                     */
/* ------------------------------------------------------------------ */

export function SidebarGroup({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-sidebar-group-gap", className)}
      {...props}
    />
  )
}

export function SidebarMenu({
  className,
  ref,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      ref={ref}
      data-slot="sidebar-menu"
      className={cn("flex flex-col gap-sidebar-menu-item-gap", className)}
      {...props}
    />
  )
}

export function SidebarMenuItem({
  className,
  ref,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      ref={ref}
      data-slot="sidebar-menu-item"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

export interface SidebarMenuButtonProps
  extends React.ComponentProps<"button"> {
  asChild?: boolean
  isActive?: boolean
}

export function SidebarMenuButton({
  className,
  asChild = false,
  isActive = false,
  ref,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "w-full flex items-center gap-sidebar-menu-item-gap",
        "px-sidebar-menu-item-padding-x py-sidebar-menu-item-padding-y",
        "rounded-sidebar-menu-item text-sidebar-menu-item-text",
        "transition-colors duration-fast",
        "hover:bg-sidebar-menu-item-hover",
        isActive &&
          "bg-sidebar-menu-item-active text-sidebar-menu-item-text-active",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

export function SidebarTrigger({
  className,
  ref,
  ...props
}: React.ComponentProps<"button">) {
  const { toggle } = useSidebar()

  return (
    <button
      ref={ref}
      data-slot="sidebar-trigger"
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-md border border-border bg-surface-raised p-2",
        "hover:bg-surface-muted transition-colors",
        className
      )}
      {...props}
    />
  )
}
