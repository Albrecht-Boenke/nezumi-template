import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nezumi — Öffentliche Website",
    template: "%s · Nezumi",
  },
  description:
    "Marketing und öffentliche Inhalte der Nezumi-Plattform — schnell, barrierearm und auf Design-Tokens aufgebaut.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-surface text-text">{children}</body>
    </html>
  )
}
