export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Send suspicious requests",
      description:
        "Test individual payloads or batch import multiple API requests to simulate real attack traffic.",
    },
    {
      number: "02",
      title: "Analyze risk instantly",
      description:
        "Smart API Monitor scores each request, detects patterns like SQLi or XSS, and enriches results with AI.",
    },
    {
      number: "03",
      title: "Review history and trends",
      description:
        "Track repeated activity, review source IPs, inspect endpoints, and export findings from one dashboard.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Go from raw API requests to clear security insight in three simple steps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-sm font-mono text-primary">{step.number}</div>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
