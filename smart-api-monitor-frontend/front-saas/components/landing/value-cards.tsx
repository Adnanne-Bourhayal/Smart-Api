import { Fingerprint, Activity, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const values = [
  {
    icon: Fingerprint,
    title: "Detect suspicious payloads",
    description: "Automatically identify SQL injection, XSS, path traversal, and other common attack patterns in your API requests.",
  },
  {
    icon: Activity,
    title: "Monitor endpoint risk in real time",
    description: "Get live visibility into which endpoints are being targeted, how often, and with what severity levels.",
  },
  {
    icon: Lightbulb,
    title: "Get clear recommendations, not noisy alerts",
    description: "Every risk detection comes with actionable guidance on how to remediate the issue, not just a warning.",
  },
]

export function ValueCards() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="border-border/50 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
