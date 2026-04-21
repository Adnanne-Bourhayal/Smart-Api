"use client"

import { Clock, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RiskBadge } from "./risk-badge"
import { cn } from "@/lib/utils"
import type { AnalysisResult } from "@/lib/types"

interface AnalysisTableProps {
  analyses: AnalysisResult[]
  selectedId: string | null
  onSelect: (id: string) => void
  highlightedId?: string | null
}

export function AnalysisTable({ analyses, selectedId, onSelect, highlightedId }: AnalysisTableProps) {
  const formatTime = (date: Date) => {
    return date.toISOString().slice(0, 16).replace("T", " ")
  }

  const methodColors: Record<string, string> = {
    GET: "text-chart-1",
    POST: "text-risk-low",
    PUT: "text-risk-medium",
    DELETE: "text-risk-high",
    PATCH: "text-chart-5"
  }

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Analysis History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-border">
            {analyses.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No analyses yet. Submit a request to get started.
              </div>
            ) : (
              analyses.map((analysis) => (
                <button
                  key={analysis.id}
                  onClick={() => onSelect(analysis.id)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors",
                    selectedId === analysis.id && "bg-secondary",
                    highlightedId === analysis.id && "bg-primary/10 animate-pulse"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-xs font-mono font-medium", methodColors[analysis.method])}>
                          {analysis.method}
                        </span>
                        <span className="text-sm font-mono text-foreground truncate">
                          {analysis.endpoint}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <RiskBadge level={analysis.riskLevel} score={analysis.riskScore} />
                        <span className="text-xs text-muted-foreground truncate">
                          {analysis.detectedPattern}
                        </span>
                        {analysis.sourceIp && (
                          <span className="text-xs font-mono text-muted-foreground">
                            IP: {analysis.sourceIp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="flex items-center gap-1 text-xs font-mono">
                        <Clock className="w-3 h-3" />
                        {formatTime(analysis.timestamp)}
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
