import Link from "next/link"

const navItems = [{ href: "/", label: "Übersicht" }] as const

export function AccountNav() {
  return (
    <nav
      className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted"
      aria-label="Mitglieder-Navigation"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-sm underline-offset-4 transition-colors hover:text-text focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
