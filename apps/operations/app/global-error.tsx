"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "var(--color-surface)",
          color: "var(--color-text)",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>
            Operations-Konsole nicht verfuegbar
          </h1>
          <p style={{ margin: "0 0 1rem", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Ein schwerwiegender Fehler ist aufgetreten. Bitte Seite neu laden oder Support informieren.
          </p>
          {error.digest ? (
            <p
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
                margin: "0 0 1rem",
              }}
            >
              Referenz: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              borderRadius: "0.375rem",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface-raised)",
              padding: "0.375rem 0.75rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Erneut laden
          </button>
        </div>
      </body>
    </html>
  )
}
