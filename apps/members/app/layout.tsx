import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_MEMBERS_URL ?? "http://localhost:3001"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mitgliederbereich",
    template: "%s · Mitgliederbereich",
  },
  description: "Geschützter Kunden- und Mitgliederbereich",
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-surface text-text">{children}</body>
    </html>
  )
}
