import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Operations-Konsole",
  description: "Interne Operations- und Verwaltungsoberflaeche",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-surface text-text antialiased">
        {children}
      </body>
    </html>
  )
}
