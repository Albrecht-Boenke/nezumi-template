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
        <h1 className="text-base font-semibold tracking-tight text-text">Überblick</h1>
        <p className="text-xs text-text-muted">Letzte Läufe · Platzhalterdaten</p>
      </header>

      <DataViewToolbar />

      <section
        aria-label="Letzte Jobs"
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border bg-surface-raised"
      >
        <div className="min-h-0 overflow-auto">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead className="border-b border-border bg-surface-raised-subtle text-xs font-medium text-text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-medium">
                  Job
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-2 text-left font-medium">
                  Dauer
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Akteur
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-surface-raised-subtle">
                  <th scope="row" className="min-w-0 px-3 py-2 text-left font-normal">
                    <div className="truncate font-medium text-text">{row.job}</div>
                    <div className="truncate font-mono text-xs text-text-muted">{row.id}</div>
                  </th>
                  <td className="px-3 py-2 text-right">
                    <span
                      className={`inline-flex rounded border px-2 py-0.5 text-xs font-medium ${statusSurface(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-text-muted">{row.duration}</td>
                  <td className="px-3 py-2 text-right text-text-muted">{row.actor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
