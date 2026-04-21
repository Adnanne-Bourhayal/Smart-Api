import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SecuritySection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Security visibility without enterprise complexity
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Track suspicious payloads, repeated requests, high-risk endpoints and anomalous activity from one dashboard.
          </p>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
