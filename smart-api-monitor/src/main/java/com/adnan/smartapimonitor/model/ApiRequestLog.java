package com.adnan.smartapimonitor.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * Persistent record representing one analyzed API request.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ApiRequestLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String endpoint;

    private String method;

    private String sourceIp;

    @Column(length = 5000)
    private String payload;

    private int riskScore;

    private String riskLevel;

    @Column(length = 5000)
    private String analysis;

    @Column(length = 5000)
    private String explanation;

    private LocalDateTime createdAt;
}
