import type { Metadata } from "next"
import { Fraunces, Urbanist } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_OPERATIONS_URL ?? "http://localhost:3002"

const urbanist = Urbanist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-urbanist",
  display: "swap",
  weight: "variable",
})

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Operations-Konsole",
  description: "Interne Operations- und Verwaltungsoberfläche",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      className={`${urbanist.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-surface text-text">{children}</body>
    </html>
  )
}
