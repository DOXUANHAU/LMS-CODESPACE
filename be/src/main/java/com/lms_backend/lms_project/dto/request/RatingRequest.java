package com.lms_backend.lms_project.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingRequest {
    @NotNull(message = "User ID không được để trống")
    private Integer userId;

    @NotNull(message = "Course ID không được để trống")
    private Integer courseId;

    @NotNull(message = "Rating không được để trống")
    @DecimalMin(value = "0.5", message = "Rating tối thiểu là 0.5")
    @DecimalMax(value = "5.0", message = "Rating tối đa là 5.0")
    private Double rating;

    @NotBlank(message = "Comment không được để trống")
    @Size(max = 1000, message = "Comment không được quá 1000 ký tự")
    private String comment;
}