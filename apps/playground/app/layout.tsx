import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? "http://localhost:3003"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Layout Primitives Demo",
    template: "%s · Layout Primitives Demo",
  },
  description:
    "Interactive documentation and examples for Nezumi UI layout primitives.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-text">{children}</body>
    </html>
  )
}
