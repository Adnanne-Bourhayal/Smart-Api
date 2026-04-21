package com.adnan.smartapimonitor.dto;

/**
 * Request payload sent from the backend to the AI analysis service.
 */
public class AiAnalysisRequest {
    private String endpoint;
    private String payload;
    private String method;
    private String sourceIp;

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public String getPayload() { return payload; }
    public void setPayload(String payload) { this.payload = payload; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public String getSourceIp() { return sourceIp; }
    public void setSourceIp(String sourceIp) { this.sourceIp = sourceIp; }
}
