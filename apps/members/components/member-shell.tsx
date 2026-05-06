import type { ReactNode } from "react"
import { AccountNav } from "@/components/account-nav"

export function MemberShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-text">
      <header className="border-b border-border bg-surface-raised/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-text">Mitgliederbereich</p>
            <p className="text-xs text-text-muted">Platzhalter-Shell · Navigation folgt</p>
          </div>
          <AccountNav />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
    </div>
  )
}
