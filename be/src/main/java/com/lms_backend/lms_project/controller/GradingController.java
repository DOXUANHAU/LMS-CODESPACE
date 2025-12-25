package com.lms_backend.lms_project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.lms_backend.lms_project.dto.response.GradingResponse;
import com.lms_backend.lms_project.service.GradingService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GradingController {

    private final GradingService gradingService;

    public GradingController(GradingService gradingService) {
        this.gradingService = gradingService;
    }

    // FIX: accept BOTH /api/grade and /api/api/grade
    @PostMapping({"/api/grade", "/api/api/grade"})
    public ResponseEntity<GradingResponse> grade(
            @RequestParam("file") MultipartFile file
    ) {
        return ResponseEntity.ok(gradingService.grade(file));
    }
}
