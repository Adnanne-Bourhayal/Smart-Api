"use client"

import { Server, Bot, ShieldAlert, Radar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { AnalysisResult } from "@/lib/types"

interface StatusStripProps {
  backendAvailable: boolean
  aiStatus: "online" | "offline"
  analyses: AnalysisResult[]
}

export function StatusStrip({ backendAvailable, aiStatus, analyses }: StatusStripProps) {
  const backendColor = backendAvailable ? "bg-risk-low" : "bg-risk-high"
  const aiColor = aiStatus === "online" ? "bg-risk-low" : "bg-risk-high"

  const lastHigh = [...analyses]
    .filter((a) => a.riskLevel === "HIGH")
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0]

  const topIp =
    Object.entries(
      analyses.reduce((acc, a) => {
        const ip = a.sourceIp || "unknown"
        acc[ip] = (acc[ip] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Backend</p>
              <p className="text-xs text-muted-foreground">Spring Boot API</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${backendColor}`} />
            <span className="text-sm capitalize">{backendAvailable ? "online" : "offline"}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">AI Engine</p>
              <p className="text-xs text-muted-foreground">FastAPI analyzer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${aiColor}`} />
            <span className="text-sm capitalize">{aiStatus}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-medium">Last HIGH</p>
              <p className="text-xs text-muted-foreground truncate">
                {lastHigh ? `${lastHigh.method} ${lastHigh.endpoint}` : "No high risk yet"}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {lastHigh ? lastHigh.timestamp.toISOString().slice(11, 16) : "—"}
          </span>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Radar className="w-5 h-5 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-medium">Most Active IP</p>
              <p className="text-xs text-muted-foreground truncate">{topIp}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
