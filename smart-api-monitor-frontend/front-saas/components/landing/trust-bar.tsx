const companies = [
  "Acme Corp",
  "TechFlow",
  "DataSync",
  "CloudBase",
  "SecureAPI",
  "DevStack",
]

export function TrustBar() {
  return (
    <section className="border-y border-border bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Built for modern SaaS teams, backend engineers, and security-aware developers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((company) => (
            <div
              key={company}
              className="text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
