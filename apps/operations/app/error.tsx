"use client"

import { useEffect } from "react"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 bg-surface p-6 text-center text-text">
      <h1 className="text-base font-semibold">Etwas ist schiefgelaufen</h1>
      <p className="max-w-md text-sm text-text-muted">
        Die Seite konnte nicht geladen werden. Bitte erneut versuchen oder den Vorgang abbrechen.
      </p>
      {error.digest ? (
        <p className="font-mono text-xs text-text-muted">Referenz: {error.digest}</p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-border bg-surface-raised px-3 py-1.5 text-sm font-medium text-text hover:bg-surface-raised-subtle"
      >
        Erneut versuchen
      </button>
    </div>
  )
}
