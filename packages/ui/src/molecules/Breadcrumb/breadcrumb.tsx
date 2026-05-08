import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

function Breadcrumb({ ref, ...props }: React.ComponentProps<"nav">) {
  return <nav ref={ref} aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ref, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-8", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ref, ...props }: React.ComponentProps<"li">) {
  return <li ref={ref} data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-8", className)} {...props} />
}

function BreadcrumbLink({ asChild, className, ref, ...props }: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      ref={ref}
      data-slot="breadcrumb-link"
      className={cn("typography-body-medium text-text-muted transition-colors duration-fast hover:text-text", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ref, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn("typography-body-medium text-text", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden="true" data-slot="breadcrumb-separator" className={cn("text-text-muted", className)} {...props}>
      {children ?? (
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-12 w-12">
          <polyline points="4 2 8 6 4 10" />
        </svg>
      )}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span role="presentation" aria-hidden="true" data-slot="breadcrumb-ellipsis" className={cn("flex h-16 w-24 items-center justify-center typography-body-medium text-text", className)} {...props}>
      …
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
