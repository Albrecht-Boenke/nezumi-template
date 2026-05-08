import * as React from "react"
import { cn } from "../../lib/utils"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
}

function PaginationContent({ className, ref, ...props }: React.ComponentProps<"ul">) {
  return <ul ref={ref} data-slot="pagination-content" className={cn("flex flex-row items-center gap-4", className)} {...props} />
}

function PaginationItem({ className, ref, ...props }: React.ComponentProps<"li">) {
  return <li ref={ref} data-slot="pagination-item" className={cn("", className)} {...props} />
}

interface PaginationLinkProps extends React.ComponentProps<"a"> {
  isActive?: boolean
  size?: "sm" | "md" | "lg"
}

function PaginationLink({ className, isActive, size = "md", ref, ...props }: PaginationLinkProps) {
  const sizeMap = { sm: "h-32 px-12 text-[0.875rem]", md: "h-40 px-16 text-[0.875rem]", lg: "h-48 px-24 text-base" } as const
  return (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      className={cn(
        "inline-flex items-center justify-center gap-8 rounded-sm transition-colors duration-fast",
        sizeMap[size],
        isActive ? "border border-border bg-surface-muted text-text" : "text-text hover:bg-surface-muted",
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <PaginationLink aria-label="Go to previous page" size="md" className={cn("gap-4 pl-12", className)} {...props}>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-12 w-12"><polyline points="8 2 4 6 8 10" /></svg>
      <span>Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <PaginationLink aria-label="Go to next page" size="md" className={cn("gap-4 pr-12", className)} {...props}>
      <span>Next</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-12 w-12"><polyline points="4 2 8 6 4 10" /></svg>
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span aria-hidden data-slot="pagination-ellipsis" className={cn("flex h-40 w-40 items-center justify-center text-text-muted", className)} {...props}>
      …
      <span className="sr-only">More pages</span>
    </span>
  )
}

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis }
