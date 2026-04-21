"use client"

import { Activity, Bot, RefreshCcw, Shield, LogOut } from "lucide-react"

interface HeaderProps {
  systemStatus: "online" | "offline" | "processing"
  totalAnalyses: number
  aiStatus?: "online" | "offline"
}

export function Header({ systemStatus, totalAnalyses, aiStatus = "offline" }: HeaderProps) {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Smart API Monitor</h1>
            <p className="text-sm text-muted-foreground">Security Analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>{totalAnalyses} analyses</span>
          </div>

          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>AI</span>
            <span className={aiStatus === "online" ? "text-green-600" : "text-red-600"}>
              ●
            </span>
            <span>{aiStatus === "online" ? "Online" : "Offline"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={systemStatus === "online" ? "text-green-600" : systemStatus === "processing" ? "text-yellow-600" : "text-red-600"}>
              ●
            </span>
            <span>{systemStatus === "online" ? "Online" : systemStatus === "processing" ? "Processing" : "Offline"}</span>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-muted"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-muted"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
