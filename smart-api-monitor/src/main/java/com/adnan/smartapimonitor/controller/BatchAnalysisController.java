package com.adnan.smartapimonitor.controller;

import com.adnan.smartapimonitor.dto.AiAnalysisRequest;
import com.adnan.smartapimonitor.dto.AiAnalysisResponse;
import com.adnan.smartapimonitor.model.ApiRequestLog;
import com.adnan.smartapimonitor.repository.ApiRequestLogRepository;
import com.adnan.smartapimonitor.service.RiskAnalysisService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles batch request analysis for imported traffic samples.
 */
@RestController
@RequestMapping("/api/analyze/batch")
public class BatchAnalysisController {

    private final ApiRequestLogRepository repository;
    private final RiskAnalysisService service;

    public BatchAnalysisController(
            ApiRequestLogRepository repository,
            RiskAnalysisService service
    ) {
        this.repository = repository;
        this.service = service;
    }

    /**
     * Represents a single batch item submitted by the frontend.
     */
    public static class BatchItem {
        public String endpoint;
        public String payload;
        public String method;
        public String sourceIp;
    }

    /**
     * Analyzes and stores a list of request samples in a single operation.
     *
     * @param items batch request payload
     * @return persisted analysis records
     */
    @PostMapping
    public List<ApiRequestLog> analyzeBatch(@RequestBody List<BatchItem> items) {
        List<ApiRequestLog> results = new ArrayList<>();

        for (BatchItem item : items) {
            String endpoint = item.endpoint == null ? "" : item.endpoint;
            String payload = item.payload == null ? "" : item.payload;
            String method = item.method == null ? "POST" : item.method;
            String sourceIp = item.sourceIp;

            String pattern = service.detectPattern(endpoint, payload);
            AiAnalysisRequest request = new AiAnalysisRequest();
            request.setEndpoint(endpoint);
            request.setPayload(payload);
            request.setMethod(method);
            request.setSourceIp(sourceIp);

            AiAnalysisResponse aiResponse = service.analyzeWithAi(request);

            int score = aiResponse != null ? aiResponse.getRiskScore() : 20;
            score = service.applyPatternRiskFloor(pattern, score);

            String level = service.getRiskLevel(score);

            ApiRequestLog log = new ApiRequestLog();
            log.setEndpoint(endpoint);
            log.setPayload(payload);
            log.setMethod(method);
            log.setSourceIp(sourceIp);
            log.setRiskScore(score);
            log.setRiskLevel(level);
            log.setAnalysis(pattern);
            log.setExplanation(aiResponse != null ? aiResponse.getExplanation() : "No explanation available.");
            log.setCreatedAt(LocalDateTime.now());

            results.add(repository.save(log));
        }

        return results;
    }
}
