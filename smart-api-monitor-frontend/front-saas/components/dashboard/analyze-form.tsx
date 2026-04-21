"use client"

import { useState } from "react"
import { Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { HttpMethod } from "@/lib/types"

interface AnalyzeFormProps {
  onAnalyze: (method: HttpMethod, endpoint: string, payload: string, sourceIp?: string) => Promise<void> | void
  isLoading: boolean
  disabled?: boolean
}

const HTTP_METHODS: HttpMethod[] = ["GET", "POST", "PUT", "DELETE", "PATCH"]

const PRESETS = [
  {
    label: "SQLi",
    method: "POST" as HttpMethod,
    endpoint: "/api/login",
    payload: "admin' OR 1=1 --",
  },
  {
    label: "XSS",
    method: "POST" as HttpMethod,
    endpoint: "/api/search",
    payload: "<script>alert(1)</script>",
  },
  {
    label: "Traversal",
    method: "GET" as HttpMethod,
    endpoint: "/api/files",
    payload: "../../../etc/passwd",
  },
  {
    label: "Normal",
    method: "POST" as HttpMethod,
    endpoint: "/api/users",
    payload: '{"name":"Adnan","email":"test@test.com"}',
  },
]

export function AnalyzeForm({ onAnalyze, isLoading, disabled = false }: AnalyzeFormProps) {
  const [method, setMethod] = useState<HttpMethod>("POST")
  const [endpoint, setEndpoint] = useState("")
  const [payload, setPayload] = useState("")
  const [sourceIp, setSourceIp] = useState("")

  const runPreset = async (preset: typeof PRESETS[number]) => {
    if (disabled || isLoading) return
    setMethod(preset.method)
    setEndpoint(preset.endpoint)
    setPayload(preset.payload)
    await onAnalyze(preset.method, preset.endpoint, preset.payload, sourceIp || undefined)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!endpoint.trim() || disabled || isLoading) return

    try {
      await onAnalyze(method, endpoint, payload, sourceIp || undefined)
      setMethod("POST")
      setEndpoint("")
      setPayload("")
      setSourceIp("")
    } catch {}
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Analyze Request</CardTitle>
        </div>
        <CardDescription>
          Enter request details to analyze for security risks and anomalies
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => runPreset(preset)}
              disabled={disabled || isLoading}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-32">
              <label className="text-xs text-muted-foreground mb-1.5 block">Method</label>
              <Select value={method} onValueChange={(v) => setMethod(v as HttpMethod)} disabled={disabled || isLoading}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {HTTP_METHODS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1.5 block">Endpoint</label>
              <Input
                placeholder="/api/users/login"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="bg-secondary border-border font-mono text-sm"
                disabled={disabled || isLoading}
              />
            </div>

            <div className="w-full sm:w-40">
              <label className="text-xs text-muted-foreground mb-1.5 block">Source IP (optional)</label>
              <Input
                placeholder="198.51.100.24"
                value={sourceIp}
                onChange={(e) => setSourceIp(e.target.value)}
                className="bg-secondary border-border font-mono text-sm"
                disabled={disabled || isLoading}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Payload</label>
            <Textarea
              placeholder='{"username":"test","password":"123456"}'
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="bg-secondary border-border font-mono text-sm min-h-[100px] resize-none"
              disabled={disabled || isLoading}
            />
          </div>

          <Button type="submit" className="w-full sm:w-auto" disabled={disabled || !endpoint.trim() || isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analyze Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
