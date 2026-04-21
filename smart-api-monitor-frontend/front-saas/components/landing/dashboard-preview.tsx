import Link from "next/link"
import { ArrowRight, Shield, AlertTriangle, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
      <div className="border-b border-border bg-background/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Smart API Monitor</p>
              <p className="text-xs text-muted-foreground">Live security overview</p>
            </div>
          </div>

          <Button asChild size="sm" className="gap-2">
            <Link href="/dashboard">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-4 w-4" />
              Total
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">128</p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              High Risk
            </div>
            <p className="mt-2 text-2xl font-semibold text-risk-high">18</p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4" />
              Protected
            </div>
            <p className="mt-2 text-2xl font-semibold text-risk-low">92%</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Recent detections</p>
            <span className="text-xs text-muted-foreground">last minute</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border px-3 py-2">
              <div>
                <p className="text-sm font-medium text-foreground">SQL Injection</p>
                <p className="text-xs text-muted-foreground">POST /api/login</p>
              </div>
              <span className="rounded-full bg-risk-high/15 px-2.5 py-1 text-xs font-medium text-risk-high">
                HIGH
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border px-3 py-2">
              <div>
                <p className="text-sm font-medium text-foreground">XSS Attempt</p>
                <p className="text-xs text-muted-foreground">POST /api/search</p>
              </div>
              <span className="rounded-full bg-risk-high/15 px-2.5 py-1 text-xs font-medium text-risk-high">
                HIGH
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border px-3 py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Anomalous Activity</p>
                <p className="text-xs text-muted-foreground">GET /admin/users</p>
              </div>
              <span className="rounded-full bg-risk-medium/15 px-2.5 py-1 text-xs font-medium text-risk-medium">
                MEDIUM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
