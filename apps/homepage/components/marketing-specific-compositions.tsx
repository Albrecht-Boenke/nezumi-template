export function MarketingPlaceholderSection() {
  return (
    <section
      aria-labelledby="marketing-placeholder-heading"
      className="mt-4 w-full max-w-2xl rounded-xl border border-border bg-surface-raised p-6 shadow-md"
    >
      <h2 id="marketing-placeholder-heading" className="text-lg font-medium text-text">
        Marketing-Komposition (Platzhalter)
      </h2>
      <p className="mt-2 text-sm text-text-muted">
        Ersetzen Sie diesen Block durch app-spezifische Abschnitte; wiederverwendbare Primitive bleiben in{" "}
        <span className="font-medium text-text">@nezumi/ui</span>.
      </p>
    </section>
  )
}
