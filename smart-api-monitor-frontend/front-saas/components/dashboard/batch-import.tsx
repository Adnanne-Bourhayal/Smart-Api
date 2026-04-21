"use client"

import { useRef, useState } from "react"
import { Upload, FileJson, Wand2, Eraser, FolderUp, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { apiPost } from "@/lib/api"
import { mapBackendAnalysis, type BackendAnalysis } from "@/lib/analysis"
import { toast } from "sonner"
import type { AnalysisResult } from "@/lib/types"

interface BatchImportProps {
  disabled?: boolean
  onImported: (items: AnalysisResult[]) => void
}

const EXAMPLE = `[
  {
    "method": "POST",
    "endpoint": "/api/login",
    "payload": "admin' OR 1=1 --",
    "sourceIp": "198.51.100.10"
  },
  {
    "method": "POST",
    "endpoint": "/api/search",
    "payload": "<script>alert(1)</script>",
    "sourceIp": "198.51.100.11"
  }
]`

export function BatchImport({ disabled = false, onImported }: BatchImportProps) {
  const [value, setValue] = useState(EXAMPLE)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImport = async () => {
    if (disabled || loading) return

    try {
      const parsed = JSON.parse(value)

      if (!Array.isArray(parsed)) {
        toast.error("El JSON debe ser un array")
        return
      }

      setLoading(true)
      const response = await apiPost("/api/analyze/batch", parsed)
      const items = (response as BackendAnalysis[]).map(mapBackendAnalysis)
      onImported(items)
      toast.success(`Importadas ${items.length} requests`)
    } catch {
      toast.error("JSON inválido o error de backend")
    } finally {
      setLoading(false)
    }
  }


  const handleDownloadExample = () => {
    const blob = new Blob([EXAMPLE], { type: "application/json;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "smart-api-monitor-example.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      JSON.parse(text)
      setValue(text)
      toast.success(`Archivo cargado: ${file.name}`)
    } catch {
      toast.error("El archivo no contiene JSON válido")
    } finally {
      event.target.value = ""
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <FileJson className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Batch Import</CardTitle>
        </div>
        <CardDescription>
          Pega un array JSON o sube un archivo .json para analizar varias requests de golpe
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleFileChange}
        />

        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-[220px] font-mono text-xs"
          disabled={disabled || loading}
        />

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setValue(EXAMPLE)}
            disabled={disabled || loading}
            className="gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Load Example
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleDownloadExample}
            disabled={disabled || loading}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download Example
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setValue("[]")}
            disabled={disabled || loading}
            className="gap-2"
          >
            <Eraser className="w-4 h-4" />
            Clear
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || loading}
            className="gap-2"
          >
            <FolderUp className="w-4 h-4" />
            Upload JSON
          </Button>

          <Button onClick={handleImport} disabled={disabled || loading} className="gap-2">
            <Upload className="w-4 h-4" />
            {loading ? "Importing..." : "Run Batch Analysis"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
