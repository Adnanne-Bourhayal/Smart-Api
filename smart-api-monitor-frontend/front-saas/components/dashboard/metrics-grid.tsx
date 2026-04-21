"use client"

import { AlertTriangle, AlertCircle, CheckCircle, Activity, Target, Clock, Siren } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { AnalysisResult } from "@/lib/types"

interface MetricsGridProps {
  analyses: AnalysisResult[]
}

export function MetricsGrid({ analyses }: MetricsGridProps) {
  const highRisk = analyses.filter((a) => a.riskLevel === "HIGH").length
  const mediumRisk = analyses.filter((a) => a.riskLevel === "MEDIUM").length
  const lowRisk = analyses.filter((a) => a.riskLevel === "LOW").length
  const anomalous = analyses.filter((a) => a.detectedPattern === "Anomalous Activity").length

  const mostAttackedEndpoint =
    analyses.length > 0
      ? Object.entries(
          analyses.reduce((acc, a) => {
            acc[a.endpoint] = (acc[a.endpoint] || 0) + 1
            return acc
          }, {} as Record<string, number>)
        ).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
      : "—"

  const lastAnalysis =
    analyses.length > 0
      ? new Date(Math.max(...analyses.map((a) => a.timestamp.getTime())))
      : null

  const formatDate = (date: Date) => date.toISOString().slice(0, 16).replace("T", " ")

  const metrics = [
    {
      label: "Total Analyses",
      value: analyses.length,
      icon: Activity,
      color: "text-chart-1",
    },
    {
      label: "High Risk",
      value: highRisk,
      icon: AlertTriangle,
      color: "text-risk-high",
    },
    {
      label: "Medium Risk",
      value: mediumRisk,
      icon: AlertCircle,
      color: "text-risk-medium",
    },
    {
      label: "Low Risk",
      value: lowRisk,
      icon: CheckCircle,
      color: "text-risk-low",
    },
    {
      label: "Repeated",
      value: anomalous,
      icon: Siren,
      color: "text-chart-5",
    },
    {
      label: "Most Targeted",
      value: mostAttackedEndpoint,
      icon: Target,
      isText: true,
    },
    {
      label: "Last Analysis",
      value: lastAnalysis ? formatDate(lastAnalysis) : "—",
      icon: Clock,
      isText: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color || "text-muted-foreground"}`} />
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <p className={`text-xl font-semibold truncate ${metric.isText ? "text-sm font-mono" : ""}`}>
              {metric.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
