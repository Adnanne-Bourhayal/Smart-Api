from fastapi import FastAPI
from pydantic import BaseModel
import re

app = FastAPI()

class AnalyzeRequest(BaseModel):
    endpoint: str
    payload: str = ""
    method: str = "POST"
    sourceIp: str | None = None

SQL_PATTERNS = [
    r"(\bor\b\s+1=1)",
    r"(union\s+select)",
    r"(drop\s+table)",
    r"(insert\s+into)",
    r"(delete\s+from)",
    r"(update\s+\w+\s+set)",
    r"(--)",
    r"(/\*)",
    r"(\bxp_\w+)",
]

XSS_PATTERNS = [
    r"(<script.*?>.*?</script>)",
    r"(javascript:)",
    r"(onerror\s*=)",
    r"(onload\s*=)",
    r"(alert\s*\()",
    r"(document\.cookie)",
]

PATH_PATTERNS = [
    r"(\.\./)",
    r"(\.\.\\)",
    r"(/etc/passwd)",
    r"(boot\.ini)",
    r"(win\.ini)",
]

SENSITIVE_PATTERNS = [
    r"(/admin)",
    r"(/root)",
    r"(password)",
    r"(secret)",
    r"(token)",
    r"(apikey)",
]

def count_matches(text: str, patterns: list[str]) -> int:
    total = 0
    for pattern in patterns:
        if re.search(pattern, text, re.IGNORECASE):
            total += 1
    return total

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze-ai")
def analyze_ai(data: AnalyzeRequest):
    text = f"{data.method} {data.endpoint} {data.payload}".lower()

    sql_hits = count_matches(text, SQL_PATTERNS)
    xss_hits = count_matches(text, XSS_PATTERNS)
    path_hits = count_matches(text, PATH_PATTERNS)
    sensitive_hits = count_matches(text, SENSITIVE_PATTERNS)

    if sql_hits > 0:
        score = min(70 + sql_hits * 10, 98)
        return {
            "riskScore": score,
            "riskLevel": "HIGH",
            "analysis": "SQL Injection",
            "explanation": f"Detected {sql_hits} SQL injection indicator(s) in request data"
        }

    if xss_hits > 0:
        score = min(68 + xss_hits * 10, 96)
        return {
            "riskScore": score,
            "riskLevel": "HIGH",
            "analysis": "XSS Attack",
            "explanation": f"Detected {xss_hits} XSS indicator(s) in request data"
        }

    if path_hits > 0:
        score = min(65 + path_hits * 10, 92)
        return {
            "riskScore": score,
            "riskLevel": "HIGH",
            "analysis": "Path Traversal",
            "explanation": f"Detected {path_hits} path traversal indicator(s)"
        }

    if sensitive_hits > 0:
        score = min(45 + sensitive_hits * 8, 75)
        level = "MEDIUM" if score < 75 else "HIGH"
        return {
            "riskScore": score,
            "riskLevel": level,
            "analysis": "Sensitive Endpoint Access",
            "explanation": f"Detected {sensitive_hits} sensitive access indicator(s)"
        }

    if len(data.payload) > 500:
        return {
            "riskScore": 52,
            "riskLevel": "MEDIUM",
            "analysis": "Anomalous Activity",
            "explanation": "Large payload detected, possible fuzzing or abuse attempt"
        }

    return {
        "riskScore": 15,
        "riskLevel": "LOW",
        "analysis": "Normal Activity",
        "explanation": "No critical threat pattern detected"
    }
