import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_OPERATIONS_URL ?? "http://localhost:3002"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Operations-Konsole",
  description: "Interne Operations- und Verwaltungsoberfläche",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-surface text-text">{children}</body>
    </html>
  )
}
