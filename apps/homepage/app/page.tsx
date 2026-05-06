import { Button } from "@nezumi/ui/components/button"

import { MarketingPlaceholderSection } from "@/components/marketing-specific-compositions"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface p-8">
      <h1 className="text-3xl font-semibold tracking-tight text-text">
        Willkommen bei Nezumi
      </h1>
      <p className="max-w-lg text-center text-sm text-text-muted">
        Diese Startseite ist eine statische Marketing-Landing — gebaut mit Next.js App Router und{" "}
        <code className="rounded bg-surface-raised-subtle px-1 py-0.5 text-xs text-text">
          @nezumi/ui
        </code>
        .
      </p>
      <Button variant="primary">Mehr erfahren</Button>
      <MarketingPlaceholderSection />
    </main>
  )
}
