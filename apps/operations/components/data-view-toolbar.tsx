export function DataViewToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <button
        type="button"
        disabled
        className="rounded border border-border bg-surface-raised px-2 py-1 font-medium text-text disabled:cursor-not-allowed disabled:opacity-50"
      >
        Filter
      </button>
      <button
        type="button"
        disabled
        className="rounded border border-border bg-surface-raised px-2 py-1 font-medium text-text disabled:cursor-not-allowed disabled:opacity-50"
      >
        Spalten
      </button>
      <span className="ml-auto text-text-muted">5 Einträge</span>
    </div>
  )
}
