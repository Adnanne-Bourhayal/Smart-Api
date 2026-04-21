"use client"

import { Check, Shield, Activity, AlertTriangle, TrendingUp, ArrowUpRight } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const features = [
  "Unified analysis history",
  "Risk scoring by request",
  "Endpoint-level visibility",
  "Actionable remediation guidance",
  "Built for backend and security workflows",
]

const chartData = [
  { name: "Mon", threats: 12 },
  { name: "Tue", threats: 8 },
  { name: "Wed", threats: 23 },
  { name: "Thu", threats: 15 },
  { name: "Fri", threats: 31 },
  { name: "Sat", threats: 18 },
  { name: "Sun", threats: 9 },
]

const recentRequests = [
  { method: "POST", endpoint: "/api/auth/login", risk: "HIGH", time: "2m ago" },
  { method: "GET", endpoint: "/api/users?id=1", risk: "MEDIUM", time: "5m ago" },
  { method: "POST", endpoint: "/api/checkout", risk: "LOW", time: "8m ago" },
]

export function ProductShowcase() {
  return (
    <section id="product" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-panel">
          <div className="grid items-center lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 sm:p-12 lg:p-16">
              <h2 className="text-3xl font-bold tracking-tight text-panel-foreground sm:text-4xl">
                One place to monitor API risk
              </h2>
              <p className="mt-4 text-lg text-panel-muted">
                Everything your team needs to understand, track, and reduce API security risk.
              </p>
              <ul className="mt-8 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-risk-low/20">
                      <Check className="h-3 w-3 text-risk-low" />
                    </div>
                    <span className="text-panel-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Dashboard */}
            <div className="border-t border-panel-border p-4 lg:border-l lg:border-t-0 sm:p-6">
              {/* Metrics Row */}
              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <DashboardMetric icon={Activity} label="Total" value="2,847" />
                <DashboardMetric icon={AlertTriangle} label="High" value="23" color="text-risk-high" />
                <DashboardMetric icon={TrendingUp} label="Medium" value="156" color="text-risk-medium" />
                <DashboardMetric icon={Shield} label="Low" value="2,668" color="text-risk-low" />
              </div>

              {/* Chart */}
              <div className="mb-4 rounded-xl border border-panel-border bg-panel p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-panel-foreground">API Threat Activity</span>
                  <span className="text-xs text-panel-muted">Last 7 days</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--panel-muted))" 
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="hsl(var(--panel-muted))" 
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        width={20}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--panel))",
                          border: "1px solid hsl(var(--panel-border))",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        labelStyle={{ color: "hsl(var(--panel-foreground))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="threats"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Requests */}
              <div className="rounded-xl border border-panel-border bg-panel">
                <div className="border-b border-panel-border px-4 py-3">
                  <span className="text-sm font-medium text-panel-foreground">Recent Suspicious Requests</span>
                </div>
                <div className="divide-y divide-panel-border">
                  {recentRequests.map((req, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-panel-border px-1.5 py-0.5 font-mono text-xs text-panel-foreground">
                          {req.method}
                        </span>
                        <span className="text-sm text-panel-foreground">{req.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-panel-muted">{req.time}</span>
                        <RiskBadge level={req.risk} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issue Panel */}
              <div className="mt-4 rounded-xl border border-risk-high/30 bg-risk-high/10 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-risk-high" />
                      <span className="font-medium text-panel-foreground">Possible SQL Injection</span>
                    </div>
                    <p className="mt-1 text-sm text-panel-muted">
                      Recommendation: use prepared statements and input validation
                    </p>
                  </div>
                  <button className="flex items-center gap-1 rounded-lg bg-panel-border px-3 py-1.5 text-xs font-medium text-panel-foreground transition-colors hover:bg-panel-muted">
                    Details
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardMetric({ 
  icon: Icon, 
  label, 
  value, 
  color = "text-panel-foreground" 
}: { 
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color?: string
}) {
  return (
    <div className="rounded-lg border border-panel-border bg-panel p-3">
      <Icon className={`mb-1 h-4 w-4 ${color}`} />
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-[10px] text-panel-muted">{label}</div>
    </div>
  )
}

function RiskBadge({ level }: { level: string }) {
  const colors = {
    HIGH: "bg-risk-high/20 text-risk-high border-risk-high/30",
    MEDIUM: "bg-risk-medium/20 text-risk-medium border-risk-medium/30",
    LOW: "bg-risk-low/20 text-risk-low border-risk-low/30",
  }
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${colors[level as keyof typeof colors]}`}>
      {level}
    </span>
  )
}
