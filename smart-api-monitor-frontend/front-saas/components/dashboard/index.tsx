"use client"

import { apiGet, apiPost } from "@/lib/api"
import { mapBackendAnalysis, type BackendAnalysis } from "@/lib/analysis"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Header } from "./header"
import { MetricsGrid } from "./metrics-grid"
import { StatusStrip } from "./status-strip"
import { AnalyzeForm } from "./analyze-form"
import { BatchImport } from "./batch-import"
import { IntegrationGuide } from "./integration-guide"
import { AnalysisTable } from "./analysis-table"
import { DetailPanel } from "./detail-panel"
import { RiskChart } from "./risk-chart"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import type { AnalysisResult, HttpMethod, RiskLevel } from "@/lib/types"

type DashboardProps = {
  initialAnalyses: AnalysisResult[]
  backendAvailable?: boolean
  aiStatus?: "online" | "offline"
}

export function Dashboard({ initialAnalyses, backendAvailable = true, aiStatus = "offline" }: DashboardProps) {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>(initialAnalyses)
  const [selectedId, setSelectedId] = useState<string | null>(initialAnalyses[0]?.id ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const riskFilter: "ALL" | RiskLevel = "ALL"
  const [query, setQuery] = useState("")
  const autoRefresh = true

  const seenHighIds = useRef<Set<string>>(new Set())

  const fetchAnalyses = async () => {
    try {
      const data = await apiGet("/api/analyze")
      const mapped = (data as BackendAnalysis[]).map(mapBackendAnalysis)
      setAnalyses(mapped)
    } catch {
      console.error("fetch error")
    }
  }

  useEffect(() => {
    if (!backendAvailable || !autoRefresh) return

    const interval = setInterval(fetchAnalyses, 3000)
    return () => clearInterval(interval)
  }, [backendAvailable, autoRefresh])

  useEffect(() => {
    for (const item of analyses) {
      if (item.riskLevel === "HIGH" && !seenHighIds.current.has(item.id)) {
        seenHighIds.current.add(item.id)
        toast.error(`HIGH risk detected: ${item.detectedPattern}`)
      }
    }
  }, [analyses])

  const handleBatchTest = async () => {
    try {
      const response = await apiPost("/api/analyze/simulate", {})
      const mapped = (response as BackendAnalysis[]).map(mapBackendAnalysis)
      setAnalyses((prev) => [...mapped, ...prev])
      toast.success("Simulation executed")
    } catch {
      toast.error("Simulation failed")
    }
  }

  const handleAnalyze = useCallback(async (
    method: HttpMethod,
    endpoint: string,
    payload: string,
    sourceIp?: string
  ) => {
    setIsLoading(true)
    try {
      const res = await apiPost("/api/analyze", { method, endpoint, payload, sourceIp })
      const mapped = mapBackendAnalysis(res as BackendAnalysis)
      setAnalyses(prev => [mapped, ...prev])
      setSelectedId(mapped.id)
      toast.success("Analysis created")
    } catch {
      toast.error("Error backend")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const filteredAnalyses = useMemo(() => {
    const byRisk = riskFilter === "ALL" ? analyses : analyses.filter(a => a.riskLevel === riskFilter)
    const q = query.toLowerCase()
    return byRisk.filter(a =>
      a.endpoint.toLowerCase().includes(q) ||
      a.payload.toLowerCase().includes(q)
    )
  }, [analyses, riskFilter, query])

  const systemStatus = isLoading ? "processing" : backendAvailable ? "online" : "offline"

  return (
    <div className="min-h-screen bg-background">
      <Header systemStatus={systemStatus} totalAnalyses={analyses.length} aiStatus={aiStatus} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {!backendAvailable && (
          <Alert>
            <AlertDescription>Backend offline</AlertDescription>
          </Alert>
        )}

        <StatusStrip backendAvailable={backendAvailable} aiStatus={aiStatus} analyses={analyses} />
        <MetricsGrid analyses={analyses} />

        <Tabs defaultValue="single">
          <TabsList>
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="batch">Batch</TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <AnalyzeForm onAnalyze={handleAnalyze} isLoading={isLoading} />

            <Button onClick={handleBatchTest} className="mt-4">
              Run Attack Simulation
            </Button>
          </TabsContent>

          <TabsContent value="batch">
            <BatchImport onImported={(items) => setAnalyses(prev => [...items, ...prev])} />
          </TabsContent>
        </Tabs>

        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <AnalysisTable
          analyses={filteredAnalyses}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <DetailPanel
          analysis={filteredAnalyses.find(a => a.id === selectedId) || null}
          onDeleted={(id) => setAnalyses(prev => prev.filter(a => a.id !== id))}
        />

        <RiskChart analyses={filteredAnalyses} />
        <IntegrationGuide />
      </main>
    </div>
  )
}
