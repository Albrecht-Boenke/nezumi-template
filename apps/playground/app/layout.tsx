import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_PLAYGROUND_URL ?? "http://localhost:3003"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nezumi template",
  description: "Next.js App Router workspace shell wired to @nezumi/ui",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
