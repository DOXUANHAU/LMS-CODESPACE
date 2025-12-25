package com.lms_backend.lms_project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms_backend.lms_project.Utility.PromptBuilder;
import com.lms_backend.lms_project.dto.response.GradingResponse;

@Service
public class GradingService {

    private final DocxParserService parser;
    private final OllamaService ollama;
    private final ObjectMapper mapper = new ObjectMapper();

    public GradingService(DocxParserService parser, OllamaService ollama) {
        this.parser = parser;
        this.ollama = ollama;
    }

    public GradingResponse grade(MultipartFile file) {

        String text = parser.extract(file);
        String prompt = PromptBuilder.build(text);

        String jsonResult = ollama.askOllama(prompt);

        System.out.println("Ollama JSON result:");
        System.out.println(jsonResult);

        try {
            return mapper.readValue(jsonResult, GradingResponse.class);
        } catch (Exception e) {
            throw new RuntimeException(
                "Invalid JSON returned from Ollama. Check prompt & response.", e
            );
        }
    }
}
