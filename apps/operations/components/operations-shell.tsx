import type { ReactNode } from "react"
import { CommandBar } from "@/components/command-bar"

export function OperationsShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-text">
      <div className="flex h-11 shrink-0 items-center border-b border-border bg-surface-raised px-3">
        <span className="text-xs font-semibold tracking-wide text-text-muted">NEZUMI</span>
        <span className="mx-2 text-text-muted">/</span>
        <span className="text-sm font-medium text-text">Operations</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="border-b border-border bg-surface-raised-subtle px-3 py-2">
          <CommandBar />
        </div>
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
