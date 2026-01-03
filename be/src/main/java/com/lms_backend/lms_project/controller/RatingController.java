package com.lms_backend.lms_project.controller;

import com.lms_backend.lms_project.dto.request.RatingRequest;
import com.lms_backend.lms_project.dto.response.RatingListResponse;
import com.lms_backend.lms_project.dto.response.RatingResponse;
import com.lms_backend.lms_project.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/rating")
@CrossOrigin(origins = "http://localhost:5173")
public class RatingController {
    @Autowired
    RatingService ratingService;

    @GetMapping("/rating-user/{userId}")
    public RatingListResponse getRatingsByUser(@PathVariable int userId) {
        return ratingService.getRatingsByUser(userId);
    }

    @GetMapping("/rating-course/{courseId}")
    public ResponseEntity<RatingListResponse> getRatingsByCourse(
            @PathVariable int courseId) {
        return ResponseEntity.ok(ratingService.fetchRatingsByCourse(courseId));
    }

    @PostMapping("/add")
    public ResponseEntity<RatingResponse> addRating(
            @Valid @RequestBody RatingRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ratingService.addRating(request));
    }
}
