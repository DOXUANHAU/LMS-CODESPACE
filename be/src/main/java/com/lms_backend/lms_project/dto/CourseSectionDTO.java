package com.lms_backend.lms_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseSectionDTO {
    private int id;
    private String srNo;
    private String name;
    private String description;
    private List<CourseSectionTopicDTO> topics;
}