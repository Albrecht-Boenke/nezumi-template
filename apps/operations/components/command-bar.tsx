export function CommandBar() {
  return (
    <div
      role="search"
      className="flex h-8 items-center gap-2 rounded-md border border-border bg-surface-raised px-2 text-xs text-text-muted"
    >
      <span className="font-mono text-text-muted">⌘K</span>
      <span className="truncate">Befehl oder Datensatz suchen …</span>
    </div>
  )
}
