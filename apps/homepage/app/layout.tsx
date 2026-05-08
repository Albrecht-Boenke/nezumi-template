import type { Metadata, Viewport } from "next"
import { Urbanist } from "next/font/google"
import type { ReactNode } from "react"
import { ThemeProvider } from "@packages/ui/providers/theme"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nezumi — Typography Demo",
    template: "%s · Nezumi",
  },
  description:
    "Typography and theme demo for the Nezumi design token system.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#121014" },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={urbanist.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-surface text-text">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
