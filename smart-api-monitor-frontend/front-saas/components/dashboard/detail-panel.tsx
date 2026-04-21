"use client"

import { AlertTriangle, Shield, Lightbulb, Code, Globe, Info, Clock, Copy, Trash2, Braces } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { RiskBadge } from "./risk-badge"
import { apiDelete, buildApiUrl } from "@/lib/api"
import { toast } from "sonner"
import type { AnalysisResult } from "@/lib/types"

interface DetailPanelProps {
  analysis: AnalysisResult | null
  onDeleted?: (id: string) => void
}

export function DetailPanel({ analysis, onDeleted }: DetailPanelProps) {
  const formatDate = (date: Date) => date.toISOString().slice(0, 19).replace("T", " ")

  const deleteSelected = async () => {
    if (!analysis) return
    if (!confirm("Delete selected analysis?")) return

    try {
      await apiDelete(`/api/analyze/${analysis.id}`)
      onDeleted?.(analysis.id)
      toast.success("Analysis deleted")
    } catch {
      toast.error("No se pudo eliminar")
    }
  }

  const copyAsJson = async () => {
    if (!analysis) return

    await navigator.clipboard.writeText(
      JSON.stringify(
        {
          id: analysis.id,
          method: analysis.method,
          endpoint: analysis.endpoint,
          sourceIp: analysis.sourceIp || null,
          payload: analysis.payload,
          riskScore: analysis.riskScore,
          riskLevel: analysis.riskLevel,
          detectedPattern: analysis.detectedPattern,
          explanation: analysis.explanation,
          impact: analysis.impact,
          recommendation: analysis.recommendation,
          timestamp: analysis.timestamp.toISOString(),
        },
        null,
        2
      )
    )

    toast.success("JSON copiado")
  }

  const copyAsCurl = async () => {
    if (!analysis) return

    const body = JSON.stringify({
      method: analysis.method,
      endpoint: analysis.endpoint,
      payload: analysis.payload,
      sourceIp: analysis.sourceIp || "",
    }).replace(/"/g, '\\"')

    const curl = `curl -s -X POST ${JSON.stringify(buildApiUrl("/api/analyze"))} -H "Content-Type: application/json" -d "${body}"`

    await navigator.clipboard.writeText(curl)
    toast.success("cURL copiado")
  }

  if (!analysis) {
    return (
      <Card className="bg-card border-border h-full">
        <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center text-muted-foreground">
          <Shield className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">No Analysis Selected</p>
          <p className="text-sm mt-1">Select an entry from the history to view details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <CardTitle className="text-lg">Analysis Detail</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <RiskBadge level={analysis.riskLevel} score={analysis.riskScore} />
            <Button variant="outline" size="sm" onClick={copyAsCurl}>
              <Copy className="w-4 h-4 mr-2" />
              Copy cURL
            </Button>
            <Button variant="outline" size="sm" onClick={copyAsJson}>
              <Braces className="w-4 h-4 mr-2" />
              Copy JSON
            </Button>
            <Button variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="px-6 pb-6 space-y-5">
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Request
              </h4>
              <div className="bg-secondary rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Endpoint:</span>
                  <code className="text-sm font-mono">{analysis.endpoint}</code>
                </div>

                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Method:</span>
                  <code className="text-sm font-mono">{analysis.method}</code>
                </div>

                {analysis.sourceIp && (
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Source IP:</span>
                    <code className="text-sm font-mono">{analysis.sourceIp}</code>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Created:</span>
                  <code className="text-sm font-mono">{formatDate(analysis.timestamp)}</code>
                </div>
              </div>
            </div>

            {analysis.payload && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Payload
                </h4>
                <pre className="bg-secondary rounded-lg p-3 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
                  {analysis.payload}
                </pre>
              </div>
            )}

            <Separator className="bg-border" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-risk-high" />
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Detection
                </h4>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground">Pattern:</span>
                  <p className="text-sm font-medium mt-0.5">{analysis.detectedPattern}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Explanation:</span>
                  <p className="text-sm mt-0.5 leading-relaxed">{analysis.explanation}</p>
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-risk-medium" />
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Potential Impact
                </h4>
              </div>
              <p className="text-sm leading-relaxed">{analysis.impact}</p>
            </div>

            <Separator className="bg-border" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-risk-low" />
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Recommendation
                </h4>
              </div>
              <p className="text-sm leading-relaxed">{analysis.recommendation}</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
