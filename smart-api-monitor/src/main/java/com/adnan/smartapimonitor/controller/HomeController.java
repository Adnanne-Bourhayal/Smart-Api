package com.adnan.smartapimonitor.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Exposes a lightweight root endpoint for deployment checks.
 */
@RestController
public class HomeController {

    /**
     * Returns a basic status payload confirming the backend is running.
     *
     * @return static service status map
     */
    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "message", "Smart API Monitor backend is running",
                "status", "ok"
        );
    }
}
