package com.example.sport_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF (for development)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()  // Allow all endpoints without authentication
                )
                .formLogin(login -> login.disable())  // Disable login page
                .httpBasic(basic -> basic.disable()); // Disable Basic Authentication

        return http.build();
    }
}
