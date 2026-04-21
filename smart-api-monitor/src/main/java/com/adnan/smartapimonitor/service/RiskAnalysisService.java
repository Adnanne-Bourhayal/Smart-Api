package com.adnan.smartapimonitor.service;

import com.adnan.smartapimonitor.dto.AiAnalysisRequest;
import com.adnan.smartapimonitor.dto.AiAnalysisResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

/**
 * Centralizes heuristic pattern detection and communication with the AI service.
 */
@Service
public class RiskAnalysisService {

    private final RestClient aiRestClient;
    private final String aiServiceUrl;

    public RiskAnalysisService(
            @Qualifier("aiRestClient") RestClient aiRestClient,
            @Value("${app.ai.url:}") String aiServiceUrl
    ) {
        this.aiRestClient = aiRestClient;
        this.aiServiceUrl = aiServiceUrl;
    }

    /**
     * Detects a coarse-grained attack pattern based on request content.
     *
     * @param endpoint target API endpoint
     * @param payload request body or query payload
     * @return detected pattern label
     */
    public String detectPattern(String endpoint, String payload) {
        String safeEndpoint = endpoint == null ? "" : endpoint.toLowerCase();
        String safePayload = payload == null ? "" : payload.toLowerCase();
        String text = safeEndpoint + " " + safePayload;

        if (text.contains("drop table")
                || text.contains("union select")
                || text.contains(" or 1=1")
                || text.contains("' or '1'='1")
                || text.contains("--")) {
            return "SQL Injection";
        }

        if (text.contains("<script")
                || text.contains("javascript:")
                || text.contains("onerror=")
                || text.contains("onload=")) {
            return "XSS Attempt";
        }

        if (text.contains("../") || text.contains("..\\")) {
            return "Path Traversal";
        }

        if (safeEndpoint.contains("/admin")
                || safeEndpoint.contains("/internal")
                || safePayload.contains("password")
                || safePayload.contains("secret")) {
            return "Sensitive Endpoint Access";
        }

        if (safePayload.length() > 500) {
            return "Oversized Payload";
        }

        if (safePayload.trim().startsWith("{") || safePayload.trim().startsWith("[")) {
            return "JSON Payload";
        }

        return "Normal Activity";
    }

    /**
     * Sends the request to the AI service and falls back to a basic response when unavailable.
     *
     * @param request normalized request analysis payload
     * @return AI analysis response or fallback response
     */
    public AiAnalysisResponse analyzeWithAi(AiAnalysisRequest request) {
        if (!StringUtils.hasText(aiServiceUrl)) {
            return fallbackAnalysis("AI service URL is not configured. Basic fallback applied.");
        }

        try {
            AiAnalysisResponse response = aiRestClient.post()
                    .uri("/analyze-ai")
                    .body(request)
                    .retrieve()
                    .body(AiAnalysisResponse.class);

            return response != null ? response : fallbackAnalysis("AI service returned an empty response. Basic fallback applied.");
        } catch (Exception e) {
            return fallbackAnalysis("AI service unavailable. Basic fallback applied.");
        }
    }

    /**
     * Enforces a minimum score for known high-risk patterns.
     *
     * @param pattern detected pattern label
     * @param score initial score
     * @return adjusted score
     */
    public int applyPatternRiskFloor(String pattern, int score) {
        if ("SQL Injection".equals(pattern) || "XSS Attempt".equals(pattern)) {
            return Math.max(score, 90);
        }

        if ("Path Traversal".equals(pattern)) {
            return Math.max(score, 80);
        }

        if ("Sensitive Endpoint Access".equals(pattern)) {
            return Math.max(score, 60);
        }

        return score;
    }

    /**
     * Maps a numeric score to the public risk level used by the UI.
     *
     * @param score risk score between low and critical
     * @return normalized risk level
     */
    public String getRiskLevel(int score) {
        if (score >= 75) return "HIGH";
        if (score >= 40) return "MEDIUM";
        return "LOW";
    }

    /**
     * Builds a deterministic fallback response when AI analysis is unavailable.
     *
     * @param explanation fallback explanation shown to the user
     * @return fallback AI response
     */
    private AiAnalysisResponse fallbackAnalysis(String explanation) {
        AiAnalysisResponse response = new AiAnalysisResponse();
        response.setRiskScore(20);
        response.setRiskLevel("LOW");
        response.setAnalysis("Fallback Analysis");
        response.setExplanation(explanation);
        return response;
    }
}
