package com.adnan.smartapimonitor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configures web concerns such as CORS for the backend API.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final String frontendUrl;

    public WebConfig(@Value("${app.frontend.url:}") String frontendUrl) {
        this.frontendUrl = frontendUrl;
    }

    /**
     * Applies CORS rules for API routes when a frontend origin is configured.
     *
     * @param registry MVC CORS registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (!StringUtils.hasText(frontendUrl)) {
            return;
        }

        registry.addMapping("/api/**")
                .allowedOrigins(frontendUrl)
                .allowedMethods("GET", "POST", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
