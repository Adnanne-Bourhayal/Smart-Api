export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH"

export interface AnalysisResult {
  id: string
  endpoint: string
  method: HttpMethod
  payload: string
  sourceIp?: string
  riskScore: number
  riskLevel: RiskLevel
  detectedPattern: string
  explanation: string
  impact: string
  recommendation: string
  timestamp: Date
  reviewed: boolean
}

export interface AnalysisFormData {
  method: HttpMethod
  endpoint: string
  payload: string
  sourceIp?: string
}
