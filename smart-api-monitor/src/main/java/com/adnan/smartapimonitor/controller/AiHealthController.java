package com.adnan.smartapimonitor.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import java.util.Map;

/**
 * Exposes health information about the external AI analysis service.
 */
@RestController
public class AiHealthController {

    private final RestClient restClient;
    private final String aiServiceUrl;

    public AiHealthController(
            @Qualifier("aiRestClient") RestClient restClient,
            @Value("${app.ai.url:}") String aiServiceUrl
    ) {
        this.restClient = restClient;
        this.aiServiceUrl = aiServiceUrl;
    }

    /**
     * Checks whether the configured AI service responds to its health endpoint.
     *
     * @return health payload describing the AI integration state
     */
    @GetMapping("/api/ai-health")
    public Map<String, Object> aiHealth() {
        if (!StringUtils.hasText(aiServiceUrl)) {
            return Map.of(
                    "status", "offline",
                    "service", "python-ai",
                    "reason", "AI service URL is not configured"
            );
        }

        try {
            Object response = restClient.get()
                    .uri("/health")
                    .retrieve()
                    .body(Object.class);

            return Map.of(
                    "status", "online",
                    "service", "python-ai",
                    "response", response
            );
        } catch (Exception e) {
            return Map.of(
                    "status", "offline",
                    "service", "python-ai"
            );
        }
    }
}
