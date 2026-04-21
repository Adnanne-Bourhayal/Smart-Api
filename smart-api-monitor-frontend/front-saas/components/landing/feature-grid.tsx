import { 
  Gauge, 
  Radar, 
  Fingerprint, 
  BrainCircuit, 
  Bell, 
  BarChart3 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Gauge,
    title: "Request Risk Scoring",
    description: "Every incoming request is analyzed and assigned a risk score based on payload patterns, headers, and behavior.",
  },
  {
    icon: Radar,
    title: "Endpoint Monitoring",
    description: "Track which endpoints are most targeted, their threat frequency, and overall exposure levels.",
  },
  {
    icon: Fingerprint,
    title: "Suspicious Payload Detection",
    description: "Detect SQL injection, XSS, command injection, path traversal, and other OWASP Top 10 patterns.",
  },
  {
    icon: BrainCircuit,
    title: "Attack Pattern Recognition",
    description: "Machine learning models identify known attack signatures and anomalous request behavior.",
  },
  {
    icon: Bell,
    title: "Alert & Recommendation Engine",
    description: "Get notified about critical threats with clear, actionable remediation steps.",
  },
  {
    icon: BarChart3,
    title: "Historical Analysis Dashboard",
    description: "Review past incidents, track trends over time, and measure your security posture improvements.",
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for API security
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A complete toolkit for monitoring, detecting, and remediating API security risks.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="border-border/50 bg-card shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
