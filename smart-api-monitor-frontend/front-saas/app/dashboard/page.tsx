import { Dashboard } from "@/components/dashboard"
import { mapBackendAnalysis, type BackendAnalysis } from "@/lib/analysis"
import { apiGet } from "@/lib/api"
import type { AnalysisResult } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  let analyses: AnalysisResult[] = []
  let backendAvailable = false
  let aiStatus: "online" | "offline" = "offline"

  try {
    const data = await apiGet("/api/analyze")
    backendAvailable = true
    analyses = (data as BackendAnalysis[]).map(mapBackendAnalysis)
  } catch {
    backendAvailable = false
    analyses = []
  }

  try {
    const health = await apiGet("/api/ai-health")
    aiStatus = health?.status === "online" ? "online" : "offline"
  } catch {
    aiStatus = "offline"
  }

  return (
    <Dashboard
      initialAnalyses={analyses}
      backendAvailable={backendAvailable}
      aiStatus={aiStatus}
    />
  )
}
