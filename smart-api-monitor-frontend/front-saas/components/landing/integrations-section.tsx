import { Database, FileJson, Webhook, MessageSquare, Github, Server } from "lucide-react"

const integrations = [
  { name: "PostgreSQL", icon: Database },
  { name: "OpenAPI", icon: FileJson },
  { name: "Webhooks", icon: Webhook },
  { name: "Slack", icon: MessageSquare },
  { name: "GitHub", icon: Github },
  { name: "SIEM / Logs", icon: Server },
]

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Fits into modern developer workflows
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Connect Smart API Monitor to your existing tools and infrastructure in minutes.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {integrations.map((integration) => (
            <div 
              key={integration.name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-md sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <integration.icon className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{integration.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
