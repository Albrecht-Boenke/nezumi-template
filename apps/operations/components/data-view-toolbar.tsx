export function DataViewToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <button
        type="button"
        className="rounded border border-border bg-surface-raised px-2 py-1 font-medium text-text hover:bg-surface-raised-subtle"
      >
        Filter
      </button>
      <button
        type="button"
        className="rounded border border-border bg-surface-raised px-2 py-1 font-medium text-text hover:bg-surface-raised-subtle"
      >
        Spalten
      </button>
      <span className="ml-auto text-text-muted">5 Eintraege</span>
    </div>
  )
}
