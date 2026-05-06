import { DataViewToolbar } from "@/components/data-view-toolbar"

const rows = [
  { id: "run-2048", job: "Abgleich Lieferanten", status: "OK", duration: "12s", actor: "system" },
  { id: "run-2047", job: "Stapel Export", status: "Warnung", duration: "4m 02s", actor: "u·ops" },
  { id: "run-2046", job: "Berechtigungen PR-118", status: "Fehler", duration: "18s", actor: "u·admin" },
  { id: "run-2045", job: "Audit Snapshot", status: "OK", duration: "2s", actor: "system" },
  { id: "run-2044", job: "Queue Drain", status: "OK", duration: "55s", actor: "u·ops" },
]

function statusSurface(status: string) {
  switch (status) {
    case "OK":
      return "bg-success-bg text-text border-border"
    case "Warnung":
      return "bg-warning-bg text-text border-border"
    case "Fehler":
      return "bg-error-bg text-text border-border"
    default:
      return "bg-surface-raised-subtle text-text-muted border-border"
  }
}

export default function ConsoleDashboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
      <header className="flex shrink-0 flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
        <h1 className="text-base font-semibold tracking-tight text-text">Ueberblick</h1>
        <p className="text-xs text-text-muted">Letzte Laeufe · Platzhalterdaten</p>
      </header>

      <DataViewToolbar />

      <section
        aria-label="Letzte Jobs"
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border bg-surface-raised"
      >
        <div className="grid grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)_auto] gap-x-3 gap-y-0 border-b border-border bg-surface-raised-subtle px-3 py-2 text-xs font-medium text-text-muted">
          <div>Job</div>
          <div className="text-right">Status</div>
          <div>Dauer</div>
          <div className="text-right">Akteur</div>
        </div>
        <div className="divide-y divide-border overflow-auto text-sm">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1fr)_auto] items-center gap-x-3 px-3 py-2 hover:bg-surface-raised-subtle"
            >
              <div className="min-w-0">
                <div className="truncate font-medium text-text">{row.job}</div>
                <div className="truncate font-mono text-xs text-text-muted">{row.id}</div>
              </div>
              <div
                className={`justify-self-end rounded border px-2 py-0.5 text-xs font-medium ${statusSurface(row.status)}`}
              >
                {row.status}
              </div>
              <div className="font-mono text-text-muted">{row.duration}</div>
              <div className="text-right text-text-muted">{row.actor}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
