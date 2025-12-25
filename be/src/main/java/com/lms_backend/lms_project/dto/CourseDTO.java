package com.lms_backend.lms_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseDTO {
    private int id;
    private String name;
    private String description;
    private String type;
    private BigDecimal fee;
    private String addedDateTime;
    private String status;
    private int discountInPercent;
    private String authorCourseNote;
    private String specialNote;
    private String prerequisite;
    private String notesFileName;
    private String thumbnail;

    // Mentor info
    private int mentorId;
    private String mentorName;

    // Category info
    private int categoryId;
    private String categoryName;

    // Rating
    private double averageRating;
    private int totalRating;

    // Sections and topics
    private List<CourseSectionDTO> sections;
}
