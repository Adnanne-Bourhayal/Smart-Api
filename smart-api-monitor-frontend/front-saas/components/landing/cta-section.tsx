import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-panel py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-panel-foreground sm:text-4xl lg:text-5xl">
          Start monitoring your API risk from one clean dashboard
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-panel-muted">
          From suspicious payloads to endpoint-level visibility, Smart API Monitor helps your team move faster with more confidence.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2 rounded-full px-8">
            <Link href="/dashboard">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 rounded-full border-panel-border bg-transparent px-8 text-panel-foreground hover:bg-panel-border hover:text-panel-foreground"
          >
            <Link href="/dashboard">
              <Calendar className="h-4 w-4" />
              Book Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
