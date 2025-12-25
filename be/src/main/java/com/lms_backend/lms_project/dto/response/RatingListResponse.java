package com.lms_backend.lms_project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatingListResponse {
    private List<RatingResponse> ratings;
    private Double averageRating;
    private Long totalRatings;
    private Map<Double, Long> ratingDistribution;

}
