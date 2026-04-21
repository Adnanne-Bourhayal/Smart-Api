package com.adnan.smartapimonitor.dto;

/**
 * Response payload returned by the AI analysis service.
 */
public class AiAnalysisResponse {
    private int riskScore;
    private String riskLevel;
    private String analysis;
    private String explanation;

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getAnalysis() { return analysis; }
    public void setAnalysis(String analysis) { this.analysis = analysis; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
