import * as React from "react"
import { cn } from "../../lib/utils"

function Table({ className, ref, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-auto">
      <table ref={ref} data-slot="table" className={cn("w-full caption-bottom text-[0.875rem] text-text", className)} {...props} />
    </div>
  )
}

function TableHeader({ className, ref, ...props }: React.ComponentProps<"thead">) {
  return <thead ref={ref} data-slot="table-header" className={cn("[&_tr]:border-b border-border", className)} {...props} />
}

function TableBody({ className, ref, ...props }: React.ComponentProps<"tbody">) {
  return <tbody ref={ref} data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

function TableFooter({ className, ref, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot ref={ref} data-slot="table-footer" className={cn("border-t border-border bg-surface-muted/50 font-medium", className)} {...props} />
}

function TableRow({ className, ref, ...props }: React.ComponentProps<"tr">) {
  return <tr ref={ref} data-slot="table-row" className={cn("border-b border-border transition-colors duration-fast hover:bg-surface-muted/50 data-[state=selected]:bg-surface-muted", className)} {...props} />
}

function TableHead({ className, ref, ...props }: React.ComponentProps<"th">) {
  return <th ref={ref} data-slot="table-head" className={cn("h-40 px-12 text-left align-middle font-medium text-text-muted", className)} {...props} />
}

function TableCell({ className, ref, ...props }: React.ComponentProps<"td">) {
  return <td ref={ref} data-slot="table-cell" className={cn("p-12 align-middle", className)} {...props} />
}

function TableCaption({ className, ref, ...props }: React.ComponentProps<"caption">) {
  return <caption ref={ref} data-slot="table-caption" className={cn("mt-16 text-[0.875rem] text-text-muted", className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
