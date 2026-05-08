export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-24 py-16">
      <section className="flex w-full max-w-2xl flex-col gap-16">
        <p className="text-sm font-medium text-text-muted">Homepage</p>
        <h1 className="text-4xl font-semibold tracking-tight text-text">Nezumi</h1>
        <p className="max-w-xl text-base text-text-muted">
          Minimal landing page for the public app.
        </p>
      </section>
    </main>
  )
}
