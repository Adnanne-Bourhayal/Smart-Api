"use client"

import { TrendingUp, TrendingDown, Target, AlertCircle, BarChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts"

const patternData = [
  { name: "SQL Injection", count: 45, color: "hsl(var(--risk-high))" },
  { name: "XSS", count: 32, color: "hsl(var(--risk-high))" },
  { name: "Path Traversal", count: 28, color: "hsl(var(--risk-medium))" },
  { name: "Rate Abuse", count: 21, color: "hsl(var(--risk-medium))" },
  { name: "Auth Bypass", count: 15, color: "hsl(var(--risk-low))" },
]

export function MetricsSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Data-driven security insights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Rich analytics to help you understand threats, track trends, and measure improvements.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="High-risk this week" 
            value="23" 
            change="-12%"
            trend="down"
            icon={AlertCircle}
          />
          <MetricCard 
            title="Most targeted" 
            value="/api/auth" 
            subtitle="847 requests"
            icon={Target}
          />
          <MetricCard 
            title="Error rate trend" 
            value="2.4%" 
            change="+0.3%"
            trend="up"
            icon={TrendingUp}
          />
          <MetricCard 
            title="Avg response time" 
            value="142ms" 
            change="-8ms"
            trend="down"
            icon={BarChart}
          />
        </div>

        {/* Chart Card */}
        <Card className="mt-6 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Top Suspicious Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={patternData} layout="vertical" barSize={24}>
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    width={100}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {patternData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  subtitle,
  icon: Icon 
}: { 
  title: string
  value: string
  change?: string
  trend?: "up" | "down"
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" />
          {change && (
            <div className={`flex items-center gap-1 text-xs font-medium ${
              trend === "down" ? "text-risk-low" : "text-risk-high"
            }`}>
              {trend === "down" ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <TrendingUp className="h-3 w-3" />
              )}
              {change}
            </div>
          )}
        </div>
        <div className="mt-3 text-2xl font-bold text-foreground">{value}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          {subtitle || title}
        </div>
      </CardContent>
    </Card>
  )
}
