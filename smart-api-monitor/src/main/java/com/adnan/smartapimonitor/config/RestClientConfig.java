package com.adnan.smartapimonitor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

/**
 * Declares shared HTTP clients used by backend services.
 */
@Configuration
public class RestClientConfig {

    /**
     * Creates the RestClient used to call the external AI service.
     *
     * @param aiServiceUrl configured base URL for the FastAPI service
     * @return configured RestClient instance
     */
    @Bean
    public RestClient aiRestClient(@Value("${app.ai.url:}") String aiServiceUrl) {
        RestClient.Builder builder = RestClient.builder();

        if (!aiServiceUrl.isBlank()) {
            builder.baseUrl(aiServiceUrl);
        }

        return builder.build();
    }
}
