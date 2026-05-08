import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

function Item({ asChild, className, ref, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      ref={ref}
      data-slot="item"
      className={cn(
        "flex items-center gap-12 rounded-md border border-border bg-surface-raised p-12 text-text",
        "transition-colors duration-fast hover:bg-surface-muted",
        className,
      )}
      {...props}
    />
  )
}

function ItemMedia({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="item-media" className={cn("flex h-40 w-40 shrink-0 items-center justify-center rounded-md bg-surface-muted text-text-muted", className)} {...props} />
}

function ItemContent({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="item-content" className={cn("flex min-w-0 flex-1 flex-col gap-4", className)} {...props} />
}

function ItemTitle({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="item-title" className={cn("text-text font-medium leading-none", className)} {...props} />
}

function ItemDescription({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="item-description" className={cn("text-[0.875rem] text-text-muted", className)} {...props} />
}

function ItemActions({ className, ref, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} data-slot="item-actions" className={cn("ml-auto flex items-center gap-8", className)} {...props} />
}

export { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions }
