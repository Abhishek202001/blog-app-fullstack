package com.abhi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.abhi.security.JwtFilter;


@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http
        .csrf().disable() // Disable CSRF for testing
        .cors() // Enable CORS
        .and()
        .authorizeHttpRequests()
            .anyRequest().permitAll(); // Permit all endpoints (for dev)

    return http.build();
    }
	
	
}
