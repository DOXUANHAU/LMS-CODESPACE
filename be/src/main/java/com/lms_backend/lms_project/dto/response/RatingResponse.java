package com.lms_backend.lms_project.dto.response;

import com.lms_backend.lms_project.dto.CourseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingResponse {
    private Integer id;
    private Double rating;
    private String comment;
    private LocalDateTime createdAt;
    private UserInfo user;
    private CourseDTO course;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfo {
        private Integer id;
        private String firstName;
        private String lastName;
        private String avatar;
        private String role;
    }
}