import { Button } from "@nezumi/ui/components/button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Nezumi UI + Next.js</h1>
      <p className="max-w-lg text-center text-sm text-foreground-muted">
        App-only wiring (no{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
          next init
        </code>{" "}
        /{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-800">
          shadcn init
        </code>
        ).
      </p>
      <Button variant="primary">Hello from @nezumi/ui</Button>
    </main>
  )
}
