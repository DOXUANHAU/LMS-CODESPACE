package com.lms_backend.lms_project.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseSectionTopicDTO {
    private int id;
    private String srNo;
    private String name;
    private String description;
    private String videoFileName;
}
