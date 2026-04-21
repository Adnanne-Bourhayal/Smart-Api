package com.adnan.smartapimonitor.repository;

import com.adnan.smartapimonitor.model.ApiRequestLog;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for storing and retrieving analyzed API request logs.
 */
public interface ApiRequestLogRepository extends JpaRepository<ApiRequestLog, Long> {
}
