package com.lms_backend.lms_project.service;

import java.util.Map;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OllamaService {

    private final RestTemplate rest;
    private final ObjectMapper mapper = new ObjectMapper();

    public OllamaService() {
        SimpleClientHttpRequestFactory factory =
            new SimpleClientHttpRequestFactory();

        factory.setConnectTimeout(5_000); // 5s
        factory.setReadTimeout(600_000);   // 600s max

        this.rest = new RestTemplate(factory);
    }

    public String askOllama(String prompt) {
        String url = "http://localhost:11434/api/generate";

        Map<String, Object> body = Map.of(
            "model", "llama3.1",
            "prompt", prompt,
            "stream", false,
            "format", "json"
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
            rest.postForEntity(url, request, String.class);

        try {
            JsonNode root = mapper.readTree(response.getBody());
            return root.get("response").asText();
        } catch (Exception e) {
            throw new RuntimeException("Ollama parsing error", e);
        }
    }
}
