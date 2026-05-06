import type { ReactNode } from "react"
import { MemberShell } from "@/components/member-shell"

export default function AccountGroupLayout({ children }: { children: ReactNode }) {
  return <MemberShell>{children}</MemberShell>
}
