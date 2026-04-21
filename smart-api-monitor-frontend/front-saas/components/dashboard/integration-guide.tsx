"use client"

import { TerminalSquare, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const SINGLE_EXAMPLE = `curl -s -X POST <api-base-url>/api/analyze \\
-H "Content-Type: application/json" \\
-d '{
  "method":"POST",
  "endpoint":"/api/login",
  "payload":"admin'\\'' OR 1=1 --",
  "sourceIp":"198.51.100.10"
}'`

const BATCH_EXAMPLE = `curl -s -X POST <api-base-url>/api/analyze/batch \\
-H "Content-Type: application/json" \\
-d '[
  {
    "method":"POST",
    "endpoint":"/api/login",
    "payload":"admin'\\'' OR 1=1 --",
    "sourceIp":"198.51.100.10"
  },
  {
    "method":"POST",
    "endpoint":"/api/search",
    "payload":"<script>alert(1)</script>",
    "sourceIp":"198.51.100.11"
  }
]'`

export function IntegrationGuide() {
  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    toast.success(`${label} copiado`)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <TerminalSquare className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Quick Integration</CardTitle>
        </div>
        <CardDescription>
          Usa estos ejemplos para enviar requests manuales o lotes completos al monitor
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-medium">Single request</h4>
            <Button variant="outline" size="sm" onClick={() => copyText(SINGLE_EXAMPLE, "Single cURL")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <pre className="rounded-lg bg-secondary p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
            {SINGLE_EXAMPLE}
          </pre>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-medium">Batch import</h4>
            <Button variant="outline" size="sm" onClick={() => copyText(BATCH_EXAMPLE, "Batch cURL")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <pre className="rounded-lg bg-secondary p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
            {BATCH_EXAMPLE}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
