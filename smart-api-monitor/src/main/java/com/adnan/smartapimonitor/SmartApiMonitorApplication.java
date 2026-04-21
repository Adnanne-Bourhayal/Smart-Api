package com.adnan.smartapimonitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for the Smart API Monitor Spring Boot application.
 */
@SpringBootApplication
public class SmartApiMonitorApplication {

	/**
	 * Starts the backend application context.
	 *
	 * @param args startup arguments provided by the runtime
	 */
	public static void main(String[] args) {
		SpringApplication.run(SmartApiMonitorApplication.class, args);
	}

}
