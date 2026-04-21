import type { AnalysisResult, HttpMethod, RiskLevel } from "@/lib/types"

export type BackendAnalysis = {
  id: number | string
  method?: string | null
  endpoint: string
  sourceIp?: string | null
  payload?: string | null
  riskScore: number
  riskLevel?: string | null
  analysis?: string | null
  explanation?: string | null
  createdAt?: string | null
}

export function toMethod(method?: string | null): HttpMethod {
  const value = (method || "POST").toUpperCase()

  if (value === "GET" || value === "POST" || value === "PUT" || value === "DELETE" || value === "PATCH") {
    return value
  }

  return "POST"
}

export function toRiskLevel(level?: string | null): RiskLevel {
  const value = (level || "LOW").toUpperCase()

  if (value === "LOW" || value === "MEDIUM" || value === "HIGH") {
    return value
  }

  return "LOW"
}

export function getImpact(label?: string | null) {
  switch ((label || "").toUpperCase()) {
    case "SQL INJECTION":
      return "Could expose, modify or delete database data if inputs are not validated correctly."
    case "XSS ATTACK":
    case "XSS ATTEMPT":
      return "Could execute malicious JavaScript in the client and compromise user sessions."
    case "PATH TRAVERSAL":
      return "Could expose internal files or sensitive server configuration."
    case "SENSITIVE ENDPOINT ACCESS":
      return "Could indicate reconnaissance or unauthorized access attempts against privileged routes."
    case "ANOMALOUS ACTIVITY":
      return "Could indicate fuzzing, abuse or automated probing attempts."
    default:
      return "No significant impact detected."
  }
}

export function getRecommendation(label?: string | null) {
  switch ((label || "").toUpperCase()) {
    case "SQL INJECTION":
      return "Use prepared statements, validate inputs and sanitize dangerous characters."
    case "XSS ATTACK":
    case "XSS ATTEMPT":
      return "Escape output, sanitize input and add strong CSP headers."
    case "PATH TRAVERSAL":
      return "Normalize paths and only allow safe file access patterns."
    case "SENSITIVE ENDPOINT ACCESS":
      return "Protect admin routes, add RBAC and audit access attempts."
    case "ANOMALOUS ACTIVITY":
      return "Add rate limiting, payload size limits and anomaly monitoring."
    default:
      return "Keep monitoring request patterns."
  }
}

export function mapBackendAnalysis(item: BackendAnalysis): AnalysisResult {
  return {
    id: String(item.id),
    method: toMethod(item.method),
    endpoint: item.endpoint,
    payload: item.payload ?? "",
    sourceIp: item.sourceIp ?? undefined,
    riskScore: item.riskScore,
    riskLevel: toRiskLevel(item.riskLevel),
    detectedPattern: item.analysis || "Normal Activity",
    explanation: item.explanation || "No critical threat pattern detected.",
    impact: getImpact(item.analysis),
    recommendation: getRecommendation(item.analysis),
    timestamp: item.createdAt ? new Date(item.createdAt) : new Date(),
    reviewed: false,
  }
}
