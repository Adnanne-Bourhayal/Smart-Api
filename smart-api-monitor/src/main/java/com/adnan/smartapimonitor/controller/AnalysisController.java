package com.adnan.smartapimonitor.controller;

import com.adnan.smartapimonitor.dto.AiAnalysisRequest;
import com.adnan.smartapimonitor.dto.AiAnalysisResponse;
import com.adnan.smartapimonitor.model.ApiRequestLog;
import com.adnan.smartapimonitor.repository.ApiRequestLogRepository;
import com.adnan.smartapimonitor.service.RiskAnalysisService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Handles single-request analysis, history retrieval, and simulation endpoints.
 */
@RestController
@RequestMapping("/api/analyze")
public class AnalysisController {

    private final ApiRequestLogRepository repository;
    private final RiskAnalysisService service;

    public AnalysisController(
            ApiRequestLogRepository repository,
            RiskAnalysisService service
    ) {
        this.repository = repository;
        this.service = service;
    }

    /**
     * Analyzes a single API request, enriches it with AI feedback, and stores the result.
     *
     * @param body request payload containing endpoint, payload, method, and optional source IP
     * @return persisted analysis record
     */
    @PostMapping
    public ApiRequestLog analyze(@RequestBody Map<String, String> body) {
        String endpoint = body.getOrDefault("endpoint", "");
        String payload = body.getOrDefault("payload", "");
        String method = body.getOrDefault("method", "POST");
        String sourceIp = body.get("sourceIp");

        String pattern = service.detectPattern(endpoint, payload);
        AiAnalysisRequest request = new AiAnalysisRequest();
        request.setEndpoint(endpoint);
        request.setPayload(payload);
        request.setMethod(method);
        request.setSourceIp(sourceIp);

        AiAnalysisResponse aiResponse = service.analyzeWithAi(request);

        int score = aiResponse != null ? aiResponse.getRiskScore() : 20;
        String explanation = aiResponse != null ? aiResponse.getExplanation() : "No explanation available.";
        score = service.applyPatternRiskFloor(pattern, score);

        if (sourceIp != null && !sourceIp.isBlank()) {
            LocalDateTime lastMinute = LocalDateTime.now().minusMinutes(1);
            long recentFromSameIp = repository.findAll().stream()
                    .filter(log -> sourceIp.equals(log.getSourceIp()))
                    .filter(log -> log.getCreatedAt() != null && log.getCreatedAt().isAfter(lastMinute))
                    .count();

            if (recentFromSameIp >= 3) {
                score = Math.min(score + 15, 99);
                explanation = explanation + " Repeated activity detected from same source IP.";
                if (pattern.equals("Normal Activity")) {
                    pattern = "Anomalous Activity";
                }
            }
        }

        String level = service.getRiskLevel(score);

        ApiRequestLog log = new ApiRequestLog();
        log.setEndpoint(endpoint);
        log.setPayload(payload);
        log.setMethod(method);
        log.setSourceIp(sourceIp);
        log.setRiskScore(score);
        log.setRiskLevel(level);
        log.setAnalysis(pattern);
        log.setExplanation(explanation);
        log.setCreatedAt(LocalDateTime.now());

        return repository.save(log);
    }

    /**
     * Returns all stored analysis records.
     *
     * @return complete analysis history
     */
    @GetMapping
    public List<ApiRequestLog> getAll() {
        return repository.findAll();
    }

    /**
     * Deletes all stored analysis records.
     */
    @DeleteMapping
    public void deleteAll() {
        repository.deleteAll();
    }

    /**
     * Deletes a single analysis record by identifier.
     *
     * @param id database identifier of the record to remove
     */
    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable Long id) {
        repository.deleteById(id);
    }

    /**
     * Generates a fixed set of simulated malicious and normal requests.
     *
     * @return persisted analysis records created from the simulation set
     */
    @PostMapping("/simulate")
    public List<ApiRequestLog> simulateTraffic() {
        List<Map<String, String>> fakeRequests = List.of(
                Map.of("method", "POST", "endpoint", "/api/login", "payload", "admin' OR 1=1 --"),
                Map.of("method", "POST", "endpoint", "/api/search", "payload", "<script>alert(1)</script>"),
                Map.of("method", "GET", "endpoint", "/api/files", "payload", "../../../etc/passwd"),
                Map.of("method", "GET", "endpoint", "/api/products", "payload", "{}")
        );

        return fakeRequests.stream().map(this::analyze).toList();
    }

}
