import type { ReactNode } from "react"
import { OperationsShell } from "@/components/operations-shell"

export default function ConsoleGroupLayout({ children }: { children: ReactNode }) {
  return <OperationsShell>{children}</OperationsShell>
}
