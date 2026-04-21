import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "lucide-react"
import { DashboardPreview } from "./dashboard-preview"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/30 to-background pb-16 pt-12 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <Badge variant="secondary" className="mb-6 gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              API Security Monitoring for modern teams
            </Badge>

            <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              See risky API activity before it becomes a real problem
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Monitor suspicious requests, detect common attack patterns, score endpoint risk, and get actionable recommendations from one clean dashboard.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="gap-2 rounded-full px-6">
                <Link href="/dashboard">
                  Start Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 rounded-full px-6">
                <Link href="/dashboard">
                  <Play className="h-4 w-4" />
                  See Demo
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/5 blur-2xl" />
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
