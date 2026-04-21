"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  TooltipProps,
} from "recharts"
import type { AnalysisResult } from "@/lib/types"

interface RiskChartProps {
  analyses: AnalysisResult[]
}

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    const item = payload[0].payload as {
      fullEndpoint?: string
      fullPattern?: string
      ip?: string
      name?: string
    }

    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium">{item.fullEndpoint || item.fullPattern || item.ip || item.name}</p>
        <p className="text-xs text-muted-foreground">{payload[0].value} analyses</p>
      </div>
    )
  }

  return null
}

export function RiskChart({ analyses }: RiskChartProps) {
  const riskData = [
    { name: "Low", count: analyses.filter((a) => a.riskLevel === "LOW").length, color: "oklch(0.72 0.19 145)" },
    { name: "Medium", count: analyses.filter((a) => a.riskLevel === "MEDIUM").length, color: "oklch(0.75 0.18 75)" },
    { name: "High", count: analyses.filter((a) => a.riskLevel === "HIGH").length, color: "oklch(0.63 0.24 25)" },
  ]

  const endpointCounts = analyses.reduce((acc, a) => {
    acc[a.endpoint] = (acc[a.endpoint] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const endpointData = Object.entries(endpointCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([endpoint, count]) => ({
      endpoint: endpoint.length > 15 ? endpoint.slice(0, 15) + "..." : endpoint,
      fullEndpoint: endpoint,
      count,
    }))

  const ipCounts = analyses.reduce((acc, a) => {
    const ip = a.sourceIp || "unknown"
    acc[ip] = (acc[ip] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const ipData = Object.entries(ipCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ip, count]) => ({
      ip,
      count,
    }))

  const patternCounts = analyses.reduce((acc, a) => {
    const pattern = a.detectedPattern || "Unknown"
    acc[pattern] = (acc[pattern] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const patternData = Object.entries(patternCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pattern, count]) => ({
      pattern: pattern.length > 18 ? pattern.slice(0, 18) + "..." : pattern,
      fullPattern: pattern,
      count,
    }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} layout="vertical" barSize={24}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {riskData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {endpointData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={endpointData} layout="vertical" barSize={20}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="endpoint" axisLine={false} tickLine={false} width={120} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" fill="oklch(0.65 0.2 260)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No endpoint data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top Source IPs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {ipData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ipData} layout="vertical" barSize={20}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="ip" axisLine={false} tickLine={false} width={120} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" fill="oklch(0.7 0.16 210)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No IP data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {patternData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patternData} layout="vertical" barSize={20}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="pattern" axisLine={false} tickLine={false} width={140} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="count" fill="oklch(0.68 0.19 320)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No pattern data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
