"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): ReactNode {
  useEffect(() => {
    // Optional: log to reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-4 text-center text-text">
      <h1 className="text-lg font-semibold">Etwas ist schiefgelaufen</h1>
      <p className="max-w-md text-sm text-text-muted">
        Bitte versuchen Sie es erneut. Wenn das Problem bleibt, kontaktieren Sie den Support.
      </p>
      <button
        type="button"
        className="rounded-md border border-border bg-surface-raised px-4 py-2 text-sm font-medium text-text hover:bg-surface-muted"
        onClick={() => reset()}
      >
        Erneut versuchen
      </button>
    </div>
  )
}
